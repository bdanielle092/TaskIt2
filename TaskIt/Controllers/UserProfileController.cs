using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaskIt.Models;
using TaskIt.Repositories;

namespace TaskIt.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _repo;
        private readonly IBoardRepository _boardRepo;
        public UserProfileController(IUserProfileRepository repo, IBoardRepository boardRepo)
        {
            _repo = repo;
            _boardRepo = boardRepo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _repo.GetByUserProfileId(id);
                if(userProfile == null) 
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {

            _repo.Add(userProfile);
           CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },

                userProfile);
            _boardRepo.AddIntialBoards(userProfile.Id);
            return Ok(userProfile);
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
