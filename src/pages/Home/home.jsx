import { useEffect, useState } from "react";
import BannerSection from "../../components/section/BannerSection/bannerSection";
import ExploreIdeaSection from "../../components/section/ExploreIdeaSection/exploreIdeaSection";
import HeaderSection from "../../components/section/HeaderSection/headerSection";

export default function Home() {
  const [isAuthen, setIsAuthen] = useState();
  const [isAddNewIdea, setIsAddNewIdea] = useState();
  const handleCheckIsAuthen = () => {
    const token = localStorage.getItem("access_token");
    const _isAuthenticated = token && token.length > 0 ? true : false;
    setIsAuthen(_isAuthenticated);
  };
  useEffect(() => {
    handleCheckIsAuthen();
  }, []);

  if (isAuthen !== undefined) {
    return (
      <>
        <HeaderSection
          isAuthen={isAuthen}
          setIsAddNewIdea={setIsAddNewIdea}
        ></HeaderSection>

        <ExploreIdeaSection
          isAuthen={isAuthen}
          isAddNewIdea={isAddNewIdea}
          setIsAddNewIdea={setIsAddNewIdea}
        ></ExploreIdeaSection>
      </>
    );
  }
}
