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
}];



export default class AmenityAround extends React.Component {

    render() {
        const { content, customStyle } = this.props;
		console.log('TCL: AmenityAround -> render -> content', content)
        if (!content) return null
        if (content && !content.data) return null
        const dataTable = content.data.map((el, index) => {
            return {
                key: index,
                name: <div style={{ color: 'black', fontWeight: '600',fontSize: '18px' }}>{Object.keys(el)[0]}</div>,
                column1: el[Object.keys(el)[0]].split('\n').map(el => <div style={{ color: 'black', marginTop: '10px',fontSize: '18px'  }}><Icon theme='filled' type="pushpin"style={{marginRight: '5px'}} />{el}</div>),
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