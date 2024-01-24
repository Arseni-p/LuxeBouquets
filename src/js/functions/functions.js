'use strict';

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