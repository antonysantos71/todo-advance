import { useEffect, useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { FormCreateModal } from "./form-create-modal";
import { Link2 } from "lucide-react";
import { remindersServices } from "../../services/api/reminders-services";
import { InforsModalReminders } from "./infors-modal-reminders";

interface IListPrps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string | undefined;
  category: string | undefined;
  dueDate: string | undefined;
  recurring: string | undefined;
  dateCreated: string;
}

export const Reminders = () => {
  const [createReminders, setCreateReminders] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [recurring, setRecurring] = useState<string | undefined>(undefined);
  const [completed, setCompleted] = useState<boolean>(false);
  const [list, setList] = useState<IListPrps[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState<number | null>(null);
  const initialDisplayCount = 4;

  const openCreateModalReminders = () => setCreateReminders(true);
  const closeCreateModalReminders = () => setCreateReminders(false);
  const openInforsModalReminders = (id: number) => {
    setSelectedReminderId(id);
  };
  const closeInforsModalReminders = () => {
    setSelectedReminderId(null);
  };

  useEffect(() => {
    const getReminders = async () => {
      try {
        const remindersData = await remindersServices.getReminders();
        if (remindersData) {
          setList(remindersData);
        }
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };
    getReminders();
  }, []);

  const createReminder = async () => {
    try {
      const newReminder = {
        id: Date.now(),
        title,
        description,
        completed,
        priority,
        category,
        dueDate,
        recurring,
        dateCreated: new Date().toLocaleString(),
      };
      const createdReminder = await remindersServices.createReminder(newReminder);
      setList(prevReminders => [...prevReminders, createdReminder]);
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  return (
    <div className="flex">
      <Aside />
      <div className="h-full w-full">
        <Header
          typePage="Reminders"
          openCreateModal={openCreateModalReminders}
        />
        {createReminders && (
          <FormCreateModal
            closeCreateModal={closeCreateModalReminders}
            setTitle={setTitle}
            setDescription={setDescription}
            setCompleted={setCompleted}
            setPriority={setPriority}
            setCategory={setCategory}
            setDueDate={setDueDate}
            setRecurring={setRecurring}
            createReminders={createReminder}
            completed={completed}
          />
        )}

        <div className="task-container max-h-96 overflow-y-auto px-12 my-12">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum lembrete cadastrado.</p>
          ) : (
            list
              .slice(0, showAll ? list.length : initialDisplayCount)
              .map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md mb-2"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {reminder.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {reminder.description}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => openInforsModalReminders(reminder.id)}
                      className="flex text-blue-500 gap-2 items-center"
                    >
                      View Reminder
                      <Link2 className="size-5" />
                    </button>
                  </div>
                </div>
              ))
          )}
          {list.length > initialDisplayCount && (
            <button
              className="mt-2 text-blue-500 hover:underline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {selectedReminderId !== null && (
          <InforsModalReminders
            closeModal={closeInforsModalReminders}
            id={selectedReminderId}
          />
        )}
      </div>
    </div>
  );
};
