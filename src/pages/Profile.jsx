import { useAuthContext } from "../context/Auth";
import { useCreatePost } from "../hooks/CreatePost";

function Profile() {
    const {storagePost, handleDelete} = useCreatePost();
    const ownUser = JSON.parse(localStorage.getItem('user')).email;
    const ownPosts = storagePost &&storagePost.filter(post => post.email === ownUser);
  return (
    <div className="w-4xl mx-auto px-4 py-8">
      <h1 className="text-center text-blue-500 font-semibold text-2xl">
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
                <button className="absolute right-1 top-4" onClick={() => handleDelete(post.id)}>❌</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
