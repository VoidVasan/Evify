import React from 'react';

const Hero = () => {
  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
            Evify
          </h1>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Find the best student events<br />around the world.
        </h2>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
          Evify helps students discover competitions, fests, workshops, and opportunities — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
            Explore Events
          </button>
          <button className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
