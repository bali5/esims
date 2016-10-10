using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eSims.Data.Migrations.Building
{
    public partial class Initialize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountRows",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Subject = table.Column<string>(nullable: true),
                    Value = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountRows", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Account = table.Column<double>(nullable: false),
                    Persons = table.Column<int>(nullable: false),
                    PlayTime = table.Column<double>(nullable: false),
                    SimulationTime = table.Column<DateTime>(nullable: false),
                    Speed = table.Column<int>(nullable: false),
                    StartTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Floors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Height = table.Column<int>(nullable: false),
                    Left = table.Column<int>(nullable: false),
                    Level = table.Column<int>(nullable: false),
                    Top = table.Column<int>(nullable: false),
                    Width = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SeedHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Date = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeedHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Administration = table.Column<double>(nullable: false),
                    Annoyance = table.Column<double>(nullable: false),
                    Charisma = table.Column<double>(nullable: false),
                    Creativity = table.Column<double>(nullable: false),
                    CurrentBreak = table.Column<int>(nullable: true),
                    Efficiency = table.Column<double>(nullable: false),
                    Empathy = table.Column<double>(nullable: false),
                    EmployeeState = table.Column<int>(nullable: true),
                    Energy = table.Column<double>(nullable: false),
                    Happiness = table.Column<double>(nullable: false),
                    HireTime = table.Column<double>(nullable: true),
                    Investigation = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Pay = table.Column<double>(nullable: false),
                    RoomId = table.Column<int>(nullable: true),
                    State = table.Column<int>(nullable: false),
                    TeamId = table.Column<int>(nullable: true),
                    Vitality = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Count = table.Column<int>(nullable: false),
                    MaxCount = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    BathroomCount = table.Column<int>(nullable: false),
                    BathroomMaxCount = table.Column<int>(nullable: false),
                    FloorId = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Icon = table.Column<string>(nullable: true),
                    IsSystemOnly = table.Column<bool>(nullable: false),
                    KitchenCount = table.Column<int>(nullable: false),
                    KitchenMaxCount = table.Column<int>(nullable: false),
                    Left = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    RoomTemplateId = table.Column<int>(nullable: false),
                    Rotation = table.Column<int>(nullable: false),
                    SmokeCount = table.Column<int>(nullable: false),
                    SmokeMaxCount = table.Column<int>(nullable: false),
                    Top = table.Column<int>(nullable: false),
                    Width = table.Column<int>(nullable: false),
                    WorkplaceCount = table.Column<int>(nullable: false),
                    WorkplaceMaxCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Floors_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Floors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PersonPerk",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Perk = table.Column<int>(nullable: false),
                    PersonId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonPerk", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PersonPerk_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Story",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Finished = table.Column<double>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true),
                    Size = table.Column<double>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Story", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Story_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RoomExtension",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    RoomId = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomExtension", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomExtension_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WallExtension",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Placement = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    RoomId = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WallExtension", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WallExtension_Rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_FloorId",
                table: "Rooms",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_RoomExtension_RoomId",
                table: "RoomExtension",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_WallExtension_RoomId",
                table: "WallExtension",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonPerk_PersonId",
                table: "PersonPerk",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_Story_ProjectId",
                table: "Story",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountRows");

            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropTable(
                name: "RoomExtension");

            migrationBuilder.DropTable(
                name: "WallExtension");

            migrationBuilder.DropTable(
                name: "SeedHistory");

            migrationBuilder.DropTable(
                name: "PersonPerk");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Story");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Floors");
        }
    }
}
