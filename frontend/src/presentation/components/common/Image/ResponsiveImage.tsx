import React, { useState } from 'react';
import './ResponsiveImage.css';

export interface ResponsiveImageProps {
  src?: string;
  alt: string;
  aspectRatio?: string; // e.g. '16/9', '4/3', '1/1'
  className?: string;
  objectFit?: 'cover' | 'contain';
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  objectFit = 'cover',
  fallbackSrc = DEFAULT_FALLBACK,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const finalSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div
      className={`responsive-img-wrapper ${className}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && <div className="responsive-img-placeholder" />}
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        className={`responsive-img ${isLoaded ? 'loaded' : ''}`}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
      />
    </div>
  );
};
