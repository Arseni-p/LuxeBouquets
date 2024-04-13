//get name of the folder
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}`,
    files: `${buildFolder}/files/`,
    fonts: `${buildFolder}/fonts/`,
    images: `${buildFolder}/images/`,
    buildFolder: buildFolder
  },
  src: {
    js: `${srcFolder}/js/index.js`,
    images: `${srcFolder}/images/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
    svg: `${srcFolder}/images/**/*.{svg}`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    svgImages: `${srcFolder}/images`
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`
  },
  clean: buildFolder,
  rootFolder: rootFolder,
  srcFolder: srcFolder,
  buildFolder: buildFolder
}