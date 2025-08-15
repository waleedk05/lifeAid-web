"use client";

import React, {useState} from "react";
import DropDown from "@/components/DropDown";
import InputField from "@/components/InputField"; // Assuming correct path

export default function CreatePatient() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodGroup: "",
    gender: "",
    age: "",
    phoneNumber: "",
    medicalNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const ageNumber = Number(form.age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      setMessage("❌ Age must be a positive number.");
      return;
    }
    try {
      const res = await fetch("/api/patient", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage("✅ Patient account created successfully!");
      setForm({
        fullName: "",
        email: "",
        password: "",
        bloodGroup: "",
        gender: "",
        age: "",
        phoneNumber: "",
        medicalNotes: "",
      });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Create Patient Account</h2>
      {message && <div className="mb-4 text-sm text-center">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <InputField
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <InputField
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          secureTextEntry
          required
        />

        <DropDown
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          placeholder="Select blood group"
          required
        />

        <DropDown
          name="gender"
          value={form.gender}
          onChange={handleChange}
          options={["Male", "Female", "Other"]}
          placeholder="Select Gender"
          required
        />

        <InputField
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          min={1}
        />

        <InputField
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <textarea
          name="medicalNotes"
          placeholder="Medical Notes"
          value={form.medicalNotes}
          onChange={handleChange}
          className="w-full mt-0 p-3 border border-gray-300 rounded-xl bg-gray-100 shadow-md focus:ring-2 focus:ring-red-500 focus:outline-none"
        />

        <button
          disabled={loading}
          type="submit"
          className={`w-full rounded-xl px-4 py-3 font-semibold text-white shadow-md transition duration-200 ease-in-out mt-10 flex justify-center items-center gap-2 bg-red-700 hover:bg-red-800${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}>
          {loading ? "Creating..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
}
