import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import { catchErrors } from "./errors.js";

const fontFamily = (fontName, fontFileName, fontWeight) => {
  let fontStyle = fontFileName.toLowerCase().includes('italic') ? 'italic' : 'normal';
  return `
@font-face {
  font-family: ${fontName};
  font-display: swap;
  src: url("../fonts/${fontFileName}.woff") format("woff");
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
}\r\n`
}

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(catchErrors("FONTS"))
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(catchErrors("FONTS"))
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.gulp.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/common/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin' || fontWeight.toLowerCase() === 'thinitalic') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight' || fontWeight.toLowerCase() === 'extralightitalic') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light' || fontWeight.toLowerCase() === 'lightitalic') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium' || fontWeight.toLowerCase() === 'mediumitalic') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold' || fontWeight.toLowerCase() === 'semibolditalic') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold' || fontWeight.toLowerCase() === 'bolditalic') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy' || fontWeight.toLowerCase() === 'extrabolditalic' || fontWeight.toLowerCase() === 'heaveitalic') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black' || fontWeight.toLowerCase() === 'blackitalic') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, fontFamily(fontName, fontFileName, fontWeight), cb)
              newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(`File <fonts.scss> just exists. Please delete it if you need to update fonts`)
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() { };
}