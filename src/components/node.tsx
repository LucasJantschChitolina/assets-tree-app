import { useEffect, useState } from "react";

import { NodeIcon } from "@/components/node-icon";
import { NodeStatus } from "@/components/node-status";

import { Node } from "@/types/tree";
import { ChevronDown, ChevronRight, Zap } from "lucide-react";

const NodeComponent = ({
  node,
  openNodes,
}: {
  node: Node;
  openNodes: Set<string>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(openNodes.has(node.id));
  }, [openNodes, node.id]);

  return (
    <li className="my-1.5">
      <span
        className="flex gap-1.5 items-center hover:bg-blue-200 px-1 py-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {node.nodes && node.nodes.length > 0 && (
          <div>
            {isOpen ? (
              <ChevronDown className="size-5 text-gray-600" />
            ) : (
              <ChevronRight className="size-5 text-gray-600" />
            )}
          </div>
        )}

        <NodeIcon node={node} />

        {node.name}

        {node.sensorType === "energy" ? (
          <Zap className="size-6 fill-yellow-300 text-yellow-400" />
        ) : (
          <NodeStatus node={node} />
        )}
      </span>

      {isOpen && (
        <ul className="pl-4">
          {node.nodes.map((n) => (
            <NodeComponent key={n.id} node={n} openNodes={openNodes} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NodeComponent;
