using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class Source
    {
        [Key]
        public long SourceId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
