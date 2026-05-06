import { useState } from "react";

function FoodForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        location: "",
        message: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess("");
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5135/api/Food", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                setError("Food submission failed.");
                return;
            }

            setForm({
                name: "",
                email: "",
                location: "",
                message: "",
                
            });

            setSuccess("Food form submitted successfully.");
        } catch {
            setError("Could not connect to the API.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div>
        
          

                <nav className="breadcrumb">
                    <a href="/">Home</a>
                    <span>/</span>
                    <span>Food</span>
                </nav>
            <h1>Food</h1>
        <form className="form-look" onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            <textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default FoodForm;