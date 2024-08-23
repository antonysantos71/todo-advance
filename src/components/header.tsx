import { Menu, Plus } from "lucide-react";

interface IHeaderProps {
  openCreateModal?: () => void;
  typePage: string;
  openAside?: () => void;
}

export const Header = ({
  openCreateModal,
  typePage,
  openAside,
}: IHeaderProps) => {
  return (
    <div className="flex w-full justify-between items-center h-28 px-10 bg-zinc-700">
      <div className="flex gap-2 items-center justify-center">
        <button onClick={openAside} className="sm:hidden">
          <Menu />
        </button>
        <span className="text-xl">{typePage}</span>
      </div>
      <button onClick={openCreateModal} className="flex gap-2 flex-row items-center justify-center bg-zinc-600 p-2 rounded-lg sm:p-3">
        <span className="hidden sm:flex">{typePage}</span>
        <Plus className="size-5" />
      </button>
    </div>
  );
};
