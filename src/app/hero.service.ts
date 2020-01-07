import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
// プロバイダを登録する(サービスを作成、提供できる状態にする)ルートインジェクターに登録する
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService
  ) { }

  // モックヒーローを返す
  getHeroes(): Observable<Hero[]> {
    // of関数は引数をObservable型に変換する
    this.messageService.add('HeroService: fetch heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetch hero id = ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}
