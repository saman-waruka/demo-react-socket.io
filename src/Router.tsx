import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MealPlan from "./pages/MealPlan";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/meal-plan/:id" element={<MealPlan />}></Route>
    </Routes>
  );
};

export default Router;
