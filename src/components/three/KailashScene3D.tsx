import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import heroKailashShivaImg from '../../assets/images/kailash_shiva_hero_1790524244378.jpg';

interface KailashScene3DProps {
  scrollProgress: number; // 0 to 1 as user scrolls through hero
  onTrishulProximity?: (isNear: boolean) => void;
}

/**
 * Procedural circular soft radial glow texture for motes (guarantees round, smooth falloff)
 */
function createMoteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(234, 242, 247, 1)');
    gradient.addColorStop(0.2, 'rgba(185, 213, 242, 0.7)');
    gradient.addColorStop(0.6, 'rgba(185, 213, 242, 0.15)');
    gradient.addColorStop(1, 'rgba(185, 213, 242, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a soft glowing canvas texture for the atmospheric sacred ॐ symbol
 */
function createOmTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);
    // Subtle background glow
    const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
    grad.addColorStop(0, 'rgba(185, 213, 242, 0.35)');
    grad.addColorStop(0.6, 'rgba(200, 169, 107, 0.1)');
    grad.addColorStop(1, 'rgba(185, 213, 242, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Sacred Om glyph
    ctx.font = '100px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#EAF2F7';
    ctx.shadowColor = '#B9D5F2';
    ctx.shadowBlur = 24;
    ctx.fillText('ॐ', 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a soft cloud/mist texture using canvas gradient
 */
function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 256);
    const grad = ctx.createRadialGradient(256, 128, 10, 256, 128, 220);
    grad.addColorStop(0, 'rgba(185, 213, 242, 0.28)');
    grad.addColorStop(0.4, 'rgba(185, 213, 242, 0.16)');
    grad.addColorStop(0.8, 'rgba(11, 29, 51, 0.05)');
    grad.addColorStop(1, 'rgba(2, 6, 13, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Constructs a detailed 3D Trishul (Trident) using procedural Three.js meshes
 */
function createTrishulMesh(): THREE.Group {
  const trishulGroup = new THREE.Group();

  // Premium aged metallic material
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xc8a96b,
    metalness: 0.88,
    roughness: 0.26,
    emissive: 0x1d1708,
  });

  // Darker aged accent metal
  const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: 0x8a7243,
    metalness: 0.92,
    roughness: 0.35,
  });

  // 1. Long Staff / Shaft
  const shaftGeo = new THREE.CylinderGeometry(0.038, 0.045, 4.2, 16);
  const shaft = new THREE.Mesh(shaftGeo, metalMaterial);
  trishulGroup.add(shaft);

  // Decorative ring collars on shaft
  [-1.2, -0.4, 0.4, 1.2, 1.8].forEach((yPos) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.055, 0.015, 12, 24),
      darkMetalMaterial
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = yPos;
    trishulGroup.add(ring);
  });

  // Base finial point (bottom)
  const bottomTipGeo = new THREE.ConeGeometry(0.045, 0.35, 16);
  const bottomTip = new THREE.Mesh(bottomTipGeo, metalMaterial);
  bottomTip.rotation.x = Math.PI;
  bottomTip.position.y = -2.25;
  trishulGroup.add(bottomTip);

  // 2. Trident Base Mount / Crescent Bracket (top)
  const bracketGeo = new THREE.TorusGeometry(0.42, 0.04, 12, 32, Math.PI);
  const bracket = new THREE.Mesh(bracketGeo, metalMaterial);
  bracket.rotation.z = Math.PI;
  bracket.position.y = 2.1;
  trishulGroup.add(bracket);

  // Central Hub
  const hubGeo = new THREE.SphereGeometry(0.09, 16, 16);
  const hub = new THREE.Mesh(hubGeo, metalMaterial);
  hub.position.y = 2.1;
  trishulGroup.add(hub);

  // 3. Central Blade (Main spear point)
  const centerShaftGeo = new THREE.CylinderGeometry(0.038, 0.05, 0.6, 16);
  const centerShaft = new THREE.Mesh(centerShaftGeo, metalMaterial);
  centerShaft.position.y = 2.45;
  trishulGroup.add(centerShaft);

  const centerBladeGeo = new THREE.ConeGeometry(0.08, 0.65, 16);
  const centerBlade = new THREE.Mesh(centerBladeGeo, metalMaterial);
  centerBlade.position.y = 3.0;
  trishulGroup.add(centerBlade);

  // 4. Outer Left and Right Curved Prongs
  [-1, 1].forEach((dir) => {
    // Prong stem
    const prongStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.04, 0.45, 16),
      metalMaterial
    );
    prongStem.position.set(dir * 0.42, 2.3, 0);
    prongStem.rotation.z = dir * -0.08;
    trishulGroup.add(prongStem);

    // Curved outer spear point
    const prongBlade = new THREE.Mesh(
      new THREE.ConeGeometry(0.065, 0.52, 16),
      metalMaterial
    );
    prongBlade.position.set(dir * 0.4, 2.75, 0);
    prongBlade.rotation.z = dir * 0.12;
    trishulGroup.add(prongBlade);
  });

  trishulGroup.scale.set(0.65, 0.65, 0.65);
  return trishulGroup;
}

