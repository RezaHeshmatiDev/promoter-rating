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
      (data: { cashID: number; invoiceId: number }) => {
        const splitedURl = window.location.href.split("/")
        if (splitedURl[splitedURl.length - 1] == data.cashID.toString())
          window.location.href = `/promoters-rating/${data.cashID}`;
      }
    );
  };

  return null;
};

export default Socket;
