'use strict';
import * as fn from "./functions/functions.js"

let reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
// if (!reviewsListWrapper) reviewsListWrapper = fn.getReviewsListWrapper();

document.addEventListener('DOMContentLoaded', () => {
  fn.createReviewsDrops(reviewsListWrapper);
});

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn');
  console.log(btn, event.target.classList);
  if (
    btn && btn.classList.contains('popup__enable') || 
    event.target.classList.contains('info__wrapper') ||
    btn && btn.classList.contains('info__btn--disable')) fn.getInfo(reviewsListWrapper);
})

reviewsListWrapper.addEventListener('click', (event) => {
  let arrowBtn = 'arrowLeft';
  const reviewsBtnLeft = document.querySelector('.arrow-left');
  const reviewsBtnRight = document.querySelector('.arrow-right');
  if (event.target === reviewsBtnRight) arrowBtn = 'arrowRight';
  if (event.target === reviewsBtnLeft || event.target === reviewsBtnRight) fn.reviewsSlide(reviewsListWrapper, arrowBtn);
  if (event.target.classList.contains('reviews__dots--item')) fn.getReviewByDot(reviewsListWrapper, event);
})

window.addEventListener('resize', () => {
  fn.resizeWindow(reviewsListWrapper);
})