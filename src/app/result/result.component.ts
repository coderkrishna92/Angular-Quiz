import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService,
              private router: Router) { }

  ngOnInit() {
    this.quizService.getAnswers().subscribe(
      (data: any) => {
        // Resetting the correct answer count to 0
        this.quizService.correctAnswerCount = 0;

        // The 10 random questions array
        this.quizService.qns.forEach((e, i) => {
          if(e.answer == data[i].answer) {
            this.quizService.correctAnswerCount++;
            e.correct = data[i];
          }
        });
      }
    );
  }

  OnSubmit() {
    this.quizService.submitScore().subscribe( () => {
      this.restart();
    });
  }

  restart() {
    this.router.navigate(['/quiz']);
  }

}
