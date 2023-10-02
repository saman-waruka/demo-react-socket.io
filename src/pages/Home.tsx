import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [mealPlanId, setMealPlanId] = useState("");

  const onMealPlanIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setMealPlanId(e.target.value);
  };

  return (
    <div>
      <p> MealPlanId: </p>
      <input
        type="text"
        name="meal-plan-id"
        maxLength={24}
        minLength={24}
        onChange={onMealPlanIdChange}
      />
      &nbsp;&nbsp;&nbsp;
      {mealPlanId && mealPlanId.length && mealPlanId.length === 24 && (
        <Link to={`/meal-plan/${mealPlanId}`}>Go to meal plan detail page</Link>
      )}
      <div>Enter meal plan id and click link to view demo</div>
    </div>
  );
};

export default Home;
