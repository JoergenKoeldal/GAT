using GatApi.Models;

namespace GatApi.ViewModels
{
    public class KeywordListViewModel
    {

        public string Name { get; set; }
        public List<string> Keywords { get; set; } = new List<string>();
    }
}
