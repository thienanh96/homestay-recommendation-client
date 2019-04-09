import React from "react";
import { Row, Rate, Skeleton, Icon, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";
import RateHomestay from '../../../commons/components/RateHomestay'
// import Tabs from '../../homestays/components/Tabs'

export default class Header extends React.Component {

    render() {
        const { title, homestayId, countLike, countDislike, city, district, customStyle, onClickLike, onClickDislike, meRate, countShare, onClickShare, updateHomestayNode } = this.props;
        console.log("TCL: Header -> render -> homestayId", homestayId)
        return (
            <div style={{ ...customStyle, width: '100%', marginTop: '20px' }}>
                <Row>
                    <Col sm={24} md={19}>
                        <div style={{ width: '100%', fontSize: '30px', fontWeight: '600' }}>
                            {title}
                            {updateHomestayNode}
                        </div>
                        <div style={{ width: '100%', fontSize: '20px', marginTop: '20px' }}>
                            Mã chỗ ở: <b>{homestayId}</b>
                        </div>
                        <div style={{ width: '100%', fontSize: '20px', marginTop: '23px' }}>
                            <Breadcrumb>
                                <Icon type="pushpin" theme="filled" />
                                <Breadcrumb.Item style={{ marginLeft: '5px', color: 'black', fontWeight: '600' }} href="/">
                                    Việt Nam
                                </Breadcrumb.Item>
                                <Breadcrumb.Item style={{ color: 'black', fontWeight: '600' }}>
                                    {city}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item style={{ color: 'black', fontWeight: '600' }}>
                                    {district}
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ width: '100%', fontSize: '20px', marginTop: '23px' }}>

                        </div>
                    </Col>
                    <Col sm={24} md={5}>
                        {
                            homestayId && <RateHomestay
                                homestayId={homestayId}
                                onClickDislike={onClickDislike}
                                onClickLike={onClickLike}
                                onClickShare={onClickShare}
                                countLike={countLike}
                                countDislike={countDislike}
                                meRate={meRate}
                                countShare={countShare}
                            />
                        }

                    </Col>
                </Row>
            </div>
        );
    }
}