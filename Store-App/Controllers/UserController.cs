using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store_App.Data;
using Store_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Store_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<SendUserModel> GetUserId()
        {
            var userId =  User.FindFirstValue(ClaimTypes.NameIdentifier);
            var roleId = _context.UserRoles.Single(r => r.UserId == userId).RoleId;
            var role = _context.Roles.Single(r => r.Id == roleId);
            SendUserModel user = new SendUserModel
            {
                Id = userId,
                Role = role.Name
            };
            return Ok(user);
        }
    }
}

