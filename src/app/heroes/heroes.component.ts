// @angular/coreライブラリからcomponentシンボルをインポート
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'windstorm'
  };
  heroes: Hero[];
  constructor(
    private heroService: HeroService
  ) { 
    // console.log('init constructer');
  }

  add(name: string): void {
    name = name.trim();
    // console.log({name});
    if(!name) {return;}
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    //なぜかフィルターはわけちゃだめ
    this.heroes = this.heroes.filter(h => h !== hero);
    console.log(this.heroes);
    this.heroService.deleteHero(hero).subscribe();
  }
  
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  ngOnInit() {
    console.log('init ngOninit');
    this.getHeroes();
  }

}
