/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lablense.ir', // دامنه تصاویر خود را وارد کنید
        pathname: '/**', // یا مسیر دقیق‌تر
      },
    ],
  },
};

export default nextConfig;
