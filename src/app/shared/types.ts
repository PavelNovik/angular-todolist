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
