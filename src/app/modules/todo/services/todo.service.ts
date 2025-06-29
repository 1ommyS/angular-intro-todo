import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import CreateTodoRequest from '../interfaces/CreateTodoRequest';
import Todo from '../interfaces/Todo';
import CreateTodoResponse from '../interfaces/CreateTodoResponse';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly _httpClient = inject(HttpClient)
  private readonly _url = "http://localhost:8080/todos";

  create(todo: CreateTodoRequest) {
    console.info("Отправка запроса на создание todo")
    return this._httpClient.post<CreateTodoResponse>(`${this._url}`, todo)
  }

  findAll() {
    return this._httpClient.get<Todo[]>(`${this._url}`)
  }
}
