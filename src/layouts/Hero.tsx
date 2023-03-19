import { useTranslation } from "next-i18next";

export const Hero = () => {
  const { t } = useTranslation(["hero"]);
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="mb-20 max-w-4xl">
          <h1 className="text-7xl font-bold">{t("hero_title")}</h1>
          <p className="py-6">{t("hero_description")}</p>
          <button className="btn-primary btn-lg btn">{t("hero_start")}</button>
        </div>
      </div>
    </div>
  );
};
