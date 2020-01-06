// @angular/coreライブラリからcomponentシンボルをインポート
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero = 'windstorem';
  hero: Hero = {
    id: 1,
    name: 'windstorm'
  };
  heroes = HEROES;
  selectedHero: Hero;
  constructor() { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ngOnInit() {
  }

}