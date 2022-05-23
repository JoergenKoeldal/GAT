namespace GatApi.ViewModels
{
    public class CleanupViewModel
    {
        public long UserId { get; set; }
        public long SourceId { get; set; }
        public int Hits { get; set; }
        public int Deleted { get; set; }

    }
}
