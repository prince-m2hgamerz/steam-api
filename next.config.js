// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["steamcdn-a.akamaihd.net", "cdn.cloudflare.steamstatic.com"]
  }
};
module.exports = nextConfig;
