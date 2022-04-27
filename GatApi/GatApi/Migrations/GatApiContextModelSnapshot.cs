﻿// <auto-generated />
using System;
using GatApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GatApi.Migrations
{
    [DbContext(typeof(GatApiContext))]
    partial class GatApiContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("GatApi.Models.Cleanup", b =>
                {
                    b.Property<long>("CleanupId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("CleanupId"), 1L, 1);

                    b.Property<int>("Deleted")
                        .HasColumnType("int");

                    b.Property<int>("Hits")
                        .HasColumnType("int");

                    b.Property<long>("SourceId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("datetime2");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("CleanupId");

                    b.HasIndex("SourceId");

                    b.HasIndex("UserId");

                    b.ToTable("Cleanup");
                });

            modelBuilder.Entity("GatApi.Models.Department", b =>
                {
                    b.Property<long>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("DepartmentId"), 1L, 1);

                    b.Property<int>("Name")
                        .HasColumnType("int");

                    b.HasKey("DepartmentId");

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

            modelBuilder.Entity("GatApi.Models.Schedule", b =>
                {
                    b.Property<long>("ScheduleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("ScheduleId"), 1L, 1);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.HasKey("ScheduleId");

                    b.ToTable("Schedule");
                });

            modelBuilder.Entity("GatApi.Models.Source", b =>
                {
                    b.Property<long>("SourceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("SourceId"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SourceId");

                    b.ToTable("Source");
                });

            modelBuilder.Entity("GatApi.Models.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("UserId"), 1L, 1);

                    b.Property<long>("DepartmentId")
                        .HasColumnType("bigint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.HasIndex("DepartmentId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("GatApi.Models.UserFinishedSchedule", b =>
                {
                    b.Property<long>("ScheduleId")
                        .HasColumnType("bigint");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("FinishedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("ScheduleId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserFinishedSchedule");
                });

            modelBuilder.Entity("GatApi.Models.Cleanup", b =>
                {
                    b.HasOne("GatApi.Models.Source", "Source")
                        .WithMany()
                        .HasForeignKey("SourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GatApi.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Source");

                    b.Navigation("User");
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

            modelBuilder.Entity("GatApi.Models.UserFinishedSchedule", b =>
                {
                    b.HasOne("GatApi.Models.Schedule", "Schedule")
                        .WithMany("userFinishedSchedules")
                        .HasForeignKey("ScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GatApi.Models.User", "User")
                        .WithMany("userFinishedSchedules")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Schedule");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GatApi.Models.Keyword", b =>
                {
                    b.Navigation("KeywordListHasKeywords");
                });

            modelBuilder.Entity("GatApi.Models.KeywordList", b =>
                {
                    b.Navigation("KeywordListHasKeywords");
                });

            modelBuilder.Entity("GatApi.Models.Schedule", b =>
                {
                    b.Navigation("userFinishedSchedules");
                });

            modelBuilder.Entity("GatApi.Models.User", b =>
                {
                    b.Navigation("userFinishedSchedules");
                });
#pragma warning restore 612, 618
        }
    }
}