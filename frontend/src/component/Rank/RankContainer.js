import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Rank1 from '../../assets/nftRank/Rank1.svg'
import Rank2 from '../../assets/nftRank/Rank2.svg'
import Rank3 from '../../assets/nftRank/Rank3.svg'
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';

export default function RankContainer({ data }) {

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

    function renderPrice(params) {
        return params.value + " ATX";
    }

    function renderDescription(params) {
        return <div style={{ width: "180px", display: "flex", color: "#C99400", }}>
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

    function renderName(params) {
        return <div>@{params.value}</div>
    }

    function renderRank(index) {
        const indexNumber = index.api.getRowIndex(index.row.nftUrl) + 1;
        if(indexNumber === 1){
            return <img style={{marginLeft:"6%", height:"30px", weight:"30px"}} src= {Rank1} alt="none" />;
        } else if( indexNumber === 2){
            return <img style={{marginLeft:"6%", height:"30px", weight:"30px"}} src= {Rank2} alt="none" />;
        } else if (indexNumber === 3){
            return <img style={{marginLeft:"6%", height:"30px", weight:"30px"}} src= {Rank3}  alt="none"/>;
        }
        return <div style={{marginLeft:"20%"}}>{indexNumber}</div>
    }

    function renderLike(params) {
        return <Badge
        sx={{
            marginLeft: '0%'
        }}
        badgeContent={params.value} color="secondary">
        <FavoriteIcon/>
        </Badge>
    }	

    renderImage.propTypes = {
        value: PropTypes.number,
    };

    renderPrice.propTypes = {
        value: PropTypes.number,
    };

    renderDescription.propTypes = {
        value: PropTypes.number,
    };

    renderName.propTypes = {
        value: PropTypes.number,
    };

    renderRank.propTypes = {
        value: PropTypes.number,
    };

    renderLike.propTypes = {
        value: PropTypes.number,
    };





    const detailsRows = data.map((item) => {
        return {
            nftId: item.nftId,
            id: '',
            nftUrl: item.nftUrl,
            nftDescription: item.nftDescription + " #" + item.nftId,
            userDetailName: item.userDetail.userDetailName,
            nftPrice: item.nftPrice,
            nftLikes: item.nftLikes
        }
    })

    const columns = [
        {
            field: 'id',
            width: 70,
            headerName: 'Rank',
            filterable: false,
            renderCell: renderRank,
        },
        { field: 'nftUrl', headerName: 'NFT', width: 100, renderCell: renderImage },
        { field: 'nftDescription', headerName: 'Name', width: 300, renderCell: renderDescription },
        { field: 'userDetailName', headerName: "Owner", width: 400, renderCell: renderName },
        { field: 'nftPrice', headerName: "Current Price", width: 400, renderCell: renderPrice },
        { field: 'nftLikes', headerName: 'Likes', width: 230, renderCell: renderLike },
    ]

    return (
        <div style={{
            width: "100vw",
            height: "85vh",
            textAlign: "center",
            justifyitems: "center",
        }}>
            <div style={{
                marginTop: "50px",
                display: "inline-block",
                width: "80%",
                height: "600px",
            }}>
                <DataGrid

                    sx={{

                        border: "0px ",
                        '.MuiButton-root': {
                            color: '#000'
                        }
                    }}
                    getRowId={detailsRows => detailsRows.nftUrl}
                    rows={detailsRows}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                />
            </div>

        </div>
    )
}