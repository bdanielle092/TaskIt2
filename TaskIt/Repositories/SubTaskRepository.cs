using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskIt.Data;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public class SubTaskRepository : ISubTaskRepository
    {
        private readonly ApplicationDbContext _context;
       

        public SubTaskRepository(ApplicationDbContext context)
        {
            _context = context;
         
        }


        public List<SubTask> GetSubTaskByTaskId(int taskId)
        {
            return _context.SubTask
                      
                .Where(st => st.TaskId == taskId)
                .Where(st => st.Active == true)
                .ToList();
        }

        public SubTask GetById(int id)
        {
            return _context.SubTask
                .FirstOrDefault(st => st.Id == id);
        }

        public void Add(SubTask subTask)
        {
            subTask.Active = true;
            _context.Add(subTask);
            _context.SaveChanges();
        }

        public void Update(SubTask subTask)
        {
            subTask.Active = true;
            _context.Entry(subTask).State = EntityState.Modified;
            _context.SaveChanges();
        }



        public void Delete(int id)
        {
            var subTask = GetById(id);
            subTask.Active = false;
            _context.Entry(subTask).State = EntityState.Modified;
            _context.SaveChanges();
        }


        public void Toggle(int id, bool IsComplete)
        {
            var subTask = GetById(id);
            subTask.IsComplete = IsComplete;
            _context.Entry(subTask).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}
