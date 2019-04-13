import React from "react";
import { post, get, puts } from "../../../client/index";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Row,
    Col,
    Dropdown,
    Avatar,
    Select,
    Affix,
    Pagination,
    Button,
    message,
    List
} from "antd";
import { connect } from "react-redux";
import history from '../../../lib/history'
import ProfileUpdate from './components/ProfileUpdate'
import OwnHomestays from './components/OwnHomestays'
import SharePosts from './components/SharePosts'
import UserManagement from './components/UserManagement'
import HomestayManagement from './components/HomestayManagement'
import { updateProfileRequest, getProfileRequest } from '../../../store/actions/profileAction'
import './index.css'



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: null
        }
    }

    componentWillMount() {
        let profileId = this.props.match.params.id
        if (profileId && profileId === 'me') {
            return this.props.getProfileRequest({
                me: 1
            })
        }
        if (profileId && profileId !== 'me') {
            this.props.getProfileRequest({
                user_id: profileId
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("TCL: Profile -> componentWillReceiveProps -> nextProps", nextProps)
        console.log("TCL: Profile -> componentWillReceiveProps -> thisprops", this.props)
        if (
            this.props.location.pathname !== nextProps.location.pathname
        ) {
            let profileId = nextProps.match.params.id
            if (profileId && profileId === 'me') {
                return this.props.getProfileRequest({
                    me: 1
                })
            }
            if (profileId && profileId !== 'me') {
                this.props.getProfileRequest({
                    user_id: profileId
                })
            }
        }
    }

    handleClick({ item, key, keyPath }) {
        let profileId = this.props.match.params.id
        if (key === '1') {
            this.props.history.push(`/profile/${profileId}?type=update-profile`)
        } else if (key === '2') {
            this.props.history.push(`/profile/${profileId}?type=own-homestay`)
        } else if (key === '3') {
            this.props.history.push(`/profile/${profileId}?type=share`)
        } else if (key === '4') {
            this.props.history.push(`/profile/${profileId}?type=admin-user-management`)
        } else if (key === '5') {
            this.props.history.push(`/profile/${profileId}?type=admin-homestay-management`)
        }
    }

    getKeys() {
        let location = this.props.location.search
        const params = new URLSearchParams(location)
        if (params && params.get('type') === 'update-profile') {
            return 1
        }
        if (params && params.get('type') === 'own-homestay') {
            return 2
        }
        if (params && params.get('type') === 'share') {
            return 3
        }
        if (params && params.get('type') === 'admin-user-management') {
            return 4
        }
        if (params && params.get('type') === 'admin-homestay-management') {
            return 5
        }
    }

    getUpdatedInfo(values) {
        console.log("TCL: Profile -> getUpdatedInfo -> values", values)
        const pm = new Promise((resolve, reject) => {
            this.props.updateProfileRequest(values, resolve, reject)
        })
        pm.then(result => {
            return message.success('Cập nhật thông tin cá nhân thành công')
        }, () => {
            return message.success('Cập nhật thông tin cá nhân thất bại')
        }).catch(err => {
            return message.success('Cập nhật thông tin cá nhân thất bại')
        })
    }



    render() {
        const { profile = {}, homestays, totalHomestays, me = {} } = this.props
        if (!profile) return null
        return (
            <Row style={{ marginTop: '30px' }}>
                <Col sm={1} md={4}>
                </Col>
                <Col sm={22} md={16} style={{ display: 'flex' }}>
                    <div style={{ width: 280 }}>
                        <Menu
                            onClick={this.handleClick.bind(this)}
                            style={{ width: '100%' }}
                            defaultSelectedKeys={this.getKeys() + ''}
                            // selectedKeys={this.state.currentTab ? this.state.currentTab + '': '1'}
                            mode="inline"
                        >
                            <div style={{ height: '50px', display: 'flex' }}>
                                <div style={{ height: '100%', width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img alt='' src={profile.avatar ? profile.avatar : 'https://www.w3schools.com/howto/img_avatar2.png'} style={{ width: '50px', height: '50px', borderRadius: '50%' }}></img>
                                </div>
                                <div style={{ height: '100%', width: '75%', padding: '5px' }}>
                                    <div style={{ height: '50%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 600 }}>
                                        {profile.user_name}
                                    </div>
                                    <div style={{ height: '50%', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                        {profile.email}

                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '20px' }}>

                            </div>
                            {
                                this.props.match.params.id === 'me' && <Menu.Item key="1">Chỉnh sửa hồ sơ</Menu.Item>
                            }
                            {
                                this.props.match.params.id !== 'me' && <Menu.Item key="1">Xem hồ sơ</Menu.Item>
                            }
                            <Menu.Item key="2">Homestay sở hữu</Menu.Item>
                            <Menu.Item key="3">Homestay chia sẻ</Menu.Item>
                            {
                                this.props.me && this.props.me.user_id === 10001 && <Menu.Item key="4">Admin - QLND</Menu.Item>
                            }
                            {
                                this.props.me && this.props.me.user_id === 10001 && <Menu.Item key="5">Admin - QLHS</Menu.Item>

                            }
                        </Menu>
                    </div>
                    <div style={{ width: 'calc(100% - 280px)' }}>
                        {
                            this.getKeys() === 1 && <ProfileUpdate
                                initialInfo={profile}
                                {...this.props}
                                me={me}
                                getUpdatedInfo={this.getUpdatedInfo.bind(this)}
                            />
                        }
                        {
                            this.getKeys() === 2 && <OwnHomestays
                                userId={profile ? profile.id : null}
                            />
                        }
                        {
                            this.getKeys() === 3 && <SharePosts
                                myId={this.props.match.params.id}
                                {...this.props}
                            />
                        }
                        {
                            this.getKeys() === 4 && <UserManagement {...this.props} />
                        }
                        {
                            this.getKeys() === 5 && <HomestayManagement {...this.props} />
                        }

                    </div>

                </Col>
                <Col sm={1} md={4}>
                </Col>
            </Row>

        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profileReducer.profile,
        me: state.authReducer.user
    }
}

const mapDispatchToProps = {
    updateProfileRequest,
    getProfileRequest
}
export default Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

