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

    socket.on("invoiceData", (data: { cashID: number; invoiceID: number }) => {
      const splitedURl = window.location.href.split("/");
      if (splitedURl[splitedURl.length - 3] == data.cashID.toString())
        window.location.href = `/promoters-rating/${data.cashID}/invoices/${data.invoiceID}`;

    });
  };

  return null;
};

export default Socket;
