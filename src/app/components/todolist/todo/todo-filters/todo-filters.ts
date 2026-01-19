import { Component, input, output } from '@angular/core';
import { FilterType } from '../../../../shared/types';

@Component({
  selector: 'tl-todo-filters',
  imports: [],
  templateUrl: './todo-filters.html',
  styleUrl: './todo-filters.scss',
})
export class TodoFilters {
  readonly filter = input<FilterType>();
  readonly changeFilterEvent = output<FilterType>();
  protected changeFilterHandler(filter: FilterType) {
    this.changeFilterEvent.emit(filter);
  }
}
