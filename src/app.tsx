import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { TaskList } from "./pages/task-list";
import { Reminders } from "./pages/reminders";
import { WeeklyGoals } from "./pages/weekly-goals";

const router = createBrowserRouter([
  {
    path: "/tasks",
    element: <TaskList />
  },
  {
    path: "/reminders",
    element: <Reminders />
  },
  {
    path: "/weeklyGoals",
    element: <WeeklyGoals />
  },
  {
    path: "/",
    element: <Navigate to="/tasks"/>
  },
]);

export const App = () => {
  return <RouterProvider router={router} />
};
