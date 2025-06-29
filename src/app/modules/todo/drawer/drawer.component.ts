import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Input,
  model,
  resource,
  ResourceRef,
  signal
} from '@angular/core';
import {TuiRepeatTimes} from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButton, TuiError,
  TuiLabel,
  TuiLink,
  TuiPopup,
  TuiScrollbar,
  TuiTextfieldComponent,
  TuiTitle
} from '@taiga-ui/core';
import {TuiBadge, TuiDrawer, TuiTabs, TuiTextarea} from '@taiga-ui/kit';
import {TuiForm, TuiHeader, TuiNavigation} from '@taiga-ui/layout';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TodoService} from '../services/todo.service';
import CreateTodoRequest from '../interfaces/CreateTodoRequest';
import {catchError, EMPTY, tap} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Todo from '../interfaces/Todo';

@Component({
  standalone: true,
  selector: 'app-drawer',
  imports: [
    TuiBadge,
    TuiButton,
    TuiDrawer,
    TuiHeader,
    TuiLink,
    TuiNavigation,
    TuiPopup,
    TuiRepeatTimes,
    TuiScrollbar,
    TuiTabs,
    TuiTitle,
    TuiForm,
    ReactiveFormsModule,
    TuiLabel,
    TuiTextfieldComponent,
    TuiTextarea,
    TuiError,
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DrawerComponent {
  readonly open = model.required<boolean>();

  readonly todosResource = input.required<ResourceRef<Todo[] | undefined>>();

  protected readonly onsubmit = onsubmit;

  private readonly fb = inject(FormBuilder)
  private readonly todoService: TodoService = inject(TodoService)
  private readonly alerts = inject(TuiAlertService)

  readonly form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['Pending', Validators.required],
    category: ['Пиво', Validators.required],
  })

  create(payload: CreateTodoRequest) {
    return this.todoService.create(payload)
  }

  protected showNotification(content: string) {
    this.alerts
      .open(content)
      .subscribe()
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const payload: CreateTodoRequest = this.form.value as CreateTodoRequest;

    this.create(payload).pipe(
      tap(() => {
        this.showNotification('Задача успешно создана');
        this.open.set(false)
        this.todosResource().reload()
      }),
      catchError((err: HttpErrorResponse) => {
        let errorMsg = 'Неизвестная ошибка';
        if (err.error && typeof err.error === 'object') {
          errorMsg = err.error.error || JSON.stringify(err.error);
        } else if (typeof err.error === 'string') {
          errorMsg = err.error;
        }
        this.showNotification(errorMsg)
        return EMPTY
      })
    ).subscribe();
  }
}
