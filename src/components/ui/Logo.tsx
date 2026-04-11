import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 80, md: 130, lg: 180 };

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const w = sizeMap[size];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="מכללת גלגלים"
      width={w}
      height={w}
      className={`object-contain ${className}`}
    />
  );
}
