import {
  FaHome,
  FaTint,
  FaUserFriends,
  FaChartBar,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/",
    },

    {
      name: "Requests",
      icon: <FaTint />,
      path: "/requests",
    },

    {
      name: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
    },

    {
      name: "Login",
      icon: <FaUserFriends />,
      path: "/login",
    },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 fixed left-0 top-0 border-r border-slate-800 p-6 flex flex-col justify-between">

      {/* TOP SECTION */}
      <div>

        {/* LOGO */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-red-500">
            Blood Bond
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Save Lives Through Donation ❤️
          </p>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-4">
          {menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 p-4 rounded-xl font-semibold transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-slate-800 hover:bg-slate-700 text-gray-200"
              }`}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <p className="text-gray-400 text-sm leading-6">
          One donation can save multiple lives.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;