import React from "react";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Input,
    Row,
    Col,
    Dropdown,
    Avatar,
    Select,
    Affix
} from "antd";
import { NavLink } from "react-router-dom";
import ModalLogin from "./pages/login";
import { connect } from "react-redux";
import { logoutRequest } from "../store/actions/authAction";
// import { IconLogo } from "./commons/icons";
// import SearchBar from "./SearchBar";
const { Header } = Layout;

class MenuAccount extends React.Component {
    render() {
        let { logoutRequest = () => { } } = this.props;
        return (
            <Menu>
                <Menu.Item key="0">
                    <a href="#">Quản lý tài khoản</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="#">Thay đổi mật khẩu</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={logoutRequest} key="3">
                    Đăng xuất
        </Menu.Item>
            </Menu>
        );
    }
}
MenuAccount = connect(
    null,
    { logoutRequest }
)(MenuAccount);
const menu = props => <MenuAccount {...props} />;
class HeaderWeb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalLogin: false
        };
    }
    showModalLogin = () => {
        this.setState({ showModalLogin: true });
    };
    closeModalLogin = () => {
        this.setState({ showModalLogin: false });
    };

    render() {
        return (
            <React.Fragment >
                <ModalLogin
                    close={this.closeModalLogin}
                    show={this.state.showModalLogin}
                />
                <Affix>
                    <Header className="nav-header" style={{ marginBottom: '20px' }}>
                        <Row>
                            <Col sm={0} md={3}>
                            </Col>
                            <Col sm={24} md={18}>
                                {
                                    this.props.showStatusHeader && <Row>
                                        <Col md={12} sm={6}>
                                            <div className="search-logo">
                                                <div className="logo">
                                                    <div>HomestayHub</div>
                                                </div>
                                                {/* <SearchBar /> */}
                                            </div>
                                        </Col>
                                        <Col md={12} sm={18} style={{ height: '64px' }}>
                                            <Menu
                                                //   theme="dark"
                                                mode="horizontal"
                                                defaultSelectedKeys={["1"]}
                                                style={{ lineHeight: "50px" }}
                                            >
                                                <Menu.Item key="1">
                                                    <NavLink to="/">Trang chủ</NavLink>
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                    <NavLink to="/homestays">Homestay</NavLink>
                                                </Menu.Item>
                                                <Menu.Item key="3">
                                                    <NavLink to="/community">Cộng đồng</NavLink>
                                                </Menu.Item>
                                                <Menu.Item key="4">
                                                    <NavLink to="/profile?type=update-profile">Tài khoản</NavLink>
                                                </Menu.Item>
                                                {this.props.isAuthenticated ? (
                                                    <React.Fragment>

                                                        <Avatar
                                                            style={{ marginLeft: "20px" }}
                                                            size={40}
                                                            src={this.props.user.avatar}
                                                            icon="user"
                                                        />
                                                        <div style={{ float: 'right' }}>{this.props.user.username}</div>
                                                        <Dropdown {...this.props} overlay={menu} trigger={["click"]}>
                                                            <a className="ant-dropdown-link" href="#">
                                                                <Icon type="down" />
                                                            </a>
                                                        </Dropdown>


                                                        ,
                                                </React.Fragment>
                                                ) : (
                                                        <Button
                                                            style={{ marginLeft: "20px" }}
                                                            onClick={this.showModalLogin}
                                                        >
                                                            Đăng nhập
                                    </Button>
                                                    )}
                                            </Menu>
                                        </Col>
                                    </Row>
                                }

                            </Col>
                            <Col sm={0} md={3}>
                            </Col>


                        </Row>

                    </Header>
                </Affix>
            </React.Fragment>
        );
    }
}

export default connect(state => {
    return {
        isAuthenticated: state.authReducer.user ? state.authReducer.user.user_id : false,
        user: state.authReducer.user,
        showStatusHeader: state.guiChangeReducer.showHeaderStatus
    };
}, null)(HeaderWeb);
