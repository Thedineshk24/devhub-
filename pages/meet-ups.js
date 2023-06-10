import React from 'react';

const EventCard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:w-1/4 bg-blue-500">
        <img
          src="/path/to/event-image.jpg"
          alt="Event Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="md:w-3/4 p-4">
        <h3 className="text-2xl font-bold mb-2">Event Title</h3>
        <p className="text-gray-600 mb-4">
          Event description lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          ullamcorper euismod sagittis.
        </p>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-3a3 3 0 110-6 3 3 0 010 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600">Location</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-3a3 3 0 110-6 3 3 0 010 6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-600">Date & Time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
