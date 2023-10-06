import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SocketListener from "./pages/SocketListener";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/meal-plan/:id"
        element={<SocketListener listenEvent="meal-plan" />}
      ></Route>
      <Route
        path="/food-program/:id"
        element={<SocketListener listenEvent="food-program" />}
      ></Route>
    </Routes>
  );
};

export default Router;
