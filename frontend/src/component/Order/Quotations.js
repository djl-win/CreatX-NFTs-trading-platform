import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, GlobalStyles } from '@mui/material';
import PropTypes from 'prop-types';
import { error, success } from "../../utils/message"
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";



const Quotations = ({ show }) => {

  const [quotations, setQuotations] = useState([]);

  const detailsRows = quotations.map((item) => {
    return {
      orderId: item.order.orderId,
      nftUrl: item.nft.nftUrl,
      userDetailName: item.userDetail.userDetailName,
      nftPrice: item.nft.nftPrice,
      orderPrice: item.order.orderPrice,
      orderDate: item.order.orderDate,
      orderStatus: item.order.orderStatus,
      userDetailUserId: item.userDetail.userDetailUserId,
      nftId: item.nft.nftId,
    }
  })

  const columns = [
    // { field: 'id', headerName: 'ID' },
    { field: 'nftUrl', headerName: 'NFT', width: 100, renderCell: renderImage },
    { field: 'userDetailName', headerName: 'Buyer', width: 150 },
    { field: 'nftPrice', headerName: 'Current price', width: 200, renderCell: renderPrice },
    { field: 'orderPrice', headerName: 'Bid', width: 200, renderCell: renderPrice },
    { field: 'orderDate', headerName: 'Date', width: 250 },
    { field: 'orderStatus', headerName: 'Operation', width: 250, renderCell: renderStatus },
  ]

  function renderStatus(params) {
    if (params.value === 0) {
      return <div style={{ display: "flex", width: "100%" }}>
        <Button startIcon={<DoneIcon sx={{ color: "white" }} />} onClick={() => handleAgree(params.row)} sx={{ borderRadius: "20px" }} color="success" variant="contained"></Button>
        <Button startIcon={<ClearIcon sx={{ color: "white" }} />} onClick={() => handleReject(params.row)} sx={{ marginLeft: "20px", borderRadius: "20px" }} color="error" variant="contained"></Button>

      </div>;
    } else if ((params.value === 1)) {
      return <div style={{ display: "flex", width: "100%" }}><div style={{ color: "green" }}>Agree</div> <DoneIcon sx={{ color: "green", marginLeft: "135px" }} /></div>;
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

  const handleSearchQuotations = async () => {

    const response = await axios({
      method: "get",
      url: "/5620/orders/searchOrderInfo/2",
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 40011) {
      setQuotations(response.data.data)

    } else if (response.data.code === 40010) {
      error(response.data.msg)
    }

  }


  const handleAgree = async (row) => {

    const response = await axios({
      method: "post",
      url: "/5620/orders/agree",
      data: row
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 30011) {
      handleSearchQuotations();
      success(response.data.msg)

    } else {
      error(response.data.msg)
    }

  }



  const handleReject = async(row) => {

    const response = await axios({
      method: "post",
      url: "/5620/orders/reject",
      data: row
    }).catch(err => {
      error(err);
    })

    if (response.data.code === 30011) {
      handleSearchQuotations();
      success(response.data.msg)

    } else {
      error(response.data.msg)
    }
  }

  useEffect(() => {
    handleSearchQuotations();
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
      }}>Other users quotations of your NFTs</div>
      <Box sx={{ height: '100%', width: '100%' }}>
        <GlobalStyles
          styles={{
            '.MuiDataGrid-toolbarContainer': {
              backgroundColor: 'white',
            },
          }}
        />
        <div style={{ height: 550, width: "100%" }} >
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

export default Quotations;