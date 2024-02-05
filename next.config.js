/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE: "https://ihouse-backend-xp3zk.ondigitalocean.app",
  },
  images: {
    domains: ["upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
