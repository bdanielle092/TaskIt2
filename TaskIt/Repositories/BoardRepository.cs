using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TaskIt.Data;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    //classes are blueprints with all the methods and objects
    //IBoardRepository is an Interface which is a type definition similar to a class, except that it purely represents a contract between an object and its user.
    public class BoardRepository : IBoardRepository
    {
        //this is a field which we know beacuse it private and no get set
        //A field is a variable of any type that is declared directly in a class or struct
        private readonly ApplicationDbContext _context;
        //this is a constructor which we know because it has the same name as the class and no return type
        //A constructor is a special method that is used to initialize objects
        public BoardRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        //List is the type and its a list of Boards. GetAll is our method
        //ToList. This extension method converts collections (IEnumerables) to List instances
        //IEnumerable in C# is an interface that defines one method
        public List<Board> GetAll()
        {
            //context is type ApplicationDbContext and Board is the property 
            return _context.Board
                .Include(b => b.UserProfile)
                .Where(b => b.Active)
                .ToList();
        }
        //Board is the type GetById is the method. Passing one parameter Id with the type int
        public Board GetById(int id)
        {
            return _context.Board
                .Include(b => b.UserProfile)
                .Where(b => b.Active)
                .FirstOrDefault(b => b.Id == id);
        }

        public List<Board> GetByUserProfileId(int id)
        {
            return _context.Board.Include(b => b.UserProfile)
                            .Where(b => b.UserProfileId == id)
                            .Where(b => b.Active)
                            .ToList();
        }


        //Add is a method and we are passing one parameter board with the type Board. We are not returning anything
        public void Add(Board board)
        {
            //board is object and active is the property and we are setting it to true
            board.Active = true;
            //context is type of applicationDbcontext and Add is the method with the parameter of board
            _context.Add(board);
            //context is type of applicationDbcontext and SaveChanges is the method 
            _context.SaveChanges();
        }

        //Update is a method and we are passing one parameter board object with the type of Board which is the class. We are not return anything
        public void Update(Board board)
        {
            //board is the object and active is the property which we are setting it to true
            board.Active = true;
            //context is type of applicationDbContext and Endtry is a method which passing the board object. State is a property of entry and we are updating the info in boards
            _context.Entry(board).State = EntityState.Modified;
            //context is type of applicationDbContext and SaveChanges is a method 
            _context.SaveChanges();
        }
        //Delete is the method and we are passing one parameter (id) with the type (int). We are not returning anything
        public void Delete(int id)
        {
            //GetById(id) is a method from the board 
            var board = GetById(id);
            //board is the object and active is the property and we are setting it to false
            board.Active = false;
            // context is type of applicationDbContext and Endtry is a method which passing the board object.State is a property of entry and we are updating the info in boards
            _context.Entry(board).State = EntityState.Modified;
            //context is type of applicationDbContext and SaveChanges is a method 
            _context.SaveChanges();
        }

        
        
      public void AddIntialBoards(int userProfileId)
        {
            //adding a new board object to store the board info
            Board board = new Board() {
                Name = "Personal",
                UserProfileId = userProfileId,
                Active = true
            };
            Board boardTwo = new Board()
            {
                Name = "Work",
                UserProfileId = userProfileId,
                Active = true
            };
            //adding the boards and saving the changes
            _context.Add(board);
            _context.Add(boardTwo);
            _context.SaveChanges();

        }


    }
}
