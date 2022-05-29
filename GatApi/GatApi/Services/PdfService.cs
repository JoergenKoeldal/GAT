using GatApi.Data;
using GatApi.Models;
using GatApi.ViewModels;
using iText.IO.Source;
using Microsoft.EntityFrameworkCore;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;

namespace GatApi.Services
{
    public class PdfService
    {
        private readonly GatApiContext _context;

        public PdfService(GatApiContext context)
        {
            _context = context;
        }

        public async Task<MemoryStream> GetPdf(long departmentId)
        {
            Schedule currentSchedule = _context.Schedule.Where(x => x.StartDate < DateTime.Now && x.EndDate > DateTime.Now).FirstOrDefault();

            List<User> userList = await _context.User.Where(x => x.Department.DepartmentId == departmentId).
                                                      Include(user => user.Department).
                                                      Include(user => user.UserFinishedSchedules).
                                                      ThenInclude(userFinishedSchedule => userFinishedSchedule.Schedule).
                                                      OrderBy(x => x.Name).ToListAsync();

            List<PdfViewModel> pdfViewModels = new List<PdfViewModel>();

            pdfViewModels = AddPdfModelsToList(userList, currentSchedule, pdfViewModels);

            byte[] pdfByteArray = DrawPdf(currentSchedule.EndDate, pdfViewModels);

            MemoryStream ms = new MemoryStream(pdfByteArray);

            return ms;

        }

        public List<PdfViewModel> AddPdfModelsToList(List<User> userList, Schedule currentSchedule, List<PdfViewModel> pdfViewModels)
        {
            foreach (User user in userList)
            {
                PdfViewModel pdfViewModel = new PdfViewModel();
                pdfViewModel.DepartmentName = user.Department.Name;
                pdfViewModel.Name = user.Name;
                if (user.UserFinishedSchedules.Count > 0)
                {
                    foreach (UserFinishedSchedule ufs in user.UserFinishedSchedules)
                    {
                        if (ufs.ScheduleId == currentSchedule.ScheduleId)
                        {
                            pdfViewModel.IsScheduleFinished = "X";
                            pdfViewModel.ScheduleFinishedAt = ufs.FinishedAt.ToString("dd-MM-yyyy");
                        }
                    }
                }
                pdfViewModels.Add(pdfViewModel);

                List<Cleanup> cleanupList = _context.Cleanup.Where(x => x.User.UserId == user.UserId && x.Timestamp > currentSchedule.StartDate && x.Timestamp < currentSchedule.EndDate).Include(cleanup => cleanup.Source).ToList();

                foreach (Cleanup cleanup in cleanupList)
                {
                    switch (cleanup.Source.Name)
                    {
                        case "Email":
                            pdfViewModel.Email = "X";
                            break;
                        case "C-drev":
                            pdfViewModel.CDrev = "X";
                            break;
                        case "Teams":
                            pdfViewModel.Teams = "X";
                            break;
                        case "Skype":
                            pdfViewModel.Skype = "X";
                            break;
                    }
                }
            }
            return pdfViewModels;
        }

        public Byte[] DrawPdf(DateTime currentScheduleDate, List<PdfViewModel> pdfViewModels)
        {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            PdfDocument pdf = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdf);
            Paragraph header = new Paragraph("GDPR Before: " + currentScheduleDate.ToString("dd-MM-yyyy"))
               .SetTextAlignment(TextAlignment.CENTER)
               .SetFontSize(20);

            document.Add(header);

            Paragraph subheader = new Paragraph("Department of " + pdfViewModels[0].DepartmentName)
                                  .SetTextAlignment(TextAlignment.CENTER)
                                  .SetFontSize(15);
            document.Add(subheader);

            LineSeparator ls = new LineSeparator(new SolidLine());
            document.Add(ls);

            List<string> tableHeaders = new List<string>
            {
                "Name",
                "C-Drev",
                "Email",
                "Teams",
                "Skype",
                "Completed",
                "Completed Date"

            };

            Table table = new Table(tableHeaders.Count).SetAutoLayout();
            table = CreateHeaders(table);
            table = CreateRows(table);

            table.SetHorizontalAlignment(HorizontalAlignment.CENTER);

            document.Add(new Paragraph(""));
            document.Add(table);



            document.Close();

            var data = baos.ToArray();

            return data;

            // ------------------- Local Functions -----------------

            Table CreateHeaders(Table table)
            {
                foreach (string header in tableHeaders)
                {
                    Cell cell = new Cell(1, 1)
                                   .SetBackgroundColor(ColorConstants.GRAY)
                                   .SetTextAlignment(TextAlignment.CENTER)
                                   .Add(new Paragraph(header));
                    table.AddCell(cell);
                }

                return table;
            }

            Table CreateRows(Table table)
            {
                foreach (PdfViewModel pvm in pdfViewModels)
                {
                    AddCell(pvm.Name);
                    AddCell(pvm.CDrev);
                    AddCell(pvm.Email);
                    AddCell(pvm.Teams);
                    AddCell(pvm.Skype);
                    AddCell(pvm.IsScheduleFinished);
                    AddCell(pvm.ScheduleFinishedAt);

                    void AddCell(string cellValue)
                    {
                        Cell cell = new Cell(2,1)
                                 .SetTextAlignment(TextAlignment.CENTER)
                                 .Add(new Paragraph(cellValue));
                        table.AddCell(cell);
                    }
                }
                return table;
            }
        }


    }
}
