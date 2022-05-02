
using GatApi.ViewModels;
using iText.IO.Font;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.Exchange.WebServices.Data;

namespace GatApi.Util
{
    public static class Util
    {
        public static void GeneratePdf(List<PdfViewModel> pdfViewModels, DateTime currentScheduleDate)
        {
            string newFont = "Resources/Font/FreeSans.ttf";
            PdfFont freeSansFont = PdfFontFactory.CreateFont(newFont, PdfEncodings.WINANSI);

            PdfWriter writer = new PdfWriter("NewPdfTest.pdf");
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            Paragraph header = new Paragraph("GDPR: " + currentScheduleDate.ToString("dd-MM-yyyy"))
               .SetTextAlignment(TextAlignment.CENTER)
               .SetFontSize(20);

            document.Add(header);

            Paragraph subheader = new Paragraph(pdfViewModels[0].DepartmentName)
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

                    Cell nameCell = new Cell(2, 1)
                                 .SetTextAlignment(TextAlignment.CENTER)
                                 .Add(new Paragraph(pvm.Name).SetFont(freeSansFont));
                    table.AddCell(nameCell);

                    Cell cDrevCell = new Cell(2, 1)
                                .SetTextAlignment(TextAlignment.CENTER)
                                .Add(new Paragraph(pvm.CDrev));
                    table.AddCell(cDrevCell);

                    Cell emailCell = new Cell(2, 1)
                                .SetTextAlignment(TextAlignment.CENTER)
                                .Add(new Paragraph(pvm.Email));
                    table.AddCell(emailCell);

                    Cell teamsCell = new Cell(2, 1)
                                .SetTextAlignment(TextAlignment.CENTER)
                                .Add(new Paragraph(pvm.Teams));
                    table.AddCell(teamsCell);

                    Cell skypeCell = new Cell(2, 1)
                                .SetTextAlignment(TextAlignment.CENTER)
                                .Add(new Paragraph(pvm.Skype));
                    table.AddCell(skypeCell);

                    Cell completedCell = new Cell(2, 1)
                                .SetTextAlignment(TextAlignment.CENTER)
                                .Add(new Paragraph(pvm.IsScheduleFinished));
                    table.AddCell(completedCell);

                    Cell completedDateCell = new Cell(2, 1)
                                .SetTextAlignment(TextAlignment.CENTER)
                                .Add(new Paragraph(pvm.ScheduleFinishedAt));                               
                    table.AddCell(completedDateCell);
                }
                return table;
            }

        }

        public static void SendEmail()
        {
            ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2016);
            service.Credentials = new WebCredentials("phillip.glimoe@hotmail.com", "xxxx");
            service.TraceEnabled = true;
            service.TraceFlags = TraceFlags.All;
            service.AutodiscoverUrl("phillip.glimoe@hotmail.com", RedirectionUrlValidationCallback);
            EmailMessage email = new EmailMessage(service);
            email.ToRecipients.Add("phillip.glimoe@hotmail.com");
            email.Subject = "HelloWorld";
            email.Attachments.AddFileAttachment("NewPdfTest.pdf");
            email.Body = new MessageBody("This is the first email I've sent by using the EWS Managed API");
            email.Send();
        }

        private static bool RedirectionUrlValidationCallback(string redirectionUrl)
        {
            // The default for the validation callback is to reject the URL.
            bool result = false;
            Uri redirectionUri = new Uri(redirectionUrl);
            // Validate the contents of the redirection URL. In this simple validation
            // callback, the redirection URL is considered valid if it is using HTTPS
            // to encrypt the authentication credentials. 
            if (redirectionUri.Scheme == "https")
            {
                result = true;
            }
            return result;
        }

    }
}
