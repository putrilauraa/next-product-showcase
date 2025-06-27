"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
    const fetchProducts = async () => {
        const res = await fetch('https://fakestoreapi.com/products?limit=5');
        const data: Product[] = await res.json();
        setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product Showcase</h1>
            <div className="grid grid-cols-2 gap-4">
                {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                    <img
                    src={product.image}
                    alt={product.title}
                    className="h-32 mx-auto"
                    />
                    <h2 className="font-semibold mt-2">{product.title}</h2>
                    <Link href={`/products/${product.id}`}>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
                        View Details
                    </button>
                    </Link>
                </div>
                ))}
            </div>
        </main>
    );
}
