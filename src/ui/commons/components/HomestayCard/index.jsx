import React from "react";
import { Row, Rate, Skeleton, Icon } from "antd";
import { Link } from "react-router-dom";

import "./style.css";
import { resolve } from "path";
import { reject } from "q";

class CardHomestay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            homestay: null,
            loading: true
        }
    }

    async componentWillReceiveProps(nextProps) {
        let {homestay} = nextProps
        for (let homestayImage of homestay.images.split(',')) {
            const size = await this.resizeImage(homestayImage)
            if (size.width > size.height) {
                return this.setState({
                    homestay: { ...homestay, images: homestayImage }
                })
            }
        }
        return this.setState({
            homestay: { ...homestay, images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYGB93CblQrZEDGtoLINzfxEVksvghWvE-4uiV6_fmOAbJzFDm9g' }
        })
    }


    resizeImage(imgSrc) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve({ width: img.width, height: img.height })
            img.onerror = reject
            img.src = imgSrc
        })
    }
    async componentWillMount() {
        let { homestay, customStyle } = this.props;
        this.setState({
            loading: false
        })
        for (let homestayImage of homestay.images.split(',')) {
            const size = await this.resizeImage(homestayImage)
            if (size.width > size.height) {
                return this.setState({
                    homestay: { ...homestay, images: homestayImage }
                })
            }
        }
        return this.setState({
            homestay: { ...homestay, images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYGB93CblQrZEDGtoLINzfxEVksvghWvE-4uiV6_fmOAbJzFDm9g' }
        })

    }

    render() {
        const { customStyle } = this.props;
        const { homestay } = this.state
        if (!homestay) return null
        return (
            <div style={{ ...customStyle }}>
                <Row className="cardHomestayContainer">
                    <Row style={{ height: "60%", width: '100%' }}>
                        <img
                            src={homestay.images}
                            alt="homestay"
                            className="imageHomestay"
                            style={{ width: '100%' }}
                        />
                    </Row>
                    <Row style={{ padding: "15px 10px" }}>
                        <div className="price-homestay-card">
                            {homestay.district} - {homestay.city}
                        </div>
                        <Link to="/detailHomestay">
                            <p className="title-homestay-card">{homestay.name}</p>
                        </Link>

                        <div className="price-homestay-card">
                            Từ {homestay.main_price}đ / người / đêm
                        </div>
                        <div className="likes-homestay-card">
                            <Icon style={{ float: 'left', fontSize: '20px' }} type="like" />
                            <div style={{ float: 'left', marginLeft: '5px' }}>{homestay.likes} thích</div>
                            <Icon style={{ float: 'left', fontSize: '20px', marginLeft: '10px' }} type="dislike" />
                            <div style={{ float: 'left', marginLeft: '5px' }}>{homestay.dislikes} không thích</div>
                        </div>
                    </Row>
                </Row>
            </div>

        );
    }
}
export default CardHomestay;
