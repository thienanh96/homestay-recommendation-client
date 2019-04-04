import React from "react";
import { Row, Rate, Skeleton, Icon, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";

export default class Description extends React.Component {

    preprocessContent(content) {
        let arr = content.split('.')
        if (arr.length === 1) {
            return arr
        } else if (arr.length > 1) {
            let pickPosition = arr.length / 2;
            let firstPart = arr.filter((el, index) => index < pickPosition).join('.')
            let secondPart = arr.filter((el, index) => index >= pickPosition).join('.')
            return [firstPart, secondPart]
        } else if (arr.length === 0) {
            return ['Chưa có mô tả']
        }
    }

    render() {
        const { content, customStyle } = this.props;
        let newContent = this.preprocessContent(content)
		console.log('TCL: Description -> render -> newContent', newContent)
        return (
            <div className='desc' style={{ ...customStyle }}>
                <div style={{ width: '100%', fontSize: '20px', fontWeight: '600' }}>
                    Giới thiệu chỗ ở
                </div>
                <div style={{ width: '100%', fontSize: '18px' }}>
                    {newContent.map(cont => <div style={{width: '100%',marginTop: '15px'}}>
                        {cont}
                    </div>)}
                </div>

            </div>
        );
    }
}