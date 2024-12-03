import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) =>
    state.postsData.posts.find((post) => post.id.toString() === id)
  );

  // if (!post) {
  //   return <p>Post not found</p>;
  // }

  return (
    <div className="container mt-4">
      <h2>Post Details</h2>
      <p><strong>ID:</strong> {post.id}</p>
      <p><strong>Title:</strong> {post.title}</p>
      <p><strong>Body:</strong> {post.body}</p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back to Posts
      </button>
    </div>
  );
};

export default Details;
