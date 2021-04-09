using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Gifter.Models;
using Gifter.Utils;

namespace Gifter.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Email, ImageUrl, DateCreated
                        FROM  UserProfile 
                        
                    ";

                    var reader = cmd.ExecuteReader();
                    var users = new List<UserProfile>();

                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),

                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Email, ImageUrl, DateCreated
                        FROM  UserProfile 
                        WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;

                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                        };
                    }

                    reader.Close();
                    return user;
                }
            }
        }

        public UserProfile GetByIdWithPosts(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id AS UserId, up.Name, up.Email, up.ImageUrl, up.DateCreated, p.Id AS PostId, p.Title, p.DateCreated AS PostDateCreated, p.Caption, p.ImageUrl AS PostImage
                        FROM  UserProfile up
                        LEFT JOIN Post p ON p.UserProfileId = up.Id
                        WHERE up.Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;

                    while (reader.Read())
                    {
                        var userId = DbUtils.GetInt(reader, "UserId");

                        if (user == null)
                        {
                            user = new UserProfile()
                            {
                              
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Posts = new List<Post>()
                                    
                            };


                        }
                        if(DbUtils.IsNotDbNull(reader, "PostId"))
                        {
                            user.Posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                ImageUrl = DbUtils.GetString(reader,"PostImage"),
                                Caption = DbUtils.GetString(reader, "Caption"),
                                DateCreated = DbUtils.GetDateTime(reader,"PostDateCreated")

                            });
                        }
                    }
                    reader.Close();
                    return user;
                }
            }
        }


        public void Add(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile ([Name], Email, DateCreated, ImageUrl)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @email, @dateCreated, @imageUrl)
                    ";

                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@dateCreated", user.DateCreated);
                    DbUtils.AddParameter(cmd, "@imageUrl", user.ImageUrl);

                    user.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                            SET Name = @name,
                                Email = @email,
                                DateCreated = @dateCreated,
                                ImageUrl = @imageUrl
                            WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@name", user.Name);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@dateCreated", user.DateCreated);
                    DbUtils.AddParameter(cmd, "@imageUrl", user.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM UserProfile WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
