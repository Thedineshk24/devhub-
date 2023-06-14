import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const AgoraUIKit = dynamic(() => import('agora-react-uikit'), {
  ssr: false,
});

const RoomId = () => {
  useCurrentUser();

  const router = useRouter();
  const { channelName } = router.query;

  const [isJoined, setIsJoined] = useState(false); 
  const [isAudioMuted, setIsAudioMuted] = useState(false); 
  const [isVideoMuted, setIsVideoMuted] = useState(false); 

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
    channel: channelName,
    enableScreensharing: true,
    mode: 'live',
    codec: 'h264',
    dualStream: false,
    microphoneId: '',
    cameraId: '',
    cameraResolution: 'default',
    videoProfile: '480p_4',
    audioProfile: 'default',
    audioScenario: 'default',
    joinSucceed: () => setIsJoined(true), 
  };

  const callbacks = {
    EndCall: () => router.push('/meet-ups'),
  };

  const toggleAudioMute = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideoMute = () => {
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <div className="flex w-full h-screen">
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />

      {isJoined && (
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button onClick={toggleAudioMute} className="bg-gray-500 text-white px-4 py-2 rounded">
            {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          </button>
          <button onClick={toggleVideoMute} className="bg-gray-500 text-white px-4 py-2 rounded">
            {isVideoMuted ? 'Unmute Video' : 'Mute Video'}
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomId;
