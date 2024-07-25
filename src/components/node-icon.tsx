import { Node } from "@/types/tree";
import { BoxIcon, Codepen, MapPin } from "lucide-react";

export const NodeIcon = ({ node }: { node: Node }) => {
  if (node.type === "location") {
    return <MapPin className="size-6 text-secondary" />;
  } else if (node.type === "asset") {
    return <BoxIcon className="size-6 text-secondary" />;
  }

  return <Codepen className="size-6 text-secondary" />;
};
