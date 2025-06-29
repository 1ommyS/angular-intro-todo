import {Component, inject, ResourceStatus, signal} from '@angular/core';
import {TuiButton, TuiIcon, TuiLink, TuiTitle} from '@taiga-ui/core';
import {TuiBadge} from '@taiga-ui/kit';
import {TuiCard, TuiHeader} from '@taiga-ui/layout';
import {TodoService} from './services/todo.service';
import {rxResource} from '@angular/core/rxjs-interop';
import DrawerComponent from './drawer/drawer.component';

@Component({
  selector: 'app-todo',
  imports: [TuiBadge,
    TuiButton,
    TuiCard,
    TuiHeader,
    TuiIcon,
    TuiLink,
    TuiTitle, DrawerComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  readonly open = signal<boolean>(false)

  private readonly todoService = inject(TodoService)

  readonly todos = rxResource({
    loader: () => this.todoService.findAll()
  })

  protected readonly ResourceStatus = ResourceStatus;
}
