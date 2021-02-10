using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskIt.Models;
using TaskIt.Repositories;

namespace TaskIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepo;
    
        public TaskController(ITaskRepository taskRepo )
        {
            _taskRepo = taskRepo;
          
        }





        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var task = _taskRepo.GetById(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPut("toggle/{id}")]
        public IActionResult Toggle(int id, bool IsComplete)
        {

            _taskRepo.Toggle(id, IsComplete);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete( int id)
        {
           
            _taskRepo.Delete(id);
            return NoContent();
        }






    }
}
