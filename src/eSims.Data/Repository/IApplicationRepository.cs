using System.Collections.Generic;
using eSims.Data.Application;

namespace eSims.Data.Repository
{
  public interface IApplicationRepository
  {
    Game GetGame(string sessionId);
    IEnumerable<Game> GetGames();
    int CreateGame(string value);
  }
}