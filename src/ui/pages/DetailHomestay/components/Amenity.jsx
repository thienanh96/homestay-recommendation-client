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


export default class Amenity extends React.Component {

    render() {
        const { content, customStyle } = this.props;
        console.log('TCL: Amenity -> render -> content', content.data)
        if (!content) return null
        if (content && !content.data) return null
        const dataTable = content.data.map((el, index) => {
            return {
                key: index,
                name: <div style={{ color: 'black', fontWeight: '600',fontSize: '18px' }}>{Object.keys(el)[0]}</div>,
                column1: el[Object.keys(el)[0]].filter((el, index) => index % 2 === 0).map(el => <div style={{ color: 'black', marginTop: '10px',fontSize: '18px'  }}>{el}</div>),
                column2: el[Object.keys(el)[0]].filter((el, index) => index % 2 !== 0).map(el => <div style={{ color: 'black', marginTop: '10px',fontSize: '18px' }}>{el}</div>)
            }
        })
        console.log('TCL: Amenity -> render -> dataTable', dataTable)
        return (
            <div className='desc' style={{ ...customStyle }}>
                <div style={{ width: '100%', fontSize: '20px', fontWeight: '600' }}>
                    Tiện nghi
                </div>
                <div style={{ width: '100%', fontSize: '18px', marginTop: '30px' }}>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        showHeader={false}
                        pagination={false}
                    />
                </div>

            </div>
        );
    }
}