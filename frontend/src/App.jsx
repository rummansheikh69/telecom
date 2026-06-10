import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./components/layout/BottomNavigation";
import ScammersPage from "./pages/ScammersPage";

function App() {
  return (
    <div className="bg-black text-textPrimary min-h-screen">
      <div className=" max-w-md mx-auto ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scammers" element={<ScammersPage />} />
        </Routes>
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
