import axios from "axios";
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

const createWeeklyGoals = async (week: Omit<IWeeklyGoalsProps,  "id">):Promise<IWeeklyGoalsProps> => {
  try {
    const response = await api.post("/weeklyGoals", week);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const updateWeeklyGoals = async (id: number, newWeek: Omit<IWeeklyGoalsProps, "id">): Promise<IWeeklyGoalsProps> => {
  try {
    const response = await api.put(`/weeklyGoals/${id}`, newWeek);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    } else {
      console.error("General error:", error);
    }
    throw error; 
  }
};

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