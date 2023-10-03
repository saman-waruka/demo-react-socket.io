import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const authToken = import.meta.env.VITE_AUTH_TOKEN;
const host = import.meta.env.VITE_SOCKET_IO_HOST;

const showToastMessage = (action: string) => {
  toast.info(`Action: ${action} `, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

const MealPlan = () => {
  const [contentLogs, setContentLogs] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const connectionOption = {
      transports: ["websocket"],
      auth: {
        token: `Bearer ${authToken}`,
      },
      withCredentials: true,
    };
    // Note: in Browser connectionOption can not use "extraHeaders" so I use auth.token instead of "extraHeaders.authorization" https://socket.io/docs/v3/client-initialization/#extraheaders

    const socket = io(host, connectionOption);

    socket.on("connect", () => {
      console.log(`connected with id: ${socket.id}`);
    });

    socket.on(`meal-plan-${id}`, (data) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <h3>ID: {id}</h3>
      <h5>Message Logs</h5>
      <textarea cols={100} rows={35} value={contentLogs} disabled />
      <ToastContainer />
    </div>
  );
};

export default MealPlan;
