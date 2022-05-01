namespace GatApi.ViewModels
{
    public class UserViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsScheduleFinished { get; set; } = false;
        public string DepartmentName { get; set; }

    }
}
