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
  };
   

  const callbacks = {
    EndCall: () => router.push('/meet-ups'),
  };

  return (
    <div className="flex w-full h-screen">
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  );
};

export default RoomId;
