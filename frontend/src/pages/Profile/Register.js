import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import axios from "axios";
import cardPic from "../../assets/RegisterCard.jpg";

class Register extends React.Component {

  state = {

    //Application wallet display
    showRegisterPage: 'block',

    //Prompt card display
    showRegisterCard: 'none',

    //The private key information
    priKey: ''

  }

  //Create a wallet
  handleCreateWallet = async (event) => {

    //Blocking default events
    event.preventDefault();

    // make axios post request
    const response = await axios({
      method: "put",
      url: "/5620/wallets/create",
    }).catch(err => {
      alert(err);
    })

    // Check whether the creation succeeds
    if (response.data.code === 30011) {

      //After the update is successful, the user has a wallet and is set up to route to /profile/wallet
      localStorage.setItem('walletsJudge', '/profile/wallet');

      console.log(response.data.msg);

      //Click Create and feedback to the user his private key information, set the card as display, set the page information as not display, and set the content as private key information
      this.setState({
        showRegisterPage: 'none',
        showRegisterCard: 'block',
        priKey: response.data.data
      })

    } else if(response.data.code === 30010){

      alert(response.data.msg);

    } else{

      alert("Something Wrong")

    }
  }

  handleUnderstand = ()=> {
    this.props.history.push(localStorage.getItem('walletsJudge'));
  }

  render() {
    return (
      <div className="RegisterPage" >

        <div style={{ display: this.state.showRegisterPage }} className="RegisterText">
          <h1>
            Create you account firstly
            <span></span>
          </h1>
        </div>


        <div style={{ display: this.state.showRegisterPage }} className="RegisterRemind">
          <p>You need to create a wallet first, and to transact with others</p>
        </div>

        <div style={{ display: this.state.showRegisterPage }} className="RegisterButton">
          <Button onClick={this.handleCreateWallet} variant="contained" color="success" sx={{ fontStyle: 'italic', fontSize: 25, textTransform: 'none' }}> Create </Button>
        </div>

        <div className="RegisterCard">
          <Card sx={{ maxWidth: 450, display: this.state.showRegisterCard }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="270"
              image={cardPic}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Please keep your private key, for the security of your account, we will not record this to the database, it is the only proof of your transactions with others.
              </Typography>
              <Typography variant="body3" color="text.secondary">
                {this.state.priKey}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" onClick={this.handleUnderstand} sx={{ fontSize: 20, textTransform: 'none' }}>Understand</Button>
            </CardActions>
          </Card>
        </div>

      </div>
    );
  }
};

export default Register;