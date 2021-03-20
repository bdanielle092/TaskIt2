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
    //everytime we have the have a endpoint its say api/controller then what the method is passing
    [Route("api/[controller]")]
    [ApiController]
    //giving permission to do these actions
    [Authorize]

    // ControllerBase is inheriting (inheritance)
    public class BoardController : ControllerBase
    {
        //these are fields we know that because they are private and have no  get set
        //this is call dependency injection is a technique in which an object receives other objects that it depends on. 
        private readonly IBoardRepository _boardRepo;
        private readonly IUserProfileRepository _userProfileRepo;
        private readonly ITaskRepository _taskRepo;

        //this is a constructor which we know because its has the same name of the class and has no type
        public BoardController( IBoardRepository boardRepo, IUserProfileRepository userProfileRepo, ITaskRepository taskRepo)
        {
            _boardRepo = boardRepo;
            _userProfileRepo = userProfileRepo;
            _taskRepo = taskRepo;
        }

        //adaptation 
        [HttpGet]
        //Type is IAcationResult and its a interface, method is get
        //method is a block of code which only runs when it is called
        public IActionResult Get()
        {
           //we are declaring a variable. the varabiable is currentUser and the vaule is GetCurrentUserProfile which is a method
           //methods are used to perform certain actions aslo know as functions
            var currentUser = GetCurrentUserProfile();
            var currentUserBoards = _boardRepo.GetByUserProfileId(currentUser.Id);
            //OK is a method from type IActionResult
            return Ok(currentUserBoards);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var user = GetCurrentUserProfile();
            var existingBoard = _boardRepo.GetById(id);

            if (existingBoard.UserProfileId != user.Id) 
            {
                return Unauthorized();
            }
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

        //gets the tasks by the boardId
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


        
      

        //adds a task on a board
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


        //edits a task on a board
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


        //deletes a task on a board
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
