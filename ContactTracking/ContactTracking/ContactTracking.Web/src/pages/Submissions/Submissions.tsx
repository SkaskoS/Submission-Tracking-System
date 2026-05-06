import { useEffect, useState } from "react";
import "../../App.css";

interface Submission {
    id: number;
    sourceType: string;
    sourceId: number;
    name: string;
    email: string;
    message: string;
    submissionDateTime: string;
    followUpStatus: string;
    assignedTo: string;
    notes: string;
}

function Submissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [editing, setEditing] = useState<Submission | null>(null);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [success, setSuccess] = useState("");

    const loadData = () => {
        fetch("http://localhost:5135/api/Submissions")
            .then((res) => res.json())
            .then((data) => setSubmissions(data))
            .catch((err) => console.error("Error loading submissions:", err));
    };

    useEffect(() => {
        loadData();
    }, []);

    const saveEdit = async () => {
        if (!editing) return;

        const res = await fetch(`http://localhost:5135/api/Submissions/${editing.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: editing.name,
                email: editing.email,
                message: editing.message,
                followUpStatus: editing.followUpStatus,
                assignedTo: editing.assignedTo,
                notes: editing.notes,
            }),
        });

        if (!res.ok) {
            console.error("Update failed");
            return;
        }

        setSubmissions((current) =>
            current.map((item) =>
                item.id === editing.id ? editing : item
            )
        );

        setEditing(null);
    };

    const updateStatus = async (id: number, newStatus: string) => {
        const item = submissions.find((s) => s.id === id);
        if (!item) return;

        const res = await fetch(`http://localhost:5135/api/Submissions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: item.name,
                email: item.email,
                message: item.message,
                followUpStatus: newStatus,
                assignedTo: item.assignedTo,
                notes: item.notes,
            }),
        });

        if (!res.ok) {
            console.error("Status update failed");
            return;
        }

        setFilter("All");

        setSubmissions((current) =>
            current.map((s) =>
                s.id === id ? { ...s, followUpStatus: newStatus } : s
            )
        );
    };
    const deleteSubmission = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this submission?");
        if (!confirmDelete) return;

        const res = await fetch(`http://localhost:5135/api/Submissions/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Delete failed");
            return;
        }

        setSubmissions((current) =>
            current.filter((submission) => submission.id !== id)
        );

        setEditing(null); 


        setSuccess("Submission deleted successfully.");
        setTimeout(() => setSuccess(""), 2500);
    };

    return (
        <div className="page">
            <nav className="breadcrumb">
                <a href="/">Home</a>
                <span>/</span>
                <span>Submissions</span>
            </nav>

            <h1>Submissions</h1>
            {success && <p className="success-message">{success}</p>}
            <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    <option>New</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>

                <input
                    placeholder="Search Submissions"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {submissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <div className="data">
                    <div className="data-header">
                        <span>Name</span>
                        <span>Email</span>
                        <span>Type</span>
                        <span>Message</span>
                        <span>Submitted</span>
                        <span>Actions</span>
                        <span>Status</span>
                        <span>Notes</span>
                        <span>Assigned To</span>
                    </div>

                    {submissions
                        .filter((s) => {
                            const searchText = search.toLowerCase();

                            return (
                                (s.name || "").toLowerCase().includes(searchText) ||
                                (s.email || "").toLowerCase().includes(searchText) ||
                                (s.message || "").toLowerCase().includes(searchText) ||
                                (s.notes || "").toLowerCase().includes(searchText) ||
                                (s.assignedTo || "").toLowerCase().includes(searchText)
                            );
                        })
                        .filter((s) =>
                            filter === "All" ? true : s.followUpStatus === filter
                        )
                        .map((submission) => (
                            <div className="data-item" key={submission.id}>
                                <span className="data-name">{submission.name}</span>

                                <span className="email">{submission.email}</span>

                                <span className="status">{submission.sourceType}</span>

                                <span className="message">
                                    {submission.message || ""}
                                </span>

                                <span>
                                    {new Date(
                                        submission.submissionDateTime
                                    ).toLocaleString()}
                                </span>

                                <span>
                                    <button
                                        className="btn-edit"
                                        onClick={() => setEditing(submission)}
                                    >
                                        Edit
                                    </button>
                                </span>

                                <select
                                    className={`status-select status-${submission.followUpStatus
                                        .trim()
                                        .replace(/\s+/g, "")}`}
                                    value={submission.followUpStatus}
                                    onChange={(e) =>
                                        updateStatus(submission.id, e.target.value)
                                    }
                                >
                                    <option>New</option>
                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>

                                <span className="notes-box">
                                    {submission.notes || "No notes"}
                                </span>

                                <span>{submission.assignedTo || "Unassigned"}</span>
                            </div>
                        ))}
                </div>
            )}

            {editing && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Edit Submission</h2>

                        <input
                            value={editing.name}
                            onChange={(e) =>
                                setEditing({ ...editing, name: e.target.value })
                            }
                        />

                        <input
                            value={editing.email}
                            onChange={(e) =>
                                setEditing({ ...editing, email: e.target.value })
                            }
                        />

                        <textarea
                            value={editing.message}
                            onChange={(e) =>
                                setEditing({ ...editing, message: e.target.value })
                            }
                        />

                        <select
                            value={editing.followUpStatus}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    followUpStatus: e.target.value,
                                })
                            }
                        >
                            <option>New</option>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>

                        <input
                            placeholder="Assigned To"
                            value={editing.assignedTo || ""}
                            onChange={(e) =>
                                setEditing({ ...editing, assignedTo: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Notes"
                            value={editing.notes || ""}
                            onChange={(e) =>
                                setEditing({ ...editing, notes: e.target.value })
                            }
                        />

                        <div className="modal-actions">
                            <button onClick={saveEdit}>Save</button>

                            <button onClick={() => setEditing(null)}>
                                Cancel
                            </button>

                            <button
                                className="btn-delete"
                                onClick={() => deleteSubmission(editing.id)}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Submissions;