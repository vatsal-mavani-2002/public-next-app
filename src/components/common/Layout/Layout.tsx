"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ children, sectionRefs }: any) {
  const [activeTab, setActiveTab] = useState<any>();
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <Navbar setIsSideBarOpen={setIsSideBarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSideBarOpen={setIsSideBarOpen} sectionRefs={sectionRefs} />
      <Header sectionRefs={sectionRefs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {children}
      <Footer sectionRefs={sectionRefs} setActiveTab={setActiveTab} />
    </>
  );
}

export default Layout;
