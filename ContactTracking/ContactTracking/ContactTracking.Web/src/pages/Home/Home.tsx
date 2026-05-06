import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Submission System</h1>
            <h3>Select a form:</h3>

            <div className="menu-grid">
                <Link to="/submissions" className="menu-card">
                    <span>All Submissions</span>
                </Link>
                <Link to="/contact" className="menu-card">
                    <span>Contact Form</span>
                </Link>

                <Link to="/food" className="menu-card">
                    <span>Food Form</span>
                </Link>


            </div>
        </div>
    );
}

export default Home;