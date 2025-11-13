"use client";
type Props = {
    loading: boolean;
    error: string | null;
    isSuperuser: boolean;
    creating: boolean;
    onFetch: () => void;
    onStartCreate: () => void;
};

export default function Toolbar({
                                    loading, error, isSuperuser, creating, onFetch, onStartCreate,
                                }: Props) {
    return (
        <section>

        <div className="flex items-center gap-2">
            <button
                onClick={onFetch}
                disabled={loading}
                className="px-3 py-1 rounded-lg border border-gray-700 text-gray-200
                   transition-colors duration-200 hover:bg-gray-800 hover:border-gray-500
                   disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Loading…" : "Get Products"}
            </button>


            {isSuperuser && (
                <button
                    onClick={onStartCreate}
                    disabled={creating}
                    className="px-3 py-1 rounded-lg border border-gray-700 text-gray-200
                     transition-colors duration-200 hover:bg-green-800 hover:border-green-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {creating ? "Creating…" : "Add Product"}
                </button>
            )}

            {error && <span className="text-red-500">{error}</span>}
        </div>
        </section>
    );
}
