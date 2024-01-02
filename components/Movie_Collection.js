"use client"
import Image from "next/image";
import Link from "next/link";

const MoviesCollection = ({ data, collectionName, linkPath }) => {
  const getRatingColor = (rating) => {
    const imdbRating = parseFloat(rating);
    switch (true) {
      case imdbRating >= 9:
        return 'bg-green-900';
      case imdbRating >= 8:
        return 'bg-green-700';
      case imdbRating >= 7:
        return 'bg-green-500';
      case imdbRating >= 6:
        return "bg-yellow-700"
      case imdbRating >= 5:
        return "bg-orange-700"
      case imdbRating >= 4:
        return 'bg-orange-500';
      case imdbRating >= 3:
        return "bg-red-500"
      default:
        return "bg-red-700"
    }
  };
  return (
    <>
      <div>
        <Link href="/data/contents">
        <h2 className="text-lg text-white my-4">{collectionName}</h2>
        </Link>
      </div>
      <div className="relative">
        <div className="overflow-x-auto w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
          >
            {data &&
              data.map((element, index) => (
                <div key={index} className="w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 xl:w-[14.29%] 2xl:w-[12.5%] flex-shrink-0">
                  <Link href={element.slug}>
                    <div
                      className="mx-2 flex flex-col justify-center items-center hover:scale-95 cursor-pointer"
                    >
                      <div className="relative h-60">
                        <Image
                          width={144}
                          height={144}
                          src={element.image}
                          alt="Image"
                          className="cropped-image hover:scale-95 rounded-lg"
                        />
                        <div
                          className={`IMDB rounded-tl-lg absolute top-0 left-0 p-1 text-sm text-white bg-opacity-50 ${getRatingColor(element.imdbDetails.imdbRating.rating)}`}
                        >
                          <p>{element.imdbDetails.imdbRating.rating}</p>
                          <p>{element.imdbDetails.imdbRating.votes}</p>
                        </div>
                      </div>
                      <p className="text-center font-light text-xs mt-[4%] md:text-sm ">{element.title}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesCollection;