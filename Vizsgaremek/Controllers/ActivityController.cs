using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vizsgaremek.Data;
using Vizsgaremek.DTOs.Activity;
using Vizsgaremek.Models;

namespace Vizsgaremek.Controllers
{
    [ApiController]
    [Route("api/activity")]
    public class ActivityController : Controller
    {
        private readonly HealthAppDbContext _context;

        public ActivityController(HealthAppDbContext context)
        {
            _context = context;

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetActivities()
        {
            var activities = await _context.Activities.ToListAsync();
            return Ok(activities);
        }
    }
}
