﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskIt.Models;
using TaskIt.Repositories;
namespace TaskIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SubTaskController : ControllerBase
    {
        private readonly ISubTaskRepository _subTaskRepo;
        public SubTaskController(ISubTaskRepository subTaskRepo)
        {
            _subTaskRepo = subTaskRepo;
        }


        //https:localhost:5001/api/subTask/task/taskId 
        [HttpGet("task/{taskId}")]
        public IActionResult GetSubTaskForTask(int taskId)
        {
            var subTasks = _subTaskRepo.GetSubTaskByTaskId(taskId);
            if (subTasks == null)
            {
                return NotFound();
            }
            return Ok(subTasks);
        }


        //https:localhost:5001/api/subTask/id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var subTask = _subTaskRepo.GetById(id);
            if (subTask == null)
            {
                return NotFound();
            }

            return Ok(subTask);
        }

        //https:localhost:5001/api/subTask/task/${taskId} (make sure to add the // after https://)
        [HttpPost("task/{taskId}")]
        public IActionResult Post(SubTask subTask)
        {
            _subTaskRepo.Add(subTask);
            return CreatedAtAction("Get", new { id = subTask.Id }, subTask);
        }


        // https:localhost:5001/api/subTask/id 
        [HttpPut("{id}")]
        public IActionResult Put(int id, SubTask subTask)
        {
            if (id != subTask.Id)
            {
                return BadRequest();
            }

            _subTaskRepo.Update(subTask);
            return NoContent();
        }


        //https:localhost:5001/api/subTask/id 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subTaskRepo.Delete(id);
            return NoContent();
        }

        [HttpPut("toggle/{id}")]
        public IActionResult Toggle(int id, bool IsComplete)
        {

            _subTaskRepo.Toggle(id, IsComplete);
            return NoContent();
        }
    }
}
