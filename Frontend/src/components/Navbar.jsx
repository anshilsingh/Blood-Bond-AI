import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <div className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl px-6 py-5 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between mb-8 shadow-2xl">

      {/* SEARCH */}
      <div className="flex items-center gap-3 bg-slate-900/70 px-5 py-4 rounded-2xl w-full lg:w-[400px] border border-slate-700">

        <FaSearch className="text-red-400" />

        <input
          type="text"
          placeholder="Search donors, cities..."
          className="bg-transparent outline-none w-full text-white"
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">

          <div className="bg-slate-900/70 border border-slate-700 p-4 rounded-2xl hover:border-red-500 transition-all">

            <FaBell className="text-xl text-red-400" />

          </div>

          {/* RED DOT */}
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-slate-900/70 border border-slate-700 px-4 py-3 rounded-2xl">

          <FaUserCircle className="text-3xl text-red-400" />

          <div>
            <h3 className="font-bold">
              Admin
            </h3>

            <p className="text-sm text-slate-400">
              Blood Bond Team
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;