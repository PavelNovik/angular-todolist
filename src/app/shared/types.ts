export type Severity = 'error' | 'warning' | 'info' | 'success';

interface Photos {
  small: string | null;
  large: string | null;
}

export interface UserT {
  name: string;
  id: number;
  photos: Photos;
  status: string | null;
  followed: boolean;
}

export interface UserResponse {
  items: UserT[];
  totalCount: number;
  error: string | null;
}

export interface BaseResponse<T = object> {
  resultCode: number;
  messages: string[];
  data: T;
}

export interface TodolistT {
  addedDate: string;
  id: string;
  order: number;
  title: string;
}
export interface Task {
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
}
export interface Tasks {
  error: string;
  items: Task[];
  totalCount: number;
}
