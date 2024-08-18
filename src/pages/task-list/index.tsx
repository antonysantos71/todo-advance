import { useState } from "react";
import { Header } from "../../components/header";
import { Aside } from "../../components/aside";
import { FormCreateModal } from "./form-create-modal";
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

  function addTask() {
    setList((previus) => [
      ...previus,
      {
        id: Date.now(),
        title,
        description,
        completed: false,
        dateCreated: new Date().toLocaleString(),
      },
    ]);

    console.log(list)
  }
  return (
    <div className="h-sreen ">
      <div className="flex">
        <Aside />
        <div className="h-full w-full ">
          <Header openCreateModal={openCreateModal} typePage="Atividade" />

          {createModal && (
            <FormCreateModal
              closeCreateModal={closeCreateModal}
              createTask={addTask}
              setTitle={setTitle}
              setDescription={setDescription}
            />
          )}

          <div className="p-7 m-14 h-1/5 bg-zinc-700 rounded-xl flex flex-col gap-3">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhuma atividade cadastrada.</p>
          ): "  "}
            {list.map((task) => {
              return (
                <div key={task.id} className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{task.title}</span>
                    <span className="text-sm text-gray-500">{task.description}</span>
                  </div>
                  <div className="flex justify-center">
                    <button className="flex gap-2 items-center">
                      view task
                      <Link2 className="size-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
