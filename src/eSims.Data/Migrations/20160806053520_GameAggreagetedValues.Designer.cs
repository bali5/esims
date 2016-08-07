﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using eSims.Data.Context;

namespace eSims.Data.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20160806053520_GameAggreagetedValues")]
    partial class GameAggreagetedValues
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431");

            modelBuilder.Entity("eSims.Data.Application.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("Account");

                    b.Property<double>("AvarageHappiness");

                    b.Property<string>("DataFilePath");

                    b.Property<int>("EmployeeCount");

                    b.Property<int>("LevelCount");

                    b.Property<string>("Name");

                    b.Property<string>("SessionId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("eSims.Data.Application.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("eSims.Data.Application.Game", b =>
                {
                    b.HasOne("eSims.Data.Application.User")
                        .WithMany("Games")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
