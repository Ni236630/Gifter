using Gifter.Models;
using System;
using System.Collections.Generic;

namespace Gifter.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<Post> GetAll();
        Post GetById(int id);
        void Update(Post post);
        List<Post> GetAllWithComments();
        Post GetPostByIdWithComments(int id);
     
        List<Post> Search(string q, bool sortDesc);
        List<Post> SearchHottest(string criterion, bool sortDescending);
    }
}