import { useParams } from "react-router-dom";

const RecipePage = () => {
  const recipeId = useParams();

  return <div>RecipePage Recipe id: {recipeId.id}</div>;
};
export default RecipePage;
