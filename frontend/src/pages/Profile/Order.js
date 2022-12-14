import "./Follows.css";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import Bids from "../../component/Order/Bids";
import Quotations from "../../component/Order/Quotations"
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Order() {

    const [showBid, setShowBid] = useState("block");
    const [showQuotation, setShowQuotation] = useState("none");


    const handleBidPage = () => {
        setShowBid("block");
        setShowQuotation("none");
    }

    const handleQuotationPage = () => {
        setShowBid("none");
        setShowQuotation("block");
    }


    return (

        <div style={{
            width: "100%",
        }}>

            <Stack spacing={0}
            >

                <div className="followsHeader">
                    Here are your all orders
                    <Button
                     color="secondary" variant="contained" size="large" startIcon={<MenuIcon />}
                        onClick={handleBidPage}
                        sx={{
                           
                            marginLeft: "80px",
                            borderRadius: "20px",
                            width: "100px",
                            paddingLeft:"30px"
                        }}
                    >
                        
                    </Button>

                    <Button color="success" variant="contained" size="large" startIcon={<MenuBookIcon />}
                        onClick={handleQuotationPage}
                        sx={{
                            marginLeft: "20px",
                            borderRadius: "20px",
                            width: "100px",
                            paddingLeft:"35px"
                        }}>
                    </Button>
                </div>

                <div
                    className="orderBody"
                    style={{
                        marginTop:"3%",
                        marginLeft:"18%"
                    }}
                >

                    <Bids
                        show={showBid}/>
                    <Quotations
                        show={showQuotation} />

                </div>

            </Stack>

        </div>
    )
}