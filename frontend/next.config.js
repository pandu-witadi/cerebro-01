/** @type {import('next').NextConfig} */
const nextConfig = {
    "output": "export",
    reactStrictMode: false,
};

// Set assetPrefix only in production/export mode
if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    nextConfig.assetPrefix = '/static';
}

module.exports = nextConfig;
