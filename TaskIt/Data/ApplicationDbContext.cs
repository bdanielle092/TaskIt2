using TaskIt.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TaskIt.Data
{
    //DbContext is a baseController and its inheriting
    public class ApplicationDbContext : DbContext
    {
        //this is a constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Board> Board { get; set; }
        public DbSet<Priority> Priority { get; set; }
        public DbSet<SubTask> SubTask { get; set; }
        public DbSet<Task> Task { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }

        

    }
}
