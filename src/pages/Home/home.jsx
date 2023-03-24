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
    setIsAuthen(_isAuthenticated);
  };
  useEffect(() => {
    handleCheckIsAuthen();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <HeaderSection isAuthen={isAuthen}></HeaderSection>
      <BannerSection></BannerSection>
      <ExploreIdeaSection></ExploreIdeaSection>
    </div>
  );
  // if (isAuthen === false) {
  //   return (
  //     <>
  //       {/* <Input
  //         //   placeholder="Your email"
  //         style={{ height: "33px" }}
  //         name="idea"
  //         onChange={handleChange}
  //       />
  //       <Button onClick={handleCreateIdea}>Add idea</Button> */}
  //       <HeaderSection></HeaderSection>
  //       <BannerSection></BannerSection>
  //       <ExploreIdeaSection></ExploreIdeaSection>
  //     </>
  //   );
  // } else {
  //   return (
  //     <div style={{ width: "100%", backgroundColor: "red" }}>
  //       <HeaderSection isAuthen={isAuthen}></HeaderSection>
  //       <BannerSection></BannerSection>
  //       <ExploreIdeaSection></ExploreIdeaSection>
  //     </div>
  //   );
  // }
}
