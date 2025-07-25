import {TuiRoot} from "@taiga-ui/core";
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TodoComponent} from './modules/todo/todo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todo';
}
