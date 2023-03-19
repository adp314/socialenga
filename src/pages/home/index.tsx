import { type NextPage } from "next";
import { NavLayout } from "@/layouts/NavLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Hero } from "@/layouts/Hero";

const Home: NextPage = () => {
  return (
    <div className="animate-gradient bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <NavLayout />
      <Hero />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "nav", "hero"])),
    },
  };
};

export default Home;
