using System.ComponentModel.DataAnnotations;

namespace eSims.Data.Building
{
  public class RoomTemplate
  {
    [Key]
    public int Id { get; set; }

    public bool IsWorkplace { get; set; }
  }
}