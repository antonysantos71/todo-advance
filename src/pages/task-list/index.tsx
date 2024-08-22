// pages/TaskList.tsx
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Aside } from "../../components/aside";
import { FormCreateModal } from "./form-create-modal";
import { taskServices } from "../../services/api/tasks-services";
import { Edit, Trash } from "lucide-react";
import { FormEditModal } from "./form-edit-modal";

export interface IListPrps {
  id: number;
  title: string;
  description: string;
  dateCreated: string;
}

export const TaskList = () => {
  const [createModal, setModal] = useState(false);
  const [list, setList] = useState<IListPrps[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editTask, setEditTask] = useState<IListPrps | null>(null);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [showAll, setShowAll] = useState(false);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

  const openCreateModal = () => setModal(true);
  const closeCreateModal = () => setModal(false);
  const openEditModal = (task: IListPrps) => {
    setEditTask(task);
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditTask(null);
    setEditModal(false);
  };

    const toggleAside = () => setIsAsideOpen(prev => !prev);
    const closeAside = () => setIsAsideOpen(false);

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
        title,
        description,
        dateCreated: new Date().toISOString(),
      };
      if (title === "") {
        alert("Title is required");
        return;
      } else {
        const createdTasks = await taskServices.createTask(newTask);
        setList((previusTaks) => [...previusTaks, createdTasks]);
        setTitle("")
        setDescription("")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (
    id: number,
    newTask: Omit<IListPrps, "id">
  ): Promise<void> => {
    try {
      await taskServices.updateTask(id, newTask);
      setList((previousTasks) =>
        previousTasks.map((task) =>
          task.id === id ? { id, ...newTask } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskServices.deleteTask(id);
      setList((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const initialDisplayCount = 4;

  return (
    <div className="flex">
      <Aside isOpen={isAsideOpen} closeAside={closeAside} />
      <div className="w-full h-full">
        <Header
          openCreateModal={openCreateModal}
          typePage="atividades"
          openAside={toggleAside}
        />
        {createModal && (
          <FormCreateModal
            closeCreateModal={closeCreateModal}
            createTask={createTaks}
            setTitle={setTitle}
            setDescription={setDescription}
            title={title}
            description={description}
          />
        )}
        {editModal && editTask && (
          <FormEditModal
            closeEditModal={closeEditModal}
            task={editTask}
            updateTask={updateTask}
          />
        )}
        <div className="task-container max-h-96 overflow-y-auto px-12 my-12">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhuma atividade cadastrada.
            </p>
          ) : (
            ""
          )}
          {list
            .slice(0, showAll ? list.length : initialDisplayCount)
            .map((task) => (
              <div
                key={task.id}
                className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md mb-2 flex-wrap"
              >
                <div className="flex flex-col gap-1 max-w-xs">
                  <span className="font-semibold text-white truncate">
                    {task.title}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {task.description}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => openEditModal(task)}
                    className="flex text-blue-500"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex text-blue-500"
                  >
                    <Trash />
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
  );
};
