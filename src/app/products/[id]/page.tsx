"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    };

    export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data: Product) => setProduct(data));
    }, [id]);

    useEffect(() => {
        const fav = localStorage.getItem(`favorite-${id}`);
        setFavorite(fav === "true");
    }, [id]);

    const toggleFavorite = () => {
        const newStatus = !favorite;
        localStorage.setItem(`favorite-${id}`, newStatus.toString());
        setFavorite(newStatus);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="p-6">
        <h1 className="text-xl font-bold">{product.title}</h1>
        <img src={product.image} className="h-48 my-4" alt={product.title} />
        <p>{product.description}</p>
        <p className="font-bold mt-2">${product.price}</p>
        <button
            onClick={toggleFavorite}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
            {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        </div>
    );
}
