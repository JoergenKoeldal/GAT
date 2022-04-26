using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class Keyword
    {

        [Key]
        public long KeywordId { get; set; }

        [Required]
        public string Word { get; set; }

        public IList<KeywordListHasKeyword> KeywordListHasKeywords { get; set; }


    }
}
