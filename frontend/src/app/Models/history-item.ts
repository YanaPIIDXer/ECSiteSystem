import { Product } from "./product";

export interface HistoryItem {
    id: number
    product: Product
    count: number
    dateTime: string
    status: number
}
