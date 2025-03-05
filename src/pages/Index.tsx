
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UserGroups from "@/components/UserGroups";
import SecurityMeasures from "@/components/SecurityMeasures";
import RequestDemo from "@/components/RequestDemo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <UserGroups />
        <SecurityMeasures />
        <RequestDemo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
