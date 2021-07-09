using Microsoft.AspNetCore.Identity;
using Store_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Store_App.Data
{
    public static class StoreInitializer
    {
        public static void SeedData(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        private static void SeedUsers(UserManager<ApplicationUser> userManager)
        {
            if (userManager.FindByEmailAsync("user@wp.pl").Result == null)
            {
                ApplicationUser admin = new ApplicationUser();
                admin.UserName = "user@wp.pl";
                admin.Email = "user@wp.pl";
                admin.EmailConfirmed = true;

                IdentityResult result = userManager.CreateAsync(admin, "Password1.").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(admin, "User").Wait();
                }
                 userManager.CreateAsync(admin);
            }


            if (userManager.FindByEmailAsync("admin@wp.pl").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = "admin@wp.pl";
                user.Email = "admin@wp.pl";
                user.EmailConfirmed = true;

                IdentityResult result = userManager.CreateAsync(user, "Password1.").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }

                 userManager.CreateAsync(user);
            }
        }

        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "User";
                //roleManager.AddClaimAsync(role, new Claim(ClaimTypes.Role, "User"));
                roleManager.CreateAsync(role);
            }


            if (!roleManager.RoleExistsAsync("Admin").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Admin";
                //roleManager.AddClaimAsync(role, new Claim(ClaimTypes.Role, "User"));
                roleManager.CreateAsync(role);
            }
        }
    }
}
