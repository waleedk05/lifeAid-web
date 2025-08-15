"use client";

import React, {useState} from "react";
import Link from "next/link";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({email: "", password: ""});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    setError(""); // Clear error if user starts typing
  };

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!form.email || !form.password) {
      setError("Both fields are required");
      setIsLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) {
      setError("Invalid Credentials");
      setIsLoading(false);
    } else {
      let session = null;
      for (let i = 0; i < 5; i++) {
        session = await getSession();
        console.log("Client-side session:", session);
        if (session?.user?.role) break;
        await new Promise((resolve) => setTimeout(resolve, 100)); // wait 100ms
      }

      if (session?.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/homePage");
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-5xl font-semibold text-center mb-6">Login</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            name="password"
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" title="Login" variant="primary" loading={isLoading} />
        </form>

        <div className="flex flex-row space-x-1.5 mt-5 justify-center">
          <p>Don't have an account?</p>
          <Link href="/register" className="underline text-blue-600 hover:text-blue-400">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
