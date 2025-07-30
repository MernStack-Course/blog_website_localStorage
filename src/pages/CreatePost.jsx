import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CustomInput from "../components/CustomInput";
import uploadImageHolder from '../../public/vite.svg'



import { useCreatePost } from "../hooks/CreatePost";
import CustomButton from "../components/CustomButton";

export default function CreatePost() {
  const { postSchema, createPost } = useCreatePost();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState({ title: [], content: [] });
  const [images, setImages] = useState([]);
  const handleFileChange =async(e) =>{
    const files = Array.from(e.target.files);
    files.map(file => {
      const reader = new FileReader();
      reader.onloadend= () =>{
        const base64 = reader.result;
        const newImages= [...images,base64];
        setImages(newImages);
      }
      reader.readAsDataURL(file);
    })

  }

  const handleChange = (fieldName, value) => {
    setPost((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        console.log("base64: ",images.length);
    try {
      await postSchema.validate(post, { abortEarly: false });
      const postObject = {
        title:post.title,
        content: post.content,
        user:localStorage.getItem('user') ? localStorage.getItem('user') : '',
        postImages: images
      }
      await createPost(postObject);
      setPost({title: '', content: ''})
      setError({title:[], content:[]});
      setImages([]);
    } catch (validationErrors) {
      const newErrors = { title: [], content: [] };
      validationErrors.inner.forEach((err) => {
        newErrors[err.path] = [...newErrors[err.path], err.message];
      });
      setError(newErrors);
    }
  };
  return (
    <div className="border w-4xl mt-8 mx-auto px-4 py-6 border-blue-300 rounded-lg">
      <h1 className="text-blue-500 font-semibold text-2xl mb-10">
        Create New Post:
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <CustomInput
            type="text"
            label="Post Title"
            value={post.title}
            placeholder="enter post title..."
            onChange={(value) => handleChange("title", value)}
          />
          {
            error && error.title.map((err, index) => <p className="text-red-500" key={index}>{err}</p>)
          }
        </div>
        <div className="mt-6">
          <label className="text-blue-500">Post Content:</label>
          <textarea
            className="border w-full py-4 px-2 mt-2 border-blue-300 rounded-lg 
          focus:border-none focus:outline-blue-300
          "
            placeholder="enter your post content..."
            value={post.content}
            onChange={(e) => handleChange("content", e.target.value)}
          ></textarea>
          {
            error && error.content.map((err, index) => <p className="text-red-500" key={index}>{err}</p>)
          }
        </div>
        <div className="mt-6">
          <label htmlFor="image" className="flex flex-col items-center gap-2">
            <h1 className="font-semibold text-blue-500">choose images</h1>
            <img src={uploadImageHolder} alt="" className="w-10 h-10" />
          </label>
          <input type="file" className="hidden" id="image" onChange={handleFileChange} multiple/>
        </div>
        <div className="flex justify-center items-center">
          <img src={images} alt="" className="w-96" />
        </div>
        <CustomButton
          value="Create Post"
          type="submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

//  <Editor
//   apiKey="b6qlesdkljo38n4sp9nt6s4b249qte0vjc9qs5ur59s9yw98"
//   init={{
//     plugins: [
//       // Core editing features
//       "anchor",
//       "autolink",
//       "charmap",
//       "codesample",
//       "emoticons",
//       "image",
//       "link",
//       "lists",
//       "media",
//       "searchreplace",
//       "table",
//       "visualblocks",
//       "wordcount",
//       // Your account includes a free trial of TinyMCE premium features
//       // Try the most popular premium features until Jul 15, 2025:
//       "checklist",
//       "mediaembed",
//       "casechange",
//       "formatpainter",
//       "pageembed",
//       "a11ychecker",
//       "tinymcespellchecker",
//       "permanentpen",
//       "powerpaste",
//       "advtable",
//       "advcode",
//       "editimage",
//       "advtemplate",
//       "ai",
//       "mentions",
//       "tinycomments",
//       "tableofcontents",
//       "footnotes",
//       "mergetags",
//       "autocorrect",
//       "typography",
//       "inlinecss",
//       "markdown",
//       "importword",
//       "exportword",
//       "exportpdf",
//     ],
//     toolbar:
//       "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//     tinycomments_mode: "embedded",
//     tinycomments_author: "Author name",
//     mergetags_list: [
//       { value: "First.Name", title: "First Name" },
//       { value: "Email", title: "Email" },
//     ],
//     ai_request: (request, respondWith) =>
//       respondWith.string(() =>
//         Promise.reject("See docs to implement AI Assistant")
//       ),
//   }}
//   initialValue="Welcome to TinyMCE!"
// />
