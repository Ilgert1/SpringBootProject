"use client";
import type { business } from "@/app/types/business";

type LeadsListProps = {
    title: string;
    data: business[];
};

export default function LeadsList({ title, data }: LeadsListProps) {
    return (
        <section className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="grid gap-3">
                {data.map((b, i) => (
                    <div key={b.place_id ?? `fallback-${i}`} className="p-3 rounded border bg-gray-900/30">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-medium text-large">{b.name}</div>
                                <div className="text-xs text-gray-300">{b.address}</div>
                                {b.website && (
                                    <div className="text-xs">
                                        <a className="underline" href={b.website} target="_blank" rel="noreferrer">{b.website}</a>
                                    </div>
                                )}
                                <div className="text-xs">Phone: {b.phone ?? "N/A"}</div>
                            </div>
                            <div className="text-right text-sm">
                                <div>
                                    <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 ml-auto"
                                            type='submit'
                                            onClick={() => console.log("test")
                                            }
                                    >
                                        Generate
                                    </button>
                                </div>
                                <div>Rating: {b.rating ?? "—"}</div>
                                <div>Total Ratings: {b.total_ratings ?? "—"}</div>
                                <div className="text-xs">{b.business_status ?? ""}</div>
                            </div>
                        </div>
                        {Array.isArray(b.types) && b.types.length > 0 && (
                            <div className="mt-2 text-xs"><strong>Types:</strong> {b.types.join(", ")}</div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
