import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Theatre.js editable objects can't survive StrictMode's double-mount
  // (it double-registers the Camera/Drone and detaches the default camera).
  reactStrictMode: false,
};

export default nextConfig;
