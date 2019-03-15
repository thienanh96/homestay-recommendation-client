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


    resizeImage(imgSrc) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve({ width: img.width, height: img.height })
            img.onerror = reject
            img.src = imgSrc
        })
    }
    async componentWillMount() {
        let { imageUrl } = this.props;
        this.setState({
            loading: false
        })
        const size = await this.resizeImage(imageUrl)
		console.log('TCL: ImageHomestay -> componentWillMount -> size', size)
        return this.setState({
            followWidth: size.width >= size.height
        })
    }

    render() {
        const { customStyle, imageUrl } = this.props;
        const { followWidth } = this.state
        return (
            <div style={{ ...customStyle }}>
                <img alt='' style={{ width: followWidth ? '100%' : 'auto', height: followWidth ? 'auto' : '276px', borderRadius: '12px', padding: '5px' }} src={imageUrl}></img>
            </div>
        );
    }
}
export default ImageHomestay;
