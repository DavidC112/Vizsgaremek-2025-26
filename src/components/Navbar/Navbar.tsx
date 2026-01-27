import React from "react";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="border-default sticky start-0 top-0 z-20 w-full border-b border-gray-100 bg-white/80 text-xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="placeholder.svg" alt="" />
          <span className="self-center font-semibold">ProductName</span>
        </a>
        {children}
      </div>
    </nav>
  );
};

export default Navbar;
