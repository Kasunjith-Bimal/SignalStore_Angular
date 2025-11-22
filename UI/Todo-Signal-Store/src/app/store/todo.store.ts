import { computed, inject } from "@angular/core";
import { Todo } from "../model/todo.model";
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TodoService } from "../service/todo-service";
import { filter } from "rxjs";
export type TodosFilter = 'all' | 'pendig' | 'completed';   

type TodosState ={
    todos: Todo[];
    loading :boolean;
    filter:TodosFilter;
}

const initialState: TodosState ={
    todos: [],
    loading: false,
    filter: 'all'
};

export const TodosStore = signalStore(
    {providedIn :'root'}, 
    withState<TodosState>(initialState),
    withMethods((store,todoService = inject(TodoService))=> ({
        loadAll(){
            patchState(store, {loading:true});
            todoService.getTodos().subscribe(todos=>{
                patchState(store,{
                    todos: todos,
                    loading:false
                });
            });
        },
        addTodo(title:string){
           todoService.addTodos({id:0,title,completed:false}).subscribe(todo=>{
            patchState(store,(state)=>({
              todos:[...state.todos, todo]
            }));
           });

        },
        updateTodo(updatedTodo:Todo){
            console.log('Updating todo:', updatedTodo);
          todoService.updateTodos(updatedTodo).subscribe(todo=>{
            patchState(store,(state)=>({
              todos: state.todos.map(t=> t.id === updatedTodo.id ? updatedTodo : t)
            }));
          });
        },
        deleteTodo(id:number){
            todoService.deleteTodos(id).subscribe(()=>{
            patchState(store,(state)=>({
              todos: state.todos.filter(t=> t.id !== id)
            }));
            });
        },
        updateFilter(filter:TodosFilter){
            patchState(store,{filter});
        }

    })),
    withComputed((state)=>({
        filteredTodos : computed(()=>{
            const todos = state.todos();

            switch(state.filter()){
                case 'pendig':
                    return todos.filter(t=> !t.completed);
                case 'completed':
                    return todos.filter(t=> t.completed);
                default:
                    return todos;
            }
        })

    }))
);


