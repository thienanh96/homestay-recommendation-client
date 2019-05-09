import React from "react";
import { Row, Rate, Skeleton, Icon, Col, Breadcrumb, Table, Tag } from "antd";
import { Link } from "react-router-dom";

// import "./style.css";
import { resolve } from "path";
import { reject } from "q";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Column1',
    dataIndex: 'column1',
    key: 'column1',
}, {
    title: 'Column2',
    dataIndex: 'column2',
    key: 'column2',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    column1: 32,
    column2: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    column1: 42,
    column2: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    column1: 32,
    column2: 'Sidney No. 1 Lake Park',
}];


export default class Host extends React.Component {

    render() {
        const { username, avatar, joinDate, desc,hostId } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <div style={{ width: '100%', fontSize: '20px', fontWeight: '600' }}>
                    Chủ nhà {username}
                </div>
                <Row style={{ marginTop: '20px' }}>
                    <a style={{ width: '100%' }} href={`/profile/${hostId}?type=update-profile`}>
                        <div style={{ width: '60px', float: 'left' }}>
                            <img src={avatar} alt='' style={{ width: '100%', borderRadius: '50%' }}></img>

                        </div>
                        <div style={{ width: '230px', float: 'left', marginLeft: '10px', height: '60px', color: 'black', fontSize: '18px' }}>
                            <div style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontWeight: '600' }}>
                                <div>
                                    {username}
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div>
                                    {joinDate}
                                </div>
                            </div>
                        </div>
                        <div style={{ width: 'calc(100% - 300px)', float: 'right' }}>

                        </div>
                    </a>


                </Row>
            </div>
        )
    }
}