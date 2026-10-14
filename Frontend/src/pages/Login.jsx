import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data);
    console.log(response.status);
    if (response.ok) {
      localStorage.setItem("token", data.access);

      alert("Login Successful");

      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-[400px]"
      >
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 p-4 rounded-xl text-white font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;