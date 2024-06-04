'use strict';
import * as fn from "./functions/functions.js";
import {shopProducts} from "./modules/modules.js"

let count = 0;

window.addEventListener('DOMContentLoaded', () => {
  
    if (document.querySelector('.reviews__list--wrapper')) fn.createReviewsDrops();

    if (document.querySelector(".shop__sublist")) fn.getShopProducts(shopProducts);

    if (document.querySelector('.shop-item__wrapper')) fn.getShopItemContent(shopProducts);

    // if (document.querySelector('.additional__wrapper')) fn.getAdditionalItems();
    // if (document.querySelector('.shop-item__sublist--content')) {
    //   const subListContent = document.querySelector('.shop-item__sublist--content');
    //   const subList = document.querySelector('.shop-item__sublist');
    //   const subItem = document.querySelector('.shop-item__subitem');
    //   subListContent.style.height = `${subList.offsetHeight}px`;
    // }
  }
);

// console.log(document.querySelector('.shop-item__text').offsetHeight, 'out')

// window.addEventListener('load', () => {
//   console.log(document.querySelector('.shop-item__text').offsetHeight, 'in');
//   console.log(document.querySelector('.shop-item__sublist').offsetHeight, 'in2');
  
// })

document.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn');
  const menuBtn = event.target.closest('.mobile-menu__open');
  if (
    btn && btn.classList.contains('popup__enable') || 
    event.target.classList.contains('info__wrapper') ||
    btn && btn.classList.contains('info__btn--disable')) fn.getInfo();

  if (menuBtn) fn.getMobileMenu(menuBtn);

  if (
    event.target.classList.contains('reviews__btn-arrow') ||
    event.target.classList.contains('reviews__dots--item')
    ) {
      // const reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
      count = fn.getCount(event, count);
      fn.reviewsSlide(event, count);
    }
  
  if (event.target.closest('.shop__item')) fn.getShopContent(event);
  
  if (event.target.closest('.shop-item__btn')) fn.getQuantityCount(event);

  if (event.target.closest('.shop-item__btn-arrow')) {
    count = fn.getProductsItemCount(event, count);
    fn.scrollOtherProducts(event, count);
  }

  if (event.target.closest('.plan-item__select')) fn.getPlanItem(event);

  if (event.target.closest('.plan-item__count')) fn.getDeliveryCount(event);

  if (event.target.closest('.faq__item')) fn.getActiveFaqItem(event);
})

window.addEventListener('resize', () => {
  // count = 0;
  // const reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
  // if (reviewsListWrapper) fn.resizeWindow(reviewsListWrapper, count);
  if (document.querySelector('.reviews__list--wrapper') || document.querySelector('.shop-item__sublist--wrapper')) {
    count = 0;
    fn.resizeWindow(count);
  }
})

window.addEventListener("hashchange", function() {
  // Код, который нужно выполнить при изменении хэша в URL
  // console.log("Хэш в URL был изменен:", location.hash);
  // location.reload();
  if (document.querySelector('.shop-item__sublist--content')) {
    fn.getShopItemContent(shopProducts);
    // const subListContent = document.querySelector('.shop-item__sublist--content');
    // const subList = document.querySelector('.shop-item__sublist');
    // const subItem = document.querySelector('.shop-item__subitem');
    // subListContent.style.height = `${subList.offsetHeight}px`;
  }
});