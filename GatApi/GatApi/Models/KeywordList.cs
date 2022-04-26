using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class KeywordList
    {
        [Key]
        public long KeywordListId { get; set; }

        [Required]
        public string Name { get; set; }

        public IList<KeywordListHasKeyword> KeywordListHasKeywords { get; set; }

        public User? User { get; set; }

    }
}
