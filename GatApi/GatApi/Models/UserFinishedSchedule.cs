using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class UserFinishedSchedule
    {
        public long UserId { get; set; }

        public User User { get; set; }

        public long ScheduleId { get; set; }

        public Schedule Schedule { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime FinishedAt { get; set; }



    }
}
