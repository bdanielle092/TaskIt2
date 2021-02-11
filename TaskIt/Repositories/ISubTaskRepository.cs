using System.Collections.Generic;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public interface ISubTaskRepository
    {

      
        public List<SubTask> GetByTaskId(int taskId);

        SubTask GetById(int id);
        void Add(SubTask subTask);
        void Update(SubTask subTask);
        public void Delete(int id);
        void Toggle(int id, bool IsComplete);
    }
}