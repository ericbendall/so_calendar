var vitreumTasks = require("vitreum/tasks");
var gulp = require("gulp");
var seed = require('./server/seed.js');


var gulp = vitreumTasks(gulp, {
  entryPoints: ["./client/so_calendar"],

  DEV: true,

  buildPath: "./build/",
  pageTemplate: "./client/template.dot",

  projectModules: ["./shared/so_calendar"],

  additionalRequirePaths : ['./shared'],

  assetExts: ["*.svg", "*.png", "*.jpg", "*.pdf", "*.eot", "*.otf", "*.woff", "*.woff2", "*.ico", "*.ttf"],

  serverWatchPaths: ["server"],
  serverScript: "server.js",

  libs: [
    "react",
    "react-dom",
    "hammerjs",
    "isomorphic-fetch",
    "lodash",
    "moment",
    "classnames",
    "pico-flux",
    "pico-router",
  ],
  clientLibs: [

  ],
});

gulp.task('seed', function(){
  return seed();
});
