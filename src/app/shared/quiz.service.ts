import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  /*--Properties--*/
  readonly rootUrl = 'http://localhost:53152';
  qns: any[]; // The 10 random questions
  seconds: number; // Total time taken by the participant
  timer; // Counting the amount of time taken by the participant
  qnProgress: number; // Which question the participant is attempting to answer


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

  getQuestions() {
    return this.httpClient.get(this.rootUrl + '/api/Questions');
  }
}
