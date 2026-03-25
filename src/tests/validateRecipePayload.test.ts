import { describe, it, expect } from "vitest";
import { validateRecipePayload } from "../../src/utils/validateRecipePayload";
import type { CreateRecipePayload } from "../../src/utils/AddRecipe.type";

const validPayload: CreateRecipePayload = {
  name: "Pasta Primavera",
  category: "Main course",
  preparationTime: 15,
  cookingTime: 20,
  description: "A fresh and light pasta dish.",
  instructions: "Boil water;Cook pasta;Add vegetables",
  portions: 4,
  calories: 450,
  protein: 18,
  carbohydrate: 60,
  fat: 12,
  isVegan: false,
  isVegetarian: true,
  ingredients: [{ ingredientId: 1, amount: 200 }],
};

const validImage = new File(["content"], "recipe.jpg", {
  type: "image/jpeg",
});

describe("validateRecipePayload – valid input", () => {
  it("returns null when payload and image are both valid", () => {
    expect(validateRecipePayload(validPayload, validImage)).toBeNull();
  });

  it("returns null when image is not required and payload is valid", () => {
    expect(
      validateRecipePayload(validPayload, null, { requireImage: false }),
    ).toBeNull();
  });
});

describe("validateRecipePayload – name", () => {
  it("returns error when name is empty", () => {
    const result = validateRecipePayload(
      { ...validPayload, name: "" },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("name");
  });

  it("returns error when name is only whitespace", () => {
    const result = validateRecipePayload(
      { ...validPayload, name: "   " },
      validImage,
    );
    expect(result).not.toBeNull();
  });
});

describe("validateRecipePayload – description", () => {
  it("returns error when description is empty", () => {
    const result = validateRecipePayload(
      { ...validPayload, description: "" },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("description");
  });
});

describe("validateRecipePayload – portions", () => {
  it("returns error when portions is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, portions: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("portion");
  });

  it("returns error when portions is negative", () => {
    const result = validateRecipePayload(
      { ...validPayload, portions: -1 },
      validImage,
    );
    expect(result).not.toBeNull();
  });
});

describe("validateRecipePayload – preparation & cooking time", () => {
  it("returns error when preparationTime is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, preparationTime: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("prep");
  });

  it("returns error when cookingTime is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, cookingTime: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("cook");
  });
});

describe("validateRecipePayload – instructions", () => {
  it("returns error when instructions is empty", () => {
    const result = validateRecipePayload(
      { ...validPayload, instructions: "" },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("step");
  });
});

describe("validateRecipePayload – ingredients", () => {
  it("returns error when ingredients array is empty", () => {
    const result = validateRecipePayload(
      { ...validPayload, ingredients: [] },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("ingredient");
  });

  it("returns error when an ingredient has ingredientId of 0", () => {
    const result = validateRecipePayload(
      {
        ...validPayload,
        ingredients: [{ ingredientId: 0, amount: 100 }],
      },
      validImage,
    );
    expect(result).not.toBeNull();
  });

  it("returns error when an ingredient has amount of 0", () => {
    const result = validateRecipePayload(
      {
        ...validPayload,
        ingredients: [{ ingredientId: 1, amount: 0 }],
      },
      validImage,
    );
    expect(result).not.toBeNull();
  });

  it("accepts ingredients where all fields are positive", () => {
    const result = validateRecipePayload(
      {
        ...validPayload,
        ingredients: [
          { ingredientId: 1, amount: 100 },
          { ingredientId: 2, amount: 50 },
        ],
      },
      validImage,
    );
    expect(result).toBeNull();
  });
});

describe("validateRecipePayload – nutritional values", () => {
  it("returns error when calories is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, calories: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("calorie");
  });

  it("returns error when protein is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, protein: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("protein");
  });

  it("returns error when carbohydrate is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, carbohydrate: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("carbohydrate");
  });

  it("returns error when fat is 0", () => {
    const result = validateRecipePayload(
      { ...validPayload, fat: 0 },
      validImage,
    );
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("fat");
  });
});

describe("validateRecipePayload – image", () => {
  it("returns error when image is required but null", () => {
    const result = validateRecipePayload(validPayload, null);
    expect(result).not.toBeNull();
    expect(result!.toLowerCase()).toContain("image");
  });

  it("returns null when image is null but not required", () => {
    const result = validateRecipePayload(validPayload, null, {
      requireImage: false,
    });
    expect(result).toBeNull();
  });
});
