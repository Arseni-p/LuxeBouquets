'use strict';

const getReviewsVars = (reviewsListWrapper) => {
  const reviewsListContent = reviewsListWrapper.querySelector('.reviews__list--content');
  const reviewsList = reviewsListContent.querySelector('.reviews__list');
  const reviewsWidth = reviewsListContent.offsetWidth;
  const reviewsListWidth = reviewsList.offsetWidth;
  let posX = reviewsList.offsetLeft;
  return {
    reviewsList: reviewsList,
    reviewsWidth: reviewsWidth,
    reviewsListWidth: reviewsListWidth,
    posX: posX,
  }
}

export const getReviewsListWrapper = () => document.querySelector('.reviews__list--wrapper');

export const createReviewsDrops = (reviewsListWrapper) => {
  const dropsList = reviewsListWrapper.querySelector('.reviews__dots--list');
  const reviewsCount = reviewsListWrapper.querySelectorAll('.reviews__item').length;
  console.log(dropsList, reviewsCount);
  for (let i = 0; i < reviewsCount; i++) {
    const dropsItem = document.createElement('li');
    dropsItem.className = 'reviews__dots--item';
    if (i === 0) dropsItem.className = 'reviews__dots--item dots__active';
    dropsList.append(dropsItem);
  }
}

const toggleActiveDot = (reviewsListWrapper) => {
  const activeDot = reviewsListWrapper.querySelector('.dots__active');
  activeDot.classList.toggle('dots__active');
}

export const getReviewByDot = (reviewsListWrapper, event) => {
  let { reviewsList, reviewsWidth, posX } = getReviewsVars(reviewsListWrapper);
  let count = 0;
  const reviewsDots = reviewsListWrapper.querySelectorAll('.reviews__dots--item');
  reviewsDots.forEach((element, index) => {
    event.target === element ? count = index : count
  });
  toggleActiveDot(reviewsListWrapper);
  posX = reviewsWidth * -count;

  reviewsDots[count].classList.add('dots__active');
  reviewsList.style.left = `${posX}px`;
}

export const reviewsSlide = (reviewsListWrapper, arrowBtn) => {
  let {
    reviewsList, 
    reviewsWidth, 
    reviewsListWidth, 
    posX
  } = getReviewsVars(reviewsListWrapper);

  // const reviewsItems = reviewsListWrapper.querySelectorAll('.reviews__item');

  // count = count;
  // const dropsList = reviewsListWrapper.querySelectorAll('.reviews__dots--item');
  // const reviewsCount = reviewsListWrapper.querySelectorAll('.reviews__item').length;

  const reviewsDots = reviewsListWrapper.querySelectorAll('.reviews__dots--item');
  toggleActiveDot(reviewsListWrapper);

  if (arrowBtn === 'arrowRight' && posX <= 0 ) {
    posX = posX - reviewsWidth;
  }
  if (arrowBtn === 'arrowRight' && posX + reviewsListWidth < reviewsWidth) {
    reviewsList.style.left = `${reviewsListWidth}px`;
    posX = 0;
  }
  let posXIsNull = false;
  posX !== 0 ? posXIsNull = false : posXIsNull = true;
  if (arrowBtn === 'arrowLeft' && posX < 0) {
    posX = posX + reviewsWidth;
  }
  if (arrowBtn === 'arrowLeft' && posX >= 0 && posXIsNull) {
    reviewsList.style.left = `${0 - reviewsListWidth + reviewsWidth}px`;
    posX = posX - reviewsListWidth + reviewsWidth;
  }

  reviewsList.style.left = `${posX}px`;
  let count = Math.trunc(-posX / reviewsWidth) === -0 ? 0 : Math.trunc(-posX / reviewsWidth);
  reviewsDots[count].classList.add('dots__active');
}

export const resizeWindow = (reviewsListWrapper) => {
  let { reviewsList, posX } = getReviewsVars(reviewsListWrapper);
  posX = 0;
  reviewsList.style.left = `${posX}px`;
}

export const getInfo = (reviewsListWrapper) => {
  // const infoBtn = reviewsListWrapper.querySelector('.info__btn--disable');
  const infoPopup = document.querySelector('.info__wrapper');
  infoPopup.classList.toggle('info__wrapper--disable')
  console.log(infoPopup);
}