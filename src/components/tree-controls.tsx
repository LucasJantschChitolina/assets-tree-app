import { useEffect, useState } from "react";

import { Node } from "@/types/tree";

import { ShieldAlert, Zap } from "lucide-react";

const TreeControls = ({
  data,
  setFilteredData,
  setOpenNodes,
}: {
  data: Node[];
  setFilteredData: (data: Node[]) => void;
  setOpenNodes: (openNodes: Set<string>) => void;
}) => {
  const [query, setQuery] = useState("");
  const [isEnergyFilterApplied, setIsEnergyFilterApplied] = useState(false);
  const [isAlertStatusFilterApplied, setIsAlertStatusFilterApplied] =
    useState(false);

  const filterByEnergySensors = (nodes: Node[]) => {
    if (isEnergyFilterApplied) {
      setFilteredData(nodes);
      setIsEnergyFilterApplied(false);
      return;
    }

    function filter(node: Node): Node | null {
      const filteredNodes = node.nodes?.map(filter).filter(Boolean) as Node[];

      if (node.sensorType === "energy" || filteredNodes?.length) {
        return { ...node, nodes: filteredNodes };
      }

      return null;
    }

    const filteredNodes: Node[] = [];

    nodes.forEach((node) => {
      const filteredNode = filter(node);
      if (filteredNode) {
        filteredNodes.push(filteredNode);
      }
    });

    setFilteredData(filteredNodes);
    updateOpenNodes(filteredNodes);
    setIsEnergyFilterApplied(true);
    setIsAlertStatusFilterApplied(false);
  };

  const filterByAlertStatus = (nodes: Node[]) => {
    if (isAlertStatusFilterApplied) {
      setFilteredData(nodes);
      setIsAlertStatusFilterApplied(false);
      return;
    }

    function filter(node: Node): Node | null {
      const filteredNodes = node.nodes?.map(filter).filter(Boolean) as Node[];

      if (node.status === "alert" || filteredNodes?.length) {
        return { ...node, nodes: filteredNodes };
      }

      return null;
    }

    const filteredNodes: Node[] = [];

    nodes.forEach((node) => {
      const filteredNode = filter(node);
      if (filteredNode) {
        filteredNodes.push(filteredNode);
      }
    });

    setFilteredData(filteredNodes);
    updateOpenNodes(filteredNodes);
    setIsAlertStatusFilterApplied(true);
    setIsEnergyFilterApplied(false);
  };

  const filterByQuery = (nodes: Node[], query: string) => {
    if (!query) {
      setFilteredData(nodes);
      return;
    }

    function filter(node: Node): Node | null {
      const match = node.name.toLowerCase().includes(query.toLowerCase());
      const filteredNodes = node.nodes?.map(filter).filter(Boolean) as Node[];

      if (match || filteredNodes?.length) {
        return { ...node, nodes: filteredNodes };
      }

      return null;
    }

    const filteredNodes: Node[] = [];

    nodes.forEach((node) => {
      const filteredNode = filter(node);
      if (filteredNode) {
        filteredNodes.push(filteredNode);
      }
    });

    setFilteredData(filteredNodes);
    updateOpenNodes(filteredNodes);
  };

  const updateOpenNodes = (nodes: Node[]) => {
    const idsToOpen = new Set<string>();

    const collectOpenNodes = (node: Node) => {
      if (node.nodes?.length) {
        idsToOpen.add(node.id);
        node.nodes.forEach(collectOpenNodes);
      }
    };

    nodes.forEach(collectOpenNodes);
    setOpenNodes(idsToOpen);
  };

  useEffect(() => {
    filterByQuery(data, query);
  }, [query]);

  return (
    <div className="flex flex-row gap-4 justify-between">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 rounded-md w-96 bg-gray-100 text-sm"
      />

      <div className="flex items-center gap-2 flex-row text-sm">
        <button
          className="border border-gray-200 bg-white hover:bg-blue-100 duration-700 p-2 flex items-center gap-1.5"
          onClick={() => filterByEnergySensors(data)}
        >
          <Zap className="size-6 fill-yellow-300 text-yellow-400" />
          Power Sensor
        </button>

        <button
          className="border border-gray-200 bg-white hover:bg-blue-100 duration-700 p-2 flex items-center gap-1.5"
          onClick={() => filterByAlertStatus(data)}
        >
          <ShieldAlert className="size-6 text-white fill-red-600" />
          Alert Status
        </button>
      </div>
    </div>
  );
};

export default TreeControls;
