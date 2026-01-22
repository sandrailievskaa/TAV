using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Test.TestsDto
{
    public class CreateUpdateTestDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; } = null!;

        public int Age { get; set; }
    }
}
