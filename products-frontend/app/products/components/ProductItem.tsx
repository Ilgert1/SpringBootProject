"use client";
import { Product } from "../../types/product";
import EditProductForm from "./EditProductForm";

type Props = {
    p: Product;
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

    addingToCart: number | null;
    onAddToCart: (productId: number) => void;
};

export default function ProductItem({
                                        p, isSuperuser, editingId, editName, editDescription,
                                        updating, deletingId, onStartEdit, onCancelEdit, onSubmitEdit,
                                        onChangeEditName, onChangeEditDescription, onDelete,
                                        addingToCart,onAddToCart
                                    }: Props) {
    const isEditing = isSuperuser && editingId === p.id;

    return (
        <li className="mb-3">
            {isEditing ? (
                <EditProductForm
                    product={p}
                    editName={editName}
                    editDescription={editDescription}
                    updating={updating}
                    onChangeName={onChangeEditName}
                    onChangeDescription={onChangeEditDescription}
                    onCancel={onCancelEdit}
                    onSubmit={onSubmitEdit}
                />
            ) : (
                <>
                    <strong>{p.name}</strong>{p.description ? ` — ${p.description}` : ""}
                    {/*Add to cart button for all users*/}
                    <button
                        onClick={() => onAddToCart(p.id)}
                        disabled={addingToCart === p.id}
                        className="ml-4 mt-2 px-3 py-1 rounded-lg border border-green-700 text-green-200
                                   transition-colors duration-200 hover:bg-green-900 hover:border-green-500
                                   disabled:opacity-50"
                        >
                        {addingToCart === p.id ? "Adding..." : "Add to Cart"}
                    </button>
                    {isSuperuser && (
                        <div className="flex gap-2 mt-1">
                            <button
                                onClick={() => onStartEdit(p)}
                                className="px-3 py-1 rounded-lg border border-gray-700 text-gray-200
                           transition-colors duration-200 hover:bg-gray-800 hover:border-gray-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(p.id)}
                                disabled={deletingId === p.id}
                                className="px-3 py-1 rounded-lg border border-gray-700 text-gray-200
                           transition-colors duration-200 hover:bg-gray-800 hover:border-gray-500
                           disabled:opacity-50"
                            >
                                {deletingId === p.id ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </li>
    );
}
