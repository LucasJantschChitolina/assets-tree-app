import { Boxes } from "lucide-react";
import { dataSources } from "@/mocks";

const HeaderButton = ({
  setDataSource,
  dataSource,
}: {
  setDataSource: (data: keyof typeof dataSources) => void;
  dataSource: string;
}) => {
  return (
    <button
      className="bg-primary border border-white text-white hover:bg-slate-900 duration-700 p-2 flex items-center gap-1.5"
      onClick={() => setDataSource(dataSource as keyof typeof dataSources)}
    >
      <Boxes className="size-5 text-white" />
      {dataSource.toUpperCase()} Data
    </button>
  );
};

const MainHeader = ({
  setDataSource,
}: {
  setDataSource: (data: keyof typeof dataSources) => void;
}) => {
  return (
    <header className="flex items-center justify-between p-4 gap-2 bg-primary">
      <h1 className="text-2xl text-white">Asset Tree</h1>

      <section className="flex gap-2 text-sm">
        {Object.keys(dataSources).map((source) => (
          <HeaderButton
            key={source}
            setDataSource={setDataSource}
            dataSource={source}
          />
        ))}
      </section>
    </header>
  );
};

export default MainHeader;
