import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost, deletePost } from "./postsSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);


  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleDeleteClick = (id) => {
    dispatch(deletePost(id));
    toast.success("Post deleted successfully");
  };
  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        {/*  */}
                        <Link to={`/details/${post.id}`}>
                          {post.id} - {post.title}
                        </Link>
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} /> Update</button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteClick(post.id)}
                        >
                         <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-4">
            <Formik
              initialValues={{ title: "", body: "" }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .min(6, "Title must be at least 6 characters")
                  .max(50, "Title must not exceed 50 characters")
                  .required("Title is required"),
                body: Yup.string()
                  .min(40, "Title must be at least 40 characters")
                  .max(150, "Title must not exceed 150 characters")
                  .required("Body is required"),
                  
              })}
              onSubmit={(values, { resetForm }) => {
                dispatch(addPost(values));
                toast.success("Post added successfully");
                resetForm();
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                isValid,
                touched,
              }) => (
                <form onSubmit={handleSubmit} className="add-post-form">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className={`form-control mb-2 ${
                      touched.title && errors.title ? "is-invalid" : ""
                    }`}
                    value={values.title}
                    onChange={handleChange}
                  />
                  {touched.title && errors.title && (
                    <div className="text-danger mb-2">{errors.title}</div>
                  )}
                  <textarea
                    name="body"
                    placeholder="Body"
                    rows="4"
                    className={`form-control mb-2 ${
                      touched.body && errors.body ? "is-invalid" : ""
                    }`}
                    value={values.body}
                    onChange={handleChange}
                  />
                  {touched.body && errors.body && (
                    <div className="text-danger mb-2">{errors.body}</div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={!isValid}
                  >
                   <FontAwesomeIcon icon={faPlus} /> Add Post
                  </button>
                </form>
              )}
            </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostsList;
