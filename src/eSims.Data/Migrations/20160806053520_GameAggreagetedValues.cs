using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eSims.Data.Migrations
{
    public partial class GameAggreagetedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Account",
                table: "Games",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AvarageHappiness",
                table: "Games",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeCount",
                table: "Games",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LevelCount",
                table: "Games",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Account",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "AvarageHappiness",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "EmployeeCount",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "LevelCount",
                table: "Games");
        }
    }
}
