using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eSims.Data.Migrations.Common
{
    public partial class Initialize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Floor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Level = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floor", x => x.Id);
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
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    BathroomMaxCount = table.Column<int>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Icon = table.Column<string>(nullable: true),
                    KitchenMaxCount = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    SmokeMaxCount = table.Column<int>(nullable: false),
                    Width = table.Column<int>(nullable: false),
                    WorkplaceMaxCount = table.Column<int>(nullable: false),
                    BathroomCount = table.Column<int>(nullable: true),
                    FloorId = table.Column<int>(nullable: true),
                    KitchenCount = table.Column<int>(nullable: true),
                    Left = table.Column<int>(nullable: true),
                    RoomTemplateId = table.Column<int>(nullable: true),
                    Rotation = table.Column<int>(nullable: true),
                    SmokeCount = table.Column<int>(nullable: true),
                    Top = table.Column<int>(nullable: true),
                    WorkplaceCount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rooms_Floor_FloorId",
                        column: x => x.FloorId,
                        principalTable: "Floor",
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
                name: "RoomExtension",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    RoomTemplateId = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomExtension", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoomExtension_Rooms_RoomTemplateId",
                        column: x => x.RoomTemplateId,
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
                    RoomTemplateId = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WallExtension", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WallExtension_Rooms_RoomTemplateId",
                        column: x => x.RoomTemplateId,
                        principalTable: "Rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomExtension_RoomTemplateId",
                table: "RoomExtension",
                column: "RoomTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_FloorId",
                table: "Rooms",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_WallExtension_RoomTemplateId",
                table: "WallExtension",
                column: "RoomTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonPerk_PersonId",
                table: "PersonPerk",
                column: "PersonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomExtension");

            migrationBuilder.DropTable(
                name: "WallExtension");

            migrationBuilder.DropTable(
                name: "SeedHistory");

            migrationBuilder.DropTable(
                name: "PersonPerk");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Floor");
        }
    }
}
