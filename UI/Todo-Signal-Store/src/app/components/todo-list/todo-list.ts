import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { TodosFilter, TodosStore } from '../../store/todo.store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Todo } from '../../model/todo.model';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '../todo-item/todo-item';
@Component({
  selector: 'app-todo-list',
  imports: [CommonModule,FormsModule,TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {


currentFilter = computed(() => this.store.filter());

onFilter(filterType: string) {
  // Convert filterType string to TodosFilter type safely
  const validFilters: TodosFilter[] = ['all', 'pendig', 'completed'];
  if (validFilters.includes(filterType as TodosFilter)) {
    const filter: TodosFilter = filterType as TodosFilter;
    // Use the filter value (filter) as needed here
    console.log('Filtered by:', filter);
    this.store.updateFilter(filter);

  } else {
    console.error('Invalid filter type:', filterType);
  }
}
onDelete(id: number) {
this.store.deleteTodo(id);
}
onUpdate(updated: Todo) {
  this.store.updateTodo(updated);
}

newTodo :string ='';
ngOnInit(): void {
this.store.loadAll();
}
store = inject(TodosStore);
addTodo(){
  if(this.newTodo.trim().length !== 0){
  this.store.addTodo(this.newTodo);
  this.newTodo ='';
  }
}
}
