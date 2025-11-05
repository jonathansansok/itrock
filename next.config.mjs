/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      webpackBuildWorker: true, // evita conflictos con Storybook y Webpack
    },
  };
  
  export default nextConfig;