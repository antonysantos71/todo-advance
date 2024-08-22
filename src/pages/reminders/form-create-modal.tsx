import { X } from "lucide-react";

interface IFormCreateModalProps {
  closeCreateModal: () => void;
  createReminders: () => void; 
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setPriority: (value: string) => void;
  setCategory: (value: string | undefined) => void;
  setDueDate: (value: string | undefined) => void;
  setRecurring: (value: string | undefined) => void;
}

export const FormCreateModal = ({
  closeCreateModal,
  setDescription,
  setTitle,
  setCategory,
  setDueDate,
  setPriority,
  setRecurring,
  createReminders,
}: IFormCreateModalProps) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeCreateModal();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-black bg-opacity-50 z-50">
    <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">Criar Novo Lembrete</span>
          <button type="button" onClick={closeCreateModal}>
            <X className="size-5" />
          </button>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Título
          </label>
          <input
            id="title"
            type="text"
            placeholder="Digite o titulo"
            className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Descrição
          </label>
          <input
            id="description"
            type="text"
            placeholder="Digite a descrição"
            className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium">
            Prioridade
          </label>
          <select
            id="priority"
            className="outline-0 mt-1 border-b-0.5 block w-full bg-zinc-800 shadow-sm"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Selecionar prioridade</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Categoria
          </label>
          <input
            id="category"
            type="text"
            placeholder="Digitte a categoria"
            className="outline-0 mt-1 border-b-0.5 block w-full bg-transparent shadow-sm"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium">
            Data de Vencimento
          </label>
          <input
            id="dueDate"
            type="date"
            className="outline-0 mt-1 border-b-0.5 block w-full bg-zinc-800 shadow-sm"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="recurring" className="block text-sm font-medium">
            Recorrente
          </label>
          <select
            id="recurring"
            className="outline-0 mt-1 border-b-0.5 block w-full bg-zinc-800 shadow-sm"
            onChange={(e) => setRecurring(e.target.value)}
          >
            <option value="">Selecionar recorrência</option>
            <option value="daily">Diária</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>
        <button
          onClick={createReminders}
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
