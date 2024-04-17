import {
  useEffect,
  useRef,
} from 'react';

export function VideoPlayer() {
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    try {
      if (cloudinaryRef.current) return;
      cloudinaryRef.current = window.cloudinary;
      cloudinaryRef.current.videoPlayer(videoRef.current, {
        cloud_name: "dychxgsiy",
        loop: true,
        fluid: true,
        controls: true,
        autoPlay: true,
      });
    } catch (err: unknown) {
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
