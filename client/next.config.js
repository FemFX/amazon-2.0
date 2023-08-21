/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.AP_URL,
  },
  images: {
    domains: [
      "loremflickr.com",
      "cloudflare-ipfs.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
