module.exports = [
  {
    name: "Main Bundle",
    path: "dist/assets/*.js",
    limit: "100 KB",
    gzip: true,
  },
  {
    name: "CSS Bundle",
    path: "dist/assets/*.css",
    limit: "10 KB",
    gzip: true,
  },
];
