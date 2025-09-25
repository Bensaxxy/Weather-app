import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = withPWA({
  dest: "public", // service worker will be output to /public
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: true,
});

export default nextConfig;
