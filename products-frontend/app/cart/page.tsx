"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import { getCurrentUser } from "@/app/lib/auth";

type CartItem = {
    id: number;
    username: string;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product?:{
        name: string;
        description: string | null;
    }
};

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [removingId, setRemovingId] = useState<number | null>(null);

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (!user) router.replace("/login");
            else fetchCart();
        });
    }, [router]);

    async function fetchCart() {
        try {
            setLoading(true);
            const items = await api<CartItem[]>("/cart");

            // Fetch product details for each cart item
            const itemsWithProducts = await Promise.all(
                items.map(async (item) => {
                    try {
                        const product = await api<any>(`/product/${item.productId}`);
                        return { ...item, product: { name: product.name, description: product.description } };
                    } catch {
                        return { ...item, product: { name: `Product ${item.productId}`, description: null } };
                    }
                })
            );

            setCart(itemsWithProducts);
        } catch (e: any) {
            setError(e?.message ?? "Failed to load cart");
        } finally {
            setLoading(false);
        }
    }

    async function handleRemove(productId: number) {
        try {
            setRemovingId(productId);
            await api(`/cart/${productId}`, { method: "DELETE" });
            setCart((prev) => prev.filter((item) => item.productId !== productId));
        } catch (e: any) {
            setError(e?.message ?? "Failed to remove item");
        } finally {
            setRemovingId(null);
        }
    }

    async function handleClearCart() {
        if (!confirm("Clear entire cart?")) return;
        try {
            await api("/cart", { method: "DELETE" });
            setCart([]);
        } catch (e: any) {
            setError(e?.message ?? "Failed to clear cart");
        }
    }

    if (loading) return <main className="max-w-3xl mx-auto my-8"><p>Loading cart...</p></main>;

    return (
        <main className="max-w-3xl mx-auto my-8 font-sans text-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                <button
                    onClick={() => router.push("/products")}
                    className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                >
                    Back to Products
                </button>
            </div>

            {error && <p className="text-red-400 mb-4">{error}</p>}

            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400 mb-4">Your cart is empty</p>
                    <button
                        onClick={() => router.push("/products")}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Shop Now
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-3 mb-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                            >
                                <div>
                                    <p className="font-light text-xl text-gray-400">{item.product?.name}</p>
                                    <p className="text-sm text-gray-400">{item.product?.description}</p>
                                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>

                                </div>
                                <button
                                    onClick={() => handleRemove(item.productId)}
                                    disabled={removingId === item.productId}
                                    className="px-4 py-2 rounded-lg border border-red-700 text-red-200 hover:bg-red-900 transition disabled:opacity-50"
                                >
                                    {removingId === item.productId ? "Removing..." : "Remove"}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleClearCart}
                            className="px-6 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition"
                        >
                            Clear Cart
                        </button>
                        <button
                            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                        >
                            Checkout ({cart.length} items)
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}