/* eslint-disable */

import {
  useEffect,
  useRef,
} from 'react';

interface CloudinaryRef {
  videoPlayer: (element: HTMLVideoElement, options: any) => void;
}

export function VideoPlayer() {
  const cloudinaryRef = useRef<CloudinaryRef>();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    try {
      if (!cloudinaryRef.current) {
        cloudinaryRef.current = (window as any).cloudinary;
      }
      if (cloudinaryRef.current) {
        cloudinaryRef.current.videoPlayer(videoRef.current!, {
          cloud_name: "dychxgsiy",
          loop: true,
          fluid: true,
          controls: true,
          autoPlay: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <video
      className="w-[100vw] h-[100vh] my-6"
      ref={videoRef}
      id="player"
      data-cld-public-id={`samples/wgfrtdmlfvnn3utcywij`}
      autoPlay
      loop
    />
  );
}
