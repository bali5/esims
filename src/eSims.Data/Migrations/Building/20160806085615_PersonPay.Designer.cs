using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using eSims.Data.Context;

namespace eSims.Data.Migrations.Building
{
    [DbContext(typeof(BuildingContext))]
    [Migration("20160806085615_PersonPay")]
    partial class PersonPay
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431");

            modelBuilder.Entity("eSims.Data.Building.AccountRow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Subject");

                    b.Property<double>("Value");

                    b.HasKey("Id");

                    b.ToTable("AccountRows");
                });

            modelBuilder.Entity("eSims.Data.Building.Floor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Level");

                    b.HasKey("Id");

                    b.ToTable("Floors");
                });

            modelBuilder.Entity("eSims.Data.Building.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Count");

                    b.Property<int?>("FloorId");

                    b.Property<bool>("IsWorkplace");

                    b.Property<int>("MaxCount");

                    b.Property<int?>("TemplateId");

                    b.HasKey("Id");

                    b.HasIndex("FloorId");

                    b.HasIndex("TemplateId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("eSims.Data.Building.RoomTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsWorkplace");

                    b.HasKey("Id");

                    b.ToTable("RoomTemplate");
                });

            modelBuilder.Entity("eSims.Data.HumanResources.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Administration");

                    b.Property<double>("Annoyance");

                    b.Property<double>("Charisma");

                    b.Property<double>("Creativity");

                    b.Property<int?>("CurrentBreak");

                    b.Property<double>("Efficiency");

                    b.Property<double>("Empathy");

                    b.Property<int?>("EmployeeState");

                    b.Property<double>("Energy");

                    b.Property<double>("Happiness");

                    b.Property<double?>("HireTime");

                    b.Property<double>("Investigation");

                    b.Property<string>("Name");

                    b.Property<double>("Pay");

                    b.Property<int?>("RoomId");

                    b.Property<int>("State");

                    b.Property<int?>("TeamId");

                    b.Property<double>("Vitality");

                    b.HasKey("Id");

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("eSims.Data.HumanResources.PersonPerk", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Perk");

                    b.Property<int>("PersonId");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("PersonPerk");
                });

            modelBuilder.Entity("eSims.Data.HumanResources.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Count");

                    b.Property<int>("MaxCount");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("eSims.Data.Workflow.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("eSims.Data.Workflow.Story", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Finished");

                    b.Property<string>("Name");

                    b.Property<int?>("ProjectId");

                    b.Property<double>("Size");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("Story");
                });

            modelBuilder.Entity("eSims.Data.Building.Room", b =>
                {
                    b.HasOne("eSims.Data.Building.Floor")
                        .WithMany("Rooms")
                        .HasForeignKey("FloorId");

                    b.HasOne("eSims.Data.Building.RoomTemplate", "Template")
                        .WithMany()
                        .HasForeignKey("TemplateId");
                });

            modelBuilder.Entity("eSims.Data.HumanResources.PersonPerk", b =>
                {
                    b.HasOne("eSims.Data.HumanResources.Person")
                        .WithMany("Perks")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("eSims.Data.Workflow.Story", b =>
                {
                    b.HasOne("eSims.Data.Workflow.Project")
                        .WithMany("Stories")
                        .HasForeignKey("ProjectId");
                });
        }
    }
}
