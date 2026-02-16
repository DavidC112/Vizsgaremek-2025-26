using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.ImageDto;
using Vizsgaremek.DTOs.Recipes;
using Vizsgaremek.DTOs.UserDto;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers.Public
{
    [ApiController]
    [Route("api/recipe")]
    public class RecipeController : Controller
    {
        private readonly HealthAppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ImageKitService _imageKit;
        public RecipeController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit)
        {
            _context = context;
            _userManager = userManager;
            _imageKit = imageKit;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllRecipes()
        {
            var recipes = await _context.Recipes
                 .Include(r => r.RecipeIngredients)
                     .ThenInclude(ri => ri.Ingredient)
                 .ToListAsync();

            var response = recipes.Select(recipe => new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Category = recipe.Category,
                PreparationTime = recipe.PreparationTime,
                CookingTime = recipe.CookingTime,
                Description = recipe.Description,
                Portions = recipe.Portions,
                Calories = recipe.Calories,
                Protein = recipe.Protein,
                Carbohydrate = recipe.Carbohydrate,
                Fat = recipe.Fat,
                IsVegan = recipe.IsVegan,
                IsVegetarian = recipe.IsVegetarian,
                ImageUrl = recipe.ImageUrl,
                IsCommunity = recipe.IsCommunity,
                Ingredients = recipe.RecipeIngredients
                    .Where(ri => !ri.Ingredient.IsDeleted)
                    .Select(ri => new RecipeIngredientResponseDto
                    {
                        IngredientId = ri.IngredientId,
                        IngredientName = ri.Ingredient.Name,
                        Amount = ri.Amount
                    })
                    .ToList()
            }).ToList();

            return Ok(response);
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRecipe(int id)
        {
            var recipe = await _context.Recipes
                .Include(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null)
            {
                return NotFound("Recipe was not found in recipe/get(id)");
            }

            var result = new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Category = recipe.Category,
                PreparationTime = recipe.PreparationTime,
                CookingTime = recipe.CookingTime,
                Description = recipe.Description,
                Portions = recipe.Portions,
                Calories = recipe.Calories,
                Carbohydrate = recipe.Carbohydrate,
                Protein = recipe.Protein,
                Fat = recipe.Fat,
                IsVegan = recipe.IsVegan,
                IsVegetarian = recipe.IsVegetarian,
                ImageUrl = recipe.ImageUrl,
                IsCommunity = recipe.IsCommunity,
                Ingredients = recipe.RecipeIngredients
                    .Where(ri => !ri.Ingredient.IsDeleted)
                    .Select(ri => new RecipeIngredientResponseDto
                    {
                        IngredientId = ri.IngredientId,
                        IngredientName = ri.Ingredient.Name,
                        Amount = ri.Amount
                    })
                    .ToList()
            };

            return Ok(result);
        }


        [HttpPost("community/create")]
        [Authorize]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipeCreateDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) 
            {
                return Unauthorized("User was not found in recipe/create"); 
            }

            var recipe = new Recipe
            {
                UserId = user.Id,
                User   = user,
                Name = dto.Name,
                Category = dto.Category,
                PreparationTime = dto.PreparationTime,
                CookingTime = dto.CookingTime,
                Description = dto.Description,
                Portions = dto.Portions,
                Calories = dto.Calories,
                Protein = dto.Protein,
                Carbohydrate = dto.Carbohydrate,
                Fat = dto.Fat,
                IsVegan = dto.IsVegan,
                IsVegetarian = dto.IsVegetarian,
                IsCommunity = true,
                RecipeIngredients = new List<RecipeIngredient>()
            };

            foreach (var item in dto.Ingredients)
            {
                var ingredient = await _context.Ingredients
                    .FirstOrDefaultAsync(i => i.Id == item.IngredientId && !i.IsDeleted);

                if (ingredient == null)
                {
                    return NotFound($"Ingredient with ID {item.IngredientId} not found.");
                }

                recipe.RecipeIngredients.Add(new RecipeIngredient
                {
                    IngredientId = ingredient.Id,
                    Amount = item.Amount
                });
            }


            var result = new RecipeResponseDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Category = recipe.Category,
                PreparationTime = recipe.PreparationTime,
                CookingTime = recipe.CookingTime,
                Description = recipe.Description,
                Portions = recipe.Portions,
                Calories = recipe.Calories,
                Carbohydrate = recipe.Carbohydrate,
                Protein = recipe.Protein,
                Fat = recipe.Fat,
                IsVegan = recipe.IsVegan,
                IsVegetarian = recipe.IsVegetarian,
                ImageUrl = recipe.ImageUrl,
                IsCommunity = recipe.IsCommunity,
                Ingredients = recipe.RecipeIngredients
                    .Where(ri => ri.Ingredient != null)
                    .Select(ri => new RecipeIngredientResponseDto
                    {
                        IngredientId = ri.IngredientId,
                        IngredientName = ri.Ingredient.Name,
                        Amount = ri.Amount
                    })
                    .ToList()
            };

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();


            return Created($"api/recipe/{recipe.Id}",
                new
                {
                    Message = "Recipe created successfully.",
                    Data = result
                });
        }

        [HttpPost("community/create/{id:int}upload-image")]
        [Authorize]
        public async Task<IActionResult> UploadRecipeImage([FromRoute] int id, [FromForm] UploadImageDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            var recipe = await _context.Recipes.FindAsync(id);
            if (user == null)
            {
                return Unauthorized("User was not found in recipe/uploadImage");
            }
            if (user.Id != recipe.UserId)
            {
                return StatusCode(403, "You are not allowed to upload images for other user's recipes");
            }

            if (recipe == null)
            {
                return NotFound("Recipe was not found in recipe/uploadImage");
            }

            if (dto.File == null || dto.File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if(recipe.FileId != null)
            {
                var deleteResult = await _imageKit.DeleteImage(recipe.FileId);
                if (!deleteResult)
                {
                    return StatusCode(500, "Failed to delete existing image from ImageKit");
                }
            }

            var imageUrl = await _imageKit.UploadImage(dto.File);

            recipe.ImageUrl = imageUrl.Url;
            recipe.FileId = imageUrl.FileId;

            var result = new ImageResponseDto
            {
                Url = imageUrl.Url,
                FileId = imageUrl.FileId
            };
            
            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Picture uploaded successfully.", Data = result });

        }

        [HttpPatch("community/{id:int}/edit")]
        [Authorize]
        public async Task<IActionResult> UpdateRecipe(int id, [FromBody] RecipeUpdateDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User was not found in recipeAdmin/edit");
            }

            var recipe = await _context.Recipes
                .Include(r => r.RecipeIngredients)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null)
            {
                return NotFound("Recipe was not found in recipeAdmin/edit");
            }

            if(user.Id != recipe.UserId)
            {
                return StatusCode(403, "You cannot edit other users' recipe");
            }


            recipe.Name = dto.Name ?? recipe.Name;
            recipe.Category = dto.Category ?? recipe.Category;
            recipe.CookingTime = dto.CookingTime ?? recipe.CookingTime;
            recipe.PreparationTime = dto.PreparationTime ?? recipe.PreparationTime;
            recipe.Description = dto.Description ?? recipe.Description;
            recipe.Portions = dto.Portions ?? recipe.Portions;
            recipe.Calories = dto.Calories ?? recipe.Calories;
            recipe.Protein = dto.Protein ?? recipe.Protein;
            recipe.Carbohydrate = dto.Carbohydrate ?? recipe.Carbohydrate;
            recipe.Fat = dto.Fat ?? recipe.Fat;
            recipe.IsVegan = dto.IsVegan ?? recipe.IsVegan;
            recipe.IsVegetarian = dto.IsVegetarian ?? recipe.IsVegetarian;


            if (dto.Ingredients != null)
            {

                var toRemove = recipe.RecipeIngredients
                    .Where(ri => !dto.Ingredients.Any(i => i.IngredientId == ri.IngredientId))
                    .ToList();
                _context.RecipeIngredients.RemoveRange(toRemove);


                foreach (var item in dto.Ingredients)
                {
                    var existing = recipe.RecipeIngredients
                        .FirstOrDefault(ri => ri.IngredientId == item.IngredientId);

                    if (existing != null)
                    {
                        existing.Amount = item.Amount ?? existing.Amount;
                    }
                    else
                    {
                        var ingredient = await _context.Ingredients
                            .FirstOrDefaultAsync(i => i.Id == item.IngredientId);
                        if (ingredient == null)
                            return NotFound($"Ingredient with ID {item.IngredientId} not found.");

                        recipe.RecipeIngredients.Add(new RecipeIngredient
                        {
                            IngredientId = ingredient.Id,
                            Amount = item.Amount ?? 1
                        });
                    }
                }
            }

            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Recipe edited successfully" });
        }

        [HttpDelete("community/{id:int}/delete")]
        [Authorize]
        public async Task<IActionResult> DeleteOwnRecipe(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound("User was not found in recipe/delete");
            }

            var recipe = await _context.Recipes.FindAsync(id);

            if (user.Id != recipe.UserId)
            {
                return StatusCode(403, "You are not allowed to delete other user's recipes");
            }
            
            
            if (recipe == null) 
            {
                return NotFound("Recipe was not found in recipe/delete");
            }

            await _imageKit.DeleteImage(recipe.FileId);

            recipe.IsDeleted = true;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Recipe deleted successfully" });
        }
    }
}
