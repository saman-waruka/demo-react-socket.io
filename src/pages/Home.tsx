import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [mealPlanId, setMealPlanId] = useState("");
  const [foodProgramId, setFoodProgramId] = useState("");

  const onMealPlanIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealPlanId(e.target.value);
  };

  const onFoodProgramIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoodProgramId(e.target.value);
  };

  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("token", e.target.value);
  };

  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: 30 }}>
      <p>
        AuthToken: &nbsp;
        <input type="text" name="token" size={100} onChange={onTokenChange} />
        &nbsp;&nbsp;&nbsp;
      </p>

      <p>
        MealPlanId: &nbsp;
        <input
          type="text"
          name="meal-plan-id"
          size={50}
          maxLength={24}
          minLength={24}
          onChange={onMealPlanIdChange}
        />
        &nbsp;&nbsp;&nbsp;
      </p>
      <h5>And/Or</h5>
      <p>
        FoodProgramId: &nbsp;
        <input
          type="text"
          name="meal-plan-id"
          size={50}
          maxLength={24}
          minLength={24}
          onChange={onFoodProgramIdChange}
        />
        &nbsp;&nbsp;&nbsp;
      </p>

      <ul>
        {token &&
          mealPlanId &&
          mealPlanId.length &&
          mealPlanId.length === 24 && (
            <Link to={`/meal-plan/${mealPlanId}`}>
              <div>Go to meal plan detail page</div>
            </Link>
          )}
        {token &&
          foodProgramId &&
          foodProgramId.length &&
          foodProgramId.length === 24 && (
            <Link to={`/food-program/${foodProgramId}`}>
              <div> Go to Food program detail page</div>
            </Link>
          )}
      </ul>

      <div>
        Enter <BoldItalicText>AuthToken</BoldItalicText> and &nbsp;
        <BoldItalicText>MealPlanId</BoldItalicText> and/or &nbsp;
        <BoldItalicText>FoodProgramId</BoldItalicText> and click link to view
        demo
      </div>
    </div>
  );
};

const BoldItalicText = ({ children }: { children: React.ReactNode }) => {
  return <b style={{ fontStyle: "italic" }}>{children}</b>;
};

export default Home;
