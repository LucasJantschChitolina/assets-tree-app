export interface Location {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Asset {
  id: string;
  name: string;
  locationId: string | null;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
}

export interface Node {
  id: string;
  name: string;
  nodes: Node[];
  type: "location" | "asset" | "component";
  sensorType?: "energy" | "vibration" | null;
  status?: "operating" | "alert" | null;
}
