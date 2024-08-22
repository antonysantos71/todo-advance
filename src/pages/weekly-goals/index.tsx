import { useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { Link2 } from "lucide-react";
import { FormCreateModal } from "./form-create-modal";
interface IListPrps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: string;
}
export const WeeklyGoals = () => {
  const [createWeekGoals, setWeekGoals] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [list, setList] = useState<IListPrps[]>([]);
  const openCreateModalWeekGoals = () => setWeekGoals(true);

  const closeCreateModalWeekGoals = () => setWeekGoals(false);

  function addWeekGoals() {
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

  const [showAll, setShowAll] = useState(false);

  const initialDisplayCount = 4;

  return (
    <div className="flex">
      <Aside />
      <div className="h-full w-full ">
        <Header
          typePage="Week Goals"
          openCreateModal={openCreateModalWeekGoals}
        />
        {createWeekGoals && (
          <FormCreateModal
            closeCreateModal={closeCreateModalWeekGoals}
            setTitle={setTitle}
            setDescription={setDescription}
            createWeek={addWeekGoals}
          />
        )}

        <div className="task-container max-h-96 overflow-y-auto px-12 my-12">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum objetivo cadastrad.</p>
          ) : (
            ""
          )}
          {list
            .slice(0, showAll ? list.length : initialDisplayCount)
            .map((week) => (
              <div
                key={week.id}
                className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md mb-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{week.title}</span>
                  <span className="text-sm text-gray-500">
                    {week.description}
                  </span>
                </div>
                <div className="flex items-center">
                  <button className="flex gap-2 items-center text-blue-500">
                    view week
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
  );
};
