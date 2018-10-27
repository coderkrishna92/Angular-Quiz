import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  /*--Properties--*/
  readonly rootUrl = '';


  /*--Helper methods--*/

  constructor(private httpClient: HttpClient) { }

  /*--Http methods--*/
  insertParticipant(name: string, email: string) {
    let body = {
      Name: name,
      Email: email
    };

    return this.httpClient.post(this.rootUrl + '/api/InsertParticipant', body);
  }
}
