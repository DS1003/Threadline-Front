import React from 'react';
import { Camera, Edit } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="relative">
      <div className="h-80 overflow-hidden">
        <img
          src={user.coverPhoto}
          alt="Cover"
          className="w-full object-cover"
        />
        <button className="absolute right-4 bottom-4 bg-white p-2 rounded-full shadow-lg">
          <Camera className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end">
        <div className="relative">
          <img
            src={user.profilePicture}
            alt={user.name}
            className="w-40 h-40 rounded-full border-4 border-white"
          />
          <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg">
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="ml-4 mb-4">
          <h1 className="text-3xl font-bold text-white shadow-text">{user.name}</h1>
          <p className="text-white shadow-text">{user.tagline}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;