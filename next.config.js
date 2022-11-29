/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }
//
// module.exports = nextConfig

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  // any other next.js settings here
});