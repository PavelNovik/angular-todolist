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
export type TaskT = {
  addedDate: string;
  deadline: string;
  description: string;
  id: string;
  order: number;
  priority: number;
  startDate: string;
  status: number;
  title: string;
  todoListId: string;
};
export type TasksResponse = {
  error: string;
  items: TaskT[];
  totalCount: number;
};
