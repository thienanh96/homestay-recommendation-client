import React from "react";
import { Row, Rate, Skeleton, Icon, Col, Breadcrumb, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import CardHomestay from '../../../commons/components/HomestayCard'

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";
import { post, get, puts } from "../../../../client/index";

class CardHomestayAsync extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { index, homestay } = this.props
        return (
            <CardHomestay
                key={index}
                homestay={homestay}
                customStyle={{ width: '100%', float: 'left', padding: '10px' }}
            />
        )
    }
}


export default class SimilarHomestays extends React.Component {

    render() {
        const { homestays, customStyle } = this.props;
        return (
            <div style={{ ...customStyle }}>
                <div style={{ width: '100%', fontSize: '25px', fontWeight: '600',marginBottom: 20 }}>
                    Homestay tương tự
                </div>
                {
                    homestays.map((homestay, index) =>
                        <CardHomestayAsync
                            key={index}
                            homestay={homestay}
                            customStyle={{ width: '100%', float: 'left', padding: '10px' }}
                        />)

                }
            </div>
        )
    }
}