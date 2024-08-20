import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Aside } from "../../components/aside";
import { FormCreateModal } from "./form-create-modal";
import { taskServices } from "../../services/api/tasks-services";
import { Link2 } from "lucide-react";

interface IListPrps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: string;
}

export const TaskList = () => {
  const [createModal, setModal] = useState(false);
  const [list, setList] = useState<IListPrps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function openCreateModal() {
    setModal(true);
  }
  function closeCreateModal() {
    setModal(false);
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await taskServices.getTasks();
      if (tasksData) {
        setList(tasksData);
      }
    };

    getTasks();
  }, []);

  const createTaks = async () => {
    try {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        dateCreated: new Date().toISOString(),
      };
      const createdTasks = await taskServices.createTask(newTask);
      setList((previusTaks) => [...previusTaks, createdTasks]);
    } catch (error) {
      console.error(error);
    }
  };

  const [showAll, setShowAll] = useState(false);

  const initialDisplayCount = 4;

  return (
    <div className="h-sreen ">
      <div className="flex">
        <Aside />
        <div className="h-full w-full ">
          <Header openCreateModal={openCreateModal} typePage="Atividade" />

          {createModal && (
            <FormCreateModal
              closeCreateModal={closeCreateModal}
              createTask={createTaks}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          )}

          <div className="task-container max-h-96 overflow-y-auto px-12 my-12">
            {list.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhuma atividade cadastrada.
              </p>
            ): ""}
            {list
              .slice(0, showAll ? list.length : initialDisplayCount)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md mb-2"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {task.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {task.description}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button className="flex gap-2 items-center text-blue-500">
                      view task
                      {/* Supondo que Link2 é um componente de ícone */}
                      <Link2 className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
            {list.length > initialDisplayCount && (
              <button
                className="mt-2 text-blue-500 hover:underline"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
