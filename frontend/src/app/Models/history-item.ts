import { Product } from "./product";

export interface HistoryItem {
    id: number
    product: Product
    count: number
    userName: string
    userAddress: string
    dateTime: string
    status: number
}
