import React from "react";
import { Row, Rate, Skeleton, Icon } from "antd";
import { Link } from "react-router-dom";

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";

class ImageHomestay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            followWidth: true, //set 100%
            loading: true
        }
    }

    // async componentWillReceiveProps(nextProps) {
    //     let { imageUrl } = nextProps
    //     this.setState({
    //         loading: false
    //     })
    //     const size = await this.resizeImage(imageUrl)
    //     return this.setState({
    //         followWidth: size.width >= size.height
    //     })

    // }


    // resizeImage(imgSrc) {
    //     return new Promise((resolve, reject) => {
    //         let img = new Image()
    //         img.onload = () => resolve({ width: img.width, height: img.height })
    //         img.onerror = reject
    //         img.src = imgSrc
    //     })
    // }
    // async componentWillMount() {
    //     let { imageUrl } = this.props;
    //     this.setState({
    //         loading: false
    //     })
    //     const size = await this.resizeImage(imageUrl)
    //     return this.setState({
    //         followWidth: size.width >= size.height
    //     })
    // }

    render() {
        const { customStyle, imageUrl } = this.props;
        let styleImcover = {
            backgroundRepeat: "no-repeat",
            backgroundImage: "url('" + imageUrl + "')",
            width: "100%",
            height: '300px',
            backgroundSize: "cover",
            borderRadius: "3px 3px 0px 0px",
        };
        return (
            <div style={{ ...customStyle,...styleImcover }}>

            </div>
        );
    }
}
export default ImageHomestay;
