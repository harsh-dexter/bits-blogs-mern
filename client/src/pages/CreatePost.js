import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files[0]) {
      data.set('file', files[0]);
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8" onSubmit={createNewPost}>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create New Post</h2>
      <input type="text"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)}
             className="mb-4 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <input type="text"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)}
             className="mb-4 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <div className="mb-4">
        <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Choose File
        </label>
        <input id="file-upload" type="file"
               onChange={ev => setFiles(ev.target.files)}
               className="hidden"
        />
        <span className="ml-3 text-gray-600 dark:text-gray-300">{files[0] ? files[0].name : 'No file chosen'}</span>
      </div>
      <Editor value={content} onChange={setContent} />
      <button className="mt-6 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 w-full">Create Post</button>
    </form>
  );
}