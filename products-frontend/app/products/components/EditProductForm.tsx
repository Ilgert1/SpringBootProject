"use client";
import { Product } from "../../types/product";

type Props = {
    product: Product;
    editName: string;
    editDescription: string;
    updating: boolean;
    onChangeName: (v: string) => void;
    onChangeDescription: (v: string) => void;
    onCancel: () => void;
    onSubmit: (e: React.FormEvent) => void;
};

export default function EditProductForm({
                                            product, editName, editDescription, updating,
                                            onChangeName, onChangeDescription, onCancel, onSubmit,
                                        }: Props) {
    return (
        <form onSubmit={onSubmit} className="grid gap-2 max-w-xl">
            <strong>Editing #{product.id}</strong>
            <input
                value={editName}
                onChange={(e) => onChangeName(e.target.value)}
                placeholder="Name"
                className="px-3 py-2 rounded-lg border border-gray-300"
            />
            <textarea
                value={editDescription}
                onChange={(e) => onChangeDescription(e.target.value)}
                placeholder="Description (optional)" rows={3}
                className="px-3 py-2 rounded-lg border border-gray-300"
            />
            <div className="flex gap-2">
                <button type="submit" disabled={updating} className="px-3 py-2 rounded-lg border">
                    {updating ? "Saving…" : "Save"}
                </button>
                <button type="button" onClick={onCancel} disabled={updating} className="px-3 py-2 rounded-lg border">
                    Cancel
                </button>
            </div>
        </form>
    );
}
