import React from "react";
import sidebarLogo from "../assets/sidebar-logo.png";

export const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-4 py-6">
      {/* Floating tags */}
      <div className="relative mb-6 w-full max-w-3xl flex justify-center">
        <span className="absolute top-12 left-20 rotate-[-8deg] bg-red-400 text-xs font-semibold px-3 py-1 rounded shadow-sm">
          Data Pirates
        </span>
        <span className="absolute top-12 right-12 rotate-[6deg] bg-red-400 text-xs font-semibold px-3 py-1 rounded shadow-sm">
          Developer-friendly
        </span>
        <span className="absolute top-24 right-10 rotate-[2deg] bg-emerald-400 text-xs font-semibold px-3 py-1 rounded shadow-sm">
          Privacy-first
        </span>
        <span className="absolute top-36 left-1/2 translate-x-12 rotate-[-2deg] bg-emerald-500 text-xs font-semibold px-3 py-1 rounded shadow-sm transform">
          Built for Accessibility
        </span>
      </div>

      {/* Main heading */}
      <img
        src={sidebarLogo}
        alt="Nugget"
        className="max-h-40 md:max-h-44 object-contain"
      />

      <p className="mt-4 max-w-3xl text-center text-lg md:text-xl font-semibold text-text">
        A free, open source, and extensible speech-to-text application that
        works completely offline.
      </p>

      {/* Subheading */}
      <div className="mt-10 text-center space-y-2">
        <p className="font-semibold text-sm tracking-wide uppercase text-text">
          Arm AI Developer Challenge
        </p>
        <p className="max-w-xl text-sm md:text-base text-mid-gray mx-auto">
          This innovative, efficient, offline speech-to-text application is
          built for the future of AI on Arm!
        </p>
      </div>
    </div>
  );
};

export default Homepage;
