import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-6 md:px-20 py-12 bg-gray-50">
      {/* Text Section */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          Your Gateway to a World of Connections
        </h1>

        <Link
          to="/Login"
          className="py-3 px-6 bg-white rounded-3xl border-2 border-gray-300 text-black text-lg text-center hover:bg-gray-100 transition duration-200 w-full md:w-[70%]"
        >
          Sign in with Email
        </Link>

        <p className="text-sm text-gray-600 w-full md:w-[70%]">
          By clicking continue to join or sign in, you agree to
          <span className="text-blue-800 cursor-pointer hover:underline"> Global Connect's User Agreement</span>,
          <span className="text-blue-800 cursor-pointer hover:underline"> Privacy Policy</span>, and
          <span className="text-blue-800 cursor-pointer hover:underline"> Cookie Policy</span>.
        </p>

        <p className="text-lg">
          New to Global Connect?{' '}
          <Link to="/signUp" className="text-blue-800 cursor-pointer hover:underline">
            Join Now
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          alt="Global Network"
          src="https://thumbs.dreamstime.com/b/abstract-network-vector-concept-world-globe-internet-global-connection-background-abstract-network-vector-concept-103318227.jpg"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default LandingPage;
