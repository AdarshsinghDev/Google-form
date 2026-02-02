import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    role: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        userData,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleChange}>
        <label htmlFor="fullname">Fullname</label>
        <input type="text" />

         <label htmlFor="email">Email</label>
        <input type="email" />

         <label htmlFor="role">Role</label>
        <input type="" />

         <label htmlFor="fullname">Fullname</label>
        <input type="text" />

         <label htmlFor="fullname">Fullname</label>
        <input type="text" />
      </form>
    </div>
  );
};

export default Signup;
