const ADMIN_EMAIL = "charleshllw2@gmail.com";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    onSnapshot,
    updateDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";
import { signOut, onAuthStateChanged, type User } from "firebase/auth";
import { db, auth } from "../lib/firebase";

type Quote = {
    id: string;
    name?: string;
    email?: string;
    quantity: number;
    estimatedPrice?: number;
    status?: string;
};

type CustomUpload = {
    id: string;
    name: string;
    email: string;
    fileName: string;
    fileUrl: string;
    sizeLabel: string;
    quantity: number;
    price: number;
    notes?: string;
    status: string;
};

export default function Admin() {
    const navigate = useNavigate();

    // ---------- AUTH ----------
    const [user, setUser] = useState<User | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // ---------- DATA ----------
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [uploads, setUploads] = useState<CustomUpload[]>([]);

    // ---------- AUTH GUARD ----------
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                navigate("/login");
                return;
            }

            if (currentUser.email !== ADMIN_EMAIL) {
                await signOut(auth);
                navigate("/login");
                return;
            }

            setUser(currentUser);
            setCheckingAuth(false);
        });

        return () => unsub();
    }, [navigate]);


    // ---------- LOAD DATA ----------
    useEffect(() => {
        if (!user) return;

        // Load Quotes
        const qQuotes = query(
            collection(db, "quotes"),
            orderBy("createdAt", "desc")
        );
        const unsubQuotes = onSnapshot(qQuotes, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Quote, 'id'>),
            }));
            setQuotes(data);
        });

        // Load Custom Uploads
        const qUploads = query(
            collection(db, "custom_uploads"),
            orderBy("createdAt", "desc")
        );
        const unsubUploads = onSnapshot(qUploads, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<CustomUpload, 'id'>),
            }));
            setUploads(data);
        });

        return () => {
            unsubQuotes();
            unsubUploads();
        };
    }, [user]);

    // ---------- BLOCK RENDER ----------
    if (checkingAuth) {
        return <div style={{ padding: 40 }}>Checking authentication…</div>;
    }

    // ---------- UI ----------
    return (
        <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Admin Dashboard</h1>
                <button
                    onClick={async () => {
                        await signOut(auth);
                        navigate("/login");
                    }}
                    style={{ padding: '8px 16px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Log out
                </button>
            </div>

            <hr style={{ marginBottom: '40px' }} />

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {/* ---------- CUSTOM UPLOADS SECTION ---------- */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2>New Custom Designs ({uploads.length})</h2>
                    {uploads.length === 0 && <p style={{ color: '#666' }}>No custom designs uploaded yet.</p>}

                    {uploads.map((u) => (
                        <div
                            key={u.id}
                            style={{
                                border: "1px solid #e5e7eb",
                                padding: 20,
                                marginBottom: 16,
                                borderRadius: 8,
                                background: u.status === 'pending' ? '#fdf8ff' : '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <h3 style={{ margin: 0, color: 'var(--accent-primary, #D000E8)' }}>{u.fileName}</h3>
                                <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: u.status === 'pending' ? '#fef3c7' : '#d1fae5', borderRadius: '12px' }}>
                                    {u.status.toUpperCase()}
                                </span>
                            </div>
                            <p><strong>Customer:</strong> {u.name} (<a href={`mailto:${u.email}`}>{u.email}</a>)</p>
                            <p><strong>Size:</strong> {u.sizeLabel}</p>
                            <p><strong>Quantity:</strong> {u.quantity} (Total: ${(u.price * u.quantity).toFixed(2)})</p>
                            {u.notes && <p><strong>Notes:</strong> {u.notes}</p>}

                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <a 
                                    href={u.fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ padding: '8px 16px', background: '#2563EB', color: 'white', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}
                                >
                                    Download Design
                                </a>
                                {u.status === 'pending' && (
                                    <button
                                        onClick={async () => {
                                            await updateDoc(doc(db, "custom_uploads", u.id), { status: "processed" });
                                        }}
                                        style={{ padding: '8px 16px', background: '#10B981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
                                    >
                                        Mark as Processed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ---------- QUOTES SECTION ---------- */}
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h2>Quote Requests ({quotes.length})</h2>
                    {quotes.length === 0 && <p style={{ color: '#666' }}>No quotes yet.</p>}

                    {quotes.map((q) => (
                        <div
                            key={q.id}
                            style={{
                                border: "1px solid #e5e7eb",
                                padding: 20,
                                marginBottom: 16,
                                borderRadius: 8,
                                background: '#fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        >
                            <p><strong>Name:</strong> {q.name || "—"}</p>
                            <p><strong>Email:</strong> {q.email || "—"}</p>
                            <p><strong>Quantity:</strong> {q.quantity}</p>
                            <p>
                                <strong>Estimated Price:</strong>{" "}
                                {q.estimatedPrice ? `$${q.estimatedPrice}` : "Calculating…"}
                            </p>

                            <div style={{ marginTop: '20px' }}>
                                <button
                                    onClick={async () => {
                                        await updateDoc(doc(db, "quotes", q.id), { status: "approved" });
                                    }}
                                    style={{ padding: '8px 16px', background: '#4B5563', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Mark Approved
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
