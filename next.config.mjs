/** @type {import('next').NextConfig} */
const oldAreas = {
  "single-area-served": "laveen-village",
  "single-area-served-2": "gilbert",
  "single-area-served-3": "chandler",
  "single-area-served-4": "scottsdale",
  "single-area-served-5": "phoenix",
};
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      ...Object.entries(oldAreas).map(([from, to]) => ({ source: `/service-areas/${from}`, destination: `/service-areas/${to}`, permanent: true })),
      { source: "/galleries/:slug*", destination: "/showcases", permanent: true },
      { source: "/blog-:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};
export default nextConfig;
