"use client";

export function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10"
    >
      <source src="https://videos.pexels.com/video-files/4431790/4431790-uhd_2560_1440_30fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
