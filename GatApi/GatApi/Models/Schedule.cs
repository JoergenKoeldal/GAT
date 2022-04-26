using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class Schedule
    {
        [Key]
        public long ScheduleId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public IList<UserFinishedSchedule> UserFinishedSchedules { get; set; }


    }
}
