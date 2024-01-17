'use strict';

const getReviewsVars = (reviewsListWrapper) => {
  const reviewsListContent = reviewsListWrapper.querySelector('.reviews__list--content');
  const reviewsList = reviewsListContent.querySelector('.reviews__list');
  const reviewsItems = reviewsListWrapper.querySelectorAll('.reviews__item');
  const reviewsWidth = reviewsListContent.offsetWidth;
  const reviewsListWidth = reviewsList.offsetWidth;
  const dropsList = reviewsListWrapper.querySelector('.reviews__dots--list');
  const reviewsDots = reviewsListWrapper.querySelectorAll('.reviews__dots--item');
  const activeDot = reviewsListWrapper.querySelector('.dots__active');
  let posX = reviewsList.offsetLeft;
  return {
    reviewsList: reviewsList,
    reviewsItems: reviewsItems,
    reviewsWidth: reviewsWidth,
    reviewsListWidth: reviewsListWidth,
    dropsList: dropsList,
    reviewsDots: reviewsDots,
    activeDot: activeDot,
    posX: posX,
  }
}

export const getReviewsListWrapper = () => document.querySelector('.reviews__list--wrapper');

export const createReviewsDrops = (reviewsListWrapper) => {
  const { dropsList, reviewsItems } = getReviewsVars(reviewsListWrapper)
  // const dropsList = reviewsListWrapper.querySelector('.reviews__dots--list');
  const reviewsCount = reviewsItems.length;
  for (let i = 0; i < reviewsCount; i++) {
    const dropsItem = document.createElement('li');
    dropsItem.className = 'reviews__dots--item';
    if (i === 0) dropsItem.className = 'reviews__dots--item dots__active';
    dropsList.append(dropsItem);
  }
}

const toggleActiveDot = (reviewsListWrapper, count) => {
  const { reviewsDots, activeDot } = getReviewsVars(reviewsListWrapper);
  // const reviewsDots = reviewsListWrapper.querySelectorAll('.reviews__dots--item');
  // const activeDot = reviewsListWrapper.querySelector('.dots__active');
  activeDot.classList.toggle('dots__active');
  reviewsDots[count].classList.add('dots__active');
}

export const getReviewByDot = (reviewsListWrapper, event, count) => {
  let { reviewsDots } = getReviewsVars(reviewsListWrapper);
  reviewsDots.forEach((element, index) => {
    event.target === element ? count = index : count
  });
  
  return count;
}

export const getReviewsCount = (reviewsListWrapper, event, count) => {
  // let { reviewsList, reviewsWidth, reviewsDots, posX } = getReviewsVars(reviewsListWrapper);
  const reviewsItems = reviewsListWrapper.querySelectorAll('.reviews__item');
  if (event.target.classList.contains('arrow-right')) count++;
  if (event.target.classList.contains('arrow-left')) count--;
  if (event.target.classList.contains('reviews__dots--item')) count = getReviewByDot(reviewsListWrapper, event, count);
  if (count >= reviewsItems.length) count = 0;
  if (count < 0) count = reviewsItems.length - 1;
  toggleActiveDot(reviewsListWrapper, count);
  console.log(`count after = ${count}`)

  return count;
}

export const reviewsSlide = (reviewsListWrapper, arrowBtn, count) => {
  let { reviewsList, reviewsWidth, posX } = getReviewsVars(reviewsListWrapper);
  
  posX = count * reviewsWidth;
  if (
    event.target.classList.contains('arrow-left') || 
    event.target.classList.contains('arrow-right') ||
    event.target.classList.contains('dots__active')
    ) posX *=-1;
  reviewsList.style.left = `${posX}px`;
  toggleActiveDot(reviewsListWrapper, count);
}

export const resizeWindow = (reviewsListWrapper, count) => {
  let { reviewsList, reviewsDots, posX } = getReviewsVars(reviewsListWrapper);
  posX = 0;
  reviewsList.style.left = `${posX}px`;
  toggleActiveDot(reviewsListWrapper, count);
}

export const getInfo = () => {
  const infoPopup = document.querySelector('.info__wrapper');
  infoPopup.classList.toggle('info__wrapper--disable');
}