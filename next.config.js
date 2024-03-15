/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
})
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    output: "standalone",
    ...withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
    })
};

module.exports = nextConfig;
