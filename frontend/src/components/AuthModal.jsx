import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-[90%] md:w-[400px] p-6 relative shadow-lg border border-gray-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-white hover:text-red-500"
        >
          <AiOutlineClose size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          {isLogin ? "Welcome Back!" : "Join Restoooo"}
        </h2>

        <form className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none text-sm"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-xl hover:opacity-90 transition-all"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-4">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-brightColor cursor-pointer font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
