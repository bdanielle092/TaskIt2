using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskIt.Data;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public class PriorityRepository : IPriorityRepository
    {
        private readonly ApplicationDbContext _context;

        public PriorityRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public List<Priority> GetAll()
        {
            return _context.Priority.ToList();
        }

        public Priority GetById(int id)
        {
            return _context.Priority
                .FirstOrDefault(p => p.Id == id);
        }


    }
}
