import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [mealPlanId, setMealPlanId] = useState("");

  const onMealPlanIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setMealPlanId(e.target.value);
  };

  const onTokenChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

      {token && mealPlanId && mealPlanId.length && mealPlanId.length === 24 && (
        <Link to={`/meal-plan/${mealPlanId}`}>Go to meal plan detail page</Link>
      )}
      <div>
        Enter <BoldItalicText>AuthToken</BoldItalicText> and &nbsp;
        <BoldItalicText>MealPlanId</BoldItalicText> and click link to view demo
      </div>
    </div>
  );
};

const BoldItalicText = ({ children }: { children: React.ReactNode }) => {
  return <b style={{ fontStyle: "italic" }}>{children}</b>;
};

export default Home;
