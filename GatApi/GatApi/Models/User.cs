using System.ComponentModel.DataAnnotations;
namespace GatApi.Models
{
    public class User
    {
        [Key]
        public long UserId { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }


        [Required]
        public Department Department { get; set; }

        public IList<UserFinishedSchedule> UserFinishedSchedules { get; set; }

    }
}
