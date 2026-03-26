import { Clock, Flame, Utensils } from "lucide-react";
import type { Recipe } from "../../hooks/useRecipes";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={recipe.imageUrl ?? ""}
          alt={recipe.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-5 p-4">
        <h3 className="text-lg">{recipe.name}</h3>
        <div className="flex space-x-2">
          <div
            className={`rounded-full px-2 py-1 text-center text-xs ${
              recipe.isCommunity
                ? "bg-violet-100 text-violet-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {recipe.isCommunity ? "Community" : "Official"}
          </div>
          {recipe.isVegan && (
            <div className="rounded-full bg-green-100 px-2 py-1 text-center text-xs text-green-800">
              Vegan
            </div>
          )}
          {recipe.isVegetarian && (
            <div className="rounded-full bg-lime-100 px-2 py-1 text-center text-xs text-lime-800">
              Vegetarian
            </div>
          )}
        </div>
        <p className="mb-3 line-clamp-2 flex-1 text-sm font-light">
          {recipe.description}
        </p>
        <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
          <Tooltip title="Portions">
            <div className="flex items-center gap-1 text-purple-600">
              <Utensils className="h-4 w-4" />
              {recipe.portions}
            </div>
          </Tooltip>
          <div className="flex items-center gap-1 text-indigo-600">
            <Clock className="h-4 w-4" />
            {recipe.preparationTime + recipe.cookingTime} min
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap text-orange-600">
            <Flame className="h-4 w-4" />
            {recipe.calories} cal
          </div>
        </div>
        <div className="flex h-8 items-center justify-between border-t pt-3 text-xs">
          <div className="flex gap-2 font-extralight">
            <Tooltip title={"Protein"}>
              <span>P: {recipe.protein}g</span>
            </Tooltip>
            <Tooltip title={"Carbohydrate"}>
              <span>C: {recipe.carbohydrate}g</span>
            </Tooltip>
            <Tooltip title={"Fat"}>
              <span>F: {recipe.fat}g</span>
            </Tooltip>
          </div>
          {recipe.isCommunity && (
            <div className="flex items-center gap-2">
              <div>{recipe.userName}</div>
              <img
                className="inline-block size-6 rounded-full object-cover"
                src={recipe.userProfilePicture}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
