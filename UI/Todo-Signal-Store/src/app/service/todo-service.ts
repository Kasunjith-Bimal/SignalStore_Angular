import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7139/api/Todo';

  constructor(private http: HttpClient) {}

  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodos(todo :Todo):Observable<Todo>{
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodos(todo: Todo):Observable<Todo>{
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodos(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
