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
  correctAnswerCount: number = 0; // The count of the correct answers, initialize to 0

  /*--Helper methods--*/

  constructor(private httpClient: HttpClient) { }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) +
    ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }

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

  getAnswers() {
    var body = this.qns.map(x => x.QuestionId);
    return this.httpClient.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.httpClient.post(this.rootUrl + "/api/UpdateOutput", body);
  }
}
