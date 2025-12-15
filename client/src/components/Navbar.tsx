import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 transition-all">
        <a href="#" className="font-extrabold text-3xl">
          Hyper
        </a>

        <ul className="md:flex hidden items-center gap-10">
          <li>
            <a className="hover:text-gray-500/80 transition" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500/80 transition" href="#">
              Services
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500/80 transition" href="#">
              Portfolio
            </a>
          </li>
          <li>
            <a className="hover:text-gray-500/80 transition" href="#">
              Pricing
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="bg-white text-gray-600 border cursor-pointer border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Get started
        </button>

        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#000"
          >
            <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
          </svg>
        </button>

        <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white p-6 hidden md:hidden">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <a href="#" className="text-sm">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-sm">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-sm">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="text-sm">
                Pricing
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
          >
            Get started
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
