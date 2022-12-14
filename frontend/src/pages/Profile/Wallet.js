import React from "react";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import currency from '../../assets/currency.jpg'
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { error, success } from '../../utils/message.js'

class Wallet extends React.Component {

  state = {
    //dialog visible
    open: false,
    //amount to charge
    charge: {
      amount: ''
    },

    //info of wallet
    wallet: {
      accountId: '',
      accountPublicKey: '',
      accountAvatar: '',
      accountBalance: '',
      accountDeleted: '',
      accountUserId: ''
    },

    //history log
    historyLog: []

  }

  componentDidMount() {
    this.handleSearch();
  }


  handleSearch = async () => {

    //sent ajax to back end
    const response = await axios({
      method: "get",
      url: "/5620/wallets",
    }).catch(err => {
      error(err);
    })


    //encapsulate wallet info
    if (response.data.code === 40011) {
      this.setState({
        wallet: response.data.data.account,
        historyLog: response.data.data.searchList
      })
    } else if (response.data.code === 40010) {
      error(response.data.msg);
    } else {
      error("Something wrong, please contact the IT team");
    }
  }


  //dialog charge function
  handleCharge = async (event) => {

    event.preventDefault();

    //send ajax to back end
    const response = await axios({
      method: "put",
      url: "/5620/wallets",
      data: this.state.charge
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 30011) {
      //charge successfully
      success(response.data.msg);
      this.handleSearch();
    } else {
      error(response.data.msg);
    }
    //set dialog invisible
    this.setState({
      open: false
    })
  }

  //dialog open
  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  //dialog close
  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {
 
    const columns = [
      { field: "logId", headerName: "ID", width: 100 },
      { field: "logPrice", headerName: "Top-up amount", width: 160 },
      { field: "logDate", headerName: "Top-up date", width: 160 },
      { field: "logStatus", headerName: "Top-up status", width: 160 },
    ];

    const rows =
      this.state.historyLog;


    return (
      <div
        className="walletPage">

        <Card
          className="walletCard"
          variant="outlined"
        >
          <Stack
            spacing={0}
            direction="row"
          >
            <div className="walletLeft">
              <div
                className="walletLeftAvator"
              >
                <Avatar
                  alt="None"
                  src={localStorage.getItem('avator')}
                  sx={{ width: 60, height: 60 }}
                />
              </div>

              <div style={{ fontFamily: 'Times New Roman' }}>
                <h1>{this.state.wallet.accountAvatar}</h1>
              </div>

              <div
                className="walletLeftPubKey"
              >
                {this.state.wallet.accountPublicKey}
              </div>

              <div className="walletLeftBalance">
                <div className="walletLeftBalanceAvatar">
                  <Avatar
                    alt="None"
                    src={currency}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <div style={{ color: 'rgb(255,255,255)', fontSize: '25px', marginLeft: '20px', marginTop: '25px' }}>
                  {this.state.wallet.accountBalance}{"\u00a0"}ATX
                </div>
              </div>

              <div className="walletLeftFooter">
                <span style={{ fontWeight: 'bold' }} >@Group3-CREATX</span><br /><br></br>
                <span >Contact day.dong99@yahoo.com</span> <br />
              </div>
            </div>

            <div className="walletRight">
              <Stack
                spacing={0}
              >
                <div className="walletRightHeader">
                  <div className="walletRightBalance">
                    <div className="walletRightBalanceAvatar">
                      <Avatar
                        alt="None"
                        src={currency}
                        sx={{ width: 50, height: 50 }}
                      />
                      <br />
                      <br />
                      History
                    </div>
                    <div style={{ fontSize: '25px', marginLeft: '20px', marginTop: '25px' }}>
                      {this.state.wallet.accountBalance}{"\u00a0"}ATX
                    </div>
                    <div className="walletRightBalanceCharge">

                      <Button onClick={this.handleClickOpen} variant="outlined" color="primary" sx={{ fontSize: 15, textTransform: 'none' }}>Charge</Button>

                      <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle>Charge</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please enter the amount of ATX digital currency you want to purchase
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="Amount"
                            label="Amount"
                            fullWidth
                            variant="standard"
                            onChange={(e) => {
                              this.setState({
                                charge: {
                                  amount: e.target.value
                                }
                              })
                            }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose}>Cancel</Button>
                          <Button onClick={this.handleCharge}>Buy</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="walletRightFooter">
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        sx={{
                          border: "none", // also tried setting to none 

                        }}
                        getRowId={rows => rows.logId}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                      />
                    </div>
                  </div>
                </div>
              </Stack>
            </div>
          </Stack>
        </Card>


      </div>
    );
  }
};

export default Wallet;