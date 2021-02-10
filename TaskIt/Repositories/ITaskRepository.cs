using System.Collections.Generic;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public interface ITaskRepository
    {
  
      
        Task GetById(int id);
        List<Task> GetByBoardId(int id);
        void Add(Task task);
        void Update(Task task);
        void Delete(int id);
        void Toggle(int id, bool IsComplete);




    }
}