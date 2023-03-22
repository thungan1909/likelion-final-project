import { Button, Input } from "antd";
import { useState } from "react";
import IdeaApi from "../../api/ideaApi";
import BannerSection from "../../components/section/BannerSection/bannerSection";
import ExploreIdeaSection from "../../components/section/ExploreIdeaSection/exploreIdeaSection";
import HeaderSection from "../../components/section/HeaderSection/headerSection";

export default function Home() {
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
}
