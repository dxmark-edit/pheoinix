import React from "react";

export default function Profil() {
  const user = {
    username: "AnimeFan_21",
    email: "animefan21@example.com",
    avatar: "/assets/avatar.png",
    memberSince: "March 2024",
  };

  return (
    <div className="profil-page max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-400">Member since: {user.memberSince}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Change password</li>
          <li>Update email</li>
          <li>Manage favorites</li>
        </ul>
      </div>
    </div>
  );
}
