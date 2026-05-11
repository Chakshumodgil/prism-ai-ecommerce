import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep your existing compiler option */
  reactCompiler: true,

  /* TASK 26: Add the image optimization settings */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Allows Unsplash images
        port: '',
        pathname: '/**', // Allows all folders/paths on their site
      },
    ],
  },
};

export default nextConfig;