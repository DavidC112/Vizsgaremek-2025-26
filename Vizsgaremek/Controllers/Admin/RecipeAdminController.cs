    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Vizsgaremek.Data;
    using Vizsgaremek.DTOs.ImageDto;
    using Vizsgaremek.DTOs.Recipes;
    using Vizsgaremek.DTOs.UserDto;
    using Vizsgaremek.Models;

    namespace Vizsgaremek.Controllers.Admin
    {
        [ApiController]
        [Route("api/admin/recipe")]
        [Authorize(Roles = "Admin")]
        public class RecipeAdminController : Controller
        {
            private readonly HealthAppDbContext _context;
            private readonly UserManager<User> _userManager;
            private readonly ImageKitService _imageKit;

            public RecipeAdminController(HealthAppDbContext context, UserManager<User> userManager, ImageKitService imageKit)
            {
                _context = context;
                _userManager = userManager;
                _imageKit = imageKit;
            }
            
            
            
      [HttpGet("all")]
            public async Task<IActionResult> GetAllRecipes()
            {
                var recipes = await _context.Recipes
                    .IgnoreQueryFilters()
                    .Include(r => r.RecipeIngredients)
                    .ThenInclude(ri => ri.Ingredient)
                    .ToListAsync();
                
                    var admin = (await _userManager.GetUsersInRoleAsync("Admin")).First();

                    var response = new List<RecipeResponseDto>();

                    foreach (var recipe in recipes)
                    {
                        User user;
                        if (!string.IsNullOrEmpty(recipe.UserId))
                        {
                            user = await _userManager.FindByIdAsync(recipe.UserId);
                        }
                        else
                        {
                            user = admin;
                        }
                        
                        response.Add(new RecipeResponseDto
                        {
                            Id = recipe.Id,
                            UserName = $"{user.FirstName} {user.LastName}",
                            UserProfilePicture = user.ProfilePictureUrl,
                            Name = recipe.Name,
                            Category = recipe.Category,
                            PreparationTime = recipe.PreparationTime,
                            CookingTime = recipe.CookingTime,
                            Description = recipe.Description,
                            Instructions = recipe.Instructions,
                            Portions = recipe.Portions,
                            Calories = recipe.Calories,
                            Protein = recipe.Protein,
                            Carbohydrate = recipe.Carbohydrate,
                            Fat = recipe.Fat,
                            IsVegan = recipe.IsVegan,
                            IsVegetarian = recipe.IsVegetarian,
                            ImageUrl = recipe.ImageUrl,
                            IsCommunity = recipe.IsCommunity,
                            IsDeleted = recipe.IsDeleted,   
                            Ingredients = recipe.RecipeIngredients
                                .Where(ri => !ri.Ingredient.IsDeleted)
                                .Select(ri => new RecipeIngredientResponseDto
                                {
                                    IngredientId = ri.IngredientId,
                                    IngredientName = ri.Ingredient.Name,
                                    Amount = ri.Amount
                                })
                                .ToList()
                        });
                    }

                    return Ok(response);
            }



            

            [HttpPost("create")]
            public async Task<IActionResult> CreateRecipe([FromBody] RecipeCreateDto dto)
            {
                var recipe = new Recipe
                {
                    UserId = null,
                    User = null,
                    Name = dto.Name,
                    Category = dto.Category,
                    PreparationTime = dto.PreparationTime,
                    CookingTime = dto.CookingTime,
                    Description = dto.Description,
                    Instructions = dto.Instructions,
                    Portions = dto.Portions,
                    Calories = dto.Calories,
                    Protein = dto.Protein,
                    Carbohydrate = dto.Carbohydrate,
                    Fat = dto.Fat,
                    IsCommunity = false,
                    RecipeIngredients = new List<RecipeIngredient>(),
                    ImageUrl = "https://ik.imagekit.io/nrt5lwugy/pictures/default%20recipe.jpg?updatedAt=1772186089649",
                };

                foreach (var item in dto.Ingredients)
                {
                    var ingredient = await _context.Ingredients
                        .FirstOrDefaultAsync(i => i.Id == item.IngredientId);

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
                
                var admin = (await _userManager.GetUsersInRoleAsync("Admin")).First();
                
                _context.Recipes.Add(recipe);
                await _context.SaveChangesAsync();

                var result = new RecipeResponseDto
                {
                    Id = recipe.Id,
                    UserName = $"{admin.FirstName} {admin.LastName}",
                    UserProfilePicture = admin.ProfilePictureUrl,
                    Name = recipe.Name,
                    Category = recipe.Category,
                    PreparationTime = recipe.PreparationTime,
                    CookingTime = recipe.CookingTime,
                    Description = recipe.Description,
                    Instructions = recipe.Instructions,
                    Portions = recipe.Portions,
                    Calories = recipe.Calories,
                    Carbohydrate = recipe.Carbohydrate,
                    Protein = recipe.Protein,
                    Fat = recipe.Fat,
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




                return Created($"api/recipe/{recipe.Id}",
                    new 
                    { 
                        Message = "Recipe created successfully",
                        Data = result
                    }
                    );
            }

            [HttpPost("create/{id:int}/upload-image")]
            public async Task<IActionResult> UploadRecipeImage([FromRoute] int id, [FromForm] UploadImageDto dto)
            {
                var user = await _userManager.GetUserAsync(User);
                var recipe = await _context.Recipes.FindAsync(id);
                if (user == null)
                {
                    return NotFound("User was not found in recipeAdmin/uploadImage");
                }

                if (recipe == null)
                {
                    return NotFound("Recipe was not found in recipeAdmin/uploadImage");
                }

                if (dto.File == null || dto.File.Length == 0)
                {
                    return BadRequest("No file uploaded in recipeAdmin/uploadImage");
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

            [HttpPatch("{id:int}/edit")]
            public async Task<IActionResult> UpdateRecipe(int id, [FromBody] RecipeUpdateDto dto)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    return NotFound("User was not found in recipeAdmin/edit");
                }

                var recipe = await _context.Recipes
                    .Include(r => r.RecipeIngredients)
                    .FirstOrDefaultAsync(r => r.Id == id);

                if (recipe == null)
                {
                    return NotFound("Recipe was not found in recipeAdmin/edit");
                }

                
                recipe.Name = dto.Name ?? recipe.Name;
                recipe.Category = dto.Category ?? recipe.Category;
                recipe.CookingTime = dto.CookingTime ?? recipe.CookingTime;
                recipe.PreparationTime = dto.PreparationTime ?? recipe.PreparationTime;
                recipe.Description = dto.Description ?? recipe.Description;
                recipe.Instructions = dto.Instructions ?? recipe.Instructions;
                recipe.Portions = dto.Portions ?? recipe.Portions;
                recipe.Calories = dto.Calories ?? recipe.Calories;
                recipe.Protein = dto.Protein ?? recipe.Protein;
                recipe.Carbohydrate = dto.Carbohydrate ?? recipe.Carbohydrate;
                recipe.Fat = dto.Fat ?? recipe.Fat;


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
                return Ok(new {Message = "Recipe edited successfully"});
            }

            [HttpPatch("{id:int}/delete")]
            public async Task<IActionResult> DeleteRecipe(int id)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    return NotFound("User was not found in recipeAdmin/delete");
                }

                var recipe = await _context.Recipes.FindAsync(id);
                if (recipe == null)
                {
                    return NotFound("Recipe was not found in recipeAdmin/delete");
                }
                
                recipe.IsDeleted = true;
                await _context.SaveChangesAsync();

               return Ok(new {Message = "Recipe deleted successfully" });
            }
            
            [HttpPatch("{id:int}/restore")]
            public async Task<IActionResult> RestoreRecipe(int id)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    return NotFound("User was not found in recipeAdmin/delete");
                }

                var recipe = await _context.Recipes.IgnoreQueryFilters().FirstOrDefaultAsync(r => r.Id == id);
                if (recipe == null)
                {
                    return NotFound("Recipe was not found in recipeAdmin/delete");
                }

                if (!recipe.IsDeleted)
                {
                    return BadRequest("Recipe is not deleted");
                }

                recipe.ImageUrl = "https://ik.imagekit.io/nrt5lwugy/pictures/default%20recipe.jpg?updatedAt=1772186089649";
                recipe.IsDeleted = false;
                await _context.SaveChangesAsync();

                return Ok(new {Message = "Recipe restored successfully" });
            }
        }
    }