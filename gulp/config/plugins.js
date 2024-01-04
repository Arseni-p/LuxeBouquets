import replace from "gulp-replace"; //replace symbols
import plumber from "gulp-plumber"; //error handling
import notify from "gulp-notify"; //notes
import browserSync from "browser-sync"; //local server
import newer from "gulp-newer"; //check is there new images
import ifPlugin from "gulp-if"

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  if: ifPlugin
}