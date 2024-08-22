import React, { useState, useEffect } from 'react';
import type { IListPrps } from '.';
import { X } from 'lucide-react';

interface FormEditModalProps {
  closeEditModal: () => void;
  task: IListPrps;
  updateTask: (id: number, newTask: Omit<IListPrps, "id">) => Promise<void>;
}

export const FormEditModal: React.FC<FormEditModalProps> = ({
  closeEditModal,
  task,
  updateTask,
}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const updateTaskFn = async () => {
    if (title === "" || description === "") {
      alert('Necessario preecher todos os campos');
      return;
    } else {
      try {
        await updateTask(task.id, {
          title,
          description,
          dateCreated: task.dateCreated
        });
        closeEditModal()
      } catch (error) {
        console.error('Error updating task:', error);
      } 
    }
   
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Editar tarefa</span>
            <button onClick={closeEditModal}>
              <X className="size-5" />
            </button>
          </div>
          <div>
            <label htmlFor="input1" className="block text-sm font-medium">
              Titulo
            </label>
            <input
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent  shadow-sm "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="input2" className="block text-sm font-medium">
              Descrição
            </label>
            <input
              type="text"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent  shadow-sm "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              updateTaskFn();
            }}
            className="w-full py-2 px-4 bg-zinc-500 text-white font-semibold rounded-md shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            edita
          </button>
        </form>
      </div>
    </div>
  );
};
