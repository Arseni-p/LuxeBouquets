'use strict';
import * as fn from "./functions/functions.js";
import {shopProducts} from "./modules/modules.js"

let count = 0;

window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.reviews__list--wrapper')) fn.createReviewsDrops();

    if (document.querySelector(".shop__sublist")) fn.getShopProducts(shopProducts);

    if (document.querySelector('.shop-item__wrapper')) fn.getShopItemContent(shopProducts);
  }
);

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn');
  if (
    btn && btn.classList.contains('popup__enable') || 
    event.target.classList.contains('info__wrapper') ||
    btn && btn.classList.contains('info__btn--disable') ||
    event.target.classList.contains('menu__cart') ||
    btn && btn.classList.contains('signin__submit')) {console.log('asd'); fn.getInfo();}

  if (
    event.target.closest('.mobile-menu__open') ||
    event.target.closest('.mobile-menu__contacts')) fn.getMobileMenu(event);

  if (
    event.target.classList.contains('reviews__btn-arrow') ||
    event.target.classList.contains('reviews__dots--item')
    ) {
      count = fn.getCount(event, count);
      fn.reviewsSlide(event, count);
    }
  
  if (
    event.target.closest('.shop__item') ||
    event.target.closest('.shop__item--footer') && document.querySelector('.shop__list')) fn.getShopContent(event);
  
  if (event.target.closest('.shop-item__btn')) fn.getQuantityCount(event);

  if (event.target.closest('.shop-item__btn-arrow')) {
    count = fn.getProductsItemCount(event, count);
    fn.scrollOtherProducts(event, count);
  }

  if (event.target.closest('.plan-item__select')) fn.getPlanItem(event);

  if (event.target.closest('.plan-item__count')) fn.getDeliveryCount(event);

  if (event.target.closest('.faq__item')) fn.getActiveFaqItem(event);

  if (event.target.closest('.signin__popup') ||
  event.target.closest('.signin__wrapper--active')) fn.getSigninPopup(event);
})

window.addEventListener('resize', () => {
  if (document.querySelector('.reviews__list--wrapper') || document.querySelector('.shop-item__sublist--wrapper')) {
    count = 0;
    fn.resizeWindow(count);
  }
})

window.addEventListener("hashchange", function() {
  if (document.querySelector('.shop-item__sublist--content')) {
    fn.getShopItemContent(shopProducts);
  }
});