import React from "react";
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, List
} from 'antd';
import { getHomestayRequest } from '../../../../store/actions/homestayAction'
import { connect } from "react-redux";
import CardHomestay from '../../../commons/components/HomestayCard'

class OwnHomestays extends React.Component {

    componentWillMount() {
        this.props.getHomestayRequest({
            host_id: this.props.me.user_id
        })
    }
    render() {
        const { homestays, total } = this.props
        console.log("TCL: OwnHomestays -> render -> homestays,total", homestays, total)
        return (
            <div style={{ width: '100%', padding: '15px' }}>
                <List
                    grid={{
                        gutter: 8,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 3
                    }}
                    dataSource={homestays}
                    renderItem={(homestay = {}, index) => (
                        <List.Item>
                            <CardHomestay
                                key={index}
                                homestay={homestay}
                            // customStyle={{ width: '33.333%', float: 'left', padding: '10px' }}
                            />
                        </List.Item>

                    )}
                />
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profileReducer.profile,
        homestays: state.homestayReducer.homestays,
        total: state.homestayReducer.total,
        me: state.authReducer.user
    }
}

const mapDispatchToProps = {
    getHomestayRequest
}
export default OwnHomestays = connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnHomestays);
