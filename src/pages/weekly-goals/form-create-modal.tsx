import React from "react";
import { X } from "lucide-react";

type Status = "not_started" | "in_progress" | "completed" | "on_hold" | "";

interface IFormCreateModalProps {
  closeCreateModal: () => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  createWeek: () => void;
  progress: number | string;
}

export const FormCreateModal = ({
  closeCreateModal,
  createWeek,
  setTitle,
  setDescription,
  setEndDate,
  setStartDate,
  setStatus,
  progress
}: IFormCreateModalProps) => {
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;
    if (["not_started", "in_progress", "completed", "on_hold", ""].includes(value)) {
      setStatus(value);
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={(e) => {
          e.preventDefault();
          createWeek();
        }} className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
            <span className="text-lg font-semibold text-white">
              Criar novo  objetivo da semana
            </span>
            <button
              type="button"
              onClick={closeCreateModal}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Título
            </label>
            <input
              id="title"
              type="text"
              className="outline-none mt-1 border-b border-gray-500 bg-transparent text-white placeholder-gray-400 w-full"
              placeholder="Digite o título"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Descrição
            </label>
            <input
              id="description"
              type="text"
              className="outline-none mt-1 border-b border-gray-500 bg-transparent text-white placeholder-gray-400 w-full"
              placeholder="Digite a descrição"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-300"
            >
              Data de Início
            </label>
            <input
              id="startDate"
              type="date"
              className="outline-none mt-1 border-b border-gray-500 bg-transparent text-white placeholder-gray-400 w-full"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-300"
            >
              Data de Fim
            </label>
            <input
              id="endDate"
              type="date"
              className="outline-none mt-1 border-b border-gray-500 bg-transparent text-white placeholder-gray-400 w-full"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300"
            >
              Status
            </label>
            <select
              id="status"
              className="outline-none mt-1 border-b border-gray-500 bg-zinc-800 text-white placeholder-gray-400 w-full"
              onChange={handleStatusChange}
              defaultValue=""
            >
              <option value="">Selecionar status</option>
              <option value="not_started">Não Iniciado</option>
              <option value="in_progress">Em Progresso</option>
              <option value="completed">Concluído</option>
              <option value="on_hold">Em Espera</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="progress"
              className="block text-sm font-medium text-gray-300"
            >
              Progresso (%)
            </label>
            <span>{progress}</span>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-zinc-500 text-white font-semibold rounded-md shadow-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};
