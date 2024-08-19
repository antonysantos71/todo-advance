import { api } from "."

export interface ITasksProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: string;
}

const getTasks =  async ():Promise<ITasksProps[] | undefined> => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch(error) {
    console.error(error);
    return [];
  }
}

const createTask = async (task: ITasksProps):Promise<ITasksProps> => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const updateTask = async (id:number, newTask:Omit<ITasksProps, "id">): Promise<ITasksProps> => {
  try {
    const response = await api.put(`/tasks/${id}`, newTask);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export const taskServices = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}