// "use client";
import React from "react";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-xl font-semibold text-gray-600">
        Not logged in.
      </div>
    );
  }

  const {name, email, role, image} = session.user;

  return (
    <div className="max-w-2xl mx-auto mt-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-10 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-6">
          <div className="flex-shrink-0">
            <Image
              src={image || "/default-avatar.png"}
              alt="User Avatar"
              width={96}
              height={96}
              className="rounded-full border-2 border-white shadow-md"
            />
          </div>

          <div className="mt-4 sm:mt-0 flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
              {role}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t pt-6 space-y-4 text-sm text-gray-700">
          <ProfileField label="Full Name" value={name} />
          <ProfileField label="Email" value={email} />
          <ProfileField label="Role" value={role} />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            disabled
            className="px-4 py-2 bg-gray-200 text-gray-500 text-sm rounded-md cursor-not-allowed">
            Edit Profile (Coming Soon)
          </button>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

function ProfileField({label, value}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value || "-"}</span>
    </div>
  );
}
