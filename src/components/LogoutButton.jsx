"use client";
import {React, useState} from "react";
import Button from "@/components/Button";
import {signOut} from "next-auth/react";

export default function LogoutButton() {
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(false);
    await signOut({callbackUrl: "/"});
  };
  return <Button title="Logout" variant="primary" onClick={handleLogout} loading={isLoading} />;
}
