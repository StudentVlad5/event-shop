// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { BASE_URL_IMG } from 'helpers/constants';
// import {
//   ArchiveDetailsWrapper,
//   ArchiveEvent,
//   ArchiveList,
//   ArchiveImage,
//   BtnMore,
// } from './ArchiveEventList.styled';
// import {
//   DataPlaceWrapper,
//   EventDate,
//   EventTitle,
// } from '../EventsList/EventList.styled';
// import defaultImg from 'images/No-image-available.webp';

// export const ArchiveEventsList = ({ events }) => {
//   const { t } = useTranslation();

//   const today = new Date();
//   const archiveEvents = events.filter(({ date }) => new Date(date) < today);

//   const [limit, setLimit] = useState(2);
//   const end = count => {
//     setLimit(prevState => prevState + count);
//   };
//   return (
//     <>
//       <ArchiveList>
//         {archiveEvents.slice(0, limit).map(event => {
//           return (
//             <ArchiveEvent
//               key={event._id}
//               data-aos="zoom-in-up"
//               data-aos-delay="200"
//             >
//               <NavLink to={`/events/${event._id}`}>
//                 <ArchiveImage
//                   src={
//                     event.image
//                       ? BASE_URL_IMG +
//                         event.image.split('/')[
//                           event.image.split('/').length - 1
//                         ]
//                       : defaultImg
//                   }
//                   alt={event.title}
//                   width="325"
//                   height="322"
//                   loading="lazy"
//                 />
//               </NavLink>
//               <ArchiveDetailsWrapper>
//                 <DataPlaceWrapper>
//                   <EventDate>
//                     {new Date(event.date).toLocaleDateString()} | {event.time}
//                   </EventDate>
//                   <EventDate>{event.location}</EventDate>
//                 </DataPlaceWrapper>
//                 <EventTitle>{event.title}</EventTitle>
//               </ArchiveDetailsWrapper>
//             </ArchiveEvent>
//           );
//         })}
//       </ArchiveList>
//       {archiveEvents.length > limit && (
//         <BtnMore type="button" aria-label="More events" onClick={() => end(2)}>
//           <span>{t('more events')}</span>
//         </BtnMore>
//       )}
//     </>
//   );
// };

// ArchiveEventsList.propTypes = {
//   events: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       date: PropTypes.string.isRequired,
//       time: PropTypes.string.isRequired,
//       duration: PropTypes.string,
//       location: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       image: PropTypes.string,
//     })
//   ),
// };
