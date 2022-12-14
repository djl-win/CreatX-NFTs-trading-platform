import React from "react";
import MarketItemList from "../../component/MarketItemList";
import TitleHeader from "../../component/TitleHeader";

class Market extends React.Component {
  render() {
    return (
      <div>
        <TitleHeader Title= {"MarketPlace"} />
        <MarketItemList />
        
      </div>
    );
  }
};

export default Market;