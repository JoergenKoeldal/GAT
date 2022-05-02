namespace GatApi.ViewModels
{
    public class PdfViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; } = "";
        public string CDrev { get; set; } = "";
        public string Teams { get; set; } = "";
        public string Skype { get; set; } = "";
        public string IsScheduleFinished { get; set; } = "";
        public string ScheduleFinishedAt { get; set; } = "";
        public string DepartmentName { get; set; }

    }
}
