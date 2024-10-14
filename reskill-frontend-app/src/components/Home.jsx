import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [related, setRelated] = useState(null);
  const [homePost, setHomePost] = useState(null);  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts`)
      .then((response) => {        
        setRelated(response.data.relatedData);
        setHomePost(response.data.mainData);
      })
      .catch((error) => console.error("Error fetching related posts", error));
  }, []);  

  const handleRelatedClick = () => {
    alert('pressed');
  }

  if (!related || !homePost)
    return (
      <p className="transition italic text-4xl text-center p-56">Loading...</p>
    );

  return (
    <div className="container mx-auto my-40 flex flex-col">
      <h1 className="max-xl:ml-36 max-sm:ml-0 font-bold text-6xl max-sm:text-center">Posts List</h1>
      <h2 className="max-xl:ml-36 max-sm:ml-0 my-7 sm:w-1/3 text-subheading max-sm:text-center">
        {homePost.subheading}
      </h2>
      <img
        src={homePost.photos[0].url}
        className="my-20 mx-auto w-full h-auto md:w-[800px] lg:w-[1281px] lg:h-[650px] rounded-[8px]"
      />
      <p className="my-20 xl:px-96 sm:px-52 whitespace-pre-line max-sm:text-center">
        {homePost.firstBody}
      </p>
      <div className="flex align-middle justify-center">
        <img className="xl:px-10 w-1/2" src={homePost.photos[1].url} alt="" />
        <img className="xl:px-10 w-1/2" src={homePost.photos[2].url} alt="" />
      </div>
      <p className="my-20 xl:px-96 sm:px-52 whitespace-pre-line max-sm:text-center">
        {homePost.secondBody}
      </p>
      <div className="mx-auto">
        <h1 className="font-bold mx-auto text-lg ">Related articles or posts</h1>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-10">
          {related.map((item) => (
            <div key={item.id} className=" overflow-hidden cursor-pointer" onClick={handleRelatedClick}>
              <img
                src={item.photos[0].thumbnailUrl}
                alt={item.title}
                className="w-64 h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{item.title.substring(0, 22)}...</h3>
                <p className="text-gray-600 mt-2">Author</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
