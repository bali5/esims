﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using eSims.Data.Context;

namespace eSims.Data.Migrations.Common
{
    [DbContext(typeof(CommonContext))]
    [Migration("20160812163419_Initialize")]
    partial class Initialize
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431");

            modelBuilder.Entity("eSims.Data.Building.RoomExtension", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.Property<int?>("RoomTemplateId");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("RoomTemplateId");

                    b.ToTable("RoomExtension");
                });

            modelBuilder.Entity("eSims.Data.Building.RoomTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BathroomMaxCount");

                    b.Property<int>("Height");

                    b.Property<string>("Name");

                    b.Property<double>("Price");

                    b.Property<int>("SmokeMaxCount");

                    b.Property<int>("Width");

                    b.Property<int>("WorkplaceMaxCount");

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("eSims.Data.Building.WallExtension", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("Placement");

                    b.Property<double>("Price");

                    b.Property<int?>("RoomTemplateId");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("RoomTemplateId");

                    b.ToTable("WallExtension");
                });

            modelBuilder.Entity("eSims.Data.Context.SeedHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("SeedHistory");
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

            modelBuilder.Entity("eSims.Data.Building.RoomExtension", b =>
                {
                    b.HasOne("eSims.Data.Building.RoomTemplate")
                        .WithMany("RoomExtensions")
                        .HasForeignKey("RoomTemplateId");
                });

            modelBuilder.Entity("eSims.Data.Building.WallExtension", b =>
                {
                    b.HasOne("eSims.Data.Building.RoomTemplate")
                        .WithMany("WallExtensions")
                        .HasForeignKey("RoomTemplateId");
                });

            modelBuilder.Entity("eSims.Data.HumanResources.PersonPerk", b =>
                {
                    b.HasOne("eSims.Data.HumanResources.Person")
                        .WithMany("Perks")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
