import React, { useState, useEffect } from "react";
import TitleHeader from "../../component/TitleHeader";
import RankContainer from "../../component/Rank/RankContainer";
import { error} from "../../utils/message"
import axios from "axios";

export default function Rank() {
  
  const [rank,setRank] = useState([]);

  const handleRank = async()=>{

    const response = await axios({
      method: "get",
      url: "/5620/nfts/rank",
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 40011) {
      setRank(response.data.data)

    } else if (response.data.code === 40010) {
      error(response.data.msg)
    }
  }
  useEffect(() => {
    handleRank();
  }, [])

    return (
      <div>
        <TitleHeader Title={"Rank"} />
        <RankContainer data={rank}/>
      </div>
    );
  
};
