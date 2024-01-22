import 'modern-normalize';
import { createGlobalStyle } from 'styled-components';
import { theme } from './Variables.styled';

export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Playfair Display', 'Miama Nueva', sans-serif, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  background-color: ${theme.colors.fon};
  color:${theme.colors.grey2};

  &.scroll {
      max-height: 100vh;
      overflow: hidden;
    }
 }

#root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* 
@font-face {
	font-family: 'Miama Nueva';
	src: url('../../../../public/fonts/MiamaNueva.woff2') format('woff2'), url('../../../../public/fonts/MiamaNueva.woff') format('woff');
}  */

//-----reset-----//
h1, h2, h3, h4, h5, h6, p {
  padding: 0;
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

img {
  display:block;
  max-width: 100%;
  height: auto;
}

//-----modal windows-----//
#popup-root {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 345;

  width: 100vw;
  height: 100vh;

  opacity: 1;
  visibility: visible;
  display: flex;

  background-color: #0000006b;
  transition: opacity .3s linear 50ms, visibility .3s linear 50ms;
}

#popup-root {
  &.is-hide {
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      display: none;

      width: 0;
      height: 0;
  }
}

//-----Swiper-----//
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-wrapper {
 @media screen and (min-width: ${theme.breakpoints.desktop}) { 
  /* justify-content: center !important; */
}
}

.swiper-slide {
  height:auto !important;
  text-align: center;
  font-size: 18px;
  background: ${theme.colors.fon};

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
}

.swiper-button-next::after,.swiper-btn-next::after {
color:${theme.colors.primary} !important;
}

.swiper-button-prev::after,.swiper-btn-prev::after  {
color:${theme.colors.primary} !important;
}

.swiper-button-prev,
.swiper-button-next,
.swiper-btn-prev,
.swiper-btn-next,
.swiper-pagination-bullet {
  top: var(--swiper-navigation-sides-offset,10px) !important;
  bottom:var(--swiper-navigation-sides-offset,10px) !important;
  user-select: none;
  /* transform: scale(1.1); */
}

//-----Admin-----//

.specialistAvatar,
.img-app-theme--cell > img {
width: 40px;
height: 40px;
border-radius: 50%;
}

.inputSpecialistAvatar,
.inputEventAvatar {
  display: none;
}

.eventAvatar,
.img-app-theme--cell > img {
width: 50px;
height: 50px;
border-radius: 50%;
&:hover{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
}

.img-app-theme--cell{
  display: flex;
  justify-content: center;
  align-items: center;
}
.pro-sidebar {
  z-index: 100 !important;
}
/* GRID */

.row {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.row-middle {
  align-items: center;
}

.col {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
}

.col-start {
  justify-content: flex-start;
  text-align: left;
}

.col-center {
  justify-content: center;
  text-align: center;
}

.col-end {
  justify-content: flex-end;
  text-align: right;
}

/* Calendar */
.calendar-box{
  display: flex;
  justify-content: center;
  /* margin-bottom: 60px; */
  position: relative;
}

.calendar {
  display: block;
  position: relative;
  width: 300px;
  background: var(--neutral-color);
  border: 1px solid var(--border-color);
  @media screen and (min-width: ${theme.breakpoints.tablet}){
    width: 345px;
  }
}

.calendar .header {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 115%;
  padding: 1.5em 0;
  border-bottom: 1px solid var(--border-color);
}

.calendar .header .icon {
  cursor: pointer;
  transition: 0.15s ease-out;
}

.calendar .header .icon:hover {
  /*transform: scale(1.75);*/
  transition: 0.25s ease-out;
  color: var(--main-color);
}

.calendar .header .icon:first-of-type {
  margin-left: 1em;
}

.calendar .header .icon:last-of-type {
  margin-right: 1em;
}

.calendar .days {
  text-transform: uppercase;
  padding-top: 5px;
  border-top: 1px solid ${theme.colors.grey1};

  color: ${theme.colors.grey2};
  font-family: ${theme.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 16px;
  }
}

.calendar .body .cell {
  position: relative;
  /* height: 40px; */
  /* border-right: 1px solid var(--border-color); */
  /* overflow: hidden; */
  cursor: pointer;
  /* background: var(--neutral-color); */
  transition: 0.25s ease-out;
  font-size: 1.5em;
}

/* .calendar .body .cell:hover {
  background: var(--bg-color);
  transition: 0.5s ease-out;
} */

.calendar .body .selected {
  /* border-left: 10px solid transparent;
  border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
  border-image-slice: 1; */
  border-radius: 7px;
border: 1px solid #3A3A3A;
}
.calendar .body .today {
  border-radius: 7px;
  border: 2px solid ${theme.colors.accent};
  /* border-left: 10px solid transparent; */
  /* border-image: linear-gradient(45deg, #ff1a79 0%, #eb82b3 40%); */
  /* border-image-slice: 1; */
}
.calendar .body .row {
  border-bottom: 1px solid var(--border-color);
}

/* .calendar .body .row:last-child {
  border-bottom: none;
} */

/* .calendar .body .cell:last-child {
  border-right: none;
} */

.calendar .body .cell .number {
  position: absolute;
  top: 0.75em;
  padding: 10px;
  color: ${theme.colors.grey1};
  font-family: ${theme.fonts[0]};
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 9px;
  cursor: pointer;

  @media screen and (min-width: ${theme.breakpoints.desktop}) {
    font-size: 24px;
    line-height: 120%;
  }
}

.calendar .body .disabled {
  color: var(--text-color-light);
  pointer-events: none;
}

.calendar .body .cell .bg {
  font-weight: 700;
  line-height: 1;
  color: var(--main-color);
  opacity: 0;
  font-size: 8em;
  position: absolute;
  top: -0.2em;
  right: -0.05em;
  transition: 0.25s ease-out;
  letter-spacing: -0.07em;
}

.calendar .body .cell:hover .bg,
.calendar .body .selected .bg {
  opacity: 0.05;
  transition: 0.5s ease-in;
}
.calendar .body .cell.today .bg {
  color: #ff1a79;
  opacity: 0.05;
}

.calendar .body .col {
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);
}

.footer{
  position: relative;
  display: flex;
  justify-content: space-between;
}

.footer-box{
  display: flex;
  justify-content: space-between;
}

.btn-prev, .btn-next{
  position: absolute;
  color: ${theme.colors.primary};
  border-radius: 50%;
  filter: drop-shadow(0px 4px 14px rgba(0, 0, 0, 0.16));
  cursor: pointer;
  user-select: none;
}

.btn-next{
  right: -40px;
}

.btn-prev{
  left: -40px;
}

`;
