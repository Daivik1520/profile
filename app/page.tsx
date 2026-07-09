"use client";

import NavMenu from "@/components/NavMenu";
import EmailFab from "@/components/EmailFab";
import Hero from "@/components/Hero";
import BioSection from "@/components/BioSection";
import ShowsSection from "@/components/ShowsSection";
import MusicSection from "@/components/MusicSection";
import QASection from "@/components/QASection";
import GamesSection from "@/components/GamesSection";
import DividerLine from "@/components/DividerLine";
import FooterMinimal from "@/components/FooterMinimal";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <NavMenu />
      <main>
        <Hero />
        <BioSection />

        <DividerLine />
        <ShowsSection />

        <DividerLine />
        <MusicSection />

        <DividerLine />
        <GamesSection />

        <DividerLine />
        <QASection />

        <FooterMinimal />
      </main>
      <EmailFab />
    </PageTransition>
  );
}
