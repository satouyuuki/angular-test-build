import { Injectable } from '@angular/core';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  private heroesUrl = 'api/heroes'; //Web APIのURL
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => {
        console.log(_);
        this.log(`found heroes matching "${term}"`)
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    console.log(hero);
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => {
        this.log(`added hero w/ id=${newHero.id}`)
      }),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    console.log(hero);
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`delete hero id=${id}`)
      }),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // モックヒーローを返す
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetch heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // エラーハンドリング
        tap(heroes => {
          console.log(heroes);
          this.log('fetched heroes')
        }),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService: fetch hero id = ${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    // return this.http.get<Hero[]>(this.heroesUrl).find(hero => hero.id);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => {
        console.log(_);
        this.log(`fetched hero id=${id}`)
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    console.log(hero);
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => {
        this.log(`updated hero id=${hero.id}`)
      }),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
