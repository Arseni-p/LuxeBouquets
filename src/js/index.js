'use strict';
import * as fn from "./functions/functions.js";

let count = 0;

document.addEventListener('DOMContentLoaded', (event) => {
  let reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
  if (reviewsListWrapper) fn.createReviewsDrops(reviewsListWrapper);

  if (document.querySelector(".shop__sublist")) {
    window.location.hash = '';
    fn.getShopProducts();
  }
});

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn');
  const menuBtn = event.target.closest('.mobile-menu__open');
  if (
    btn && btn.classList.contains('popup__enable') || 
    event.target.classList.contains('info__wrapper') ||
    btn && btn.classList.contains('info__btn--disable')) fn.getInfo(reviewsListWrapper);

  if (menuBtn) fn.getMobileMenu(menuBtn);

  if (
    event.target.classList.contains('arrow-right') ||
    event.target.classList.contains('arrow-left') ||
    event.target.classList.contains('reviews__dots--item')
    ) {
    let reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
    count = fn.getReviewsCount(reviewsListWrapper, event, count);
    fn.reviewsSlide(reviewsListWrapper, event, count);
  }
  
  if (event.target.closest('.shop__item')) fn.getShopContent(event);
})

// reviewsListWrapper.addEventListener('click', (event) => {
  
// })

window.addEventListener('resize', () => {
  count = 0;
  let reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
  if (reviewsListWrapper) fn.resizeWindow(reviewsListWrapper, count);
})