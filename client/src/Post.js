import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, cover, createdAt, author }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg mb-5">
      <div className="mb-4">
        <Link to={`/post/${_id}`}>
          <img
            src={`${process.env.REACT_APP_API_URL}/${cover}`}
            alt={title}
            className="w-full h-60 object-cover rounded-lg"
          />
        </Link>
      </div>
      <div>
        <Link
          to={`/post/${_id}`}
          className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-500"
        >
          {title}
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {author.username}
          </span>
          <time className="ml-2">{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="text-gray-700 dark:text-gray-300">{summary}</p>
      </div>
    </div>
  );
}
