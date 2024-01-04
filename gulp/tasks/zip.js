import { catchErrors } from "./errors.js";
import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`);

  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(catchErrors("ZIP"))
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'))
}