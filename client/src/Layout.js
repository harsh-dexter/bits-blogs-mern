import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout({ darkMode, setDarkMode }) {
  return (
    <main>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet />
    </main>
  );
}