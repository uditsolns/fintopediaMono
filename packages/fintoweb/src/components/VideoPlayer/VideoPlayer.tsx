"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button, Progress } from "reactstrap";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaExpand,
  FaCompress,
  FaCog,
} from "react-icons/fa";

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: "450px" }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute top-0 left-0 w-full h-full object-contain"
        onClick={togglePlay}
      />
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full mb-2"
            style={{
              background: `linear-gradient(to right, white ${
                (currentTime / duration) * 100
              }%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`,
              WebkitAppearance: "none",
              height: "4px",
            }}
          />
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <Button
                color="link"
                className="p-0 text-white"
                onClick={togglePlay}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </Button>
              <div className="flex items-center space-x-2">
                <FaVolumeUp size={20} className="text-white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24"
                  style={{
                    background: `linear-gradient(to right, white ${
                      volume * 100
                    }%, rgba(255,255,255,0.3) ${volume * 100}%)`,
                    WebkitAppearance: "none",
                    height: "4px",
                  }}
                />
              </div>
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button color="link" className="p-0 text-white">
                <FaCog size={20} />
              </Button>
              <Button
                color="link"
                className="p-0 text-white"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <FaCompress size={20} />
                ) : (
                  <FaExpand size={20} />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
