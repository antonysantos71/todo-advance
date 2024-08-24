import { useEffect, useState } from "react";
import { Aside } from "../../components/aside";
import { Header } from "../../components/header";
import { FormCreateModal } from "./form-create-modal";
import { Link2 } from "lucide-react";
import { remindersServices } from "../../services/api/reminders-services";
import { InforsModalReminders } from "./infors-modal-reminders";

interface IListPrps {
  id?: number;
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
  const [list, setList] = useState<IListPrps[]>([]);
  const [selectedReminderId, setSelectedReminderId] = useState<number | null>(
    null
  );
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

  const initialDisplayCount = 4;

  const openCreateModalReminders = () => setCreateReminders(true);
  const closeCreateModalReminders = () => setCreateReminders(false);
  const openInforsModalReminders = (id: number) => {
    setSelectedReminderId(id);
  };
  const closeInforsModalReminders = () => {
    setSelectedReminderId(null);
  };

  const toggleAside = () => setIsAsideOpen((prev) => !prev);
  const closeAside = () => setIsAsideOpen(false);

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
      const newReminder: IListPrps = {
        // id: Date.now(),
        title,
        description,
        priority,
        category,
        dueDate,
        recurring,
        dateCreated: new Date().toLocaleString(),
      };
      if(title === "" || description === "" || category === "") {
        alert("Preechar todos os campos");
        return;
      } else {
        const createdReminder = await remindersServices.createReminder(
          newReminder
        );
        setList((prevReminders) => [...prevReminders, createdReminder]);
        setTitle("")
        setDescription("")
        setCategory("")
        setPriority("")
        setDueDate("")
        setRecurring("")
        closeCreateModalReminders();
      }
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  const deleteReminder = async (id: number) => {
    try {
      await remindersServices.deleteReminder(id);
      setList((prevReminders) =>
        prevReminders.filter((reminder) => reminder.id !== id)
      );
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  return (
    <div className="flex">
      <Aside isOpen={isAsideOpen} closeAside={closeAside} />
      <div className="h-full w-full">
        <Header
          openCreateModal={openCreateModalReminders}
          typePage="novo lembretes"
          openAside={toggleAside}
        />
        {createReminders && (
          <FormCreateModal
            closeCreateModal={closeCreateModalReminders}
            setTitle={setTitle}
            setDescription={setDescription}
            setPriority={setPriority}
            setCategory={setCategory}
            setDueDate={setDueDate}
            setRecurring={setRecurring}
            createReminders={createReminder}
          />
        )}

        <div className="task-container max-h-96 overflow-y-auto px-12 my-12">
          {list.length === 0 ? (
            <p className="text-sm text-gray-400 bg-zinc-800 p-4 rounded-lg m-4">Nenhum lembrete cadastrado.</p>
          ) : (
            list
              .map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex justify-between bg-zinc-800 p-3 px-5 rounded-md mb-2 flex-wrap "
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
        </div>

        {selectedReminderId !== null && (
          <InforsModalReminders
            closeModal={closeInforsModalReminders}
            id={selectedReminderId}
            deleteReminder={() =>  deleteReminder(selectedReminderId)}
          />
        )}
      </div>
    </div>
  );
};
