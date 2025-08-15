"use client";
import React from "react";
import {CalendarDays, MapPin, Droplets} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 md:py-16 bg-red-50 relative">
      {/* Hero */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-4">
          Welcome to LifeAid ❤️
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-6">
          Every drop counts. Track your donations, request blood, and stay updated with upcoming
          donation events in your city.
        </p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow transition"
          onClick={() => (window.location.href = "/user/requestBlood")}>
          Request Blood
        </button>
      </div>

      {/* Quote */}
      <div className="bg-white rounded-xl shadow-md p-4 max-w-lg text-center mb-10 border">
        <p className="italic text-gray-700 text-sm sm:text-base">
          “The gift of blood is the gift of life.”
        </p>
      </div>

      {/* User Stats */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-white p-6 rounded-xl shadow text-center border">
          <Droplets className="text-red-600 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-red-700">2</div>
          <div className="text-gray-600 text-sm">Donations Made</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center border">
          <Droplets className="text-green-600 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-green-700">1</div>
          <div className="text-gray-600 text-sm">Requests Fulfilled</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center border">
          <CalendarDays className="text-blue-600 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-blue-700">5</div>
          <div className="text-gray-600 text-sm">Upcoming Events</div>
        </div>
      </div>

      {/* Upcoming Event */}
      <div className="bg-white p-6 rounded-xl shadow-md border max-w-2xl w-full mb-16">
        <h3 className="text-xl font-semibold text-red-700 mb-3 text-center">Next Upcoming Event</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-lg font-medium text-gray-800">Blood Drive at City Hospital</div>
            <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <CalendarDays size={16} />
              August 15, 2025 – 9:00 AM
            </div>
            <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
              <MapPin size={16} />
              Lahore, Pakistan
            </div>
          </div>
        
        </div>
      </div>

      {/* Footer */}
      <div className="text-gray-500 text-xs sm:text-sm text-center w-full absolute bottom-4">
        © {new Date().getFullYear()} LifeAid. All rights reserved.
      </div>
    </div>
  );
}
