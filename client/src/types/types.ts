export type StatusType = 'HEALTHY' | 'LOW' | 'CRITICAL';

export type MessageType = 'success' | 'error' | null;

export type PointType = {
    date: string;
    stock: number;
    demand: number
};

export type FiltersType = {
    search: string;
    warehouse: string;
    status: StatusType | "";
};