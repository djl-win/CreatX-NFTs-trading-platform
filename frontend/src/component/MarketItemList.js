import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Paper } from '@mui/material';
import logo from '../assets/currency.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { error} from '../utils/message.js'

const MarketItemList = () => {

    const [listData, setListData] = useState([]);
    
    const [page, setPage] = useState(1)

    const [count, setCount] = useState(0)

    const handleChange = (event, value) => {
        event.preventDefault();
        setPage(value);
    };

    const handleSearch = async() =>{
        const response = await axios({
            method: "get",
            url: "/5620/nfts/market/" + page,
        }).catch(err => {
            error(err);
        })
        if (response.data.code === 40011) {
            setListData(response.data.data)

        } else if (response.data.code === 40010) {
            error(response.data.msg)
        }
    }

    const handleTotalPageNumbers = async () => {
        const response = await axios({
            method: "get",
            url: "/5620/nfts/market/count",
        }).catch(err => {
            error(err);
        })
        if (response.data.code === 40011) {
            setCount(response.data.data)

        } else if (response.data.code === 40010) {
            error(response.data.msg)
        }
    }

    useEffect(() => {
        handleSearch();
        handleTotalPageNumbers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <div>
            <Pagination
                        sx={{
                            position:"absolute",
                            right:"160px",
                            top:"110px"
                        }}
                        count={count}
                        page={page} onChange={handleChange} />
            <ImageList
                sx={{
                    width: "1700px",
                    paddingLeft: "70px",
                    paddingTop: "15px",
                    paddingBottom: "30px",

                }}
                gap={50}
                cols={4}>
                {listData.map((item) => (
                    <ImageListItem
                        sx={{
                            alignItems: "center"
                        }}
                        key={item.nft.nftUrl}
                    >
                        <Paper
                            sx={{
                                height: "450px",
                                width: "300px",
                                boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                                backdropFilter: "blur(5.5px)",
                                borderRadius: "15px",

                            }}
                        >
                            <div>
                                <img
                                    style={{
                                        height: "300px",
                                        width: "300px",
                                        borderRadius: "15px 15px 0 0 ",

                                    }}
                                    src={require(`${'../assets/nftWorks/'}${item.nft.nftUrl}`)}
                                    alt={item.nft.nftDescription}
                                    loading="lazy"
                                />
                            </div>
                            <div style={{

                            }}>
                                <IconButton
                                    key={item.nft.nftUrl}
                                    component={Link} to={{
                                        pathname:"/person",
                                        state: {item}
                                    }}
                                    sx={{
                                        marginTop: "-20%",
                                    }}

                                >
                                    <Paper

                                        sx={{
                                            height: "80px",
                                            width: "80px",
                                            boxShadow: "2px 4px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                                            borderRadius: "50%"
                                        }}
                                    >
                                        <img
                                            style={{
                                                height: "70px",
                                                width: "70px",
                                                paddingTop: "6%",
                                                borderRadius: "50%",
                                                boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",

                                            }}
                                            src={"https://api.multiavatar.com/" + item.user.userUsername + ".png"}
                                            alt="None"
                                        />
                                    </Paper>
                                </IconButton>

                                <div
                                    style={{
                                        fontSize: "18px",
                                        marginLeft: "15px",
                                        color: "#1E2329",
                                        display:"flex"
                                    }}
                                >{item.nft.nftDescription}{'\u00A0'}#{item.nft.nftId}
                                    <Badge
                                        sx={{
                                            marginLeft: "auto",
                                            marginRight:"20px"
                                        }}
                                        badgeContent={item.nft.nftLikes} color="secondary">
                                        <FavoriteBorderIcon />
                                    </Badge>
                                </div>

                                <div
                                    style={{
                                        fontSize: "15px",
                                        marginTop: "10px",
                                        marginLeft: "15px",
                                        color: "#C99400",
                                        display: "flex"
                                    }}
                                >{item.userDetail.userDetailName}
                                    <div
                                        style={{
                                            marginTop: "3px",
                                            marginLeft: "5px",
                                            height: "15px",
                                            width: "15px",
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-14nfsts"><path fillRule="evenodd" clipRule="evenodd" d="M15.824 5.34L14.43 2.927 12.02 4.32 9.608 2.928 8.216 5.339H5.43v2.785L3.02 9.516l1.392 2.412-1.392 2.411 2.411 1.392v2.785h2.785l1.392 2.412 2.412-1.393 2.411 1.393 1.393-2.412h2.784v-2.784l2.412-1.393-1.393-2.411 1.393-2.412-2.412-1.392V5.339h-2.784zm-4.964 7.107l4.432-4.431 1.767 1.767-6.199 6.2-3.92-3.92 1.769-1.767 2.151 2.152z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        fontSize: "15px",
                                        marginTop: "10px",
                                        marginLeft: "15px",
                                        color: "#707A8A",
                                        display: "flex"
                                    }}
                                >
                                    <div>Price</div>
                                    <img
                                        style={{
                                            height: "25px",
                                            width: "25px",
                                            marginTop: "-1px",
                                            borderRadius: "15px",
                                            marginLeft: "40%"
                                        }}
                                        alt="wrong"
                                        src={logo}
                                    />
                                    <div
                                        style={{
                                            marginTop: "-4px",
                                            fontSize: "20px",
                                            color: "black",
                                        }}
                                    >

                                        {'\u00A0'}{'\u00A0'}{item.nft.nftPrice}{'\u00A0'}ATX

                                    </div>
                                </div>

                            </div>
                        </Paper>


                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default MarketItemList;