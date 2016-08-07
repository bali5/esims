import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from './game.service';
import { Game } from './game';

import material from './../common/material';

@Component(material({
  selector: 'es-game-list',
  templateUrl: 'views/building/game-list.html',
  providers: [ GameService ],
  directives: [ ]
}))
export class GameList implements OnInit {
  constructor(private router: Router, private service: GameService) {
  }

  public games: Game[];

  ngOnInit() {
   this.service.getGames().then(t => this.games = t);
  }

  public create(name: string) {
    this.service.createGame(name).then(t => this.router.navigate(['/building', t]));
  }

  public onSelect(game: Game) {
    this.router.navigate(['/building', game.id]);
  }



}
