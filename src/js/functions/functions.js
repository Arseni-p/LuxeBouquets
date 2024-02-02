'use strict';

import {shopProducts} from "../modules/modules.js"

const getReviewsVars = (reviewsListWrapper) => {
  const reviewsListContent = reviewsListWrapper.querySelector('.reviews__list--content');
  const reviewsList = reviewsListContent.querySelector('.reviews__list');
  const reviewsItems = reviewsListWrapper.querySelectorAll('.reviews__item');
  const reviewsListContentWidth = reviewsListContent.offsetWidth;
  const reviewsDotsList = reviewsListWrapper.querySelector('.reviews__dots--list');
  const reviewsDotsItems = reviewsListWrapper.querySelectorAll('.reviews__dots--item');
  const activeDot = reviewsListWrapper.querySelector('.dots__active');
  let posX = reviewsList.offsetLeft;
  return {
    reviewsList: reviewsList,
    reviewsItems: reviewsItems,
    reviewsListContentWidth: reviewsListContentWidth,
    reviewsDotsList: reviewsDotsList,
    reviewsDotsItems: reviewsDotsItems,
    activeDot: activeDot,
    posX: posX,
  }
}

export const getReviewsListWrapper = () => document.querySelector('.reviews__list--wrapper');

export const createReviewsDrops = (reviewsListWrapper) => {
  const { reviewsDotsList, reviewsItems } = getReviewsVars(reviewsListWrapper);
  const reviewsCount = reviewsItems.length;
  for (let i = 0; i < reviewsCount; i++) {
    const dropsItem = document.createElement('li');
    dropsItem.className = 'reviews__dots--item';
    if (i === 0) dropsItem.className = 'reviews__dots--item dots__active';
    reviewsDotsList.append(dropsItem);
  }
}

const toggleActiveDot = (reviewsListWrapper, count) => {
  const { reviewsDotsItems, activeDot } = getReviewsVars(reviewsListWrapper);
  activeDot.classList.toggle('dots__active');
  reviewsDotsItems[count].classList.add('dots__active');
}

export const getReviewByDot = (reviewsListWrapper, event, count) => {
  let { reviewsDotsItems } = getReviewsVars(reviewsListWrapper);
  reviewsDotsItems.forEach((element, index) => {
    event.target === element ? count = index : count
  });
  
  return count;
}

export const getReviewsCount = (reviewsListWrapper, event, count) => {
  const reviewsItems = reviewsListWrapper.querySelectorAll('.reviews__item');
  if (event.target.classList.contains('arrow-right')) count++;
  if (event.target.classList.contains('arrow-left')) count--;
  if (event.target.classList.contains('reviews__dots--item')) count = getReviewByDot(reviewsListWrapper, event, count);
  if (count >= reviewsItems.length) count = 0;
  if (count < 0) count = reviewsItems.length - 1;
  toggleActiveDot(reviewsListWrapper, count);

  return count;
}

export const reviewsSlide = (reviewsListWrapper, event, count) => {
  let { reviewsList, reviewsListContentWidth, posX } = getReviewsVars(reviewsListWrapper);
  
  posX = count * reviewsListContentWidth;
  if (
    event.target.classList.contains('arrow-left') || 
    event.target.classList.contains('arrow-right') ||
    event.target.classList.contains('dots__active')
    ) posX *=-1;
  reviewsList.style.transform = `translateX(${posX}px)`;
  toggleActiveDot(reviewsListWrapper, count);
}

export const resizeWindow = (reviewsListWrapper, count) => {
  let { reviewsList, posX } = getReviewsVars(reviewsListWrapper);
  posX = 0;
  reviewsList.style.transform = `translateX(${posX}px)`;
  toggleActiveDot(reviewsListWrapper, count);
}

export const getInfo = () => {
  const infoPopup = document.querySelector('.info__wrapper');
  infoPopup.classList.toggle('info__wrapper--disable');
}

export const getMobileMenu = (menuBtn) => {
  
  const mobileMenu = document.querySelector('.mobile-menu__list');
  // console.log(menuBtn);
  mobileMenu.classList.toggle('opened');
  menuBtn.classList.toggle('close-btn');
  // mobileMenu.classList.contains('opened') ? mobileMenu.style.height = '500px' : mobileMenu.style.height = '0px';
}


const createDomElement = (tagName, className, parentElem, contentElem) => {
  const element = document.createElement(tagName);
  element.setAttribute('class', className);
  parentElem.append(element);
  if (contentElem) element.innerHTML = contentElem;

  return element;
}

export const getShopProducts = () => {
  const shopSublist = document.querySelector('.shop__sublist');
  let shopCategoryName = window.location.hash.substring(1) ? window.location.hash.substring(1) : "fresh-flowers";
  console.log(shopCategoryName);
  window.location.hash = shopCategoryName;
  let shopCategoryList = shopProducts[shopCategoryName];
  
  if (!shopCategoryList) {
    shopCategoryList = shopProducts["fresh-flowers"];
    window.location.hash = "fresh-flowers";
  }

  shopCategoryList.forEach((item) => {
    const itemTitle = item.title;
    const itemPrice = `Price: ${item.price}$`;
    const itemLink = `./shop-item.html#${item.link}`;
    const shopItem = createDomElement('li', 'shop__subitem', shopSublist);
    const shopItemLink = createDomElement('a', 'shop__subitem--link', shopItem, itemTitle);
    shopItemLink.setAttribute('href', itemLink)
    shopItemLink.style.backgroundImage = `url('../images/${item.image}')`;
    const shopItemInfo = createDomElement('div', 'shop__subitem--info', shopItem);
    createDomElement('h5', 'shop__subtitle', shopItemInfo, itemTitle);
    createDomElement('p', 'shop__price', shopItemInfo, itemPrice);
  })
}


export const getShopContent = (event) => {
  const shopSublist = document.querySelector('.shop__sublist');
  const shopItemActive = document.querySelector('.shop__item--active');
  const shopItem = event.target.closest('.shop__item');

  if (shopItem === shopItemActive) {
    return
  } else {
    shopItemActive.classList.toggle('shop__item--active');
    shopItem.classList.toggle('shop__item--active');
  }
  window.location.hash = shopItem.dataset.shopitem;
  shopSublist.innerHTML = '';
  getShopProducts();
}