import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Follows.css";
import FollowsItemList from "../../component/FollowsItemList"
import axios from "axios";

export default function Follows() {
  const [followsNft, setFollowsNft] = useState([])

  useEffect(() => {
    handlefollowsNft();
  }, [])

  const handlefollowsNft = async() =>{
    //Send ajax requests to the back end to query for history and other data
    const response = await axios({
      method: "get",
      url: "/5620/follows/getFollowedNfts",
    }).catch(err => {
      alert(err);
    })
    // console.log(response.data);

    //Encapsulate user nft information
    if (response.data.code === 40011) {
      setFollowsNft(response.data.data)
      
    } else if (response.data.code === 40010) {
      alert("Search Nfts unsuccessfuly");
    } else {
      alert("Something wrong in follow page, please contact the IT team");
    } 
  }

  return (
    <div className="followsPage"
    style={{
      width:"100%",
    }}>
      <Stack
        spacing={0}
      >
        <div className="followsHeader">Here are all the NFTs you follow</div>
        <div className="followsBody">
          <FollowsItemList listData={followsNft}></FollowsItemList>
        </div>
      </Stack>
    </div>
  );
};
