using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class Cleanup
    {
        [Key]
        public long CleanupId { get; set; }

        [Required]
        public User User { get; set; }
        [Required]
        public long UserId { get; set; }

        [DataType(DataType.DateTime)]
        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public Source Source { get; set; }
        [Required]
        public long SourceId { get; set; }

        [Required]
        public int Hits { get; set; }

        [Required]
        public int Deleted { get; set; }


    }
}
