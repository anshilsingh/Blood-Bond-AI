import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";

function Requests() {
  const [requests] = useState([
    {
      id: 1,
      patient: "Rahul Sharma",
      blood: "A+",
      hospital: "City Hospital",
      city: "Delhi",
      status: "Urgent",
    },
    {
      id: 2,
      patient: "Anjali Verma",
      blood: "O-",
      hospital: "Apollo Hospital",
      city: "Mumbai",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Aman Khan",
      blood: "B+",
      hospital: "AIIMS",
      city: "Bhopal",
      status: "Completed",
    },
  ]);

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [hospital, setHospital] = useState("");
  const [units, setUnits] = useState(1);

  const [recommendedDonors, setRecommendedDonors] = useState([]);

  const findDonors = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/request/",
        {
          patient_name: patientName,
          blood_group: bloodGroup,
          city,
          hospital,
          units_required: units,
          emergency: true,
        }
      );

      console.log("Backend Response:", response.data);

      setRecommendedDonors(
        Array.isArray(response.data?.recommended_donors)
          ? response.data.recommended_donors
          : []
      );
    } catch (error) {
      console.error(error);
      setRecommendedDonors([]);
      alert("Failed to fetch donors");
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-red-500">
            Blood Requests
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage emergency blood requests and donor responses
          </p>
        </div>

        {/* FORM */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10">
          <h2 className="text-3xl font-bold text-red-400 mb-8">
            🚨 Emergency Blood Request
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              placeholder="Patient Name"
              className="bg-slate-800 p-4 rounded-xl"
              onChange={(e) => setPatientName(e.target.value)}
            />

            <input
              placeholder="Blood Group"
              className="bg-slate-800 p-4 rounded-xl"
              onChange={(e) => setBloodGroup(e.target.value)}
            />

            <input
              placeholder="City"
              className="bg-slate-800 p-4 rounded-xl"
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              placeholder="Hospital"
              className="bg-slate-800 p-4 rounded-xl"
              onChange={(e) => setHospital(e.target.value)}
            />

            <input
              type="number"
              className="bg-slate-800 p-4 rounded-xl"
              onChange={(e) => setUnits(e.target.value)}
            />
          </div>

          <button
            onClick={findDonors}
            className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold"
          >
            Find Best Donors
          </button>
        </div>

        {/* AI DONORS */}
        {recommendedDonors?.length > 0 && (
          <div className="mb-12">

            <h1 className="text-4xl font-bold text-red-400 mb-8">
              🧠 Top AI Recommended Donors
            </h1>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {recommendedDonors.filter(Boolean).map((donor, index) => (

                <div
                  key={donor?.id || index}
                  className="bg-slate-900 border border-red-700 rounded-3xl p-7 shadow-xl"
                >

                  <h2 className="text-2xl font-bold text-red-400">
                    {index === 0 && "👑 "}
                    {donor?.name || "Unknown"}
                  </h2>

                  <div className="space-y-3 mt-6">

                    <p>
                      🩸 Blood Group:
                      <span className="ml-2 font-bold">
                        {donor?.blood_group || "-"}
                      </span>
                    </p>

                    <p>
                      📍 City:
                      <span className="ml-2 font-bold">
                        {donor?.city || "-"}
                      </span>
                    </p>

                    <p>
                      📞 Phone:
                      <span className="ml-2 font-bold">
                        {donor?.phone || "-"}
                      </span>
                    </p>

                    <p>
                      🧠 AI Score:
                      <span className="text-red-400 font-bold ml-2">
                        {Math.round(donor?.ai_score || 0)}
                      </span>
                    </p>

                    <p>
                      ⚡ Priority:
                      <span className="ml-2 font-bold">
                        {donor?.priority_level || "Medium"}
                      </span>
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Requests;