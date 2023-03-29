import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import IdeaApi from "../../api/ideaApi";
import BannerSection from "../../components/section/BannerSection/bannerSection";
import CreateIdeaSection from "../../components/section/CreateIdeaSection/createIdeaSection";
import ExploreIdeaSection from "../../components/section/ExploreIdeaSection/exploreIdeaSection";
import HeaderSection from "../../components/section/HeaderSection/headerSection";
import { checkIsAuthenticated } from "../../utils";

export default function Home() {
  const [isAuthen, setIsAuthen] = useState();

  const handleCheckIsAuthen = () => {
    const token = localStorage.getItem("access_token");
    const _isAuthenticated = token && token.length > 0 ? true : false;
    console.log("isAu", _isAuthenticated);
    setIsAuthen(_isAuthenticated);
  };
  useEffect(() => {
    handleCheckIsAuthen();
  }, []);

  console.log("isAuthen1", isAuthen);
  if (isAuthen !== undefined) {
    return (
      <>
        <HeaderSection isAuthen={isAuthen}></HeaderSection>
        <BannerSection></BannerSection>
        <ExploreIdeaSection isAuthen={isAuthen}></ExploreIdeaSection>
      </>
    );
  }
}
