export interface WorkType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Operation {
  id: string;
  startTime: string;
  endTime: string;
  workerName: string;
  workerPosition: string;
  volume: number;
  unit: string;
  workType: WorkType;
  createdAt: string;
  updatedAt: string;
}