/**
 * Constructs a 3D Damaru (Hourglass drum) with aged wood and metal bands
 */
function createDamaruMesh(): THREE.Group {
  const damaruGroup = new THREE.Group();

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d271d,
    roughness: 0.68,
    metalness: 0.15,
  });

  const parchmentMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6cbb8,
    roughness: 0.75,
    metalness: 0.08,
  });

  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xc8a96b,
    metalness: 0.85,
    roughness: 0.32,
  });

  // Upper cone (flaring up)
  const upperCone = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.15, 0.45, 24, 1, true),
    woodMaterial
  );
  upperCone.position.y = 0.225;
  damaruGroup.add(upperCone);

  // Lower cone (flaring down)
  const lowerCone = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.38, 0.45, 24, 1, true),
    woodMaterial
  );
  lowerCone.position.y = -0.225;
  damaruGroup.add(lowerCone);

  // Drum Heads (parchment caps)
  const topCap = new THREE.Mesh(new THREE.CircleGeometry(0.38, 24), parchmentMaterial);
  topCap.rotation.x = -Math.PI / 2;
  topCap.position.y = 0.45;
  damaruGroup.add(topCap);

  const bottomCap = new THREE.Mesh(new THREE.CircleGeometry(0.38, 24), parchmentMaterial);
  bottomCap.rotation.x = Math.PI / 2;
  bottomCap.position.y = -0.45;
  damaruGroup.add(bottomCap);

  // Outer brass hoops
  [0.45, -0.45].forEach((yPos) => {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.02, 12, 32), brassMaterial);
    hoop.rotation.x = Math.PI / 2;
    hoop.position.y = yPos;
    damaruGroup.add(hoop);
  });

  // Waist binding ring & cord
  const waistRing = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 12, 24), brassMaterial);
  waistRing.rotation.x = Math.PI / 2;
  damaruGroup.add(waistRing);

  // Small cord beads
  const beadGeo = new THREE.SphereGeometry(0.045, 12, 12);
  const bead1 = new THREE.Mesh(beadGeo, brassMaterial);
  bead1.position.set(0.24, -0.15, 0.12);
  damaruGroup.add(bead1);

  const bead2 = new THREE.Mesh(beadGeo, brassMaterial);
  bead2.position.set(-0.22, 0.12, -0.15);
  damaruGroup.add(bead2);

  damaruGroup.scale.set(0.68, 0.68, 0.68);
  return damaruGroup;
}

