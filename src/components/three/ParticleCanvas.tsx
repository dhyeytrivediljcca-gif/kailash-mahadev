import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleCanvasProps {
  className?: string;
  intensity?: 'calm' | 'cosmic' | 'minimal';
}

/**
 * Creates a circular soft blurred radial glow texture so particles are completely round
 * with soft falloff — zero square pixels or boxy artifacts.
 */
function createSoftCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(191, 215, 255, 0.7)');
    gradient.addColorStop(0.65, 'rgba(191, 215, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(191, 215, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  className = '',
  intensity = 'calm',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animId: number | null = null;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 60;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const circleTexture = createSoftCircleTexture();
      const isMobile = window.innerWidth < 768;

      // Ultra-sparse, subtle stardust/motes (NO snow blocks, NO cubes, NO dense clutter)
      const count = intensity === 'minimal' 
        ? (isMobile ? 12 : 22) 
        : (isMobile ? 35 : (intensity === 'cosmic' ? 75 : 45));
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        // Confined to upper sky and background periphery away from central typography
        positions[i * 3] = (Math.random() - 0.5) * 110;
        positions[i * 3 + 1] = Math.random() * 50 + 5; // keep high in sky
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15; // behind focal plane

        velocities[i * 3] = (Math.random() - 0.5) * 0.005; // very gentle horizontal drift
        velocities[i * 3 + 1] = -(Math.random() * 0.004 + 0.002); // ultra slow float
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color('#B9D5F2'),
        size: intensity === 'minimal' ? (isMobile ? 1.4 : 1.8) : (isMobile ? 1.8 : 2.4),
        map: circleTexture,
        transparent: true,
        opacity: intensity === 'minimal' ? 0.18 : 0.28, // very soft, non-intrusive
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Subtle mouse damping
      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * -2;
      };

      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      const handleContextLost = (e: Event) => {
        e.preventDefault();
        setHasWebGlError(true);
      };

      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        currentMouseX += (targetMouseX - currentMouseX) * 0.03;
        currentMouseY += (targetMouseY - currentMouseY) * 0.03;

        if (camera) {
          camera.position.x = currentMouseX;
          camera.position.y = currentMouseY;
          camera.lookAt(0, 0, 0);
        }

        if (geometry) {
          const pos = geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < count; i++) {
            pos[i * 3] += velocities[i * 3] + Math.sin(elapsedTime * 0.2 + i) * 0.005;
            pos[i * 3 + 1] += velocities[i * 3 + 1];

            // Subtle wrap
            if (pos[i * 3 + 1] < -25) {
              pos[i * 3 + 1] = 55;
              pos[i * 3] = (Math.random() - 0.5) * 110;
            }
          }
          geometry.attributes.position.needsUpdate = true;
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);

        if (renderer) {
          renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        }

        circleTexture.dispose();
        geometry.dispose();
        material.dispose();
      };
    } catch {
      setHasWebGlError(true);
    }
  }, [intensity]);

  if (hasWebGlError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
