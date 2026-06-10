import Header from "../components/home/Header";
import ProfileCard from "../components/home/ProfileCard";
import CoreGrid from "../components/home/CoreGrid";
import SecondGrid from "../components/home/SecondGrid";
import ThirdGrid from "../components/home/ThirdGrid";
import Upcoming from "../components/home/Upcoming";

function HomePage() {
  return (
    <div className="h-screen w-full bg-main flex flex-col overflow-y-auto">
      <Header />

      {/* 2. Content Container (Shifted Upwards to Overlap) */}
      <div className="px-4 -mt-10 flex-1">
        {/* Profile Card */}
        <ProfileCard />

        {/* Grid items (Wallet, Today's Update, etc.) would go right underneath here */}
        <CoreGrid />

        {/* Grid items (Saree, Scammer Community, etc.) would go right underneath here */}
        <SecondGrid />

        {/* Grid items (Rules, Verify, Officer, etc.) would go right underneath here */}
        <ThirdGrid />

        {/* Upcoming Grid */}
        <Upcoming />
      </div>
    </div>
  );
}

export default HomePage;
