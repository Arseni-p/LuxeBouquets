'use strict';

import { Value } from "sass";
import {shopProducts} from "../modules/modules.js";

const createDomElement = (tagName, className, parentElem, contentElem) => {
  const element = document.createElement(tagName);
  element.setAttribute('class', className);
  parentElem.append(element);
  if (contentElem) element.innerHTML = contentElem;

  return element;
}

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

export const createReviewsDrops = () => {
  const reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
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

export const getCount = (event, count) => {
  if (event.target.classList.contains('arrow-right')) count++;
  if (event.target.classList.contains('arrow-left')) count--;

  if (document.querySelector('.reviews__list--wrapper')) {
    const reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
    const reviewsItems = reviewsListWrapper.querySelectorAll('.reviews__item');
    if (event.target.classList.contains('reviews__dots--item')) count = getReviewByDot(reviewsListWrapper, event, count);
    if (count >= reviewsItems.length) count = 0;
    if (count < 0) count = reviewsItems.length - 1;
    toggleActiveDot(reviewsListWrapper, count);
  }

  return count;
}

export const getProductsItemCount = (event, count) => {
  const subListContent = document.querySelector('.shop-item__sublist--content');
  const subList = document.querySelector('.shop-item__sublist');
  const subListWidth = subList.offsetLeft + subList.offsetWidth;
  const subListContentWidth = subListContent.offsetWidth;

  if (event.target.classList.contains('arrow-left') && count < 0) count++;
  if (event.target.classList.contains('arrow-right') && subListWidth > subListContentWidth) count--;

  return count;
}

export const reviewsSlide = (event, count) => {
  const reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
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

export const resizeWindow = (count) => {
  if (document.querySelector('.reviews__list--wrapper')) {
    const reviewsListWrapper = document.querySelector('.reviews__list--wrapper');
    let { reviewsList, posX } = getReviewsVars(reviewsListWrapper);
    reviewsList.style.transform = `translateX(${count}px)`;
    toggleActiveDot(reviewsListWrapper, count);
  }

  if (document.querySelector('.shop-item__sublist--wrapper')) {
    const subList = document.querySelector('.shop-item__sublist');
    getSublistHeight();
    subList.style.left = `${count}px`
  }
}

export const getInfo = (event) => {
  event.preventDefault();
  const infoPopup = document.querySelector('.info__wrapper');
  const infoPopupIsDisable = document.querySelector('.info__wrapper--disable');
  if (
    infoPopupIsDisable || 
    event.target === infoPopup ||
    event.target.closest('.info__btn--disable')
  ) infoPopup.classList.toggle('info__wrapper--disable');
}

export const getMobileMenu = () => {
  const menuBtn = document.querySelector('.mobile-menu__open');
  const mobileMenu = document.querySelector('.mobile-menu__list');
  mobileMenu.classList.toggle('opened');
  menuBtn.classList.toggle('close-btn');
}


const getSublistHeight = () => {
  const subLIstContent = document.querySelector('.shop-item__sublist--content');
  const subList = subLIstContent.querySelector('.shop-item__sublist');
  const subListHeight = subList.offsetHeight;
  subLIstContent.style.height = `${subListHeight}px`;
}

export const getShopProducts = (shopProducts) => {
  const shopSublist = document.querySelector('.shop__sublist');
  let shopCategoryName = window.location.hash.substring(1);

  if (!shopProducts[shopCategoryName]) shopCategoryName = "fresh-flowers";
  const shopCategoryList = shopProducts[shopCategoryName];
  window.location.hash = shopCategoryName;

  if (!document.querySelector('.shop__item--active')) document.querySelector(`.shop__item[data-shopitem="${shopCategoryName}"]`).classList.add('shop__item--active');

  shopCategoryList.forEach((item) => {
    const itemTitle = item.title;
    const itemPrice = `Price: ${item.price}$`;
    const itemLink = `./shop-item.html#${item.link}`;
    const shopItem = createDomElement('li', 'shop__subitem', shopSublist);
    const shopItemLink = createDomElement('a', 'shop__subitem--link', shopItem, itemTitle);
    shopItemLink.setAttribute('href', itemLink)
    shopItemLink.style.backgroundImage = `url('./images/${item.image}')`;
    const shopItemInfo = createDomElement('div', 'shop__subitem--info', shopItem);
    createDomElement('h5', 'shop__subtitle', shopItemInfo, itemTitle);
    createDomElement('p', 'shop__price', shopItemInfo, itemPrice);
  })
  if (document.querySelector('.shop-item__sublist--content')) getSublistHeight();
}

const getActiveShopItem = (event) => {
  const shopItemData = event.target.closest('.shop__item--footer').dataset.shopitem;
  const shopItems = Array.from(document.querySelectorAll('.shop__item'));
  return shopItems.find(item => item.dataset.shopitem == shopItemData);
}

export const getShopContent = (event) => {
  const shopSublist = document.querySelector('.shop__sublist');
  const shopItemActive = document.querySelector('.shop__item--active');
  let shopItem = event.target.closest('.shop__item') ? event.target.closest('.shop__item') : getActiveShopItem(event);

  if (shopItem === shopItemActive) {
    return
  } else {
    shopItemActive.classList.toggle('shop__item--active');
    shopItem.classList.toggle('shop__item--active');
  }
  window.location.hash = shopItem.dataset.shopitem;
  shopSublist.innerHTML = '';
  getShopProducts(shopProducts);
}

const getShopItemSublist = (shopItemSublist, productTitle) => {
  shopItemSublist = shopItemSublist;
  const shopItemSubList = document.querySelector('.shop-item__sublist');
  shopItemSubList.innerHTML = '';
  shopItemSublist.forEach((item, index) => {
    if (item.title !== productTitle.outerText) {
      const shopSubitem = createDomElement('li', 'shop-item__subitem', shopItemSubList);
      const shopSubitemImage = createDomElement('a', 'shop-item__sublink', shopSubitem);
      shopSubitemImage.style.backgroundImage = `url('./images/${item.image}')`;
      shopSubitemImage.setAttribute('href', `./shop-item.html#${item.link}`);
      const shopSubitemSubtitile = createDomElement('h5', 'shop-item__subtitle', shopSubitem, item.title);
      const shopSubitemSubprice = createDomElement('p', 'shop-item__subprice', shopSubitem, `$${item.price}`);
    }
  })
  if (document.querySelector('.shop-item__sublist--content')) getSublistHeight();
}

const getAdditionalItems = (currentItem) => {
  const additionalLinks = document.querySelectorAll('.additional__link');
  const additionalTitles = document.querySelectorAll('.additional__title');
  let itemIndex = 0;
  for (let key in shopProducts) {
    if (currentItem !== key) {
      additionalLinks[itemIndex].style.backgroundImage = `url("./images/shop-${key}.png")`;
      additionalLinks[itemIndex].setAttribute('href', `./shop.html#${key}`)
      additionalTitles[itemIndex].textContent = key.replace('-', ' ');
      itemIndex++;
    }
  }
}

export const getShopItemContent = (shopProducts) => {
  const productImage = document.querySelector('.shop-item__image');
  const productSubtitle = document.querySelector('.shop-item__current');
  const productTitle  = document.querySelector('.shop-item__title');
  const productText = document.querySelector('.shop-item__text');
  const shopItemLink = document.querySelector('.shop-item__link');
  const productPrice  = document.querySelector('.shop-item__price');

  let productLink = window.location.hash.substring(1);
  let productInfo = {};
  let productType = '';
  let productTypeIndex = '';
  let currentItem = '';
  for (let key in shopProducts) {
    productInfo = shopProducts[key].find((item) => item.link === productLink);
    
    if (productInfo) {
      productTypeIndex = key;
      productType = key.replace('-', ' ');
      break;
    }
  }

  if (!productInfo) {
    throw Error('No product info')
  }

  productImage.style.backgroundImage = `url('./images/${productInfo.image}')`;
  productSubtitle.textContent = productInfo.title;
  productTitle.textContent = productInfo.title;
  productText.textContent = productInfo.text;
  shopItemLink.textContent = productType.toUpperCase();
  let shopItemLinkHref = shopItemLink.getAttribute('href');
  shopItemLink.setAttribute('href', `${shopItemLinkHref}#${productTypeIndex}`);
  productPrice.textContent = productInfo.price;
  getShopItemSublist(shopProducts[productTypeIndex], productTitle);
  getAdditionalItems(productTypeIndex);
}

export const getQuantityCount = (event) => {
  const quantityField = document.querySelector('.shop-item__count');
  let quantityCount = parseInt(quantityField.textContent);
  if (event.target.classList.contains('shop-item__btn--decr') && quantityCount !== 0) quantityCount--;
  if (event.target.classList.contains('shop-item__btn--incr')) quantityCount++;
  quantityField.textContent = quantityCount;
}

export const scrollOtherProducts = (event, count) => {
  let posX;
  const subList = document.querySelector('.shop-item__sublist');
  const subItem = document.querySelector('.shop-item__subitem');
  const subItemStyles = window.getComputedStyle(subItem);
  const subItemMarginRight = parseFloat(subItemStyles.marginRight);
  let subItemWidth = subItem.offsetWidth + subItemMarginRight - 1;
  posX = subItemWidth*count;
  subList.style.left = `${posX}px`;
}

export const getPlanItem = (event) => {
  const planItem = event.target.closest('.plan-subscribe__item');
  const planItemContent = planItem.querySelector('.plan-item__content--wrapper');
  const planItemContentSelected = document.querySelector('.selected');
  if (!planItemContentSelected) planItemContent.classList.add('selected')
  if (planItemContentSelected && !planItemContent.classList.contains('selected')) {
    planItemContentSelected.classList.remove('selected');
    planItemContent.classList.add('selected');
  }
}

export const getDeliveryCount = (event) => {
  const countBtn = event.target.closest('.plan-item__count');
  const deliveryCountValue = document.querySelector('.plan-subscribe__count');
  let deliveryCountNumber = +(deliveryCountValue.textContent)
  if (countBtn.dataset.countType === "decrease" && deliveryCountNumber >= 1 && deliveryCountNumber < 10) deliveryCountNumber++;
  if (countBtn.dataset.countType === "increase" && deliveryCountNumber > 1) deliveryCountNumber--;
  deliveryCountValue.textContent = deliveryCountNumber;
}

export const getActiveFaqItem = (event) => {
  const faqItem = event.target.closest(".faq__item ");
  faqItem.classList.toggle("faq__active");
  const faqText = faqItem.querySelector(".faq__text");
  let faqTextHeight = faqItem.querySelector(".faq__text--content").offsetHeight;
  faqItem.classList.contains('faq__active') ? faqTextHeight : faqTextHeight = 0;
  faqText.style.height = `${faqTextHeight}px`
}

export const getSigninPopup = (event) => {
  const signinWrapper = document.querySelector('.signin__wrapper');
  const signinContent = document.querySelector('.signin__content');
  if (!signinContent.contains(event.target)) signinWrapper.classList.toggle('signin__wrapper--active');
}

export const phoneValidation = (event, contactsForm) => {
  
  const telWarning = document.querySelector('.tel-warning');
  const telInput = contactsForm.querySelector('#tel-input');
  const phonePattern = /^\+\d{10,14}$/;
  const existingWarning = contactsForm.querySelector('.err-warning');
  const isPhoneValid = phonePattern.test(telInput.value);

  if (isPhoneValid && existingWarning) existingWarning.classList.remove('err-warning');

  if (!isPhoneValid) {
    event.preventDefault();
    if (telWarning && !existingWarning) telWarning.classList.add('err-warning');
  }
}


export const getInputPlus = () => {
  const inputElement = document.getElementById('tel-input');
  document.getElementById('tel-input').addEventListener('input', function(event) {
    let input = event.target;
    let value = input.value[0] == '+' ? input.value : `+${input.value}`;
    
    input.value = value;
  });
}