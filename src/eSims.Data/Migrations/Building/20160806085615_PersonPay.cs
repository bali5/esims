using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eSims.Data.Migrations.Building
{
    public partial class PersonPay : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "HireTime",
                table: "Persons",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Pay",
                table: "Persons",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HireTime",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Pay",
                table: "Persons");
        }
    }
}
