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
  // const userId = localStorage.getItem("userId")
  // const [idea, setIdea] = useState({
  //   userId: "",
  //   content: "",
  // });
  // const handleChange = (e) => {

  //   setIdea({
  //     userId: userId,
  //     content: e.target.value,
  //   });
  // };
  // const handleCreateIdea = async () => {
  //   try {
  //     const response = await IdeaApi.addIdea(idea);
  //     console.log(response);
  //   } catch (error) {}
  // };
  const handleCheckIsAuthen = () => {
    const token = localStorage.getItem("access_token");
    const _isAuthenticated = token && token.length > 0 ? true : false;
    setIsAuthen(_isAuthenticated);
  };
  useEffect(() => {
    handleCheckIsAuthen();
  }, []);

  if (!isAuthen) {
    return (
      <>
        {/* <Input
          //   placeholder="Your email"
          style={{ height: "33px" }}
          name="idea"
          onChange={handleChange}
        />
        <Button onClick={handleCreateIdea}>Add idea</Button> */}
        <HeaderSection></HeaderSection>
        <BannerSection></BannerSection>
        <ExploreIdeaSection></ExploreIdeaSection>
      </>
    );
  } else {
    console.log(isAuthen);
    return (
      <>
        <HeaderSection isAuthen={isAuthen}></HeaderSection>
        <BannerSection></BannerSection>
        <ExploreIdeaSection></ExploreIdeaSection>
      </>
    );
  }
}
