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

    // Initializing various things
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;

    this.quizService.getQuestions().subscribe(
      (data: any) => {
        this.quizService.qns = data;
        console.log(data);
        this.startTimer();
      }
    );
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      // Incrementing the timer by 1
      this.quizService.seconds++;
    }, 1000);
  }

  Answer(questionId, choice) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    this.quizService.qnProgress++;
    if (this.quizService.qnProgress == 10){
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
