import { Stack } from "@mui/system";
import React from "react";
import Card from '@mui/material/Card';
import { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import logo from '../../assets/currency.jpg'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import VerifiedIcon from '@mui/icons-material/Verified';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { error, success } from '../../utils/message.js'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';

const Person = (props) => {
    const history = useHistory();

    const [item, setItem] = useState(props.location.state.item);
    const [verification, setVerification] = useState(true);
    const [privateKey, setPrivateKey] = useState("");
    const [privateKeyTextShow, setPrivateKeyTextShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [bid, setBid] = useState("")

    const handleClose = () => {
        setBid("")
        setOpen(false);
    }

    const handleOpen = () => {
        toast.info("Note: After you bid, we will deduct the appropriate ATX from your wallet and send you NFT when the seller agrees, otherwise we will return your ATX after 24 hours.", {
            position: "top-center",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        setOpen(true);
    }

    const handleChange = (event) => {
        setPrivateKey(event.target.value);
    }

    const handleChange1 = (event) => {
        setBid(event.target.value);
    }

    const handleVerify = async () => {

        item.privateKey = privateKey;

        const response = await axios({
            method: "post",
            url: "/5620/wallets/verify",
            data: item
        }).catch(err => {
            alert(err);
        })

        if (response.data.code === 40011) {
            success("Next to send an offer")
            setVerification(false);
            setPrivateKeyTextShow(true);
        } else {
            error(response.data.msg)
        }
        setPrivateKey("")

    }

    const handleBid = async (event) => {
        //Back-end api: 1. Check whether the input number is positive. 2. Check whether the user has enough money. Deduct the corresponding amount 4. Add the order record
        if (/^[0-9]+.?[0-9]*$/.test(bid) && bid > 0) {

            item.bid = bid;

            const response = await axios({
                method: "post",
                url: "/5620/orders/bid",
                data: item
            }).catch(err => {
                alert(err);
            })

            if (response.data.code === 10011) {
                success(response.data.msg);
                //After the return value is ok, the next operation is routed to the order page.
                history.push('/profile/order');
            } else {
                error(response.data.msg)
                setBid("")
            }
        } else {
            error("Wrong input, please enter positive integers")
            setBid("")
        }

    }


    return (
        <div
            style={{
                width: "100%",
                textAlign: "center"
            }}
        >
            <Card
                sx={{
                    marginTop: "60px",
                    display: "inline-block",
                    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
                    backdropFilter: "blur(5.5px)",
                    borderRadius: "30px",
                    border: "3px solid rgba( 255, 255, 255, 0.18 )"
                }}
            >   <Stack direction="row" spacing={2}>
                    <div>
                        <img
                            style={{
                                marginTop: "2px",
                                height: "600px",
                                width: "400px",
                                borderRadius: "30px",

                            }}
                            src={require(`${'../../assets/nftWorks/'}${item.nft.nftUrl}`)}
                            alt={item.nft.nftDescription}
                            loading="lazy"
                        />

                    </div>

                    <div>

                        <div
                            style={{
                                fontSize: "20px",
                                marginTop: "30px",

                                color: "#C99400",
                                display: "flex"
                            }}
                        >{item.userDetail.userDetailName}
                            <div
                                style={{
                                    marginTop: "3px",
                                    marginLeft: "5px",
                                    height: "20px",
                                    width: "20px",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-14nfsts"><path fillRule="evenodd" clipRule="evenodd" d="M15.824 5.34L14.43 2.927 12.02 4.32 9.608 2.928 8.216 5.339H5.43v2.785L3.02 9.516l1.392 2.412-1.392 2.411 2.411 1.392v2.785h2.785l1.392 2.412 2.412-1.393 2.411 1.393 1.393-2.412h2.784v-2.784l2.412-1.393-1.393-2.411 1.393-2.412-2.412-1.392V5.339h-2.784zm-4.964 7.107l4.432-4.431 1.767 1.767-6.199 6.2-3.92-3.92 1.769-1.767 2.151 2.152z" fill="currentColor"></path></svg>
                            </div>
                            {'\u00A0'}{'\u00A0'}@{item.user.userUsername}
                        </div>


                        <div
                            style={{
                                marginTop: "10px",
                                fontSize: "28px",
                                color: "black",
                                display: "flex"
                            }}>
                            {item.nft.nftDescription}  #{item.nft.nftId}
                            <Badge
                                sx={{
                                    marginTop: "5px",
                                    marginLeft: '200px',
                                    marginRight: "30px"
                                }}
                                badgeContent={item.nft.nftLikes} color="secondary">
                                <FavoriteBorderIcon />
                            </Badge>
                        </div>

                        <div
                            style={{
                                marginTop: "40px",
                                fontSize: "14px",
                                color: "#707A8A",
                                display: "flex"
                            }}
                        >Current price:
                        </div>

                        <div
                            style={{
                                fontSize: "25px",
                                marginTop: "10px",
                                color: "#707A8A",
                                display: "flex"
                            }}
                        >
                            <img
                                style={{
                                    height: "30px",
                                    width: "30px",
                                    marginTop: "4px",
                                    borderRadius: "15px",

                                }}
                                alt="wrong"
                                src={logo}
                            />
                            <div
                                style={{
                                    color: "black",
                                }}
                            >

                                {'\u00A0'}{item.nft.nftPrice}{'\u00A0'}ATX

                            </div>
                        </div>

                        <div
                            style={{
                                marginTop: "40px",
                                fontSize: "14px",
                                color: "#707A8A",
                                display: "flex"
                            }}
                        >Contact:{'\u00A0'}{item.userDetail.userDetailEmail}
                        </div>

                        <div style={{
                            marginTop: "30px",
                            display: "flex"
                        }}>
                            Enter your wallet private key to authenticate
                        </div>

                        <div style={{
                            display: "flex",
                            marginTop: "10px",
                        }}>
                            <TextField
                                disabled={privateKeyTextShow}
                                id="standard-basic"
                                value={privateKey}
                                onChange={handleChange}
                                label="Pri key"
                                type="password"
                                variant="standard"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                disabled={privateKeyTextShow}
                                                onClick={handleVerify}
                                                edge="end"
                                            >
                                                <VerifiedIcon />
                                            </IconButton>
                                        </InputAdornment>

                                }}

                            />
                        </div>
                        <div
                            style={{
                                marginTop: "160px",
                                display: "flex"
                            }}
                        >
                            <Button color="error" variant="contained" size="large" endIcon={<KeyboardReturnIcon />}
                                component={Link} to="/market"
                                sx={{
                                    width: "200px"
                                }}
                            >
                                Return
                            </Button>
                            <Button variant="contained" disabled={verification} size="large" endIcon={<SendIcon />}
                                onClick={handleOpen}
                                sx={{
                                    marginLeft: "20px"
                                }}>
                                Make an offer
                            </Button>
                        </div>

                    </div>
                </Stack>
                <Dialog
                    fullWidth={true}
                    maxWidth="xs"
                    open={open}
                    onClose={handleClose}
                    sx={{
                        marginTop: "-150px",
                        fontFamily: 'Nunito Sans',
                        fontStyle: "normal"
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontSize: "25px",
                            fontWeight: "bold"
                        }}
                    >Send your offer</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your bidding price
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Bid"
                            name="bid"
                            type="bid"
                            fullWidth
                            variant="standard"
                            value={bid}
                            onChange={handleChange1}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">ATX</InputAdornment>,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{ textTransform: 'none' }}>Cancel</Button>
                        <Button onClick={handleBid} sx={{ textTransform: 'none' }}>Bid</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </div >
    );
};

export default Person;