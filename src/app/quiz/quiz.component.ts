import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router,
              private quizService: QuizService) { }

  ngOnInit() {

    // Looking at the localStorage to see if there was anything recorded
    if(parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress == 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
      }
    } else {

    // Initializing various things
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;

    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.quizService.qns = data;
        console.log(data);
        this.startTimer();
      });
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      // Incrementing the timer by 1
      this.quizService.seconds++;

      // Using localStorage to be able to track the elapsed time
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(questionId, choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;

    // Persisting data with localStorage with the questions
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));

    this.quizService.qnProgress++;

    // Caching the qnProgress in the localStorage
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());

    if (this.quizService.qnProgress == 10){
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
