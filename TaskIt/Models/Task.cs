using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace TaskIt.Models
{
    public class Task
    {
        public int Id { get; set; }
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
