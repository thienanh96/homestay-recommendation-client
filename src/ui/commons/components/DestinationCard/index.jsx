import React from "react";
import { Row, Rate, Skeleton, Icon } from "antd";
import { Link } from "react-router-dom";

import "./index.css";
import { resolve } from "path";
import { reject } from "q";

class DestinationCard extends React.Component {

    render() {
        const { customStyle, imgSrc, cityName, countHomestay } = this.props;
        return (
            <div style={{ ...customStyle, position: 'relative', float: 'left',marginTop: '40px' }}>
                <img alt='dest' src={imgSrc} style={{ width: '100%', borderRadius: '8px' }}></img>
                <div style={{ position: 'absolute', fontWeight: '600', fontSize: '28px', color: 'white', top: '30px', left: '27px' }}>
                    {cityName}
                </div>
                <div style={{ position: 'absolute', fontWeight: '600', fontSize: '18px', color: 'white', top: '68px', left: '27px' }}>
                    {countHomestay} chỗ ở
                </div>
            </div>


        );
    }
}
export default DestinationCard;
