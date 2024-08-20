import { CalendarCheck, ListCheck, SquareCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

export const Aside = () => {
  return (
    <div className="bg-zinc-800 w-1/4 h-screen flex flex-col">
      <div className="w-full h-1/3 flex items-center justify-center">
        <img
          className="w-32 h-32 rounded-full"
          src="https://avatars.githubusercontent.com/u/115037549?s=400&u=d66eafba4e5de082caa0b7d7da54ee89825db98f&v=4"
          alt="Profile"
        />
      </div>
      <div className="flex flex-col gap-4 w-full p-5 flex-1">
        <Link to="/tasks">
          <button className="bg-zinc-600 w-full p-3 rounded-lg flex items-center gap-2 justify-center">
            Atividades
            <ListCheck className="size-5" />
          </button>
        </Link>
        <Link to="/reminders">
          <button className="bg-zinc-600 w-full p-3 rounded-lg flex items-center gap-2 justify-center">
            Lembretes
            <CalendarCheck className="size-5" />
          </button>
        </Link>
        <Link to="/weeklyGoals">
          <button className="bg-zinc-600 w-full p-3 rounded-lg flex items-center gap-2 justify-center">
            Objetivos
            <SquareCheckBig className="size-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};
