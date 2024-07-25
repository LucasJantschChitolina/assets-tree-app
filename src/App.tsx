import { useState } from "react";

import MainHeader from "@/components/main-header";
import Tree from "@/components/tree";

import { dataSources } from "@/mocks";

import "./App.css";

const App = () => {
  const [dataSource, setDataSource] =
    useState<keyof typeof dataSources>("jaguar");

  return (
    <div className="w-screen min-h-screen">
      <MainHeader setDataSource={setDataSource} />

      <Tree dataSource={dataSource} />
    </div>
  );
};

export default App;
