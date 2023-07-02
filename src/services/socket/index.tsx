import { useEffect } from "react";
import { io } from "socket.io-client";

const Socket = () => {
  useEffect(() => {
    connectToSocket();
  }, []);

  const connectToSocket = () => {
    const socket = io("ws://api.rating.hamyaransystem.com:3000");
    socket.on("connect", function () {
      console.log("Connected");
    });

    socket.on(
      "invoiceData",
      (data: { cashTurn: number; invoiceId: number }) => {
        window.location.href = `/promoters-rating/${data.cashTurn}`;
      }
    );
  };

  return null;
};

export default Socket;
