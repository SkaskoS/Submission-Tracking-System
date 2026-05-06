import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactForm from "./pages/Contact/ContactForm";
import FoodForm from "./pages/Food/FoodForm";
import Home from "./pages/Home/Home";
import Submissions from "./pages/Submissions/Submissions";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Contact" element={<ContactForm />} />
                <Route path="/food" element={<FoodForm />} />
                <Route path="/submissions" element={<Submissions />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;