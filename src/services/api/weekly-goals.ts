import { api } from "."
type Status = "not_started" | "in_progress" | "completed" | "on_hold" | "";

interface IWeeklyGoalsProps {
  id: number
  title: string;
  description: string;
  startDate:string
  endDate: string
  status: Status
  progress: number 
}

const getWeeklyGoals = async (): Promise<IWeeklyGoalsProps[]> => {
  try {
    const response = await api.get("/weeklyGoals");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const createWeeklyGoals = async (week: IWeeklyGoalsProps):Promise<IWeeklyGoalsProps> => {
  try {
    const response = await api.post("/weeklyGoals", week);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const updateWeeklyGoals = async (id: number, newWeek: IWeeklyGoalsProps): Promise<IWeeklyGoalsProps> => {
  try {
    const response = await api.put(`/weekly-goals/${id}`, newWeek);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteWeeklyGoals = async (id: number): Promise<void> => {
  try {
    await api.delete(`/weekly-goals/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export const weeklyGoalsServices = {
  getWeeklyGoals,
  createWeeklyGoals,
  updateWeeklyGoals,
  deleteWeeklyGoals
}