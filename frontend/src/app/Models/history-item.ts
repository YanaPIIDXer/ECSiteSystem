import { Product } from "./product";

export interface HistoryItem {
    id: number
    product: Product
    count: number
    status: number
}
