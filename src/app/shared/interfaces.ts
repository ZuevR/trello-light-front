enum Status { 'TODO', 'PROGRESS', 'DONE' }

export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

export interface Board {
  id?: number;
  title: string;
  ownerId?: number;
  tasks?: Array<Task>;
}

export interface Task {
  id?: number;
  title: string;
  position: number;
  status: Status;
  description?: string;
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
