"use client";
import {React, useState, useEffect, useRef} from "react";
import InputField from "@/components/InputField";
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

export default function EventsPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    location: null,
    images: [], // will be handled as a File later
  });

  const router = useRouter();
  const handleCancel = () => {
    if (confirm("Are you sure you want to discard changes and go back?")) {
      router.push("/admin/dashboard");
    }
  };

  const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
  });

  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const {name, value, type, files} = e.target;

    if (type === "file") {
      const fileArray = Array.from(files);

      const urls = fileArray.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray],
      }));

      setPreviewUrls((prev) => [...prev, ...urls]);
    } else {
      setFormData((prev) => ({...prev, [name]: value}));
    }
  };

  const handleRemoveImage = (index) => {
    // Clean up URL
    URL.revokeObjectURL(previewUrls[index].url);

    const newPreviews = [...previewUrls];
    const newImages = [...formData.images];

    newPreviews.splice(index, 1);
    newImages.splice(index, 1);

    setPreviewUrls(newPreviews);
    setFormData((prev) => ({...prev, images: newImages}));
  };

  const clearAllImages = () => {
    previewUrls.forEach((img) => URL.revokeObjectURL(img.url));
    setPreviewUrls([]);
    setFormData((prev) => ({...prev, images: []}));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Event created!");
        router.push("/admin/dashboard"); // or /admin/dashboard/events
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error("Event creation failed:", error);
      toast.error("Server error");
    }
  };

  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      previewUrls.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Create New Blood Donation Event 🩸</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Event Title</label>
          <InputField
            type="text"
            name="title"
            placeholder="e.g. Blood Drive at Central Park"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            className="flex items-center w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 shadow-md relative focus-within:ring-1 focus-within:ring-red-500 mt-0"
            placeholder="Add event details here..."
            onChange={handleChange}
            value={formData.description}
            required></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Images: </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            ref={fileInputRef}
            multiple
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 shadow-md focus:outline-none"
            onChange={handleChange}
          />
          {previewUrls.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-4">
                {previewUrls.map((img, index) => (
                  <div key={index} className="relative w-32 h-32">
                    <img
                      src={img.url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                      title="Remove">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={clearAllImages}
                className="mt-2 text-sm text-red-500 underline hover:text-red-600">
                Clear All Images
              </button>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 shadow-md focus:outline-none focus:ring-1 focus:ring-red-500"
            onChange={handleChange}
            value={formData.date}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="time"
            name="time"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 shadow-md focus:outline-none focus:ring-1 focus:ring-red-500"
            onChange={handleChange}
            value={formData.time}
          />
        </div>

        {/* Location Picker with Leaflet */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
          <div className="w-full overflow-hidden rounded-xl shadow-md border border-gray-300">
            <MapComponent
              onSelect={(coords) =>
                setFormData((prev) => ({
                  ...prev,
                  location: coords,
                }))
              }
            />
          </div>

          {formData.location && (
            <p className="mt-3 text-sm text-green-600">
              📍 Selected: <span className="font-semibold">Lat:</span>{" "}
              {formData.location.lat.toFixed(4)}, <span className="font-semibold">Lng:</span>{" "}
              {formData.location.lng.toFixed(4)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700">
            Create Event
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

