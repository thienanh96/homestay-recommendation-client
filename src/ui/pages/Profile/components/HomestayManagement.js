import React from "react";

import {
    List, Avatar, Button, Skeleton, Icon, Pagination, message, Switch
} from 'antd';
import { connect } from "react-redux";
import { getHomestayRequest } from '../../../../store/actions/homestayAction'
import '../index.css'
import { reject } from "q";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class HomestayManagement extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        checkedSwitch: false
    }

    componentDidMount() {
        this.props.getHomestayRequest({
            limitParams: 8,
            offsetParams: 0
        })
    }

    getData = (callback) => {
        // reqwest({
        //     url: fakeDataUrl,
        //     type: 'json',
        //     method: 'get',
        //     contentType: 'application/json',
        //     success: (res) => {
        //         callback(res);
        //     },
        // });
    }

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                list: data,
                loading: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }

    onChangePagination(page, pageSize) {
        this.props.getHomestayRequest({
            limitParams: 8,
            offsetParams: parseInt(pageSize * (page - 1))
        })
    }

    deleteProfile(userId) {
        const pm = new Promise((resolve, reject) => {
            this.props.deleteProfileRequest(userId, resolve, reject)
        })
        pm.then(profileId => {
            message.success('Xóa tài khoản thành công!')
        }, err => {
            message.error('Xóa tài khoản thất bại!')
        })
    }

    seeDetail(homestayId) {
        if (homestayId) {
            this.props.history.push('/homestays/' + homestayId + '?type-get=admin')
        }
    }

    onChangeSwitch(checked) {
        if (checked) {
            this.props.getHomestayRequest(null, true)
        } else {
            this.props.getHomestayRequest({
                limitParams: 8,
                offsetParams: 0
            }, false)
        }
    }

    approveHomestay(homestayId) {

    }

    render() {
        const { startHomestayRequest } = this.state;
        const { homestays = [] } = this.props

        return (
            <div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', height: '50px' }}>
                    <div style={{ marginRight: '10px' }}>
                        Phê duyệt
                    </div>
                    <Switch onChange={this.onChangeSwitch.bind(this)} />
                </div>
                <List
                    className="demo-loadmore-list"
                    loading={startHomestayRequest}
                    itemLayout="horizontal"
                    dataSource={homestays}
                    renderItem={item => (
                        <List.Item actions={[<Icon onClick={e => this.seeDetail(item.homestay_id)} style={{ fontSize: '23px' }} type="eye" />, <Icon onClick={e => this.deleteProfile(item.homestay_id)} style={{ color: 'red', fontSize: '23px' }} type="delete" />, item.is_allowed === 0 ? <Icon onClick={e => this.approveHomestay(item.homestay_id)} type="check-circle" style={{ fontSize: 23, color: 'green' }} /> : null]}>
                            <Skeleton avatar title={false} loading={startHomestayRequest} active>
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.avatar} />}
                                    title={<b>{item.name}</b>}
                                    description={'Giá từ ' + item.main_price + 'đ/1 đêm'}
                                />

                            </Skeleton>
                        </List.Item>
                    )}
                />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Pagination
                        defaultCurrent={1}
                        total={5000}
                        pageSize={8}
                        onChange={this.onChangePagination.bind(this)}
                    />
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        homestays: state.homestayReducer.homestays,
        startHomestayRequest: state.homestayReducer.startHomestayRequest
    }
}

const mapDispatchToProps = {
    getHomestayRequest
}
export default HomestayManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomestayManagement);
