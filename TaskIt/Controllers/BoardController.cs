using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskIt.Models;
using TaskIt.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskIt.Data;


namespace TaskIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoardController : ControllerBase
    {
        private readonly IBoardRepository _boardRepo;
        private readonly IUserProfileRepository _userProfileRepo;
        private readonly ITaskRepository _taskRepo;
        public BoardController( IBoardRepository boardRepo, IUserProfileRepository userProfileRepo, ITaskRepository taskRepo)
        {
            _boardRepo = boardRepo;
            _userProfileRepo = userProfileRepo;
            _taskRepo = taskRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
           
            var currentUser = GetCurrentUserProfile();
            var currentUserBoards = _boardRepo.GetByUserProfileId(currentUser.Id);
            return Ok(currentUserBoards);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            //var currentUser = GetCurrentUserProfile();
            

            //if (currentUser !=  )
            //{
            //    return Unauthorized();
            //}
            var board = _boardRepo.GetById(id);
            if (board == null)
            {
                return NotFound();
            }
          
            return Ok(board);
        }

   

        [HttpPost]
        public IActionResult Post(Board board)
        {
            var currentUser = GetCurrentUserProfile();
            board.UserProfileId = currentUser.Id;
            _boardRepo.Add(board);
            return CreatedAtAction("Get", new { id = board.Id }, board);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Board board  )
        {
            
            if (id != board.Id)
            {
                return BadRequest();
            }
    
            _boardRepo.Update(board);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _boardRepo.Delete(id);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }


        [HttpGet("{boardId}/task")]
        public IActionResult GetTasksForBoard(int boardId)
        {
            var task = _taskRepo.GetByBoardId(boardId);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }


        [HttpPost("{boardId}/task")]
        public IActionResult Post(int boardId, Task task)
        {
           if(task.BoardId != boardId)
            {
                return BadRequest();            
            }
            task.DateCreated = DateTime.Now;
            _taskRepo.Add(task);
            return CreatedAtAction("Get", new { id = task.Id }, task);
        }



        [HttpPut("{boardId}/task/{id}")]
        public IActionResult Put(int boardId, Task task, int id)
        {
            if (task.BoardId != boardId)
            {
                return BadRequest();
            }
            if (id != task.Id)
            {
                return BadRequest();
            }

            _taskRepo.Update(task);
            return NoContent();
        }





        [HttpDelete("{boardId}/task/{id}")]
        public IActionResult Delete(int boardId, Task task, int id)
        {

            if (task.BoardId != boardId)
            {
                return BadRequest();
            }
            if (id != task.Id)
            {
                return BadRequest();
            }

            _taskRepo.Delete(id);
            return NoContent();
        }

    }
}
