import React from "react";
import { Row, Rate, Skeleton, Icon, Col } from "antd";
import { Link } from "react-router-dom";

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";

export default class Header extends React.Component {

    render() {
        const { title, homestayId, countLike, countDislike, city, district, customStyle } = this.props;
        return (
            <div style={{ ...customStyle,width :'100%',marginTop: '20px' }}>
                <Row>
                    <Col sm={24} md={20}>
                        <div style={{ width: '100%', fontSize: '30px', fontWeight: '600' }}>
                            {title}
                        </div>
                        <div style={{ width: '100%', fontSize: '20px', marginTop: '10px' }}>
                            Mã chỗ ở: <b>{homestayId}</b>
                        </div>
                    </Col>
                    <Col sm={24} md={4}>

                    </Col>
                </Row>
            </div>
        );
    }
}