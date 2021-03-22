using System;
using System.Collections.Generic;
using System.Linq;

//models correspond to tables in the database
namespace TaskIt.Models
{
    public class Priority
    {
        //these are all properties of priority
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
