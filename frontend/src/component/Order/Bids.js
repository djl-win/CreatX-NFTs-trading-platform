import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { GlobalStyles } from '@mui/material';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { error } from "../../utils/message"
import axios from "axios";

const Bids = ({ show }) => {

  const [bids, setBids] = useState([]);

  function renderStatus(params) {
    if (params.value === 0) {
      return <div style={{ display: "flex", width: "100%" }}><div style={{ color: "#FF9933" }}>Processing</div> <MoreHorizIcon sx={{ color: "#FF9933", marginLeft: "100px" }} /> </div>;
    } else if ((params.value === 1)) {
      return <div style={{ display: "flex", width: "100%" }}><div style={{ color: "green" }}>Success</div> <DoneIcon sx={{ color: "green", marginLeft: "118px" }} /></div>;
    } else if ((params.value === 2)) {
      return <div style={{ display: "flex", width: "100%" }}><div style={{ color: "red" }}>Reject</div> <ClearIcon sx={{ color: "red", marginLeft: "130px" }} /></div>;
    }

  }

  function renderPrice(params) {
    return params.value + " ATX";
  }

  function renderImage(params) {
    return <img
      style={{
        height: "48px",
        width: "48px",
        borderRadius: "50%"
      }}
      src={require(`${'../../assets/nftWorks/'}${params.value}`)}
      alt="wrong"
      loading="lazy"
    />
  }

  renderPrice.propTypes = {
    value: PropTypes.number,
  };

  renderImage.propTypes = {
    value: PropTypes.number,
  };

  renderStatus.propTypes = {
    value: PropTypes.number,
  };

  const detailsRows = bids.map((item) => {
    return {
      orderId: item.order.orderId,
      nftUrl: item.nft.nftUrl,
      userDetailName: item.userDetail.userDetailName,
      nftPrice: item.nft.nftPrice,
      orderPrice: item.order.orderPrice,
      orderDate: item.order.orderDate,
      orderStatus: item.order.orderStatus
    }
  })

  const columns = [
    // { field: 'id', headerName: 'ID' },
    { field: 'nftUrl', headerName: 'NFT', width: 100, renderCell: renderImage },
    { field: 'userDetailName', headerName: 'Seller', width: 150 },
    { field: 'nftPrice', headerName: 'Current price', width: 200, renderCell: renderPrice },
    { field: 'orderPrice', headerName: 'Bid', width: 200, renderCell: renderPrice },
    { field: 'orderDate', headerName: 'Date', width: 250 },
    { field: 'orderStatus', headerName: 'Status', width: 250, renderCell: renderStatus },
  ]


  const handleSearchBids = async () => {

    const response = await axios({
      method: "get",
      url: "/5620/orders/searchOrderInfo/1",
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 40011) {
      setBids(response.data.data)

    } else if (response.data.code === 40010) {
      error(response.data.msg)
    }
  }

  useEffect(() => {
    handleSearchBids();
  }, [])

  return (
    <Paper sx={{
      display: show,
      height: "600px",
      width: "1200px",
      boxShadow: "0 8px 32px 0 rgba(202, 202, 202, 0.37)",
      backdropFilter: "blur(5.5px)",
      borderRadius: "30px",
      border: "3px solid rgba( 255, 255, 255, 0.18 )"
    }}>
      <div style={{
        display: show,
        fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
        fontSize: '28px',
        lineHeight: '34px',
        color: '#000000',
        marginLeft: "10px",
        marginTop: "10px"
      }}>Your bid</div>
      <Box sx={{ height: "100%", width: '100%' }}>
        <GlobalStyles
          styles={{
            '.MuiDataGrid-toolbarContainer': {
              backgroundColor: 'white',
            },
          }}
        />
        <div style={{ height: 550, width: "100%" }}>
          <DataGrid
            sx={{
              border: "0px ",
              '.MuiButton-root': {
                color: '#000'
              }
            }}
            getRowId={detailsRows => detailsRows.orderId}
            rows={detailsRows}
            columns={columns}

            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </div>
      </Box>
    </Paper>
  );
};

export default Bids;