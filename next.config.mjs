/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lvylckenosoiinbragac.supabase.co',
        port: '', // Port can be left empty if not needed
        pathname: '/storage/v1/object/public/**', // This allows any path under the public bucket
      },
    ],
  },
};

export default nextConfig;
