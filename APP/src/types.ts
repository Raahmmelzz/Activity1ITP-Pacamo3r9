// src/types.ts

export interface Customer {
    customerid: number;
    name: string;
    email: string;
    number: string;
}

export interface Product {
    productid: number;
    productname: string;
    price: string; // DecimalField is sent as a string via JSON
}

export interface Order {
    orderid: number;
    customerid: Customer; // Nested object from your OrderSerializer
    productid: Product;   // Nested object from your OrderSerializer
    date: string;
    quantity: number;
    price: string;
}