export const KailashScene3D: React.FC<KailashScene3DProps> = ({
  scrollProgress,
  onTrishulProximity,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const trishulRef = useRef<THREE.Group | null>(null);
  const damaruRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, screenX: 0, screenY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animId: number | null = null;

    try {
      scene = new THREE.Scene();
      // Himalayan atmospheric perspective: exponential fog matching #02060D
      scene.fog = new THREE.FogExp2(0x02060d, 0.022);

      const width = container.clientWidth;
      const height = container.clientHeight;
      camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
      camera.position.set(0, 0.3, 14);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      container.appendChild(renderer.domElement);

      // --- LIGHTING RIG ---
      // 1. Ambient: deep Himalayan twilight
      const ambientLight = new THREE.AmbientLight(0x0c2035, 1.2);
      scene.add(ambientLight);

      // 2. Cold Moonlight Directional: creates beautiful metallic reflections on Trishul & Damaru
      const moonLight = new THREE.DirectionalLight(0xb9d5f2, 2.2);
      moonLight.position.set(5, 8, 7);
      scene.add(moonLight);

      // 3. Subtle Warm Sacred Aura Point Light near Shiva & Trishul
      const sacredAuraLight = new THREE.PointLight(0xc8a96b, 1.5, 12, 1.8);
      sacredAuraLight.position.set(1.5, 0.5, -2);
      scene.add(sacredAuraLight);

      // --- 3D LAYER 1: Deep Cosmic Stars & Constellations ---
      const starCount = window.innerWidth < 768 ? 90 : 180;
      const starGeo = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starAlphas = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 80;
        starPositions[i * 3 + 1] = Math.random() * 35 + 2; // high in sky
        starPositions[i * 3 + 2] = -25 - Math.random() * 30; // deep background
        starAlphas[i] = Math.random() * 0.7 + 0.3;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute('alpha', new THREE.BufferAttribute(starAlphas, 1));

      const moteTex = createMoteTexture();
      const starMat = new THREE.PointsMaterial({
        color: new THREE.Color(0xb9d5f2),
        size: 0.85,
        map: moteTex,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const starPoints = new THREE.Points(starGeo, starMat);
      scene.add(starPoints);

      // --- 3D LAYER 2: Mount Kailash & Meditating Shiva Depth Plane ---
      const textureLoader = new THREE.TextureLoader();
      const heroTexture = textureLoader.load(heroKailashShivaImg);
      heroTexture.colorSpace = THREE.SRGBColorSpace;

      // Primary Kailash + Shiva Plane at z = -4
      const heroPlaneGeo = new THREE.PlaneGeometry(16, 9.8);
      const heroPlaneMat = new THREE.MeshBasicMaterial({
        map: heroTexture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      const heroPlane = new THREE.Mesh(heroPlaneGeo, heroPlaneMat);
      heroPlane.position.set(0, 0.1, -4);
      scene.add(heroPlane);

      // --- 3D LAYER 3: Drifting Cloud / Mist Planes ---
      const cloudTex = createCloudTexture();
      const cloudPlanes: { mesh: THREE.Mesh; speed: number; baseX: number }[] = [];

      // Cloud Plane 1: Behind Shiva, over distant peaks
      const cloudGeo1 = new THREE.PlaneGeometry(24, 7);
      const cloudMat1 = new THREE.MeshBasicMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const cloud1 = new THREE.Mesh(cloudGeo1, cloudMat1);
      cloud1.position.set(-2, -0.6, -6);
      scene.add(cloud1);
      cloudPlanes.push({ mesh: cloud1, speed: 0.0008, baseX: -2 });

      // Cloud Plane 2: Floating Himalayan midground mist
      const cloudGeo2 = new THREE.PlaneGeometry(22, 6);
      const cloudMat2 = new THREE.MeshBasicMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const cloud2 = new THREE.Mesh(cloudGeo2, cloudMat2);
      cloud2.position.set(3, -1.8, -1.5);
      scene.add(cloud2);
      cloudPlanes.push({ mesh: cloud2, speed: -0.0012, baseX: 3 });

      // Cloud Plane 3: Foreground low valley haze
      const cloudGeo3 = new THREE.PlaneGeometry(28, 8);
      const cloudMat3 = new THREE.MeshBasicMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const cloud3 = new THREE.Mesh(cloudGeo3, cloudMat3);
      cloud3.position.set(0, -3.2, 3);
      scene.add(cloud3);
      cloudPlanes.push({ mesh: cloud3, speed: 0.0016, baseX: 0 });

      // --- 3D LAYER 4: Ethereal Sacred Om (ॐ) in Atmosphere ---
      const omTex = createOmTexture();
      const omGeo = new THREE.PlaneGeometry(2.6, 2.6);
      const omMat = new THREE.MeshBasicMaterial({
        map: omTex,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const omMesh = new THREE.Mesh(omGeo, omMat);
      omMesh.position.set(0, 3.2, -6.5);
      scene.add(omMesh);

      // --- 3D LAYER 5: Realistic 3D Trishul (Trident) ---
      const trishul = createTrishulMesh();
      // Positioned to the right of Shiva, angled gracefully
      trishul.position.set(3.2, 0.1, -2.2);
      trishul.rotation.set(0.12, -0.3, -0.08);
      scene.add(trishul);
      trishulRef.current = trishul;

      // --- 3D LAYER 6: Realistic 3D Damaru ---
      const damaru = createDamaruMesh();
      damaru.position.set(3.8, -1.1, -1.8);
      damaru.rotation.set(0.2, 0.4, 0.15);
      scene.add(damaru);
      damaruRef.current = damaru;

      // --- 3D LAYER 7: Sparse Atmospheric Golden/Silver Dust Motes ---
      const moteCount = window.innerWidth < 768 ? 25 : 55;
      const moteGeo = new THREE.BufferGeometry();
      const motePos = new Float32Array(moteCount * 3);
      const moteVel = new Float32Array(moteCount * 3);

      for (let i = 0; i < moteCount; i++) {
        motePos[i * 3] = (Math.random() - 0.5) * 16;
        motePos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 0.5;
        motePos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;

        moteVel[i * 3] = (Math.random() - 0.5) * 0.003;
        moteVel[i * 3 + 1] = Math.random() * 0.004 + 0.002; // very slow upward float
        moteVel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
      }
      moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));

      const moteMat = new THREE.PointsMaterial({
        color: new THREE.Color(0xb9d5f2),
        size: 0.14,
        map: moteTex,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const motes = new THREE.Points(moteGeo, moteMat);
      scene.add(motes);

      // --- MOUSE PARALLAX & PROXIMITY TRACKING ---
      const handleMouseMove = (e: MouseEvent) => {
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseRef.current.targetX = normX;
        mouseRef.current.targetY = normY;
        mouseRef.current.screenX = e.clientX;
        mouseRef.current.screenY = e.clientY;

        // Proximity to right-hand 3D Trishul / Damaru zone
        const rightHalf = e.clientX > window.innerWidth * 0.6 && e.clientY > window.innerHeight * 0.25;
        if (onTrishulProximity) {
          onTrishulProximity(rightHalf);
        }
      };

      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (!isTouch) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      }

      // --- RESIZE HANDLER ---
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // --- ANIMATION LOOP (Damped Camera + Living Scene Physics) ---
      let clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // 1. Smooth Camera Damping (Parallax + Scroll Push-in)
        const mouse = mouseRef.current;
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;

        if (camera) {
          // Base position from scroll (14 down to 9.2 as user scrolls forward)
          const targetZ = 14 - scrollProgress * 5.2;
          const targetY = 0.3 + scrollProgress * 0.8;

          // Camera parallax: subtle 1-2.5% max displacement
          camera.position.x = mouse.x * 0.55;
          camera.position.y = targetY + mouse.y * 0.35;
          camera.position.z += (targetZ - camera.position.z) * 0.08;

          // Gentle camera tilt looking slightly up as we enter Kailash
          camera.rotation.x = mouse.y * 0.015 + scrollProgress * 0.05;
          camera.rotation.y = -mouse.x * 0.025;
        }

        // 2. Lord Shiva Meditative Breathing Scale
        if (heroPlane) {
          const breath = 1.0 + Math.sin(time * 0.7) * 0.012;
          heroPlane.scale.set(breath, breath, 1);
          // Parallax depth offset
          heroPlane.position.x = mouse.x * -0.15;
          heroPlane.position.y = 0.1 + mouse.y * -0.1;
        }

        // 3. Sacred Om Ethereal Pulse
        if (omMesh) {
          const pulse = 0.3 + (Math.sin(time * 0.9) * 0.5 + 0.5) * 0.35;
          omMat.opacity = pulse;
          omMesh.position.y = 3.2 + Math.sin(time * 0.4) * 0.08;
        }

        // 4. Trishul 3D Levitation, Idle Rotation & Proximity Reaction
        if (trishul) {
          // Check proximity to cursor
          const isNear = mouse.x > 0.3 && mouse.y > -0.4 && mouse.y < 0.6;
          const rotSpeed = isNear ? 0.9 : 0.3;

          trishul.rotation.y += delta * rotSpeed;
          trishul.position.y = 0.1 + Math.sin(time * 0.8) * 0.08;
          // React to mouse
          trishul.position.x = 3.2 + mouse.x * 0.15;
          trishul.rotation.z = -0.08 + Math.sin(time * 0.5) * 0.04;
        }

        // 5. Damaru 3D Gentle Natural Rocking
        if (damaru) {
          damaru.position.y = -1.1 + Math.sin(time * 0.9 + 1) * 0.07;
          damaru.rotation.z = 0.15 + Math.sin(time * 0.6) * 0.12;
          damaru.rotation.y += delta * 0.2;
        }

        // 6. Layered Cloud Drift
        cloudPlanes.forEach((cp, idx) => {
          cp.mesh.position.x += cp.speed;
          // Loop around smoothly
          if (cp.mesh.position.x > 18) cp.mesh.position.x = -18;
          if (cp.mesh.position.x < -18) cp.mesh.position.x = 18;
          // React slightly to mouse parallax with layer depth
          cp.mesh.position.y = (-0.6 - idx * 1.2) + mouse.y * (0.15 * (idx + 1));
        });

        // 7. Subtle Stardust Motes Upward Drift
        if (moteGeo) {
          const pos = moteGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < moteCount; i++) {
            pos[i * 3 + 1] += moteVel[i * 3 + 1];
            pos[i * 3] += Math.sin(time * 0.3 + i) * 0.002;
            if (pos[i * 3 + 1] > 6) {
              pos[i * 3 + 1] = -4;
              pos[i * 3] = (Math.random() - 0.5) * 16;
            }
          }
          moteGeo.attributes.position.needsUpdate = true;
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
          if (container && renderer.domElement.parentNode === container) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
        }

        starGeo.dispose();
        starMat.dispose();
        moteGeo.dispose();
        moteMat.dispose();
        heroPlaneGeo.dispose();
        heroPlaneMat.dispose();
        omGeo.dispose();
        omMat.dispose();
        cloudGeo1.dispose();
        cloudMat1.dispose();
        cloudGeo2.dispose();
        cloudMat2.dispose();
        cloudGeo3.dispose();
        cloudMat3.dispose();
        moteTex.dispose();
        omTex.dispose();
        cloudTex.dispose();
      };
    } catch {
      setHasError(true);
    }
  }, [scrollProgress, onTrishulProximity]);

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-1"
      aria-hidden="true"
    />
  );
};
