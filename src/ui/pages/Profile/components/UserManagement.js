import React from "react";

import {
    List, Avatar, Button, Skeleton, Icon, Pagination, message, Modal
} from 'antd';
import { post, get, puts } from "../../../../client/index";
import { connect } from "react-redux";
import { getListProfileRequest, deleteProfileRequest } from '../../../../store/actions/profileAction'
import '../index.css'
import { reject } from "q";
import AsyncSelect from "react-select/lib/Async";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class UserManagement extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        searchedUser: null
    }

    componentDidMount() {
        this.props.getListProfileRequest(8, 0, null)
    }

    async loadOptions(inputValue) {
        if (!inputValue || inputValue === "") return [];
        const response = await get(
            "/api/profile/getlist?name=" + inputValue
        );
        if (response && response.status === 200 && response.data && Array.isArray(response.data.dt)) {
            const data = response.data.dt.map(el => {
                return {
                    id: el.id,
                    label: el.user_name,
                    value: el.user_name
                };
            });
            return data;
        }
        return []

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
        this.props.getListProfileRequest(8, parseInt(pageSize * (page - 1)))
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

    confirmDelete(item) {
        let userName = item.user_name ? item.user_name : 'Ẩn danh';
        Modal.confirm({
            title: 'Xác nhận',
            content: `Bạn chắc chắn muốn xóa ${userName} ?`,
            onOk: (e) => {
                console.log("TCL: UserManagement -> confirmDelete -> e", e)
                this.deleteProfile(item.id)
                Modal.destroyAll()
            },
            onCancel: (e) => {
                Modal.destroyAll()
            },
            okText: "Xóa",
            cancelText: 'Hủy'
        })
    }

    seeDetail(profileId) {
        if (profileId) {
            this.props.history.push('/profile/' + profileId + '?type=update-profile')
        }
    }

    handleChangeOnSelect(user) {
        if (user && user.length !== 0) {
            let lastUser = user[user.length - 1]
            this.props.getListProfileRequest(8, 0, lastUser.id)
        } else {
            this.props.getListProfileRequest(8, 0, null)
        }

    }



    render() {
        const { initLoading, loading, list } = this.state;
        const { listProfiles = { dt: [], total: 0 }, startGetListProfileRequest = true } = this.props
        console.log("TCL: UserManagement -> render -> listProfiles", listProfiles)
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={this.onLoadMore}>loading more</Button>
            </div>
        ) : null;

        return (
            <div>
                <div style={{ padding: 10 }}>
                    <AsyncSelect
                        // value={this.state.searchedUser}
                        placeholder={
                            "Nhập tên phượt thủ"
                        }
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultOptions
                        noOptionsMessage={() => "Nhập để tìm kiếm"}
                        isMulti
                        onChange={data => this.handleChangeOnSelect(data)}
                    />
                </div>
                <List
                    className="demo-loadmore-list"
                    loading={startGetListProfileRequest}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={listProfiles.dt}
                    renderItem={item => (
                        <List.Item actions={[<Icon onClick={e => this.seeDetail(item.id)} style={{ fontSize: '23px' }} type="eye" />, <Icon onClick={e => this.confirmDelete(item)} style={{ color: 'red', fontSize: '23px' }} type="delete" />]}>
                            <Skeleton avatar title={false} loading={startGetListProfileRequest} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={item.user_name}
                                    description={item.join_date}
                                />

                            </Skeleton>
                        </List.Item>
                    )}
                />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Pagination
                        defaultCurrent={1}
                        total={listProfiles.total}
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
        listProfiles: state.profileReducer.listProfiles,
        startGetListProfileRequest: state.profileReducer.startGetListProfileRequest
    }
}

const mapDispatchToProps = {
    getListProfileRequest,
    deleteProfileRequest
}
export default UserManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagement);
