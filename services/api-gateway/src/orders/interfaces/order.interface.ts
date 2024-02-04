export interface Order {
    id: string;
    user_id: string;
    products: Product[];
    total_quantity: number;
    total_price: number;
    status: string;
    observation: string;
    created_at: string;
    updated_at: string;
}

interface Product {
    product_id: string;
    quantity: number;
    unit_price: number;
}
