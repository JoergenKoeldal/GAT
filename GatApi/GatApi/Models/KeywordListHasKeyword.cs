using System.ComponentModel.DataAnnotations;

namespace GatApi.Models
{
    public class KeywordListHasKeyword
    {

        public long KeywordListId { get; set; }
        public KeywordList KeywordList { get; set; }

        public long KeywordId { get; set; }
        public Keyword Keyword { get; set; }

    }
}
