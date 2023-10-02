import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
const authToken = import.meta.env.VITE_AUTH_TOKEN;
const host = import.meta.env.VITE_SOCKET_IO_HOST;

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
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
      alert("disconnected");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>ID: {id}</h3>
      <textarea
        name=""
        id=""
        cols={100}
        rows={30}
        value={contentLogs}
        disabled
      />
    </div>
  );
};

export default MealPlan;
