import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { useCurrentUser } from "../hooks/useCurrentUser";

const EventCard = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const {username} = useCurrentUser();

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

  const handleJoinNow = async (eventId) => {
    const appID = "d3a25309e6874d26b4b57aa08756dd26";
    const appCertificate = "2e207977c08f4cc99d2c7fe6c740fdfc";
    const channelName = `meetup/${eventId}`;
    const uid = 0;
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
    router.push(`/meetup/${eventId}=${token}`);
  };

  return (
    <div className="mt-2">
      <h1 className="text-center text-indigo-600 text-3xl font-extrabold">Dev Events</h1>
      {eventData &&
        eventData.map((event) => (
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
              <h3 className="text-2xl font-bold mb-2">{event.fields.eventName}</h3>
              <p className="text-gray-600 mb-4">{event.fields.description}</p>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleJoinNow(username)}
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventCard;
