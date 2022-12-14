import React, { useState, useEffect } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from "axios";
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import GradeIcon from '@mui/icons-material/Grade';
import { Fab } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { error, success } from '../utils/message.js'

export default function ExploreBody() {

    const [listData, setListData] = useState([]);

    const [page, setPage] = useState(1);

    const [count, setCount] = useState(0);

    const [open, setOpen] = useState(false);

    const [data, setData] = useState({})

    const handleChange = (event, value) => {
        event.preventDefault();
        setPage(value);
    };

    const handleClose = () => {
        setData({})
        setOpen(false)
    }
    
    const handleOpen = (item) => {
        setData(item)
        setOpen(true)
    }



    const handleRecommended = async () => {
        const response = await axios({
            method: "get",
            url: "/5620/nfts/" + page,
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
            url: "/5620/nfts/count",
        }).catch(err => {
            error(err);
        })
        if (response.data.code === 40011) {
            setCount(response.data.data)

        } else if (response.data.code === 40010) {
            error(response.data.msg)
        }
    }

    const handleLikes = async (item) => {
        const response = await axios({
            method: "post",
            url: "/5620/nfts/likes",
            data: item
        }).catch(err => {
            error(err);
        })
        if (response.data.code === 30011) {
            handleRecommended();

        } else if (response.data.code === 30010) {
            error(response.data.msg)
        }
    }

    const handleFollow = async () => {

        const response = await axios({
            method: "post",
            url: "/5620/follows",
            data: data
        }).catch(err => {
            error(err);
        })
        if (response.data.code === 10011) {
            success(response.data.msg);
            handleClose();
        } else {
            error(response.data.msg);
            handleClose();
        }
    }

    useEffect(() => {
        handleRecommended();
        handleTotalPageNumbers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        handleRecommended();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (
        <div>
            <div
                style={{
                    display: "flex"
                }}>
                <div
                    style={{
                        fontWeight: "bold",
                        margin: "50px 300px 10px",
                        fontSize: "32px",
                        color: "1E2329"
                    }}>
                    Recommended
                </div>

                <div>
                    <Pagination
                        sx={{
                            marginTop: "50px",
                            position: "absolute",
                            right: "350px"
                        }}
                        count={count}
                        page={page} onChange={handleChange} />
                </div>

            </div>

            <div>
                <ImageList
                    sx={{
                        // height:"250px",
                        marginLeft: "300px",
                        marginRight: "300px",


                    }}
                    cols={4}
                    gap={40}
                >
                    {listData.map((item) => (
                        <ImageListItem
                            key={item.nftUrl}
                        >
                            <div>

                                <img
                                    style={{
                                        height: "250px",
                                        width: "250px",
                                        borderRadius: "30px",
                                        backdropFilter: "blur(5.5px)",
                                        boxShadow: "2px 2px 0px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                                    }}
                                    src={require(`${'../assets/nftWorks/'}${item.nftUrl}`)}
                                    alt={item.nftDescription}
                                />

                                <Badge
                                    sx={{
                                        position: "absolote",
                                        marginLeft: "-50px",
                                        marginTop: "-430px"
                                    }}
                                    badgeContent={item.nftLikes} color="secondary">
                                    <Fab
                                        color="error"
                                        size="small"
                                        onClick={() => handleLikes(item)}
                                    >
                                        <FavoriteIcon />
                                    </Fab>
                                </Badge>

                                <Fab
                                    sx={{
                                        position: "absolote",
                                        marginLeft: "-40px",
                                        marginTop: "-330px"
                                    }}
                                    color="warning"
                                    size="small"
                                    onClick={() => handleOpen(item)}
                                >
                                    <GradeIcon />
                                </Fab>

                            </div>
                            <ImageListItemBar
                                style={{
                                    height: "60px",
                                    width: "250px",
                                    borderRadius: "0 0 30px 30px",
                                }}

                                subtitle={

                                    <div
                                        style={{
                                            fontSize: "18px"
                                        }}
                                    >
                                        Current price: {item.nftPrice} ATX
                                    </div>

                                }

                            />
                        </ImageListItem>


                    ))}
                </ImageList>


                <Dialog
                    open={open}
                    onClose={handleClose}
                    sx={{
                        fontFamily: 'Nunito Sans',
                        fontStyle: "normal"
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}
                    >Follow</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you wanna to follow this NFT?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>No</Button>
                        <Button onClick={handleFollow} sx={{ textTransform: 'none' }}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}