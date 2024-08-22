import React, { useEffect, useState } from "react";
import { Trash, X } from "lucide-react";
import {
  remindersServices,
  IRemindersProps,
} from "../../services/api/reminders-services";

interface InforsModalRemindersProps {
  closeModal: () => void;
  id: number;
  deleteReminder: () => void
}

export const InforsModalReminders: React.FC<InforsModalRemindersProps> = ({
  closeModal,
  id,
  deleteReminder
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
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-zinc-800 text-white p-6 rounded-md w-full max-w-md relative">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold ">Detalhes do lembrete </h2>
          <button onClick={closeModal}>
            <X size={24} />
          </button>
        </div>
        <p className="mb-2">
          <span className="font-semibold">Título:</span>{" "}
          {reminder?.title || "Carregando..."}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Descrição:</span>{" "}
          {reminder?.description || "Carregando..."}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Categoria:</span>{" "}
          {reminder?.category || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Data de Criação:</span>{" "}
          {reminder?.dateCreated || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Data de Vencimento:</span>{" "}
          {reminder?.dueDate || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Prioridade:</span>{" "}
          {reminder?.priority || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Recorrente:</span>{" "}
          {reminder?.recurring || "N/A"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Completada:</span>{" "}
          {reminder?.completed ? "Sim" : "Não"}
        </p>
        <button 
        onClick={() => {
          deleteReminder();
          closeModal();
        }}
        className="flex justify-center w-full items-center gap-2 bg-red-600 p-2 rounded-lg hover:bg-red-700">
          Delete reminder <Trash className="size-5"/>
        </button>
      </div>
    </div>
  );
};
