import { X } from "lucide-react";

interface IFormCreateModalProps {
  closeCreateModal: () => void;
  createTask: () => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}

export const FormCreateModal = ({
  closeCreateModal,
  createTask,
  setTitle,
  setDescription,
}: IFormCreateModalProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-transparent">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">create new tasks</span>
            <button onClick={closeCreateModal}>
              <X className="size-5" />
            </button>
          </div>
          <div>
            <label htmlFor="input1" className="block text-sm font-medium">
              title task
            </label>
            <input
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent  shadow-sm "
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="input2" className="block text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent  shadow-sm "
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              createTask();
              closeCreateModal();
            }}
            className="w-full py-2 px-4 bg-zinc-500 text-white font-semibold rounded-md shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            create
          </button>
        </form>
      </div>
    </div>
  );
};
