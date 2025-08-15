"use client";

import React, {useState} from "react";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {LogOut, Calendar, UserPlus, Users} from "lucide-react";

export default function AdminDashboard() {
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Start loader
    await signOut({callbackUrl: "/"});
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-red-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={`flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg transition-all ${
            isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-700"
          }`}>
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Logging out...
            </>
          ) : (
            <>
              <LogOut size={18} /> Logout
            </>
          )}
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Donors" value="120" color="text-red-600" />
        <StatCard title="Total Requests" value="35" color="text-blue-600" />
        <StatCard title="Available Units" value="98" color="text-green-600" />
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ActionCard
          title="Manage Events"
          icon={<Calendar size={28} />}
          href="/admin/dashboard/events"
          description="Create and manage blood donation events."
        />
        <ActionCard
          title="Donor Info"
          icon={<Users size={28} />}
          href="/admin/dashboard/donors"
          description="View and manage registered donors."
        />
        <ActionCard
          title="Create Patients"
          icon={<UserPlus size={28} />}
          href="/admin/dashboard/create-patient"
          description="Add new patients needing blood transfusion."
        />
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({title, value, color}) => (
  <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition">
    <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

// Action Card Component
const ActionCard = ({title, icon, href, description}) => (
  <Link href={href}>
    <div className="cursor-pointer bg-white rounded-xl p-6 shadow hover:shadow-md hover:bg-red-50 transition">
      <div className="flex items-center gap-4 mb-4 text-red-600">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </Link>
);
