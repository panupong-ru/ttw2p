import type { NextConfig } from 'next';

import '@/environment/index';

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' *.jsdelivr.net;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: *;
    media-src 'self';
    font-src 'self' blob: data: https://fonts.scalar.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    ${process.env.MODE !== 'production' ? '' : 'upgrade-insecure-requests;'}
`
      .replace(/\s{2,}/g, ' ')
      .trim(),
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'sync-xhr=self',
      'usb=()',
      'web-share=()',
      'xr-spatial-tracking=()',
    ].join(', '),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
];
const nextConfig: NextConfig = (() => {
  return {
    output: 'standalone',
    images: {
      unoptimized: true,
      domains: ['localhost'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256],
      formats: ['image/webp'],
      minimumCacheTTL: 60,
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
      ];
    },
    poweredByHeader: false,
    compress: true,
    reactStrictMode: false,
  };
})();

export default nextConfig;
