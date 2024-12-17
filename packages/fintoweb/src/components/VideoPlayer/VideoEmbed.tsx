import React, { useEffect, useRef } from "react";

interface VideoEmbedProps {
  otp: string;
  playbackInfo: string;
  onVideoEnd: () => void;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ otp, playbackInfo, onVideoEnd }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    // Listener for postMessage events
    const messageListener = (event: MessageEvent) => {
      // Ensure message is from VdoCipher's domain
      if (event.origin !== "https://player.vdocipher.com") return;

      // Check if the event indicates the video has ended
      if (event.data === "videoEnded") {
        onVideoEnd(); // Trigger the callback passed from parent
      }
    };

    // Add the event listener for messages
    window.addEventListener("message", messageListener);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, [onVideoEnd]);

  return (
    <iframe
      ref={iframeRef}
      src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
      style={{ border: 0, width: "100%", height: "500px" }}
      allow="encrypted-media"
    ></iframe>
  );
};

export default VideoEmbed;
