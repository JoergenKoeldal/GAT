using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GatApi.Migrations
{
    public partial class compositeTest2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "KeywordList",
                newName: "KeywordListId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Keyword",
                newName: "KeywordId");

            migrationBuilder.CreateIndex(
                name: "IX_KeywordListHasKeywords_KeywordListId",
                table: "KeywordListHasKeywords",
                column: "KeywordListId");

            migrationBuilder.AddForeignKey(
                name: "FK_KeywordListHasKeywords_Keyword_KeywordId",
                table: "KeywordListHasKeywords",
                column: "KeywordId",
                principalTable: "Keyword",
                principalColumn: "KeywordId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KeywordListHasKeywords_KeywordList_KeywordListId",
                table: "KeywordListHasKeywords",
                column: "KeywordListId",
                principalTable: "KeywordList",
                principalColumn: "KeywordListId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeywordListHasKeywords_Keyword_KeywordId",
                table: "KeywordListHasKeywords");

            migrationBuilder.DropForeignKey(
                name: "FK_KeywordListHasKeywords_KeywordList_KeywordListId",
                table: "KeywordListHasKeywords");

            migrationBuilder.DropIndex(
                name: "IX_KeywordListHasKeywords_KeywordListId",
                table: "KeywordListHasKeywords");

            migrationBuilder.RenameColumn(
                name: "KeywordListId",
                table: "KeywordList",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KeywordId",
                table: "Keyword",
                newName: "Id");
        }
    }
}
