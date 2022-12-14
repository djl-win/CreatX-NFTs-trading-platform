import React from "react";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from '../assets/logo.gif'
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AccountMenu from "./AccountMenu";
import { Link } from "react-router-dom";
import { storageUtils } from "../utils/storageUtils";
import axios from "axios";
import Notifications from "react-notifications-menu";
import { error } from '../utils/message.js';
import CreatX from '../assets/CreatX.png';

class HomeHeader extends React.Component {
  state = {
    messages: [],
  }

  //hook specific dependencies. When the page is updated, only the variables in the dependencies are updated, and no other variables are updated  const [count, setCount] = React.useState(null);    useEffect(() => {console.log(count)}, [count])

  //The page is executed once before loading, which is equivalent to the useEffect in the function component, and passes in an empty array, which is executed only once useEffect(() => {}, [])
  constructor(props) {
    super(props);
    if (storageUtils.getUser() === '') {
      storageUtils.saveUser(window.location.href.split("=")[1]);
      localStorage.setItem('avator', 'https://api.multiavatar.com/' + window.location.href.split("=")[1] + '.png');
    }


  }

  componentDidMount() {
    this.checkNftOnSell();
    this.checkWallet();
  }

  //Form processing
  handleChange = e => {
    e.preventDefault();
    //Gets the current dom object
    const target = e.target;
    //Gets the name property of the current dom object
    const name = target.name;
    //Gets the value property of the current dom object
    const value = target.type === 'checkbox' ? target.checked : target.value;
    //update state
    this.setState({
      [name]: value
    })

  };

  //Queries the user for information about the items being sold
  checkNftOnSell = async () => {
    const response = await axios({
      method: "get",
      url: "/5620/nfts/onSell",
    }).catch(err => {
      error(err);
    })
    if (response.data.code === 40011) {
      this.setState({
        messages: response.data.data
      })
    } else {
      error(response.data.msg)
    }

  }

  //Determine if the user has a wallet and open the menu
  checkWallet = async (event) => {
    // console.log("checkWallet");

    const response = await axios({
      method: "post",
      url: "/5620/wallets",
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 40011) {
      localStorage.setItem('walletsJudge', '/profile/wallet');

      // alert(response.data.msg);
    } else if (response.data.code === 40010) {
      localStorage.setItem('walletsJudge', '/profile/register');
      //link to the wallet page, can use the route blocker
      // alert(response.data.msg);

    }};


  render() {

    return (
      // <Router>
      <div className="App">
        <div className="homeHeader">

          <div className="headerImage" 
          style={{display:"flex"}}>
            {/* height and width */}
            <img src={logo} alt="logo"
              style={{
                marginLeft: "100px"
              }}
              width={90} height={60}
            />
            <img style={{height:"25px",width:"100px",marginLeft:"20px", marginTop:"20px"}} src= {CreatX} alt="none"/>
          </div>

          <div
          className="headerSearch">
            {/* <Paper
              component="form"
              sx={{
                p: "1px 1px",
                display: "flex",
                alignItems: "center",
                width: "40%",
                borderRadius: "25px",
                boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 0.1),0 8px 32px 0 rgba(202, 202, 202, 0.37)",
              }}
            >
              <IconButton
                type="button"
                sx={{
                  p: "10px"
                }}
                aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                className="headerSearchInput"
                sx={{
                  ml: 1,
                  flex: 1,
                }}
                name="searchKeyWord"
                onChange={this.handleChange}
                value={this.state.searchKeyWord}
                placeholder="Search items or accounts"
                inputProps={{ "aria-label": "search items and accounts" }}
              />
            </Paper> */}
          </div>

          <div className="headerExplore">
            <Stack spacing={5} direction="row" >
              {/* disableRipple : Disable background color */}
              {/* hover: Disable background color*/}
              {/* textTransfore:  Disable the capital*/}
              <Button component={Link} to="/explore" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }}>Explore</Button>
              <Button component={Link} to="/market" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }} >Market</Button>
              <Button component={Link} to="/rank" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }} >Rank</Button>
              <Button component={Link} to="/transaction" variant="text" disableRipple sx={{ fontSize: 21, color: 'black', "&:hover": { backgroundColor: "transparent" }, textTransform: 'none' }} >Transaction</Button>
              <div style={{ marginTop: "18px" }}>
                <Notifications
                  data={this.state.messages}

                />
              </div>
              <AccountMenu />
            </Stack>
          </div>

        </div>
      </div>
      // </Router>
    );
  }
}

export default HomeHeader;