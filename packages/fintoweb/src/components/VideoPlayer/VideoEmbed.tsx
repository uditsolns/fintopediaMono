import React from "react";

interface VideoEmbedProps {
  otp: string;
  playbackInfo: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ otp, playbackInfo }) => {
  return (
    <iframe
      src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
      style={{ border: 0, width: "100%", height: "500px" }}
      allow="encrypted-media"
    ></iframe> 
  ); 
};

export default VideoEmbed;
