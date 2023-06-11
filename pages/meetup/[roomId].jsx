import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const AgoraUIKit = dynamic(() => import('agora-react-uikit'), {
  ssr: false,
});

const RoomId = () => {
  const router = useRouter();
  const { channelName } = router.query;
  const rtcProps = {
    appId: 'd3a25309e6874d26b4b57aa08756dd26',
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
    <div className="flex w-70vw h-screen">
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  );
};

export default RoomId;
