using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TaskIt.Models;
using TaskIt.Data;

namespace TaskIt.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public List<Task> GetAll()
        {
          
            return _context.Task
                .Include(t => t.BoardId)
                .Where(b => b.Active)
                .ToList();
        }
        public Task GetById(int id)
        {
            return _context.Task
                  .Include(t => t.Board)
                  .Include(t => t.Priority)
                  .Include(t => t.SubTask)
                  .Where(t => t.Active)
                .FirstOrDefault(task => task.Id == id);
        }

        public List<Task> GetByBoardId(int id)
        {
            return _context.Task
                            .Include(t => t.Board)
                            .Include(t => t.Priority)
                            .Include(t => t.SubTask)
                            .Where(t => t.BoardId == id)
                            .Where(t => t.Active)
                            .ToList();
        }


        public void Add(Task task)
        {
            task.Active = true;
             _context.Add(task);
             _context.SaveChanges();
        }

        public void Update(Task task)
        {
            task.Active = true;
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var task = GetById(id);
            task.Active = false;
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Toggle(int id, bool IsComplete)
        {
            var task = GetById(id);
            task.IsComplete = IsComplete;
            _context.Entry(task).State = EntityState.Modified;
            _context.SaveChanges();
        }


    }
}
