"use client";
import { Product } from "../../types/product";
import ProductItem from "./ProductItem";

type Props = {
    products: Product[];
    isSuperuser: boolean;
    editingId: number | null;
    editName: string;
    editDescription: string;
    updating: boolean;
    deletingId: number | null;
    onStartEdit: (p: Product) => void;
    onCancelEdit: () => void;
    onSubmitEdit: (e: React.FormEvent) => void;
    onChangeEditName: (v: string) => void;
    onChangeEditDescription: (v: string) => void;
    onDelete: (id: number) => void;

    //New adding to cart
    addingToCart: number | null;
    onAddToCart: (productId: number) => void;
};

export default function ProductList(props: Props) {
    const { products } = props;
    if (!products.length) return <p>No products found.</p>;

    return (
        <>
            <ol className="mt-4 leading-relaxed">
                {products.map((p) => (
                    <ProductItem key={p.id} p={p} {...props} />
                ))}
            </ol>
        </>
    );
}
