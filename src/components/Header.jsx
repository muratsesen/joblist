import { Divider} from '@mui/material';
import React from 'react';

const Header = () => {
    return (
        <div>
            <div style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
          }}>
            <img style={{width:"100px",height:"100px"}} src='logo.png' alt="logo"></img>
            </div>
            <Divider style={{ marginTop: "10px" }}></Divider>
        </div>
    );
};

export default Header;