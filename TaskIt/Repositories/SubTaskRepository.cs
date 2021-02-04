﻿using Microsoft.EntityFrameworkCore;
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


        public List<SubTask> GetByTaskId(int taskId)
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


        public void Delete(int id)
        {
            var subTask = GetById(id);
            subTask.Active = false;
            _context.Entry(subTask).State = EntityState.Modified;
            _context.SaveChanges();
        }

    }
}
