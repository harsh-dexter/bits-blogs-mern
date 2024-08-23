import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import DarkModeToggle from './DarkModeToggle';

export default function Header({ darkMode, setDarkMode }) {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md mb-6">
      <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">Bits & Blogs</Link>
      <nav className="flex items-center space-x-4">
        {username && (
          <>
            <Link to="/create" className="text-blue-500 dark:text-blue-300 hover:underline">Create new post</Link>
            <a onClick={logout} className="text-blue-500 dark:text-blue-300 hover:underline cursor-pointer">Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="text-blue-500 dark:text-blue-300 hover:underline">Login</Link>
            <Link to="/register" className="text-blue-500 dark:text-blue-300 hover:underline">Register</Link>
          </>
        )}
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </nav>
    </header>
  );
}
