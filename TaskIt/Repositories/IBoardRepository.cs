using System.Collections.Generic;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public interface IBoardRepository
    {
        //Interface is like a contract  
        //An interface is a group of related properties and methods that describe an object, but neither provides implementation nor initialisation for them

        void Add(Board board);
        List<Board> GetAll();
        Board GetById(int id);
        List<Board> GetByUserProfileId(int id);
        void Update(Board board);
        public void Delete(int id);
        void AddIntialBoards(int userProfileId);
    }
}