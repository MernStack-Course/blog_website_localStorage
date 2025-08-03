import { useCreatePost } from "../hooks/CreatePost";
import { NavLink } from "react-router-dom";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "../context/Auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiMessageCircle } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
dayjs.extend(relativeTime);

function Post() {
  const { storagePost, isLoading, handleLike, AddComment } = useCreatePost();
  const { isAuth } = useAuthContext();
  const profileData = JSON.parse(localStorage.getItem("user"));
  const [comment, setComment] = useState("");
  const [activePostId, setActivePostId] = useState();

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleAddComment = (postId) => {
    AddComment(
      comment && comment.trim(),
      postId,
      JSON.parse(localStorage.getItem("user")).username
    );
    setComment("");
  };

  if (isLoading) {
    return (
      <div className="mt-10 text-center w-full mx-auto">
        {isLoading && <span>please wait is loading...</span>}
      </div>
    );
  }
  return (
    <div className="w-4xl mx-auto ">
      <h1 className="mt-10 text-2xl font-semibold text-blue-500">Posts:</h1>
      <hr className="text-blue-500 mb-6 mt-3 " />
      <div>
        {profileData && (
          <div className="flex mb-10 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="w-12 h-12 text-left border rounded-full flex justify-center items-center bg-blue-500 text-white">
                {profileData.username.slice(0, 1)}
              </div>
              <h1>{profileData.username}</h1>
            </div>
            <NavLink
              to="/profile"
              className="text-blue-600 font-semibold hover:underline transition-transform "
            >
              Profile
            </NavLink>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3  gap-3 ">
        {storagePost &&
          storagePost.map((post) => {
            return (
              <div
                key={post.id}
                className="w-full border rounded-md border-blue-500 mb-5 px-3 py-3 relative"
              >
                <div className="grid gap-1  ">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 text-left border rounded-full flex justify-center items-center bg-blue-400 text-white">
                      {post.user.slice(0, 1)}
                    </div>
                    <span>{post.user}</span>
                  </div>
                  <div className="text-blue-400 ml-2">
                    {dayjs(post.createAt).fromNow()}
                  </div>
                </div>
                <h1 className="text-blue-500 text-2xl mt-4 mb-2   ">
                  {post.post_title}:
                </h1>
                <p className="mb-3">{post.postContent.substring(0, 100)}</p>
                {post.postImages.map((p, index) => (
                  <div className=" w-full" key={index}>
                    <img src={p} alt="" />
                  </div>
                ))}
                {isAuth ? (
                  <div className="flex gap-8 items-center mt-5">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() =>
                          handleLike(
                            post.id,
                            JSON.parse(localStorage.getItem("user")).email
                          )
                        }
                      >
                        {post.likedBy.includes(
                          JSON.parse(localStorage.getItem("user")).email
                        ) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          // <p>post.likedBY</p>
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </div>
                      <div>{post.likedBy ? post.likedBy.length : 0}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FiMessageCircle
                        onClick={() => setActivePostId(post.id)}
                      />
                      <div>{post.comments ? post.comments.length : 0}</div>
                    </div>
                    {activePostId === post.id ? (
                      <div
                        className="absolute h-full top-0 left-0 right-0 bottom-0 rounded-md inset-0 z-40
                          bg-opacity-40 backdrop-blur-lg 
                          "
                      >
                        <div className="flex justify-between items-center  px-2 py-2">
                          <h1 className="text-xs text-blue-500">COMMENTS</h1>
                          <button
                            className=" text-xs bg-red-300 rounded-sm text-white p-0.5 hover:bg-red-500 transition-all"
                            onClick={() => setActivePostId("")}
                          >
                            close
                          </button>
                        </div>
                        <div className="overflow-y-auto h-[80%] mb-2">
                          {post.comments &&
                            post.comments.map((comment) => (
                              <div
                                key={post.id}
                                className="bg-gray-300 mx-2 px-2 py-2 rounded-md mb-1"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 text-left border rounded-full flex justify-center items-center text-xs bg-blue-400 text-white">
                                    {comment.userName.slice(0, 1)}
                                  </div>
                                  <span className="text-xs text-gray-700">
                                    {comment.userName}
                                  </span>
                                </div>
                                <div className="text-xs text-blue-500 ml-6">
                                  {comment.comment}
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 w-full ">
                          <input
                            value={comment}
                            onChange={handleChange}
                            placeholder="write your comment..."
                            type="text"
                            className="w-full h-12 leading-12 px-5
                        bg-white   rounded-bl-md rounded-br-md
                          focus:outline-none
                    "
                            name=""
                            id=""
                          />
                          <button
                            className={`absolute right-1 top-4  ${
                              comment.trim()
                                ? "text-blue-600"
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!comment.trim()}
                            onClick={() => handleAddComment(post.id)}
                          >
                            <IoSend />
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Post;
