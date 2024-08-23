import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/post`)
      .then(response => response.json())
      .then(posts => setPosts(posts));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recent Posts</h2>
      <div className="space-y-6">
        {posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}