import React, { useState, useEffect } from 'react';

export default function BlogPost(props) {
  const [evenImages, setEvenImages] = useState([]);
  const [otherContent, setOtherContent] = useState('');

  useEffect(() => {
    if (props.myBlog && props.myBlog.content) {
      // Create a temporary div element to parse the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = props.myBlog.content;

      // Get all the <img> elements within the content
      const imgElements = tempDiv.querySelectorAll('img');

      // Filter the even-numbered <img> elements
      const evenImgElements = Array.from(imgElements).filter((_, index) => index % 2 === 0);

      // Create an array of the HTML representations of the even <img> elements
      const evenImgHtml = evenImgElements.map((img) => img.outerHTML);

      // Set the even <img> elements to the state
      setEvenImages(evenImgHtml);

      // Remove the even <img> elements from the parsed content
      evenImgElements.forEach((img) => img.remove());

      // Set the modified content without even <img> elements to the state
      setOtherContent(tempDiv.innerHTML);
    }
  }, [props.myBlog]);

  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <div className="flex flex-col justify-center items-center py-6 px-4">
      <div className="cropped-image">
        <img src={props.myBlog.image} alt="Image" className="p-3 border-2 border-gray-300 rounded-lg shadow-md mb-4" />
      </div>
      <h4 className="text-lg font-semibold my-4 text-center text-white">{props.myBlog.title}</h4>
      <hr />
      <div>
        {otherContent && <div className="text-xs xs:text-sm md:text-base contentClass space-y-6 text-gray-700" dangerouslySetInnerHTML={createMarkup(otherContent)}></div>}
      </div>
      <div>
        {evenImages.length > 0 && (
          <div>
            <h3>Even Images:</h3>
            <div>
              {evenImages.map((imgHtml, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: imgHtml }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  try {
    const { slug } = context.query;
    const data = await fetch(`https://microflix-next-app.vercel.app/api/getblogs/?slug=${slug}`);
    const myBlog = await data.json();
    return {
      props: { myBlog },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
