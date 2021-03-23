using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using TaskIt.Data;
using TaskIt.Models;

namespace TaskIt.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public UserProfile GetByUserProfileId(int id)
        {
            return _context.UserProfile
                .FirstOrDefault(up => up.Id == id);
        }



        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }


    }
}
