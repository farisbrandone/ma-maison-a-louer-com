/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
             port: '',
            pathname: '/**', 
          },
           {
            protocol: 'https',
            hostname: 'tkvtphatpjsobxkwbqmd.supabase.co',
             port: '',
            pathname: '/**', 
          }, 
         
        ],
      },
}

module.exports = nextConfig
