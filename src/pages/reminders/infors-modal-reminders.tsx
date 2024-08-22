import React, { useEffect, useState } from "react";
import { Calendar, Circle, Clock, FileText, Tag, Trash, X } from "lucide-react";
import {
  remindersServices,
  IRemindersProps,
} from "../../services/api/reminders-services";

interface InforsModalRemindersProps {
  closeModal: () => void;
  id: number;
  deleteReminder: () => void;
}

export const InforsModalReminders: React.FC<InforsModalRemindersProps> = ({
  closeModal,
  id,
  deleteReminder,
}) => {
  const [reminder, setReminder] = useState<IRemindersProps>();

  useEffect(() => {
    const fetchReminder = async (id: number) => {
      try {
        const response = await remindersServices.getRemindersById(id);
        setReminder(response);
      } catch (error) {
        console.error("Error fetching reminder:", error);
      }
    };

    if (id !== undefined) {
      fetchReminder(id);
    }
  }, [id]);

  return (
    <div
      key={id}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="bg-zinc-800 text-white p-4 rounded-lg shadow-md w-full max-w-md relative">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg">Detalhes do Lembrete</span>
          <button type="button" onClick={closeModal}>
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Título</p>
              <p className="text-gray-300">
                {reminder?.title || "Carregando..."}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Descrição</p>
              <p className="text-gray-300">
                {reminder?.description || "Carregando..."}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Categoria</p>
              <p className="text-gray-300">{reminder?.category || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Data de Criação</p>
              <p className="text-gray-300">{reminder?.dateCreated || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Data de Vencimento</p>
              <p className="text-gray-300">{reminder?.dueDate || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Circle className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Prioridade</p>
              <p className="text-gray-300">{reminder?.priority || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-300" />
            <div>
              <p className="font-semibold">Recorrente</p>
              <p className="text-gray-300">{reminder?.recurring || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              deleteReminder();
              closeModal();
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-700 transition-colors"
          >
            <Trash className="w-4 h-4" />
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
