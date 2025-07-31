import { useEffect, useState } from "react";
import * as yup from "yup";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storagePost, setStoragePost] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
        user: JSON.parse(localStorage.getItem("user")).username,
        email: JSON.parse(localStorage.getItem("user")).email,
        likedBy: [],
        createAt: new Date().toISOString(),
        postImages: data.postImages,
      };

      post.push(newPost);
      if (!localStorage.getItem("post")) {
        localStorage.setItem("post", JSON.stringify([]));
      }
      localStorage.setItem("post", JSON.stringify(post));
    } catch (error) {
      console.log(error);
    }
  };

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const posts = JSON.parse(localStorage.getItem("post")) || "";
      setStoragePost(posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [refresh]);
  const handleDelete = (id) => {
    const posts = JSON.parse(localStorage.getItem("post"));
    const filteredPost = posts.filter((post) => post.id !== id);
    localStorage.setItem("post", JSON.stringify(filteredPost));
    setRefresh(!refresh);
  };

  const handleLike = (postId, userEmail) => {
    const posts = JSON.parse(localStorage.getItem("post")) || "";
    const updatePost = posts.map((post) => {
      if (post.id === postId) {
        const likedBy = post.likedBy || [];
        const alreadyLiked = likedBy.includes(userEmail);
        return {
          ...post,
          likedBy: alreadyLiked
            ? likedBy.filter((u) => u !== userEmail)
            : [...likedBy, userEmail],
        };
      }
      return post;
    });
    localStorage.setItem("post", JSON.stringify(updatePost));
    setRefresh(!refresh);
  };

  return {
    isLoading,
    postSchema,
    createPost,
    handleDelete,
    handleLike,
    storagePost,
  };
};
