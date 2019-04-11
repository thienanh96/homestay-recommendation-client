import React from "react";

import {
    List, Avatar, Button, Skeleton,
} from 'antd';
import { connect } from "react-redux";
import {getListProfileRequest} from '../../../../store/actions/profileAction'
import '../index.css'
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

class UserManagement extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    }

    componentDidMount() {
        this.props.getListProfileRequest(8,0)
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

    render() {
        const { initLoading, loading, list } = this.state;
        const {listProfiles = {dt: [],total: 0},startGetListProfileRequest = true} = this.props
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
            <List
                className="demo-loadmore-list"
                loading={startGetListProfileRequest}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={listProfiles.dt}
                renderItem={item => (
                    <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                        <Skeleton avatar title={false} loading={startGetListProfileRequest} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href="https://ant.design">{item.user_name}</a>}
                                description={item.join_date}
                            />
                            <div>content</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
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
    getListProfileRequest
}
export default UserManagement = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserManagement);
