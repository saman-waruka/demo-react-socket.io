import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const host = import.meta.env.VITE_SOCKET_IO_HOST;

type ListenEvent = "meal-plan" | "food-program";

interface ISocketListenerProps {
  listenEvent: ListenEvent;
}

const SocketListener = ({ listenEvent }: ISocketListenerProps) => {
  const [contentLogs, setContentLogs] = useState("");

  const token = localStorage.getItem("token");
  const { id } = useParams();
  const eventName = `${listenEvent}-${id}`;

  const showToastMessage = (action: string) => {
    toast.info(`Action: ${action} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    const connectionOption = {
      transports: ["websocket"],
      auth: {
        token: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    // Note: in Browser connectionOption can not use "extraHeaders" so I use auth.token instead of "extraHeaders.authorization" https://socket.io/docs/v3/client-initialization/#extraheaders

    const socket = io(host, connectionOption);

    socket.on("connect", () => {
      console.log(`connected with id: ${socket.id}`);
    });

    socket.on(eventName, (data) => {
      if (data) {
        const jsonString = JSON.stringify(data, null, 2);
        setContentLogs((content) => content + "\n\n" + jsonString);
        showToastMessage(data.action);
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      alert("disconnected");
    });
  }, [eventName, token]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h3>
        {listenEvent === "meal-plan" ? "Meal Plan" : "Food Program"} ID: {id}
      </h3>
      <h5>Message Logs</h5>
      <textarea cols={100} rows={35} value={contentLogs} disabled />
      <ToastContainer />
    </div>
  );
};

export default SocketListener;
