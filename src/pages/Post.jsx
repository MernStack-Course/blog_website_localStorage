import React from "react";
import { useCreatePost } from "../hooks/CreatePost";

function Post() {
  const { storagePost, isLoading } = useCreatePost();
  if (isLoading) {
    return (
      <div className="mt-10 text-center w-full mx-auto">
        {isLoading && <span>please wait is loading...</span>}
      </div>
    );
  }
  return (
    <div className="w-4xl mx-auto">
      <h1 className="mt-10 text-2xl font-semibold text-blue-500">Posts:</h1>
      <hr className="text-blue-500 mb-6 mt-3 " />
      <div className="grid grid-cols-3  gap-3 ">
        {storagePost &&
          storagePost.map((post) => {
            return (  
              <div
                key={post.id}
                className="w-full border rounded-md border-blue-500 mb-5 px-3 py-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 text-left border rounded-full flex justify-center items-center bg-blue-400 text-white">
                    {post.user.slice(0, 1)}
                  </div>
                  <span>{post.user}</span>
                </div>
                <h1 className="text-blue-500 text-2xl mt-4 mb-2   ">
                  {post.post_title}:
                </h1>
                <p className="mb-3">{post.postContent.substring(0,100)}</p>
                {post.postImages.map((p,index) => 
                  <div className=" w-full" key={index}><img src={p} alt="" /></div>
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Post;
