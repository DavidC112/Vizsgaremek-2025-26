import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { ChevronDown } from "lucide-react";
import { type ResolvedDailyEntry } from "../../hooks/useMeals";

interface MealAccordionProps {
  entry: ResolvedDailyEntry;
}

const MealRow = ({
  name,
  category,
  calories,
  protein,
  carbohydrate,
  fat,
}: {
  name: string;
  category?: string;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
}) => (
  <div className="flex items-center justify-between rounded-lg bg-gray-50 px-5 py-3 transition hover:bg-gray-100">
    <div className="flex items-center gap-3">
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        {category && <p className="text-sm text-gray-400">{category}</p>}
      </div>
    </div>

    <div className="text-right">
      <p className="font-bold text-orange-500">{calories} cal</p>
      <p className="text-sm text-gray-400">
        P: {protein}g | C: {carbohydrate} | F: {fat}g
      </p>
    </div>
  </div>
);

const MealAccordion = ({ entry }: MealAccordionProps) => {
  const { date, recipes, ingredients } = entry;
  const totalCalorieConsumed = recipes.reduce((sum, a) => sum + a.calories, 0);
  const totalItems = recipes.length + ingredients.length;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ChevronDown />} id={date}>
        <div className="flex items-center gap-4">
          <Typography component="span" className="font-medium">
            {date}
          </Typography>
          <span className="text-sm text-gray-400">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
          <span className="left-1 text-sm font-medium text-orange-500">
            {totalCalorieConsumed.toFixed(1)} cal consumed
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          {recipes.map((recipe) => (
            <MealRow
              key={`recipe-${recipe.id}`}
              name={recipe.name}
              category={recipe.category}
              calories={recipe.calories}
              protein={recipe.protein}
              carbohydrate={recipe.carbohydrate}
              fat={recipe.fat}
            />
          ))}
          {ingredients.map((ingredient) => (
            <MealRow
              key={`ingredient-${ingredient.id}`}
              name={ingredient.name}
              calories={ingredient.calories}
              protein={ingredient.protein}
              carbohydrate={ingredient.carbohydrate}
              fat={ingredient.fat}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MealAccordion;
