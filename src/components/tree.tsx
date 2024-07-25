import { useEffect, useState } from "react";

import NodeComponent from "@/components/node";
import TreeControls from "@/components/tree-controls";
import TreeHeader from "@/components/tree-header";

import { Asset, Location, Node } from "@/types/tree";

import { loadData, dataSources } from "@/mocks";

function buildTree(locations: Location[], assets: Asset[]): Node[] {
  const idToNodeMap: { [key: string]: Node } = {};
  const orphanedNodes: Node[] = [];

  locations.forEach((location) => {
    idToNodeMap[location.id] = {
      id: location.id,
      name: location.name,
      nodes: [],
      type: "location",
    };
  });

  assets.forEach((asset) => {
    const type = asset.sensorType ? "component" : "asset";
    idToNodeMap[asset.id] = {
      id: asset.id,
      name: asset.name,
      nodes: [],
      type: type,
      sensorType: asset.sensorType as Node["sensorType"],
      status: asset.status as Node["status"],
    };
  });

  assets.forEach((asset) => {
    if (asset.locationId && idToNodeMap[asset.locationId]) {
      idToNodeMap[asset.locationId].nodes.push(idToNodeMap[asset.id]);
    } else if (asset.parentId && idToNodeMap[asset.parentId]) {
      idToNodeMap[asset.parentId].nodes.push(idToNodeMap[asset.id]);
    } else {
      orphanedNodes.push(idToNodeMap[asset.id]);
    }
  });

  locations.forEach((location) => {
    if (location.parentId && idToNodeMap[location.parentId]) {
      idToNodeMap[location.parentId].nodes.push(idToNodeMap[location.id]);
    }
  });

  return [
    ...locations
      .filter((location) => !location.parentId)
      .map((location) => idToNodeMap[location.id]),
    ...orphanedNodes,
  ];
}

const Tree = ({ dataSource }: { dataSource: keyof typeof dataSources }) => {
  const [data, setData] = useState<Node[]>([]);
  const [filteredData, setFilteredData] = useState<Node[]>(data);
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const { assets, locations } = await loadData(dataSource);
      setData(buildTree(locations, assets));
      setFilteredData(buildTree(locations, assets));
    })();
  }, [dataSource]);

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <TreeControls
        data={data}
        setFilteredData={setFilteredData}
        setOpenNodes={setOpenNodes}
      />

      <TreeHeader
        onCollapse={() => setOpenNodes(new Set())}
        dataSource={dataSource}
      />

      <ul className="max-w-[500px] h-full border shadow-sm p-4 rounded-md">
        {filteredData.map((node) => (
          <NodeComponent key={node.id} node={node} openNodes={openNodes} />
        ))}
      </ul>
    </div>
  );
};

export default Tree;
