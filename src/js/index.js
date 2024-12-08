'use strict';
import * as fn from "./functions/functions.js";
import {shopProducts} from "./modules/modules.js"

let count = 0;

const btnClasses = [
  'popup__enable',
  'info__btn--disable',
  'btn__inquery'
];

const eventTargetClasses = [
  'info__wrapper',
  'menu__cart',
  'sublist__wrapper'
];

window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.reviews__list--wrapper')) fn.createReviewsDrops();

    if (document.querySelector(".shop__sublist")) fn.getShopProducts(shopProducts);

    if (document.querySelector('.shop-item__wrapper')) fn.getShopItemContent(shopProducts);

    if (document.getElementById('tel-input')) fn.getInputPlus();
  }
);

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn');
  if (
    (btn && btnClasses.some(item => btn.classList.contains(item))) ||
    (eventTargetClasses.some(item => event.target.closest(`.${item}`)))
  ) fn.getInfo(event);

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

document.addEventListener('submit', (event) => {
  const contactsForm = event.target.closest('.contacts__form');
  if (contactsForm) {
    fn.phoneValidation(event, contactsForm);
  } else {
    fn.getInfo(event);
  }
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