"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(event.date).toLocaleDateString().includes(searchTerm)
  );

  const handleMarkAttendance = async (eventId) => {
    try {
      const res = await fetch(`/api/events/${eventId}/attendance`, {
        method: "POST",
      });
      const result = await res.json();
      alert(result.message || "Marked attendance!");
    } catch (error) {
      console.error("Attendance error:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-6">
      <h1 className="text-5xl font-bold mb-6 text-center">Upcoming Events</h1>
      <p className="text-center mb-6">
        The Events Page display upcoming blood donation events such as blood camps, donation drives,
        awareness sessions, and mobile blood collection units. It enables users to stay informed,
        view event details, and optionally mark their attendance.{" "}
      </p>
      {/* Search Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search events by title or date..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Events Grid */}
      {loading ? (
        <p className="text-center text-gray-600">Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No matching events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition">
              {event.images?.[0] && (
                <Image
                  src={event.images[0]}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="rounded-md object-cover w-full mb-4 h-40"
                />
              )}
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()} | 🕒 {event.time || "N/A"}
              </p>
              <p className="text-sm mt-2 line-clamp-2">{event.description}</p>
              <p className="text-sm text-blue-600 mt-1">
                📍 {event.location?.lat.toFixed(2)}, {event.location?.lng.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-lg relative">
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedEvent(null)}>
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(selectedEvent.date).toLocaleDateString()} | 🕒 {selectedEvent.time || "N/A"}
            </p>
            <p className="mb-4 text-gray-700">{selectedEvent.description}</p>
            <p className="text-blue-600 mb-4">
              📍 {selectedEvent.location?.lat.toFixed(2)}, {selectedEvent.location?.lng.toFixed(2)}
            </p>
            <button
              onClick={() => handleMarkAttendance(selectedEvent._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow">
              Mark Attendance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
