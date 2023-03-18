import { type NextPage } from "next";
import { NavLayout } from "@/layouts/NavLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  return (
    <>
      <NavLayout />
      <div className="h-screen w-full bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white"></div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
