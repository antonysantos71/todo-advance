import { X } from "lucide-react";
import { useState } from "react";

interface IFormCreateModalProps {
  closeCreateModal: () => void;
  createReminders: () => void; 
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setCompleted: (value: boolean) => void;
  setPriority: (value: string) => void;
  setCategory: (value: string | undefined) => void;
  setDueDate: (value: string | undefined) => void;
  setRecurring: (value: string | undefined) => void;
  completed: boolean
}

export const FormCreateModal = ({
  closeCreateModal,
  setCompleted,
  setDescription,
  setTitle,
  setCategory,
  setDueDate,
  setPriority,
  setRecurring,
  createReminders,
}: IFormCreateModalProps) => {
  const [localCompleted, setLocalCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(localCompleted);
    closeCreateModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Create New reminders</span>
            <button type="button" onClick={closeCreateModal}>
              <X className="size-5" />
            </button>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <input
              id="description"
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="completed" className="block text-sm font-medium">
              Completed
            </label>
            <input
              id="completed"
              type="checkbox"
              className="mt-1"
              checked={localCompleted}
              onChange={() => setLocalCompleted(!localCompleted)}
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-zinc-800 shadow-sm"
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium">
              Due Date
            </label>
            <input
              id="dueDate"
              type="datetime-local"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-zinc-800 shadow-sm"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="recurring" className="block text-sm font-medium">
              Recurring
            </label>
            <select
              id="recurring"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-zinc-800 shadow-sm"
              onChange={(e) => setRecurring(e.target.value)}
            >
              <option value="">Select recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button
          onClick={createReminders}
            type="submit"
            className="w-full py-2 px-4 bg-zinc-500 text-white font-semibold rounded-md shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
