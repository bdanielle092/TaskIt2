using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

//models correspond to tables in the database
namespace TaskIt.Models
{
    public class UserProfile
    {
        //these are all properties of UserProfile
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MaxLength(28)]
        public string FirebaseUserId { get; set; }
    }
}
