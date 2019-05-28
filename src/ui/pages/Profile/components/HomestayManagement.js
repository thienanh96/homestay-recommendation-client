import React from "react";

import {
    List, Avatar, Button, Skeleton, Icon, Pagination, message, Switch, Modal, Row, Col
} from 'antd';
import { post, get, puts } from "../../../../client/index";
import AsyncSelect from "react-select/lib/Async";
import { connect } from "react-redux";
import { getHomestayRequest } from '../../../../store/actions/homestayAction'
import { approveHomestayRequest, deleteHomestayRequest, deleteHomestaySimilarityRequest, lockHomestayRequest } from '../../../../store/actions/homestayAction'
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
        }, 1, true)
    }

    async loadOptions(inputValue) {
        if (!inputValue || inputValue === "") return [];
        let allowed = 0
        console.log('ddddd',this.state.checkedSwitch)
        if (this.state.checkedSwitch) {
            allowed = 0
        } else {
            allowed = 1
        }
        const response = await get(
            "/api/admin/homestays/get?limit=8&offset=0&name=" + inputValue + '&is_allowed=' + allowed
        );
        if (response && response.status === 200 && response.data && Array.isArray(response.data.data)) {
            const data = response.data.data.map(el => {
                return {
                    id: el.homestay_id,
                    label: el.name,
                    value: el.name
                };
            });
            return data;
        }
        return []

    }


    onChangePagination(page, pageSize) {
        let allowed = 0
        if (this.state.checkedSwitch) {
            allowed = 0
        } else {
            allowed = 1
        }
        this.props.getHomestayRequest({
            limitParams: 8,
            offsetParams: parseInt(pageSize * (page - 1))
        }, allowed, true)
    }

    deleteHomestay(homestayId) {
        const pm = new Promise((resolve, reject) => {
            this.props.deleteHomestayRequest(homestayId, resolve, reject)
        })
        pm.then(() => {
            this.props.deleteHomestaySimilarityRequest(homestayId)
            message.success('Xóa Homestay thành công!')
        }, err => {
            message.error('Xóa Homestay thất bại!')
        }).catch(err => {
            message.error('Xóa Homestay thất bại!')
        })
    }

    confirmDelete(item) {
        let userName = item.name ? item.name : 'Ẩn danh';
        Modal.confirm({
            title: 'Xác nhận',
            content: `Bạn chắc chắn muốn xóa ${userName} ?`,
            onOk: (e) => {
                this.deleteHomestay(item.homestay_id)
                Modal.destroyAll()
            },
            onCancel: (e) => {
                Modal.destroyAll()
            },
            okText: "Xóa",
            cancelText: 'Hủy'
        })
    }

    seeDetail(homestayId) {
        if (homestayId) {
            this.props.history.push('/homestays/' + homestayId + '?type-get=admin')
        }
    }

    onChangeSwitch(checked) {
        this.setState({
            checkedSwitch: checked
        })
        if (checked) {
            this.props.getHomestayRequest({
                limitParams: 8,
                offsetParams: 0
            }, 0, true)
        } else {
            this.props.getHomestayRequest({
                limitParams: 8,
                offsetParams: 0
            }, 1, true)
        }
    }

    approveHomestay(homestayId) {
        const pm = new Promise((resolve, reject) => {
            this.props.approveHomestayRequest(homestayId, resolve, reject)
        })
        return pm.then(res => {
            return message.success('Phê duyệt Homestay thành công!')
        }, err => {
            return message.error('Phê duyệt Homestay thất bại!')
        })
    }

    getIconLockOrUnlock(itemStatus, onClick) {
        if (itemStatus === 1) {
            return <Icon type="lock" style={{ fontSize: '23px' }} onClick={onClick} />
        }
        if (itemStatus === -2) {
            return <Icon type="unlock" style={{ fontSize: '23px' }} onClick={onClick} />
        }
        return null
    }

    handleChangeOnSelect(homestay){
        let allowed = 0
        if (this.state.checkedSwitch) {
            allowed = 0
        } else {
            allowed = 1
        }
        if (homestay && homestay.length !== 0) {
            let ids = homestay.map(el => el.id).join(',')
            this.props.getHomestayRequest({
                limitParams: 8,
                offsetParams: 0,
                idsParams: ids
            }, allowed, true)
            // this.props.getListProfileRequest(8, 0, homestay.id)
        } else {
            this.props.getHomestayRequest({
                limitParams: 8,
                offsetParams: 0
            }, allowed, true)
        }
    }

    lockOrUnlockHomestay(homestayId, homestayStatus) {
        const pm = new Promise((resolve, reject) => {
            this.props.lockHomestayRequest(homestayId, resolve, reject)
        })
        return pm.then(newStatus => {
            if (newStatus === 1) {
                return message.success('Bỏ khóa Homestay thành công!')
            }
            if (newStatus === -2) {
                return message.success('Khóa Homestay thành công!')
            }
            return message.error('Khóa/Bỏ khóa Homestay thất bại!')
        }, err => {
            return message.error('Khóa/Bỏ khóa Homestay thất bại!')
        })
    }

    render() {
        const { startHomestayRequest } = this.state;
        const { homestays = [] } = this.props

        return (
            <div>
                <Row style={{height: 60}}>
                    <Col span={20}>
                        <div style={{ padding: 10, paddingLeft: 15 }}>
                            <AsyncSelect
                                // value={this.state.searchedUser}
                                placeholder={
                                    "Nhập tên chỗ nghỉ"
                                }
                                // cacheOptions
                                loadOptions={this.loadOptions.bind(this)}
                                defaultOptions
                                noOptionsMessage={() => "Nhập để tìm kiếm"}
                                isMulti
                                onChange={data => this.handleChangeOnSelect(data)}
                            />
                        </div>
                    </Col>
                    <Col span={4} style={{height: '100%'}}>
                        <div style={{ padding: 10, display: 'flex',justifyContent: 'center', alignItems: 'center',height: '100%' }}>
                            <span style={{paddingRight: 10}}>
                                Phê duyệt
                            </span>
                            <Switch onChange={this.onChangeSwitch.bind(this)} />
                        </div>
                    </Col>
                </Row>
                <List
                    className="demo-loadmore-list"
                    loading={startHomestayRequest}
                    itemLayout="horizontal"
                    dataSource={homestays}
                    renderItem={item => (
                        <List.Item actions={[<Icon onClick={e => this.seeDetail(item.homestay_id)} style={{ fontSize: '23px' }} type="eye" />, this.getIconLockOrUnlock(item.status, e => this.lockOrUnlockHomestay(item.homestay_id, item.status)), <Icon onClick={e => this.confirmDelete(item)} style={{ color: 'red', fontSize: '23px' }} type="delete" />, item.is_allowed === 0 ? <Icon onClick={e => this.approveHomestay(item.homestay_id)} type="check-circle" style={{ fontSize: 23, color: 'green' }} /> : null]}>
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
    getHomestayRequest,
    approveHomestayRequest,
    deleteHomestayRequest,
    deleteHomestaySimilarityRequest,
    lockHomestayRequest
}
export default HomestayManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomestayManagement);
