import { useEffect, useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { CheckCheck, Edit, Trash } from "lucide-react";
import { FormCreateModal } from "./form-create-modal";
import { weeklyGoalsServices } from "../../services/api/weekly-goals";
type Status = "not_started" | "in_progress" | "completed" | "on_hold" | "";

interface IListPrps {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: Status;
  progress: number;
}


export const WeeklyGoals = () => {
  const [createWeekGoals, setWeekGoals] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [list, setList] = useState<IListPrps[]>([]);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [status, setStatus] = useState<Status>("not_started");
  const [progress, setProgress] = useState<number>(0);

  const openCreateModalWeekGoals = () => setWeekGoals(true);
  const closeCreateModalWeekGoals = () => setWeekGoals(false);

  const toggleAside = () => setIsAsideOpen((prev) => !prev);
  const closeAside = () => setIsAsideOpen(false);

  useEffect(() => {
    const getWeeklysGoals = async () => {
      try {
        const weekData = await weeklyGoalsServices.getWeeklyGoals();
        if (weekData) {
          setList(weekData);
        }
      } catch (error) {
        console.error("Error fetching weekly goals:", error);
      }
    };

    getWeeklysGoals();
  }, []);

  const createWeeklyGoals = async () => {
    try {
      const newWeek: IListPrps = {
        id: list.length + 1, // Assuming unique ID based on the list length
        title,
        description,
        startDate,
        endDate,
        status,
        progress,
      };

      const createdWeek = await weeklyGoalsServices.createWeeklyGoals(newWeek);

      setList((previousWeeks) => [...previousWeeks, createdWeek]);
      closeCreateModalWeekGoals(); // Close the modal after creation
    } catch (error) {
      console.error("Error creating weekly goals:", error);
    }
  };

  useEffect(() => {
    switch (status) {
      case "not_started":
        setProgress(0);
        break;
      case "in_progress":
        setProgress(50); // ou algum valor de progresso típico para "em progresso"
        break;
      case "completed":
        setProgress(100);
        break;
      case "on_hold":
        setProgress(25); // ou algum valor de progresso típico para "em espera"
        break;
      default:
        setProgress(0);
        break;
    }
  }, [status, setStatus]);

  return (
    <div className="flex">
      <Aside isOpen={isAsideOpen} closeAside={closeAside} />
      <div className="w-full h-full">
        <Header
          openCreateModal={openCreateModalWeekGoals}
          typePage="objetivos"
          openAside={toggleAside}
        />
        {createWeekGoals && (
          <FormCreateModal
            closeCreateModal={closeCreateModalWeekGoals}
            setTitle={setTitle}
            setDescription={setDescription}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setStatus={setStatus}
            setProgress={setProgress}
            progress={progress}
            createWeek={createWeeklyGoals}
          />
        )}

        <div className="task-container max-h-96 overflow-y-auto px-12 my-12">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum objetivo cadastrado.</p>
          ) : (
            ""
          )}
          {list.map((week) => (
            <div
              key={week.id}
              className="flex flex-col bg-zinc-800 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col gap-2 mb-3">
                <span className="text-xl font-bold text-white">
                  {week.title}
                </span>
                <span className="text-sm text-gray-400">
                  {week.description}
                </span>
              </div>
              <div className="text-sm text-gray-400 bg-zinc-900 p-4 rounded-lg mb-4">
                <div className="flex gap-4 flex-wrap">
                  <span className="font-semibold">
                    Início:{" "}
                    <span className="font-normal">{week.startDate}</span>
                  </span>
                  <span className="font-semibold">
                    Fim: <span className="font-normal">{week.endDate}</span>
                  </span>
                  <span className="font-semibold">
                    Status: <span className="font-normal">{week.status}</span>
                  </span>
                  <span className="font-semibold">
                    Progresso:{" "}
                    <span className="font-normal">{week.progress}%</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <button className="flex items-center text-green-400 hover:text-green-300 transition-colors">
                  <CheckCheck className="w-5 h-5" />
                  <span className="ml-2">Completar</span>
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                  <Edit className="w-5 h-5" />
                  <span className="ml-2">Editar</span>
                </button>
                <button className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                  <Trash className="w-5 h-5" />
                  <span className="ml-2">Excluir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
