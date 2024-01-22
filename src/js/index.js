'use strict';
import * as fn from "./functions/functions.js"

let reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
// if (!reviewsListWrapper) reviewsListWrapper = fn.getReviewsListWrapper();

document.addEventListener('DOMContentLoaded', () => {
  fn.createReviewsDrops(reviewsListWrapper);
});

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn');
  const menuBtn = event.target.closest('.mobile-menu__open');
  if (
    btn && btn.classList.contains('popup__enable') || 
    event.target.classList.contains('info__wrapper') ||
    btn && btn.classList.contains('info__btn--disable')) fn.getInfo(reviewsListWrapper);

    if (menuBtn) fn.getMobileMenu();
})

let count = 0;
reviewsListWrapper.addEventListener('click', (event) => {
  count = fn.getReviewsCount(reviewsListWrapper, event, count);
  if (
    event.target.classList.contains('arrow-right') ||
    event.target.classList.contains('arrow-left') ||
    event.target.classList.contains('reviews__dots--item')
    ) {
      fn.reviewsSlide(reviewsListWrapper, event, count);
  }
})

window.addEventListener('resize', () => {
  count = 0;
  fn.resizeWindow(reviewsListWrapper, count);
})