"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

const VideoPlayer: React.FC = () => {
  const TIME_LIMIT = 10;

  const [isPlaying, setIsPlaying] = useState(false);
  const [showAppButton, setShowAppButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current && !showAppButton) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!showAppButton) {
      const volume = parseFloat(event.target.value);
      setVolume(volume);
      if (videoRef.current) {
        videoRef.current.volume = volume;
      }
    }
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!showAppButton) {
      const newProgress = Math.min(parseFloat(event.target.value), TIME_LIMIT * 10);
      setProgress(newProgress);
      if (videoRef.current) {
        if (newProgress >= TIME_LIMIT * 10) {
          setShowAppButton(true);
          setIsPlaying(false);
          videoRef.current.pause();
        } else {
          videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
        }
      }
    }
  };

  const updateProgress = () => {
    if (videoRef.current && !showAppButton) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      if (currentTime >= TIME_LIMIT) {
        setShowAppButton(true);
        setIsPlaying(false);
        videoRef.current.pause();
      }

      setProgress((currentTime / duration) * 100);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setTimeout(() => {
        setShowAppButton(true);
        setIsPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, TIME_LIMIT * 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center rounded-lg shadow-md w-full mx-auto relative">
      <div className="relative w-full aspect-video bg-black" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <video
          ref={videoRef}
          className="w-full h-full rounded-lg"
          src="https://prod.cdn.publicnext.com/s3fs-public/videos/original/1732874237.mp4"
          onTimeUpdate={updateProgress}
          autoPlay
          muted
        ></video>

        {showAppButton && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center">
            <p className="text-white text-lg mb-4">Get our app for the best experience!</p>
            <a href="#" className="bg-[#19b99a] font-semibold text-white px-6 py-3 rounded-lg">
              Download Mobile App
            </a>
          </div>
        )}

        {(isHovered || showAppButton) && (
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex mt-auto gap-2 items-center">
              {isPlaying ? <FaPause className="text-white" onClick={handlePlayPause} /> : <FaPlay className="text-white" onClick={handlePlayPause} />}

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className={`w-full appearance-none rounded-lg h-1 ${showAppButton ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300"}`}
                style={{
                  background: `linear-gradient(to right, #19b99a ${progress}%, #ccc ${progress}%)`
                }}
                disabled={showAppButton}
              />
            </div>
            <div className="flex items-center mt-2 ml-auto">
              <FaVolumeUp className="text-white mr-2" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={`w-[100px] appearance-none rounded-lg h-1 ${showAppButton ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300"}`}
                disabled={showAppButton}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
