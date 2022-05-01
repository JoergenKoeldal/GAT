using Aspose.Pdf;

namespace GatApi.Util
{
    public static class Util
    {
        public static void GeneratePdf()
        {
            Document document = new Document();

            Page page = document.Pages.Add();

            page.Paragraphs.Add(new Aspose.Pdf.Text.TextFragment("Tester daaaaarh"));

            document.Save("TestDoc.pdf");
        }
        

        
    }
}
