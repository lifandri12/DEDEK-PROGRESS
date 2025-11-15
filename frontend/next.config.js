/** @type {import('next').NextConfig} */

// ambil domain supabase (tanpa https://)
const supabaseDomain = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', '')
  : null;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    // hapus console.log saat production build
    removeConsole: process.env.NODE_ENV === 'production',
  },

  images: {
    domains: [
      'lh3.googleusercontent.com',   // gambar dari google login
      ...[supabaseDomain].filter(Boolean) // gambar dari supabase storage
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
