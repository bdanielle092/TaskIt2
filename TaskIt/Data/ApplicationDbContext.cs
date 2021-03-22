using TaskIt.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TaskIt.Data
{
  
    //The first step in creating a DbContext is to make a new class that inherits from it
    //The DbContext class EF Core provides is a base class that we extend with the specifics of our database.
    public class ApplicationDbContext : DbContext
    {
        //this is a constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        //Just as we create model classes to represent the each table in our database, with Entity Framework Core we create a DbContext along with the appropriate DbSets to represent an entire database.
        
        public DbSet<Board> Board { get; set; }
        public DbSet<Priority> Priority { get; set; }
        public DbSet<SubTask> SubTask { get; set; }
        public DbSet<Task> Task { get; set; }
        public DbSet<UserProfile> UserProfile { get; set; }

        

    }
}
