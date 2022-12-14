import React from "react";


const TitleHeader = ({Title}) => {
  return (
   
    <div 
    style={{
        marginTop: "30px",
        marginLeft: "120px",
        fontSize: "40px",
        color:"#04111D",
        fontWeight:"bold"

    }}
    >
        {Title}
    </div>
  );
};

export default TitleHeader;