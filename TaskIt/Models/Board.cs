using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace TaskIt.Models
{
    public class Board
    {
        //these are all properties of board
        public int Id { get; set; }

        //adaptation 
        [Required]
        public string Name { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public bool Active { get; set; }
        public List<Task> Tasks { get; set; }

    }
}
