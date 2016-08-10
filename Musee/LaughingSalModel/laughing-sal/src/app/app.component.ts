import { Component } from '@angular/core';
import { Battle } from "./battle.model";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Laughing Sal';

  constructor() {
    this.testBattle1();


  }

  testBattle1() {
    let battle1: Battle = new Battle();
    console.log(`Fresh battle = ${battle1}`);

  }
}
