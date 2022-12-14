import React, { useState, useEffect } from "react";
import TitleHeader from "../../component/TitleHeader";
import TransactionContainer from "../../component/Transaction/TransactionContainer"
import axios from "axios";
import { error} from "../../utils/message"

export default function Transaction() {
  const [transaction,setTransaction] = useState([]);

  const handleTransaction = async()=>{

    const response = await axios({
      method: "get",
      url: "/5620/logs/transaction",
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 40011) {
      setTransaction(response.data.data)

    } else if (response.data.code === 40010) {
      error(response.data.msg)
    }
  }
  useEffect(() => {
    handleTransaction();
  }, [])


    return (
      <div>
        <TitleHeader Title= {"Transaction"} />
        <TransactionContainer data={transaction} />
      </div>
    );
  
};