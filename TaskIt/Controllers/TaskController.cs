using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskIt.Models;
using TaskIt.Repositories;

namespace TaskIt.Controllers
{
    //everytime we have the have a endpoint its say api/controller then what the method is passing 
    //api/task
    [Route("api/[controller]")]
    [ApiController]
    //giving permission to do these actions
    [Authorize]

    // ControllerBase is inheriting (inheritance)
    public class TaskController : ControllerBase
    {
        //these are fields we know that because they are private and have no  get set
        //this is call dependency injection is a technique in which an object receives other objects that it depends on. 
        private readonly ITaskRepository _taskRepo;


        //this is a constructor which we know because its has the same name of the class and has no type
        public TaskController(ITaskRepository taskRepo)
        {
            _taskRepo = taskRepo;
        }


        //adaptation 
        [HttpGet("{id}")]
        //Type is IAcationResult and its a interface, method is get
        //method is a block of code which only runs when it is called
        public IActionResult Get(int id)
        {
            //we are declaring a variable. the varabiable is task and the vaule is getById which is a method which we are getting from the taskRepo
            //methods are used to perform certain actions also know as functions
            var task = _taskRepo.GetById(id);
            //if task equals null return not found
            if (task == null)
            {
                return NotFound();
            }
            //OK is a method from type IActionResult
            return Ok(task);
        }

        [HttpPut("toggle/{id}")]
        public IActionResult Toggle(int id, bool IsComplete)
        {

            _taskRepo.Toggle(id, IsComplete);
            return NoContent();
        }

        //edits a task on a board
        [HttpPut("{id}")]
        public IActionResult Put( int id, Task task)
        {
           
            if (id != task.Id )
            {
                return BadRequest();
            }

            _taskRepo.Update(task);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            _taskRepo.Delete(id);
            return NoContent();
        }




    }
}
