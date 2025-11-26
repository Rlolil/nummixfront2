import React, { use, useEffect } from "react";
import Header from "../header";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../../pages/sidebar";
import AiMini from "../../pages/aimini";

function MainLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    // Ensure initial redirect uses an internal absolute path
    navigate("/muhasibat/dashboard")
  }, [])
  // Ensure saved theme is applied on initial load (dark/light)
  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light'
    const root = window.document.documentElement
    if (stored === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [])
  return (
    <div className="flex overflow-x-hidden h-[100vh] dark:bg-[#001233]">
      <Sidebar />
      <div className="w-full overflow-x-hidden  h-[100%] dark:bg-[#001233]">
        <AiMini />
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
