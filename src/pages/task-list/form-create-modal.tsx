import { X } from "lucide-react";
import { useState } from "react";

interface IFormCreateModalProps {
  closeCreateModal: () => void;
  createTask: () => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  title: string;
  description: string;
}

export const FormCreateModal = ({
  closeCreateModal,
  createTask,
  setTitle,
  setDescription,
  description,
  title
}: IFormCreateModalProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError('Necessário preencher o titulo');
      return;
    }
    
    createTask();
    closeCreateModal();
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Criar nova tarefa</span>
            <button type="button" onClick={closeCreateModal}>
              <X className="size-5" />
            </button>
          </div>
          <div>
            <label htmlFor="input1" className="block text-sm font-medium">
              Titulo
            </label>
            <input
              type="text"
              value={title}
              placeholder="Digite o titulo"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="input2" className="block text-sm font-medium">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              placeholder="Digite a descriçao"
              className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
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
