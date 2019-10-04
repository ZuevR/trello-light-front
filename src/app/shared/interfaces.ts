
export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

export interface Board {
  id?: string;
  title: string;
  ownerId?: string;
  tasks?: Array<Task>;
}

export interface Task {
  id?: string;
  title: string;
  position?: number;
  status: string;
  description?: string;
  boardId: string;
}

export interface AuthResponse {
  auth_key: {
    exp: number,
    id: string
  };
  email: string;
  id: number;
  password: string;
  status: boolean;
  username: string;
}
