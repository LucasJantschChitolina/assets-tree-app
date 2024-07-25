import { ListCollapse } from "lucide-react";

const TreeHeader = ({
  dataSource,
  onCollapse,
}: {
  dataSource: string;
  onCollapse: () => void;
}) => {
  return (
    <header className="flex justify-between max-w-[500px]">
      <h1 className="text-lg">
        <span className="font-bold">Ativos</span>
        <span className="text-gray-400"> / {dataSource} unit</span>
      </h1>

      <button
        className="border border-gray-200 bg-white hover:bg-blue-100 duration-700 p-2 flex items-center gap-1.5"
        onClick={onCollapse}
      >
        <ListCollapse className="size-4" />
      </button>
    </header>
  );
};

export default TreeHeader;
