using System.Collections.Generic;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetByUserProfileId(int id);
    }
}