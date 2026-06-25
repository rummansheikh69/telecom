import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./components/layout/BottomNavigation";
import ScammersPage from "./pages/ScammersPage";
import UpdatesPage from "./pages/UpdatesPage";
import SingleUpdatePage from "./pages/SingleUpdatePage";
import WalletPage from "./pages/WalletPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProfilePage from "./pages/ProfilePage";
import PersonalInfortmationPage from "./pages/PersonalInfortmationPage";
import AddressPage from "./pages/AddressPage";
import SecurityPage from "./pages/SecurityPage";
import AddMoneyPage from "./pages/AddMoneyPage";
import P2PTransferFlow from "./pages/PtoPTransferPage";
import WithdrawalFlow from "./pages/WithdrawalFlow";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <div className="bg-black text-textPrimary min-h-screen">
      <div className=" max-w-md mx-auto ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scammers" element={<ScammersPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/updates/:id" element={<SingleUpdatePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/personal-info" element={<PersonalInfortmationPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/add-money" element={<AddMoneyPage />} />
          <Route path="/p2p" element={<P2PTransferFlow />} />
          <Route path="/withdraw" element={<WithdrawalFlow />} />
          <Route path="/summery" element={<SummaryPage />} />
        </Routes>
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
