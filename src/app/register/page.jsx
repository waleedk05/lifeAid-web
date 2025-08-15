"use client";
import React, {useState} from "react";
import InputField from "@/components/InputField";
import DropDown from "@/components/DropDown";
import Button from "@/components/Button";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    fullName: "", // renamed from name
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    city: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Start loader
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // success
      console.log("Registered successfully!");
      // Optionally redirect to login
      window.location.href = "/login";
    } catch (err) {
      setError("Network error");
      setIsLoading(false); // Stop loader
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-4xl font-semibold text-center mb-8">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          <InputField
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            secureTextEntry
          />
          <InputField
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            secureTextEntry
          />
          <InputField name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <InputField
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <DropDown
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
            placeholder="Select blood group"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button title="Register" type="submit" variant="primary" loading={isLoading} />
        </form>

        <div className="flex flex-row space-x-1.5 mt-5 justify-center">
          <p>Already have an account?</p>
          <Link href="/login" className="underline hover:text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
