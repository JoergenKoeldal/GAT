﻿// <auto-generated />
using System;
using GatApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GatApi.Migrations
{
    [DbContext(typeof(GatApiContext))]
    [Migration("20220425110620_compositeTest2")]
    partial class compositeTest2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("GatApi.Models.Department", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<int>("Name")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Department");
                });

            modelBuilder.Entity("GatApi.Models.Keyword", b =>
                {
                    b.Property<long>("KeywordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("KeywordId"), 1L, 1);

                    b.Property<string>("Word")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("KeywordId");

                    b.ToTable("Keyword");
                });

            modelBuilder.Entity("GatApi.Models.KeywordList", b =>
                {
                    b.Property<long>("KeywordListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("KeywordListId"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("KeywordListId");

                    b.HasIndex("UserId");

                    b.ToTable("KeywordList");
                });

            modelBuilder.Entity("GatApi.Models.KeywordListHasKeyword", b =>
                {
                    b.Property<long>("KeywordId")
                        .HasColumnType("bigint");

                    b.Property<long>("KeywordListId")
                        .HasColumnType("bigint");

                    b.HasKey("KeywordId", "KeywordListId");

                    b.HasIndex("KeywordListId");

                    b.ToTable("KeywordListHasKeywords");
                });

            modelBuilder.Entity("GatApi.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<long>("DepartmentId")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("GatApi.Models.KeywordList", b =>
                {
                    b.HasOne("GatApi.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GatApi.Models.KeywordListHasKeyword", b =>
                {
                    b.HasOne("GatApi.Models.Keyword", "Keyword")
                        .WithMany("KeywordListHasKeywords")
                        .HasForeignKey("KeywordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GatApi.Models.KeywordList", "KeywordList")
                        .WithMany("KeywordListHasKeywords")
                        .HasForeignKey("KeywordListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Keyword");

                    b.Navigation("KeywordList");
                });

            modelBuilder.Entity("GatApi.Models.User", b =>
                {
                    b.HasOne("GatApi.Models.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("GatApi.Models.Keyword", b =>
                {
                    b.Navigation("KeywordListHasKeywords");
                });

            modelBuilder.Entity("GatApi.Models.KeywordList", b =>
                {
                    b.Navigation("KeywordListHasKeywords");
                });
#pragma warning restore 612, 618
        }
    }
}