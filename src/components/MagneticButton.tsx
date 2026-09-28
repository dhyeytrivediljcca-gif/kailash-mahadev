import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // max movement in px (default 4-5px, subtle)
  innerStrength?: number; // subtle inner element parallax (default 2px)
  cursorLabel?: string;
}

/**
 * MagneticButton: Premium creative-development micro-interaction.
 * Moves subtly towards cursor by 3-5px on desktop hover, with smooth
 * cubic-bezier return and scale(0.97) on press.
 * Disabled on touch and prefers-reduced-motion.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 5,
  innerStrength = 2,
  cursorLabel,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [innerOffset, setInnerOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const factorX = distanceX / (rect.width / 2);
    const factorY = distanceY / (rect.height / 2);

    const moveX = Math.max(-strength, Math.min(strength, factorX * strength));
    const moveY = Math.max(-strength, Math.min(strength, factorY * strength));

    setOffset({ x: moveX, y: moveY });
    setInnerOffset({
      x: Math.max(-innerStrength, Math.min(innerStrength, factorX * innerStrength)),
      y: Math.max(-innerStrength, Math.min(innerStrength, factorY * innerStrength)),
    });
  }, [strength, innerStrength, isTouch]);

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
    setInnerOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorLabel}
      className={`active:scale-[0.97] transition-transform duration-200 ${className}`}
      style={{
        transform: !isTouch
          ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
          : undefined,
        transition: isHovered
          ? 'transform 0.12s ease-out'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
      {...props}
    >
      <span
        className="inline-flex items-center gap-2 will-change-transform"
        style={{
          transform: !isTouch
            ? `translate3d(${innerOffset.x}px, ${innerOffset.y}px, 0)`
            : undefined,
          transition: isHovered
            ? 'transform 0.14s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </span>
    </button>
  );
};
