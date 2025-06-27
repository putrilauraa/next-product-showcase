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
        <div className="py-8 px-10 bg-[#fffdf5] min-h-screen flex">
            <div className="p-6 bg-white rounded-lg w-fit h-66">
                <img src={product.image} className="h-58" alt={product.title} />
            </div>
            <div className="mt-3 mx-9">
                <h1 className="text-2xl font-bold text-black">{product.title}</h1>
                <p className="text-black w-3xl my-4">{product.description}</p>
                <p className="font-bold mt-2 text-2xl text-[#364c84]">${product.price}</p>
                <button
                    onClick={toggleFavorite}
                    className="mt-4 px-4 py-2 bg-red-400 text-white rounded-lg"
                >
                    {favorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
        </div>
    );
}
