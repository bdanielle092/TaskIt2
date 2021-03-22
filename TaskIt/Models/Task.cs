using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

//models correspond to tables in the database
namespace TaskIt.Models
{
    public class Task
    {
        //these are all properties of Task
        public int Id { get; set; }
        //Annotations -are meant to augment or "decorate" the thing it goes on top of
        // In our model class, we can use these to enforce some rules about our properties
    
        [Required]
        public string Name { get; set; }
        public string Notes { get; set; }
        public int PriorityId { get; set; }
        public Priority Priority { get; set; }
        public bool IsComplete { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public int BoardId { get; set; }
        public Board Board { get; set; }
        public List <SubTask> SubTasks { get; set; }

        public bool Active { get; set; }
    }
}
