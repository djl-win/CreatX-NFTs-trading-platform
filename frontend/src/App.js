import React from "react";
import HomeHeader from "./component/HomeHeader";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { Box, Stack } from "@mui/system";
import Explore from "./pages/Explore";
import Follows from "./pages/Profile/Follows";
import Nfts from "./pages/Profile/Nfts";
import Register from "./pages/Profile/Register";
import Wallet from "./pages/Profile/Wallet";
import Rank from "./pages/Rank";
import Transaction from "./pages/Transaction";
import Market from "./pages/Market";
import Order from "./pages/Profile/Order";
import Person from "./pages/Person";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Box >
        <Stack spacing={0.3}>
          <div>
            <HomeHeader />
            <ToastContainer></ToastContainer>
          </div>

          <div className="footerPage">
            <Switch>
              <Route path="/explore" component={Explore} />
              <Route path="/rank" component={Rank} />
              <Route path="/transaction" component={Transaction} />
              <Route path="/profile/register" component={Register} />
              <Route path="/profile/wallet" component={Wallet} />
              <Route path="/profile/nfts" component={Nfts} />
              <Route path="/profile/follows" component={Follows} />
              <Route path="/profile/order" component={Order} />
              <Route path="/market" component={Market}/>
              <Route path="/person" component={Person}/>
              <Redirect to="/explore"></Redirect>
            </Switch>
            
          </div>
        </Stack>
      </Box>
    </div>
   </Router>

  );
}

export default App;
