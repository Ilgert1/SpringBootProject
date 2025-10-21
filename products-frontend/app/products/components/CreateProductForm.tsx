"use client";
import { useState } from "react";
import type { Product } from "../../types/product";

type Props = {
    isSuperuser: boolean;
    creating: boolean;
    onSubmit: (name: string, description: string) => Promise<void>;
    createError: string | null;
    createdMsg: string | null;
};

export default function CreateProductForm({
                                              isSuperuser, creating, onSubmit, createError, createdMsg,
                                          }: Props) {
    if (!isSuperuser) return null;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await onSubmit(name, description);
        // if success, parent can set a message; you can also clear here:
        setName(""); setDescription("");
    }

    return (
        <section className="mt-6 mb-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-gray-100">
            <h2 className="text-lg font-semibold mb-3">Create Product</h2>

            {createError && <p className="mb-3 text-red-400 text-sm">Error: {createError}</p>}
            {createdMsg && <p className="mb-3 text-green-400 text-sm">{createdMsg}</p>}

            <form onSubmit={handleSubmit} className="grid gap-3">
                <input
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
                    placeholder="Name"
                    value={name} onChange={e => setName(e.target.value)} disabled={creating}
                />
                <textarea
                    className="w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2"
                    placeholder="Description (optional)" rows={3}
                    value={description} onChange={e => setDescription(e.target.value)} disabled={creating}
                />
                <div className="flex gap-2">
                    <button
                        type="submit" disabled={creating}
                        className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 disabled:opacity-50"
                    >
                        {creating ? "Creating…" : "Create"}
                    </button>
                </div>
            </form>
        </section>
    );
}
