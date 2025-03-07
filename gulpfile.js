//main module
import gulp from "gulp";

//import of paths
import { path } from "./gulp/config/path.js";

//import tasks & plugins
const gulpTasks = "./gulp/tasks/";
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { plugins } from "./gulp/config/plugins.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";

//set global vars
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const runServ = gulp.parallel(watcher, server);

//create scenarios
const dev = gulp.series(reset, mainTasks, runServ);
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(build, zip);

//implementation default scenario
gulp.task('default', dev);

//export scenarios
export { svgSprite };
export { dev };
export { build };
export { deployZip };
export { fonts }