import * as React from 'react';
import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { error } from '../utils/message.js'

export default function ItemList({ listData }) {

    const [nft, setNft] = useState({})
    const [open, setOpen] = useState(false)
    const [nftPrice, setNftPrice] = useState("")

    const handleChange = (event) => {
        setNftPrice(event.target.value);
    };


    const handleOpen = (item) => {
        setNft(item)
        setNftPrice("")
        setOpen(true)
    }
    const handleClose = () => {
        setNftPrice("")
        setOpen(false)
    }

    const handleSell = async () => {


        nft.nftPrice = nftPrice;
        //Send ajax requests to the back end to query for history and other data
        const response = await axios({
            method: "put",
            url: "/5620/nfts/sellNft",
            data: nft
        }).catch(err => {
            error(err);
        })
        if (response.data.code === 30011) {
            alert(response.data.msg)
        } else {
            error("Wrong");
        }
        handleClose();
        window.location.reload(false);
    }


    return (
        <div>

            <ImageList
                sx={{
                    width: 1800,
                    marginLeft: "40px",
                    paddingRight: "30px",
                    paddingTop: "15px",
                    paddingBottom: "30px",

                }}
                rowHeight={300}
                gap={50}
                cols={6}>
                {listData.map((item) => (
                    <IconButton key={item.nftUrl} onClick={() => handleOpen(item)} sx={{ p: 0 }}>
                        <ImageListItem
                            key={item.nftUrl}
                        >
                            <img
                                style={{
                                    borderRadius: "30px",
                                    backdropFilter: "blur(5.5px)",
                                    boxShadow: "2px 2px 0px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                                }}
                                src={require(`${'../assets/nftWorks/'}${item.nftUrl}`)}
                                alt={item.nftDescription}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                style={{
                                    height: "60px",
                                    borderRadius: "0 0 30px 30px",
                                }}

                                subtitle={

                                    <div
                                        style={{
                                            marginTop: "30px",
                                            height:"60px",
                                            fontSize: "18px"
                                        }}
                                    >
                                        Current price: {item.nftPrice} ATX   
                                        <Badge 
                                         sx={{
                                            marginLeft:'5%',
                                            marginBottom:"2%"
                                        }}
                                         badgeContent={item.nftLikes} color="secondary">
                                            <FavoriteIcon />
                                        </Badge>    
                                    </div>
                                    
                                }

                            />
                        </ImageListItem>
                    </IconButton>


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
                >Sell NFT</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the price of this NFT you would like to sell
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Price"
                        type="price"
                        fullWidth
                        variant="standard"
                        value={nftPrice}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ textTransform: 'none' }}>Cancel</Button>
                    <Button onClick={handleSell} sx={{ textTransform: 'none' }}>Sell</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}
