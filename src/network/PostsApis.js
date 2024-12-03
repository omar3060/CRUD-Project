import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return  response.data
})

export const addPost = createAsyncThunk('posts/addPost', async (postInfo) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postInfo)
  return  response.data
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id; 
});