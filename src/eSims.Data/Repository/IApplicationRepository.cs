using System.Collections.Generic;
using eSims.Data.Application;

namespace eSims.Data.Repository
{
  public interface IApplicationRepository
  {
    Game GetGame(int id);
    IEnumerable<Game> GetGames();
    int CreateGame(string value);
    void DeleteGame(int id);
  }
}