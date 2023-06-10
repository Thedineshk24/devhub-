import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Peer from 'simple-peer';

const Meetup = () => {
  const [roomId, setRoomId] = useState('');
  const [peers, setPeers] = useState([]);
  const userVideoRef = useRef();
  const peersRef = useRef([]);
  const router = useRouter();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;

        const socket = new WebSocket('http://localhost:3001/'); // Replace with your WebSocket server URL

        socket.onopen = () => {
          socket.send(JSON.stringify({ action: 'join', roomId }));
        };

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);

          switch (message.action) {
            case 'user-joined':
              const peer = createPeer(message.userId, socket, stream);
              peersRef.current.push({
                peerId: message.userId,
                peer,
              });
              setPeers((users) => [...users, { peerId: message.userId, peer }]);
              break;

            case 'user-left':
              const leftPeer = peersRef.current.find(
                (p) => p.peerId === message.userId
              );
              if (leftPeer) {
                leftPeer.peer.destroy();
              }
              const updatedPeers = peersRef.current.filter(
                (p) => p.peerId !== message.userId
              );
              peersRef.current = updatedPeers;
              setPeers(updatedPeers);
              break;

            case 'signal':
              const remotePeer = peersRef.current.find(
                (p) => p.peerId === message.userId
              );
              if (remotePeer) {
                remotePeer.peer.signal(message.signal);
              }
              break;

            default:
              break;
          }
        };

        return () => {
          socket.close();
        };
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  }, [roomId]);

  const createPeer = (userId, socket, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.send(
        JSON.stringify({
          action: 'signal',
          userId,
          signal,
        })
      );
    });

    return peer;
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      setPeers([]);
      router.push(`/meetup/roomId=${roomId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Meetup</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="roomId" className="font-semibold">
            Room ID:
          </label>
          <input
            type="text"
            id="roomId"
            className="border border-gray-300 rounded px-2 py-1"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded px-3 py-1"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
        <div className="relative overflow-hidden w-full pb-3/4">
          <video
            className="absolute w-full h-full object-cover"
            ref={userVideoRef}
            autoPlay
            muted
          ></video>
        </div>
        {peers.map((peer) => (
          <div
            key={peer.peerId}
            className="relative overflow-hidden w-full pb-3/4"
          >
            <video
              className="absolute w-full h-full object-cover"
              autoPlay
              playsInline
              ref={(ref) => {
                if (ref) {
                  peer.peer.on('stream', (stream) => {
                    ref.srcObject = stream;
                  });
                }
              }}
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meetup;
