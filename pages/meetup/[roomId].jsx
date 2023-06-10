import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

const AgoraUIKit = dynamic(() => import('agora-react-uikit'), {
  ssr: false,
});

const RoomId = () => {
  const router = useRouter();
  const { roomId, token } = router.query;

  const rtcProps = {
    appId: 'd3a25309e6874d26b4b57aa08756dd26',
    channel: roomId,
    token: token,
    enableScreensharing: true,
    enableChat: true,
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return (
    <div className="flex w-70vw h-screen">
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  );
};

export default RoomId;
