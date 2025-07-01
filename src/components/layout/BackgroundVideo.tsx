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
      <source src="https://firebasestorage.googleapis.com/v0/b/vsd-network.appspot.com/o/files%2Fvideos%2FAdobeStock_552485501_Video_HD_Preview.mov?alt=media&token=c59740fe-471a-45c3-a5c3-6e3e78a63cfc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
