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
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";

type Quote = {
    id: string;
    name?: string;
    email?: string;
    quantity: number;
    estimatedPrice?: number;
    status?: string;
};

export default function Admin() {
    const navigate = useNavigate();

    // ---------- AUTH ----------
    const [user, setUser] = useState<any>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // ---------- QUOTES ----------
    const [quotes, setQuotes] = useState<Quote[]>([]);

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
    }, []);


    // ---------- LOAD QUOTES ----------
    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, "quotes"),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as any),
            }));
            setQuotes(data);
        });

        return () => unsub();
    }, [user]);

    // ---------- BLOCK RENDER ----------
    if (checkingAuth) {
        return <div style={{ padding: 40 }}>Checking authentication…</div>;
    }

    // ---------- UI ----------
    return (
        <div style={{ padding: 40 }}>
            <h1>Admin Dashboard</h1>

            <button
                onClick={async () => {
                    await signOut(auth);
                    navigate("/login");
                }}
            >
                Log out
            </button>

            <hr />

            {quotes.length === 0 && <p>No quotes yet.</p>}

            {quotes.map((q) => (
                <div
                    key={q.id}
                    style={{
                        border: "1px solid #333",
                        padding: 16,
                        marginBottom: 16,
                        borderRadius: 8,
                    }}
                >
                    <p>
                        <strong>Name:</strong> {q.name || "—"}
                    </p>
                    <p>
                        <strong>Email:</strong> {q.email || "—"}
                    </p>
                    <p>
                        <strong>Quantity:</strong> {q.quantity}
                    </p>
                    <p>
                        <strong>Estimated Price:</strong>{" "}
                        {q.estimatedPrice ? `$${q.estimatedPrice}` : "Calculating…"}
                    </p>

                    <button
                        onClick={async () => {
                            await updateDoc(doc(db, "quotes", q.id), {
                                status: "approved",
                            });
                        }}
                    >
                        Mark Approved
                    </button>
                </div>
            ))}
        </div>
    );
}
