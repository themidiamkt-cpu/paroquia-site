
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Hero } from "@/components/home/Hero";
import { QuickAccess } from "@/components/home/QuickAccess";
import { Notices } from "@/components/home/Notices";
import { OnlineServices } from "@/components/home/OnlineServices";
import { PriestWord } from "@/components/home/PriestWord";
import { FeaturedPastorals } from "@/components/home/FeaturedPastorals";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Location } from "@/components/home/Location";
import { ChapelReform } from "@/components/home/ChapelReform";
import { Calendar } from "@/components/home/Calendar";
import { Donations } from "@/components/home/Donations";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        <Hero />
        {/* QuickAccess removed - integrated into Hero */}
        <Notices />
        <ChapelReform />
        <OnlineServices />
        <PriestWord />
        <Calendar />
        <FeaturedPastorals />
        <Donations />
        <InstagramFeed />
        <Location />
      </main>

      <Footer />
    </div>
  );
}
