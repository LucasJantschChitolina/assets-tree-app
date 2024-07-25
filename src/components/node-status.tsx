import { Node } from "@/types/tree";

export const NodeStatus = ({ node }: { node: Node }) => {
  if (node.status === "operating") {
    return <span className=" rounded-full size-3 bg-green-500" />;
  } else if (node.status === "alert") {
    return <span className=" rounded-full size-3 bg-red-500" />;
  }

  return null;
};
