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
import OrdersPage from "./pages/OrdersPage";
import InboxPage from "./pages/InboxPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TopupScreen from "./pages/TopupScreen";
import HelplinePage from "./pages/HelplinePage";
import AppStorePage from "./pages/AppStorePage";
import AdminDashboardPage from "./pages/dashboard/admin/AdminDashboardPage";
import PromotionsAdminPage from "./pages/dashboard/admin/PromotionsAdminPage";
import HelplineAdminPage from "./pages/dashboard/admin/HelplineAdminPage";
import UpdatesAdminPage from "./pages/dashboard/admin/UpdatesAdminPage";
import AppStoreAdminPage from "./pages/dashboard/admin/AppStoreAdminPage";
import ScammersAdminPage from "./pages/dashboard/admin/ScammersAdminPage";
import TopupAdminPage from "./pages/dashboard/admin/TopupAdminPage";

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
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/topup" element={<TopupScreen />} />
          <Route path="/helpline" element={<HelplinePage />} />
          <Route path="/apps" element={<AppStorePage />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/promo" element={<PromotionsAdminPage />} />
          <Route path="/helpline-admin" element={<HelplineAdminPage />} />
          <Route path="/updates-admin" element={<UpdatesAdminPage />} />
          <Route path="/apps-admin" element={<AppStoreAdminPage />} />
          <Route path="/scammers-admin" element={<ScammersAdminPage />} />
          <Route path="/topup-logs" element={<TopupAdminPage />} />
          {/* Admin Routes ends*/}
        </Routes>
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
