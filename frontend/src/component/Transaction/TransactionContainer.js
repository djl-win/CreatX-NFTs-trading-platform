import React from "react";
import "./TransactionContainer.css";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { GlobalStyles } from '@mui/material';

export default function Transaction({ data }) {

  function renderStatus(params) {
    if ((params.value === 1)) {
      return <div style={{ display: "flex", width: "100%" }}><div style={{ color: "green" }}>Success</div> <DoneIcon sx={{ color: "green", marginLeft: "50px" }} /></div>;
    } else if ((params.value === 0)) {
      return <div style={{ display: "flex", width: "100%" }}><div style={{ color: "red" }}>Reject</div> <ClearIcon sx={{ color: "red", marginLeft: "45px" }} /></div>;
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

  function renderDescription(params) {
    return <div style={{ width: "160px", display: "flex", color: "#C99400", }}>
    <div>{params.value}</div>

    <div
        style={{
            marginLeft: "auto",
            marginRight: 0,
            height: "20px",
            width: "20px",

        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="css-14nfsts"><path fillRule="evenodd" clipRule="evenodd" d="M15.824 5.34L14.43 2.927 12.02 4.32 9.608 2.928 8.216 5.339H5.43v2.785L3.02 9.516l1.392 2.412-1.392 2.411 2.411 1.392v2.785h2.785l1.392 2.412 2.412-1.393 2.411 1.393 1.393-2.412h2.784v-2.784l2.412-1.393-1.393-2.411 1.393-2.412-2.412-1.392V5.339h-2.784zm-4.964 7.107l4.432-4.431 1.767 1.767-6.199 6.2-3.92-3.92 1.769-1.767 2.151 2.152z" fill="currentColor"></path></svg>

    </div>
</div >
  }

  function renderKey(params) {
    var subStr1 = params.value.substr(0, 10);
    var subStr2 = params.value.substr(params.value.length-15, 15);
    var subStr = subStr1 + "......" + subStr2 ;
    return subStr;
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

  renderDescription.propTypes = {
    value: PropTypes.number,
  };

  renderKey.propTypes = {
    value: PropTypes.number,
  };

  const detailsRows = data.map((item) => {
    return {
      logId: item.log.logId,
      nftUrl: item.nft.nftUrl,
      nftDescription: item.nft.nftDescription + " #" + item.nft.nftId,
      logPubKeyUserA: item.log.logPubKeyUserA,
      logPubKeyUserB: item.log.logPubKeyUserB,
      logPrice: item.log.logPrice,
      logDate: item.log.logDate,
      logStatus: item.log.logStatus,
    }
  })

  const columns = [
    // { field: 'id', headerName: 'ID' },
    { field: 'nftUrl', headerName: 'NFT', width: 100, renderCell: renderImage },
    { field: 'nftDescription', headerName: 'Name', width: 200, renderCell: renderDescription },
    { field: 'logPubKeyUserA', headerName: "Buyer public key", width: 300, renderCell: renderKey },
    { field: 'logPubKeyUserB', headerName: "Seller public key", width: 300, renderCell: renderKey },
    { field: 'logPrice', headerName: 'Transaction price', width: 200, renderCell: renderPrice },
    { field: 'logDate', headerName: 'Date', width: 250 },
    { field: 'logStatus', headerName: 'Status', width: 150, renderCell: renderStatus },
  ]

  return (
    <div id="TransactionContainerBody">
      <div id="TransactionForm">
        <Box sx={{ height: '100%', width: '100%' }}>
          <GlobalStyles
            styles={{
              '.MuiDataGrid-toolbarContainer': {
                backgroundColor: 'white',
              },
            }}
          />
          <div style={{
            marginTop: "50px",
            marginLeft: "70px",
            height: 550,
            width: "90%",
          }} >
            <DataGrid
              sx={{
                border: "0px ",
                '.MuiButton-root': {
                  color: '#000'
                }
              }}
              getRowId={detailsRows => detailsRows.logId}
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
      </div>
    </div>
  );

};