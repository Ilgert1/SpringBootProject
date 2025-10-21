"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopRightDropdown from "./components/TopRightDropdown";
import Toolbar from "./components/Toolbar";
import CreateProductForm from "./components/CreateProductForm";
import ProductList from "./components/ProductList";
import type { Product } from "../types/product";
import { getCurrentUser, logout } from "@/app/lib/auth"; // NEW
import { api } from "@/app/lib/api";                     // NEW

export default function ProductsPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);

    // Gate the page: must be logged in
    useEffect(() => {
        getCurrentUser().then((me) => {
            if (!me) router.replace("/login");
            else setUser(me);
        });
    }, [router]);

    const isSuperuser = !!user?.roles.includes("ROLE_SUPERUSER"); // or ROLE_ADMIN per your backend

    // CREATE
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);
    const [createdMsg, setCreatedMsg] = useState<string | null>(null);

    async function handleCreate(name: string, description: string) {
        try {
            setCreating(true); setCreateError(null); setCreatedMsg(null);
            const created = await api<Product>("/product", {
                method: "POST",
                body: JSON.stringify({ name: name.trim(), description: description.trim() || null }),
            });
            setProducts((prev) => (prev ? [created, ...prev] : [created]));
            setCreatedMsg("Product created.");
        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) router.replace("/login");
            setCreateError(e?.message ?? "Failed to create product");
        } finally {
            setCreating(false);
        }
    }

    // LIST
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchProducts() {
        try {
            setLoading(true); setError(null);
            const list = await api<Product[]>("/products");
            setProducts(list);
        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) router.replace("/login");
            setError(e?.message ?? "Failed to fetch");
            setProducts(null);
        } finally {
            setLoading(false);
        }
    }

    // UPDATE
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateMsg, setUpdateMsg] = useState<string | null>(null);

    function startEdit(p: Product) {
        setEditingId(p.id);
        setEditName(p.name);
        setEditDescription(p.description || "");
        setUpdateError(null);
        setUpdateMsg(null);
    }
    function cancelEdit() {
        setEditingId(null);
        setUpdateError(null);
        setUpdateMsg(null);
    }
    async function handleUpdateSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!editingId) return;
        if (!editName.trim()) { setUpdateError("Name is required."); return; }
        try {
            setUpdating(true); setUpdateError(null); setUpdateMsg(null);
            const updated = await api<Product | undefined>(`/product/${editingId}`, {
                method: "PUT",
                body: JSON.stringify({ name: editName.trim(), description: editDescription.trim() || null }),
            });
            setProducts((prev) =>
                prev?.map((p) =>
                    p.id === editingId
                        ? (updated ?? { ...p, name: editName.trim(), description: editDescription.trim() || null })
                        : p
                ) ?? prev
            );
            setUpdateMsg("Product updated."); setEditingId(null);
        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) router.replace("/login");
            setUpdateError(e?.message ?? "Failed to update product");
        } finally {
            setUpdating(false);
        }
    }

    // DELETE
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    async function handleDelete(id: number) {
        try {
            setDeleteError(null); setDeletingId(id);
            await api(`/product/${id}`, { method: "DELETE" });
            setProducts((prev) => prev?.filter((p) => p.id !== id) ?? prev);
            if (editingId === id) setEditingId(null);
        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) router.replace("/login");
            setDeleteError(e?.message ?? "Failed to delete product");
        } finally {
            setDeletingId(null);
        }
    }

    if (!user) return null; // or a spinner while user loads

    return (
        <main className="max-w-3xl mx-auto my-8 font-sans text-gray-100">
            <TopRightDropdown />
            <h1 className="mb-4 text-xl font-semibold">Products Demo</h1>

            <Toolbar
                loading={loading}
                error={error}
                isSuperuser={isSuperuser}
                creating={creating}
                onFetch={fetchProducts}
                onStartCreate={() => {}}
            />

            <CreateProductForm
                isSuperuser={isSuperuser}
                creating={creating}
                onSubmit={handleCreate}
                createError={createError}
                createdMsg={createdMsg}
            />

            {updateMsg && <p className="text-green-400 mt-2">{updateMsg}</p>}
            {updateError && <p className="text-red-400 mt-2">Update error: {updateError}</p>}
            {deleteError && <p className="text-red-400 mt-2">Delete error: {deleteError}</p>}

            {Array.isArray(products) && (
                <ProductList
                    products={products}
                    isSuperuser={isSuperuser}
                    editingId={editingId}
                    editName={editName}
                    editDescription={editDescription}
                    updating={updating}
                    deletingId={deletingId}
                    onStartEdit={startEdit}
                    onCancelEdit={cancelEdit}
                    onSubmitEdit={handleUpdateSubmit}
                    onChangeEditName={setEditName}
                    onChangeEditDescription={setEditDescription}
                    onDelete={handleDelete}
                />
            )}
        </main>
    );
}
