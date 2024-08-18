import { Plus } from "lucide-react";

interface IHeaderProps {
  openCreateModal?: () => void;
  typePage: string;
}

export const Header = ({openCreateModal, typePage}: IHeaderProps) => {
  return (
    <div className=" flex w-full justify-between items-center h-28 px-10 bg-zinc-700">
      <span className="text-xl">{typePage}</span>
      <button
        onClick={openCreateModal}
        className="flex gap-2 items-center justify-center bg-zinc-600 p-3 px-7 rounded-lg"
      >
        nova {typePage}
        <Plus className="size-5" />
      </button>
    </div>
  );
};
