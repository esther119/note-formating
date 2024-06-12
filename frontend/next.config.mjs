/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "tmpfiles.org"],
  },
  env: {
    customKey: process.env.NEXT_BACKNEND_API_URL,
  },
};

export default nextConfig;
