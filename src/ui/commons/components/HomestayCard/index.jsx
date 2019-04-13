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

    componentWillUnmount(){
        console.log('will mount')
    }

    // async componentWillReceiveProps(nextProps) {
    //     let { homestay } = nextProps
	// 	console.log("TCL: CardHomestay -> componentWillReceiveProps -> homestay", homestay)
    //     let images = homestay.images
    //     if (!homestay.images) return null;
    //     if (homestay && homestay.homestay_id >= 19793) {
    //         images = images.split('$')
    //     } else {
    //         images = images.split(',')
    //     }
    //     for (let homestayImage of images) {
    //         const size = await this.resizeImage(homestayImage)
    //         if (size.width >= size.height) {
    //             return this.setState({
    //                 homestay: { ...homestay, images: homestayImage }
    //             })
    //         }
    //     }
    //     return this.setState({
    //         homestay: { ...homestay, images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYGB93CblQrZEDGtoLINzfxEVksvghWvE-4uiV6_fmOAbJzFDm9g' }
    //     })
    // }


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
        if (!homestay.images) return null;
        let images = homestay.images
        if (homestay && homestay.homestay_id) {
            images = images.split('$')
        }
        for (let homestayImage of images) {
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
            <Link to={`/homestays/${homestay.homestay_id}`}>
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
                            <p className="title-homestay-card">{homestay.name}</p>
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
            </Link>
        );
    }
}
export default CardHomestay;
