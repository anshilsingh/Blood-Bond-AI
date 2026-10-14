import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  FaTint,
  FaUsers,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPhone,
  FaSignOutAlt,
  FaHospital,
  FaCrown,
} from "react-icons/fa";

function Home() {
  const [donors, setDonors] = useState([]);

  const [searchBlood, setSearchBlood] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    blood_group: "",
    city: "",
    phone: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedDonorId, setSelectedDonorId] = useState(null);

  const [editData, setEditData] = useState({
    id: "",
    name: "",
    blood_group: "",
    city: "",
    phone: "",
  });

  // FETCH DONORS
  const fetchDonors = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/donors/"
      );

      const data = await response.json();

      setDonors(data);

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD DONOR
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/add/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {

        toast.success("Donor Added Successfully ❤️");

        setFormData({
          name: "",
          blood_group: "",
          city: "",
          phone: "",
        });

        fetchDonors();
      }

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE DONOR
  const deleteDonor = (id) => {
    setSelectedDonorId(id);
    setIsDeleteOpen(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete/${selectedDonorId}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {

        toast.success("Donor Deleted");

        fetchDonors();

        setIsDeleteOpen(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT DONOR
  const updateDonor = (donor) => {
    setEditData(donor);
    setIsEditOpen(true);
  };

  // SAVE UPDATED DONOR
  const saveUpdatedDonor = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/update/${editData.id}/`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {

        toast.success("Donor Updated");

        fetchDonors();

        setIsEditOpen(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // FILTERED DONORS
  const filteredDonors = donors
  .filter((donor) => {
    return (
      (donor.blood_group || "")
        .toLowerCase()
        .includes(searchBlood.toLowerCase()) &&
      (donor.city || "")
        .toLowerCase()
        .includes(searchCity.toLowerCase())
    );
  })
  .sort((a, b) => b.ai_score - a.ai_score);

  // DASHBOARD STATS
  const totalDonors = donors.length;

  const totalCities = [
    ...new Set(donors.map((d) => d.city)),
  ].length;

  const totalBloodGroups = [
    ...new Set(donors.map((d) => d.blood_group)),
  ].length;

  const priorityDonors = donors.filter(
    (d) => d.priority_level === "Critical"
  ).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-8">
        <Navbar />

        
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-800 to-red-900 rounded-3xl p-10 mb-10 shadow-2xl"
        >

          <div className="absolute top-0 right-0 w-72 h-72 bg-red-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <h2 className="text-4xl font-black mb-4">
              Save Lives With AI Powered Blood Matching
            </h2>

            <p className="text-red-100 text-lg max-w-3xl">
              Advanced donor management platform with smart search,
              AI recommendations, emergency prioritization,
              and intelligent analytics.
            </p>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-7 shadow-2xl"
          >

            <div className="flex justify-between items-center mb-5">
              <FaUsers className="text-4xl text-white/80" />

              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Live
              </span>
            </div>

            <h3 className="text-white/80 mb-2">
              Total Donors
            </h3>

            <p className="text-5xl font-black">
              {totalDonors}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-7 shadow-2xl"
          >

            <div className="flex justify-between items-center mb-5">
              <FaMapMarkerAlt className="text-4xl text-red-400" />

              <span className="text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                Cities
              </span>
            </div>

            <h3 className="text-slate-400 mb-2">
              Active Cities
            </h3>

            <p className="text-5xl font-black text-red-400">
              {totalCities}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-7 shadow-2xl"
          >

            <div className="flex justify-between items-center mb-5">
              <FaTint className="text-4xl text-red-400" />

              <span className="text-sm bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                Groups
              </span>
            </div>

            <h3 className="text-slate-400 mb-2">
              Blood Groups
            </h3>

            <p className="text-5xl font-black text-red-400">
              {totalBloodGroups}
            </p>

          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-7 shadow-2xl"
          >

            <div className="flex justify-between items-center mb-5">
              <FaHeartbeat className="text-4xl text-green-400" />

              <span className="text-sm bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                AI
              </span>
            </div>

            <h3 className="text-slate-400 mb-2">
              Priority Donors
            </h3>

            <p className="text-5xl font-black text-green-400">
              {priorityDonors}
            </p>

          </motion.div>

        </div>

        {/* SEARCH */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-4">

            <FaSearch className="text-red-400" />

            <input
              type="text"
              placeholder="Search Blood Group..."
              value={searchBlood}
              onChange={(e) =>
                setSearchBlood(e.target.value)
              }
              className="w-full bg-transparent p-4 outline-none"
            />

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center px-4">

            <FaSearch className="text-red-400" />

            <input
              type="text"
              placeholder="Search City..."
              value={searchCity}
              onChange={(e) =>
                setSearchCity(e.target.value)
              }
              className="w-full bg-transparent p-4 outline-none"
            />

          </div>

        </div>

        {/* ADD DONOR FORM */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-12">

          <div className="flex items-center gap-3 mb-8">

            <FaHospital className="text-3xl text-red-500" />

            <h2 className="text-3xl font-black text-red-400">
              Register New Donor
            </h2>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-800/70 border border-slate-700 p-4 rounded-2xl outline-none focus:border-red-500"
              required
            />

            <input
              type="text"
              name="blood_group"
              placeholder="Blood Group"
              value={formData.blood_group}
              onChange={handleChange}
              className="bg-slate-800/70 border border-slate-700 p-4 rounded-2xl outline-none focus:border-red-500"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="bg-slate-800/70 border border-slate-700 p-4 rounded-2xl outline-none focus:border-red-500"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-slate-800/70 border border-slate-700 p-4 rounded-2xl outline-none focus:border-red-500"
              required
            />

            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-red-600 to-red-800 p-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-2xl"
            >
              Add Donor
            </button>

          </form>

        </div>

        {/* DONOR CARDS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

          {loading ? (

            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-72 rounded-3xl bg-white/5 animate-pulse"
              ></div>
            ))

          ) : filteredDonors.length > 0 ? (

            filteredDonors.map((donor, index) => (

              <motion.div
                key={donor.id}

                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}

                transition={{
                  delay: index * 0.05,
                }}

                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0px 0px 30px rgba(239,68,68,0.3)",
                }}

                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:border-red-500 transition-all"
              >

                <div className="flex justify-between items-start mb-5">

                  <div>
                    <h2 className="text-2xl font-black text-red-400 flex items-center gap-2">
                      
                      {index === 0 && (
                        <FaCrown className="text-yellow-400" />
                      )}

                      {donor.name}

                    </h2>

                    <p className="text-slate-400 mt-1">
                      Smart Donor Profile
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-full font-bold">
                    {donor.blood_group}
                  </div>

                </div>

                <div className="space-y-3 text-slate-300">

                  <p className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-red-400" />
                    {donor.city}
                  </p>

                  <p className="flex items-center gap-3">
                    <FaPhone className="text-red-400" />
                    {donor.phone}
                  </p>

                  <p className="flex items-center gap-3">
                    🧠 AI Score :
                    <span className="text-red-400 font-bold">
                    {Math.round(donor.ai_score)}
                    </span>
                  </p>

                  <p className="flex items-center gap-3">
                    ⚡ Priority :
                    <span className="font-bold">
                    {donor.priority_level}
                    </span>
                  </p>

                </div>

                {/* AI MATCH */}
                <div className="mt-6">
                  <div className="flex justify-between mb-3">
                    
                    <span className="text-slate-400">
                      AI Score
                    </span>
                      
                    <span className="text-red-400 font-bold">
                      {Math.round(donor.ai_score)}%
                    </span>
                        
                  </div>
                        
                  <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                    
                    <div
                      style={{
                        width: `${donor.ai_score}%`
                      }}
                          
                      className="h-full bg-gradient-to-r from-red-500 to-red-700"
                    ></div>
                          
                  </div>
                          
                </div>


                {/* PRIORITY */}
                <div
                className={`mt-5 px-4 py-3 rounded-2xl text-center font-bold
                  
                  ${
                    donor.priority_level==="Critical"
                    ?"bg-red-500/20 border border-red-500 text-red-400"
                    : donor.priority_level==="High"
                    ?"bg-orange-500/20 border border-orange-500 text-orange-400": 
                    donor.priority_level==="Medium"
                    ?"bg-yellow-500/20 border border-yellow-500 text-yellow-400"
                    :"bg-green-500/20 border border-green-500 text-green-400"
                    }`}
                    >
                      
                      🚑 {donor.priority_level} Priority Donor
                      
                      </div>

                {/* BUTTONS */}
                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => updateDonor(donor)}
                    className="flex-1 flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl font-bold transition-all"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteDonor(donor.id)
                    }
                    className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-2xl font-bold transition-all"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </motion.div>

            ))

          ) : (

            <div className="col-span-full text-center py-20">

              <h2 className="text-4xl font-black text-slate-500 mb-4">
                No Donors Found
              </h2>

              <p className="text-slate-400">
                Try searching with another blood group or city.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-[450px] shadow-2xl">

            <h2 className="text-3xl font-black text-red-500 mb-6">
              Edit Donor
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700"
                placeholder="Name"
              />

              <input
                type="text"
                value={editData.blood_group}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    blood_group: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700"
                placeholder="Blood Group"
              />

              <input
                type="text"
                value={editData.city}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    city: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700"
                placeholder="City"
              />

              <input
                type="text"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    phone: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700"
                placeholder="Phone"
              />

            </div>

            <div className="flex gap-4 mt-8">

              <button
                onClick={saveUpdatedDonor}
                className="flex-1 bg-green-600 hover:bg-green-700 p-4 rounded-2xl font-bold"
              >
                Save Changes
              </button>

              <button
                onClick={() =>
                  setIsEditOpen(false)
                }
                className="flex-1 bg-slate-700 hover:bg-slate-600 p-4 rounded-2xl font-bold"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-[400px] text-center shadow-2xl">

            <h2 className="text-3xl font-black text-red-500 mb-4">
              Delete Donor
            </h2>

            <p className="text-slate-400 mb-8">
              Are you sure you want to remove this donor?
            </p>

            <div className="flex gap-4">

              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 p-4 rounded-2xl font-bold"
              >
                Delete
              </button>

              <button
                onClick={() =>
                  setIsDeleteOpen(false)
                }
                className="flex-1 bg-slate-700 hover:bg-slate-600 p-4 rounded-2xl font-bold"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;