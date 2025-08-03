import { useAuthContext } from "../context/Auth";
import { useCreatePost } from "../hooks/CreatePost";

function Profile() {
  const { storagePost, handleDelete } = useCreatePost();
  const ownUser = JSON.parse(localStorage.getItem("user")).email;
  const ownPosts =
    storagePost && storagePost.filter((post) => post.email === ownUser);
  return (
    <div className="w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between">
      <div className="flex gap-2">
        <label htmlFor="username">Username: </label>
        <h1 className="text-blue-500 hover:underline cursor-pointer" id="username">{JSON.parse(localStorage.getItem("user")).username}</h1>
      </div>
      <div className="flex gap-2">
        <label htmlFor="">Email:</label>
        <a  className="text-blue-500 hover:underline cursor-pointer">{JSON.parse(localStorage.getItem("user")).email}</a>
      </div>
      </div>

      <h1 className="text-center text-blue-500 font-semibold text-1xl mt-5">
        Posts That You Have Been Created
      </h1>
      <hr className="text-blue-500 mb-6 mt-3 " />
      <div className="grid grid-cols-3  gap-3  ">
        {ownPosts &&
          ownPosts.map((post) => {
            return (
              <div
                key={post.id}
                className="w-full border relative rounded-md border-blue-500 mb-5 px-3 py-3"
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
                <p className="mb-3">{post.postContent.substring(0, 100)}</p>
                {post.postImages.map((p, index) => (
                  <div className=" w-full" key={index}>
                    <img src={p} alt="" />
                  </div>
                ))}
                <button
                  className="absolute right-1 top-4 text-xs bg-red-300 rounded-sm text-white p-0.5 hover:bg-red-500 transition-al"
                  onClick={() => handleDelete(post.id)}
                >
                  DeletePost
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
