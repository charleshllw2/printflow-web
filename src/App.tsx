import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FileGuidelines from "./pages/FileGuidelines";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-guidelines" element={<FileGuidelines />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
