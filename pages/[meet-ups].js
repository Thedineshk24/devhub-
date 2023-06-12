import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { useCurrentUser } from "../hooks/useCurrentUser";
import HeaderMyProfile from "../components/headerMyProfile";

const EventCard = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  useCurrentUser();

  useEffect(() => {
    async function fetchEvent() {
      const client = createClient({
        space: "t8fm8dtnm1v7",
        environment: "master",
        accessToken: "ZGaY_ofcU8k5V5xLTBwpOGTazY0LZ-Z7rFqLZd1pKVI",
      });

      const response = await client.getEntries();
      setEventData(response.items);
    }

    fetchEvent();
  }, []);

  const handleJoinNow = async (eventId, channel) => {
    const appID = "d3a25309e6874d26b4b57aa08756dd26";
    const appCertificate = "2e207977c08f4cc99d2c7fe6c740fdfc";
    const channelName = channel?.trim();
    const uid = eventId;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const privilegeExpiredTs =
      Math.floor(Date.now() / 1000) + expirationTimeInSeconds;

    // Generate Agora token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );

    // Redirect to the specified URL
    router.push(
      `/meetup/roomId?&token=${token}&channelName=${channelName?.trim(" ")[0]}`
    );
  };

  const calculateCountdown = (startDate) => {
    const currentDate = new Date();
    const eventDate = new Date(startDate);

    const timeDiff = eventDate - currentDate;
    let days, hours, minutes, seconds;

    if (timeDiff < 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    }

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEventData((prevEventData) => {
        if (prevEventData) {
          const updatedEventData = prevEventData.map((event) => {
            const countdown = calculateCountdown(event.fields.startDate);
            return { ...event, countdown };
          });
          return updatedEventData;
        }
        return null;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Pagination
  const itemsPerPage = 10;
  const totalItems = eventData ? eventData.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = eventData?.slice(startIndex, endIndex);

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
    router.push(`/events?page=${page}`);
  };

  // Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = eventData?.filter((event) =>
    event.fields.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPaginatedData = filteredData?.slice(startIndex, endIndex);

  return (
    <>
      <HeaderMyProfile />
      <div className="mt-2 mx-auto max-w-screen-xl">
        <h1 className="text-center text-indigo-600 text-3xl font-extrabold">
          Dev Events
        </h1>
        <div className="flex justify-end mr-4 mt-2">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {filteredPaginatedData &&
          filteredPaginatedData.map((event) => {
            const techArray = event?.fields?.technology
              ?.split(",")
              .map((tech) => tech.trim());

            const isExpired =
              event.countdown &&
              event.countdown.days === 0 &&
              event.countdown.hours === 0 &&
              event.countdown.minutes === 0 &&
              event.countdown.seconds === 0;

            return (
              <div
                key={event.sys.id}
                className="my-4 flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="md:w-1/4 bg-blue-500">
                  <img
                    src={event.fields.eventImage.fields.file.url}
                    alt={event.fields.eventImage.fields.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/4 p-4">
                  <h3 className="text-2xl font-bold mb-2">
                    {event.fields.eventName}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {event.fields.description}
                  </p>
                  <div className="flex flex-wrap gap-2 my-2">
                    {techArray.map((tech) => (
                      <div
                        key={tech}
                        className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-sm"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center mr-4">
                      {isExpired ? (
                        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                          Expired
                        </button>
                      ) : (
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() =>
                            handleJoinNow(
                              event.sys.id,
                              event.fields.eventName
                            )
                          }
                        >
                          Join Now
                        </button>
                      )}
                    </div>
                    {event.countdown && !isExpired && (
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded animate-pulse">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                            {event.countdown.days}d
                          </div>
                          <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                            {event.countdown.hours}h
                          </div>
                          <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-2">
                            {event.countdown.minutes}m
                          </div>
                          <div className="bg-indigo-100 text-indigo-600 rounded-full w-12 h-12 flex items-center justify-center">
                            {event.countdown.seconds}s
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {/* <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"> */}
            {/* <button
              onClick={() => handlePaginationClick(1)}
              className={`${
                currentPage === 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
              } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:outline-none`}
            >
              <span className="sr-only">First</span>
            </button> */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePaginationClick(i + 1)}
                className={`${
                  currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
                } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:outline-none`}
              >
                {i + 1}
              </button>
            ))}
            {/* <button
              onClick={() => handlePaginationClick(totalPages)}
              className={`${
                currentPage === totalPages ? "bg-indigo-600 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
              } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium focus:outline-none`}
            >
              <span className="sr-only">Last</span>
            </button> */}
          {/* </nav> */}
        </div>
      </div>
    </>
  );
};

export default EventCard;
