using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class Department
    {
        [Key]
        public long DepartmentId { get; set; }

        [Required]
        public int Name { get; set; }

    }
}
