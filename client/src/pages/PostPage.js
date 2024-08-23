import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from 'react-router-dom';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then(response => response.json())
      .then(postInfo => setPostInfo(postInfo));
  }, [id]);

  if (!postInfo) return '';

  return (
    <div className="post-page max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{postInfo.title}</h1>
      <div className="flex items-center justify-between mb-4">
        <time className="text-gray-600 dark:text-gray-400">{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author text-gray-600 dark:text-gray-400">by @{postInfo.author.username}</div>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row mb-4">
          <Link className="edit-btn inline-flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image mb-6">
        <img src={`${process.env.REACT_APP_API_URL}/${postInfo.cover}`} alt="" className="w-full h-80 object-cover rounded-lg"/>
      </div>
      <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}