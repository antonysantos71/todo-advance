// components/Aside.tsx
import { CalendarCheck, ListCheck, SquareCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

interface IAsideProps {
  isOpen: boolean;
  closeAside?: () => void;
}

export const Aside = ({ isOpen, closeAside }: IAsideProps) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-zinc-800 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full sm:flex sm:flex-col'
      }  sm:translate-x-0 sm:static sm:flex sm:flex-col`}
    >
      <div className="w-full h-1/3 flex items-center justify-center">
        <img
          className="w-32 h-32 rounded-full"
          src="https://avatars.githubusercontent.com/u/115037549?s=400&u=d66eafba4e5de082caa0b7d7da54ee89825db98f&v=4"
          alt="Profile"
        />
      </div>
      <div className="flex flex-col gap-4 w-full p-5 flex-1">
        <Link to="/tasks" onClick={closeAside}>
          <button className="bg-zinc-600 w-full p-3 rounded-lg flex items-center gap-2 justify-center">
            Atividades
            <ListCheck className="size-5" />
          </button>
        </Link>
        <Link to="/reminders" onClick={closeAside}>
          <button className="bg-zinc-600 w-full p-3 rounded-lg flex items-center gap-2 justify-center">
            Lembretes
            <CalendarCheck className="size-5" />
          </button>
        </Link>
        <Link to="/weeklyGoals" onClick={closeAside}>
          <button className="bg-zinc-600 w-full p-3 rounded-lg flex items-center gap-2 justify-center">
            Objetivos
            <SquareCheckBig className="size-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};
