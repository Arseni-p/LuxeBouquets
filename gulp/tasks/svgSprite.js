import { catchErrors } from "./errors.js";
import gulpSprite from "gulp-svg-sprite";

export const svgSprite = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(catchErrors("SVG"))
    .pipe(gulpSprite({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          example: true,
        }
      },
    }))
    .pipe(app.gulp.dest(`${app.path.src.svgImages}`))
}