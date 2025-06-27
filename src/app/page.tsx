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
    const [search, setSearch] = useState("");

    useEffect(() => {
    const fetchProducts = async () => {
        const res = await fetch('https://fakestoreapi.com/products?limit=5');
        const data: Product[] = await res.json();
        setProducts(data);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="py-8 px-10 bg-[#fffdf5] min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-[#364c84]">Product Showcase</h1>

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 mb-5 w-full border-2 border-gray-100 rounded-lg bg-white text-gray-300"
            />

            <div className="grid grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                <div key={product.id} className="p-5 rounded-lg bg-white border-2 border-[#95b1ee]">
                    <img
                    src={product.image}
                    alt={product.title}
                    className="h-32 mx-auto mb-9"
                    />
                    <h2 className="font-semibold mt-2 text-black">{product.title}</h2>
                    <Link href={`/products/${product.id}`}>
                        <button className="bg-[#e7f1a8] text-[#364c84] px-4 py-2 rounded-lg text-sm font-semibold mt-2">
                            View Details
                        </button>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    );
}
