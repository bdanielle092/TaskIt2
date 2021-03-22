using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

// models correspond to tables in the database
namespace TaskIt.Models
{
    public class SubTask
    {
        //these are all properties of SubTask
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; }
        public bool Active { get; set; }

    }

}
