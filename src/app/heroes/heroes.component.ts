// @angular/coreライブラリからcomponentシンボルをインポート
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
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
  // 本来はデータの取得と保存はしてはいけない
  // heroes = HEROES;
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private heroService: HeroService
  ) { 
    console.log('init constructer');
  }
  
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe(heroes => {
      // console.log(typeof heroes);
      // heroes.forEach(hero => {
      //   console.log(hero);
      // })
      this.heroes = heroes;
    })
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ngOnInit() {
    console.log('init ngOninit');
    this.getHeroes();
  }

}
