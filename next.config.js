/** @type {import('next').NextConfig} */

/* const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
*/

const withTM = require('next-transpile-modules')([
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/core",
  "@fullcalendar/list"
]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});