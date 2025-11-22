import { Component, Input, Output,EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule,FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  @Input() todo?: Todo;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number | string>();

  deleteTodo() {
    if (this.todo?.id != null) {
      this.delete.emit(this.todo.id);
    }
  }

  toggleComplete() {
    console.log('Toggling complete for todo:', this.todo);
    if (this.todo) {
      const updated: Todo = { ...this.todo, completed: !this.todo.completed };
      this.update.emit(updated);
    }
  }
}
