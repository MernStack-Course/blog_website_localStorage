import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storagePost, setStoragePost] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
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
        comments: [],
        createAt: new Date().toISOString(),
        postImages: data.postImages,
      };

      post.push(newPost);
      if (!localStorage.getItem("post")) {
        localStorage.setItem("post", JSON.stringify([]));
      }
      localStorage.setItem("post", JSON.stringify(post));
      navigate("/");
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
          likedBy: 
          alreadyLiked
            ? likedBy.filter((u) => u !== userEmail)
            : 
            [...likedBy, userEmail],
        };
      }
      return post;
    });
    localStorage.setItem("post", JSON.stringify(updatePost));
    setRefresh(!refresh);
  };

  const AddComment =(comment,postId,username) =>{
    const posts = JSON.parse(localStorage.getItem("post")) || "";
    const updatePost = posts.map(post => {
      if(post.id === postId) {
        const newComment = {
          userName: username,
          comment: comment
        }
        return {
          ...post,
          comments: [...post.comments || [], newComment]
        }
      }
      return post;
    })
    localStorage.setItem("post", JSON.stringify(updatePost));
    setRefresh(!refresh);
  }

  //  const toggleComment = (index,postId) =>{
  //   console.log(postId);
  //   const posts = JSON.parse(localStorage.getItem("post")) || "";
  //   const updatePost = posts.map( post =>{
  //     if(post.id === postId){
  //       if(index === 'open'){
  //         return {
  //           ...post,
  //           availableComment: true,
  //         }
  //       }
  //       if(index =='close'){
  //         return{
  //           ...post,
  //           availableComment:false
  //         }
  //       }
  //     }
  //     return post;
  //   }
  //   )
  //   localStorage.setItem("post", JSON.stringify(updatePost));
  //   setRefresh(!refresh);
  // }
  
  return {
    isLoading,
    postSchema,
    createPost,
    handleDelete,
    handleLike,
    AddComment,
    storagePost,
  };
};
