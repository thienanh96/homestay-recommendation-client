import React from "react";
import { Row, Rate, Skeleton, Icon, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";

export default class BoxHightlight extends React.Component {

    render() {
        const { content, customStyle } = this.props;
        let newContent = content.split('$')
        return (
            <div className='box-hightlight' style={{ ...customStyle }}>
                <div style={{ width: '100%', fontSize: '20px', fontWeight: '600',color: 'rgb(255, 153, 0)' }}>
                    Điểm nổi bật của chỗ ở
                </div>
                <div style={{ width: '100%', fontSize: '18px', padding: '5px',marginTop: '10px' }}>
                    {newContent.map(cont => <div style={{ width: '100%' }}>
                        <Icon type="check"/><span style={{marginLeft: '5px'}}>{cont}</span>
                    </div>)}
                </div>

            </div>
        );
    }
}