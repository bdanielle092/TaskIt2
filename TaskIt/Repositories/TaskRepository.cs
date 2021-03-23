using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TaskIt.Models;
using TaskIt.Data;

namespace TaskIt.Repositories
{

    //classes are blueprints with all the methods and objects
    //ITaskRepository is an Interface which is a type definition similar to a class, except that it purely represents a contract between an object and its user.
    public class TaskRepository : ITaskRepository
    {
        //this is a field which we know beacuse it private and no get set
        //A field is a variable of any type that is declared directly in a class or struct
        private readonly ApplicationDbContext _context;

        //this is a constructor which we know because it has the same name as the class and no return type
        //A constructor is a special method that is used to initialize objects
        public TaskRepository(ApplicationDbContext context)
        {

            //_context - This private field is the instance of our DbContext that we use in our repository to interact with the database.
            _context = context;
        }

        //List is the type and its a list of tasks. GetAll is our method
        //ToList. This extension method converts collections (IEnumerables) to List instances
        //IEnumerable in C# is an interface that defines one method
        public List<Task> GetAll()
        {
            //context is type ApplicationDbContext and Task is the property 
            return _context.Task
                
                .Where(b => b.Active)
                .ToList();
        }

        //Task is the type GetById is the method. Passing one parameter Id with the type int
        public Task GetById(int id)
        {
            return _context.Task
                  .Include(t => t.Board)
                  .Include(t => t.Priority)
                  .Include(t => t.SubTasks)
                  .Where(t => t.Active)
                .FirstOrDefault(task => task.Id == id);
        }

        //List is the type and its list of Task and GetByBoardId is the method. Passing one parameter Id with the type int
        public List<Task> GetByBoardId(int id)
        {
            return _context.Task
                            .Include(t => t.Board)
                            .Include(t => t.Priority)
                            .Include(t => t.SubTasks)
                            .Where(t => t.BoardId == id)
                            .Where(t => t.Active)
                            .ToList();
        }

        //Add is a method and we are passing one parameter task with the type Task. We are not returning anything
        public void Add(Task task)
        {
            //task is object and active is the property and we are setting it to true
            task.Active = true;
            //context is type of applicationDbcontext and Add is the method with the parameter of task
            _context.Add(task);
            //context is type of applicationDbcontext and SaveChanges is the method 
            _context.SaveChanges();
        }

        //Update is a method and we are passing one parameter task object with the type of Task which is the class. We are not return anything
        public void Update(Task task)
        {
            //task is object and active is the property and we are setting it to true
            task.Active = true;
            //context is type of applicationDbContext and Entry is a method which passing the task object. State is a property of entry and we are updating the info in tasks
            _context.Entry(task).State = EntityState.Modified;
            //context is type of applicationDbcontext and SaveChanges is the method 
            _context.SaveChanges();
        }

        //Delete is the method and we are passing one parameter (id) with the type (int). We are not returning anything
        public void Delete(int id)
        {
            //GetById(id) is a method from the task
            var task = GetById(id);
            //task is object and active is the property and we are setting it to false
            task.Active = false;
            //context is type of applicationDbContext and Entry is a method which passing the task object. State is a property of entry and we are updating the info in tasks
            _context.Entry(task).State = EntityState.Modified;
            //context is type of applicationDbcontext and SaveChanges is the method 
            _context.SaveChanges();
        }

        //Toggle is the method and we are passing two parameter(id) with type (int) and (IsComplete) with type (bool). We are not ruturning anything
        public void Toggle(int id, bool IsComplete)
        {
            //GetById(id) is a method from the task
            var task = GetById(id);
           //task.IsComplete = IsComplete
            task.IsComplete = IsComplete;
            //context is type of applicationDbContext and Entry is a method which passing the task object. State is a property of entry and we are updating the info in tasks
            _context.Entry(task).State = EntityState.Modified;
            //context is type of applicationDbcontext and SaveChanges is the method 
            _context.SaveChanges();
        }


    }
}
