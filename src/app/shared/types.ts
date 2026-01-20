export type Severity = 'error' | 'warning' | 'info' | 'success';

type Photos = {
  small: string | null;
  large: string | null;
};

export type UserT = {
  name: string;
  id: number;
  photos: Photos;
  status: string | null;
  followed: boolean;
};

export type UserResponse = {
  items: UserT[];
  totalCount: number;
  error: string | null;
};

export type BaseResponse<T = object> = {
  resultCode: number;
  messages: string[];
  data: T;
};

export type TodolistT = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};
export type FilterType = 'all' | 'active' | 'completed';

export type DomainTodo = TodolistT & {
  filter: FilterType;
};
export type TaskT = UpdateTaskModel & {
  addedDate: string;
  id: string;
  order: number;
  todoListId: string;
};
export type UpdateTaskModel = {
  title: string;
  description: string;
  completed: boolean;
  priority: number;
  startDate: string;
  status: number;
  deadline: string;
};
export type TasksResponse = {
  error: string;
  items: TaskT[];
  totalCount: number;
};

export type DomainTask = {
  [key: string]: TaskT[];
};
export type MeResponse = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  message: string[];
  resultCode: number;
};
