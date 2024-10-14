import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  if (!post) {
    return (
      <p className="transition italic text-4xl text-center p-56">Loading...</p>
    );
  }

  return (
    <div className="container mx-auto my-40 flex max-sm:flex-col justify-between">
      <div>
        <h1 className="max-xl:ml-32 max-sm:ml-0 font-bold text-6xl max-sm:text-center">
          Single Post
        </h1>
        <h2 className="max-xl:ml-32 max-sm:ml-0 my-7 text-subheading max-sm:text-center">
        {post.title}
        </h2>
        <p className="max-xl:ml-32 max-xl:w-80 my-5 whitespace-pre-line max-sm:mx-auto max-sm:text-center">
          {post.body}
        </p>
      </div>
      <img src={post.photos[0].url} alt="" className="w-1/2 max-sm:w-auto" />
    </div>
  );
};

export default SinglePost;
