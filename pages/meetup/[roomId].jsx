import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const AgoraUIKit = dynamic(() => import('agora-react-uikit'), {
  ssr: false,
});

const App = () => {
  const { query } = useRouter();
  const { token } = query;

  const rtcProps = {
    appId: 'd3a25309e6874d26b4b57aa08756dd26',
    channel: 'test', // your agora channel
    token: token,
    enableScreensharing: true, // Enable screen sharing
    enableChat: true,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  return(
    <div className="flex w-70vw h-screen">
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  );
};

export default App;
