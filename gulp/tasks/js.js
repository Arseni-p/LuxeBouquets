import webpack from "webpack-stream";
import { catchErrors } from "./errors.js";

export const js = () => {
  return app.gulp.src(app.path.src.js, {     sourcemaps: app.isDev })
  .pipe(catchErrors("JS"))
  .pipe(webpack({
    mode: app.isBuild ? 'production' : 'development',
    output: {
      filename: 'index.min.js'
    }
  }))
  .pipe(app.gulp.dest(app.path.build.js))
  .pipe(app.plugins.browserSync.stream())
}