using System.Collections.Generic;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public interface IPriorityRepository
    {
        List<Priority> GetAll();
        Priority GetById(int id);
    }
}