import { useState } from "react";
import * as yup from "yup";
export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postSchema = yup.object().shape({
    title: yup.string().required().min(4),
    content: yup.string().required().min(10),
  });
  const createPost = async (data) => {
    try {
      const post = JSON.parse(localStorage.getItem("post")) || [];
      const newPost = {
        id: post.length + 1,
        post_title: data.title,
        postContent: data.content,
        user: (JSON.parse(localStorage.getItem('user'))).username
      };

      post.push(newPost);
      if(!localStorage.getItem('post')){
        localStorage.setItem('post', JSON.stringify([]));
      }
      localStorage.setItem('post',JSON.stringify(post))
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLoading,
    postSchema,
    createPost,
  };
};
