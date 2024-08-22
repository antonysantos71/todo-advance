import { api } from ".";

export interface IRemindersProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string | undefined
  category:string | undefined
  dueDate: string | undefined
  recurring: string | undefined
  dateCreated: string;
}

export const getReminders = async ():Promise<IRemindersProps[]> => {
  try {
    const response = await api.get("/reminders");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getRemindersById = async (id: number):Promise<IRemindersProps | undefined> => {
  try {
    const response = await api.get(`/reminders/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return
  }
}


const createReminder = async (task: IRemindersProps):Promise<IRemindersProps> => {
  try {
    const response = await api.post("/reminders", task);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

const deleteReminder = async (id: number): Promise<void> => {
  try {
    const response = await api.delete(`/reminders/${id}`);
    return response.data;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

export const remindersServices = {
  getReminders,
  getRemindersById,
  createReminder,
  deleteReminder
}

