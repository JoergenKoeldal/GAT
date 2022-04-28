using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class Department
    {
        [Key]
        public long DepartmentId { get; set; }

        [Required]
        public string Name { get; set; }

    }
}
