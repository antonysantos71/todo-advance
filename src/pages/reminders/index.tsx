import { useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { FormCreateModal } from "./form-create-modal";
import { Link2 } from "lucide-react";
interface IListPrps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: string;
}
export const Reminders = () => {
  const [createReminders, setReminders] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [list, setList] = useState<IListPrps[]>([]);
  function openCreateModalReminders() {
    setReminders(true);
  }
  function closeCreateModalReminders() {
    setReminders(false);
  }

  function addRemindrs() {
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

    console.log(list);
  }

  return (
    <div className="flex">
      <Aside />
      <div className="h-full w-full ">
      <Header typePage="Remiders" openCreateModal={openCreateModalReminders} />
        {createReminders && (
          <FormCreateModal
            closeCreateModal={closeCreateModalReminders}
            setTitle={setTitle}
            setDescription={setDescription}
            createTask={addRemindrs}
          />
        )}

        <div className="p-7 m-14 h-1/5 bg-zinc-700 rounded-xl flex flex-col gap-3">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhuma atividade cadastrada.
            </p>
          ) : (
            "  "
          )}
          {list.map((reminders) => {
            return (
              <div
                key={reminders.id}
                className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{reminders.title}</span>
                  <span className="text-sm text-gray-500">
                    {reminders.description}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button className="flex gap-2 items-center">
                    view reminders
                    <Link2 className="size-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
