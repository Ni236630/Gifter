using Gifter.Models;
using System.Collections.Generic;

namespace Gifter.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile user);
        void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        void Update(UserProfile user);
        UserProfile GetByIdWithPosts(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}