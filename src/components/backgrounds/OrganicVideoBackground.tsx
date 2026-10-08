import { useEffect, useRef, useState } from 'react';

/** Static local path so the video ships with the repo and works on any host. */
const HUB_VIDEO_URL = '/heroes/soberania-organica-hub.mp4';

interface Props {
  /** Video URL; defaults to the Soberania Organica hub video. */
  src?: string;
  /** Fixed to the viewport (whole page) or absolute inside its parent section. */
  position?: 'fixed' | 'absolute';
}

/** Unfiltered video background with reduced-motion support. */
export default function OrganicVideoBackground({ src = HUB_VIDEO_URL, position = 'fixed' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    video.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <div
      className={`${position === 'fixed' ? 'fixed z-0' : 'absolute'} inset-0 overflow-hidden pointer-events-none`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        key={src}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload={reduceMotion ? 'metadata' : 'auto'}
        disablePictureInPicture
      />
    </div>
  );
}
