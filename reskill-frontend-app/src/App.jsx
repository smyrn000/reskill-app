import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SinglePost from "./components/SinglePost";
import Footer from "./components/Footer";

function App() {
  const siteName = "Site name";
  return (
    <>
      <nav>
        <div className="container mx-auto my-8 flex max-xl:justify-around justify-between items-center">
          <div className="text-black text-xl font-bold">{siteName}</div>
          <div className="space-x-4 max-md:hidden">
            <button className="text-base font-semibold py-2 px-3 rounded hover:text-blue-500 transition">
              Page
            </button>
            <button className="text-base font-semibold py-2 px-3 rounded hover:text-blue-500 transition">
              Page
            </button>
            <button className="text-base font-semibold py-2 px-3 rounded hover:text-blue-500 transition">
              Page
            </button>
            <button className="text-base font-semibold py-2 px-3 rounded bg-blue-500 hover:text-white transition">
              Button
            </button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/posts" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
