// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
// import Image from "next/image";
// import Link from "next/link";

// const MoviesCollection = ({ data, linkPath, collectionName }) => {
//   const getRatingColor = (rating) => {
//     const imdbRating = parseFloat(rating.match(/[\d.]+/)[0]);
//     if (imdbRating >= 9) {
//       return "bg-green-700";
//     } else if (imdbRating >= 8) {
//       return "bg-green-600";
//     } else if (imdbRating >= 7) {
//       return "bg-green-500";
//     } else {
//       return "bg-red-500";
//     }
//   };

//   return (
//     <div>
//       <Carousel showArrows={true} showThumbs={false}>
//         {data &&
//           data.map((element, index) => (
//             <Link
//               key={index + 1}
//               href={`/${element.slug}`}
//               className="mx-2 flex flex-col justify-center hover:scale-110"
//             >
//               <div className="relative h-60">
//                 <Image
//                   width={144}
//                   height={144}
//                   src={element.image}
//                   alt="Image"
//                   className="cropped-image hover:scale-110 rounded-lg"
//                 />
//                 <p
//                   className={`IMDB rounded-tl-lg absolute top-0 left-0 p-1 text-white ${getRatingColor(
//                     element.imdb[0]
//                   )}`}
//                 >
//                   {parseFloat(element.imdb[0].match(/[\d.]+/)[0]).toFixed(1)}
//                 </p>
//               </div>
//               <p className="text-center font-light text-xs mt-[4%] md:text-sm ">
//                 {element.title}
//               </p>
//             </Link>
//           ))}
//       </Carousel>
//     </div>
//   );
// };

// export default MoviesCollection;
