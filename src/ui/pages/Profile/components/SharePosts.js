import React from "react";
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, List, Pagination, message
} from 'antd';
import { getHomestayRequest } from '../../../../store/actions/homestayAction'
import { connect } from "react-redux";
import CardHomestay from '../../../commons/components/HomestayCard'
import SharePost from '../../Community/components/SharePost'
import { getPostsRequest, ratePostRequest } from '../../../../store/actions/communityAction'
import { deletePostsRequest } from '../../../../store/actions/communityAction'
import { resolve, reject } from "q";


class SharePosts extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log("TCL: SharePosts -> componentWillReceiveProps -> nextProps", nextProps)
        console.log("TCL: SharePosts -> componentWillReceiveProps -> this.props", this.props)
        // console.log("TCL: SharePosts -> componentWillReceiveProps -> nextProps", nextProps)
        // if (nextProps.posts && this.props.posts && nextProps.posts!== this.props.posts) {
        //     this.props.getPostsRequest(nextProps.myId, 3, 0)

        // }
        if (
            this.props.location.pathname !== nextProps.location.pathname
        ) {
            this.props.getPostsRequest(nextProps.myId, 3, 0)
        }
    }

    componentDidMount() {
        const myId = this.props.myId
        if (myId === 'me') {
            this.props.getPostsRequest('by-me', 3, 0)
        } else if (!isNaN(myId)) {
            this.props.getPostsRequest(myId, 3, 0)
        }
    }

    onChangePagination(page, pageSize) {
        this.props.getPostsRequest('by-me', 3, parseInt(pageSize * (page - 1)))
    }

    onClickDelete(postId) {
        const pm = new Promise((resolve, reject) => {
            this.props.deletePostsRequest(postId, resolve, reject)
        })
        pm.then(postId => {
            console.log("TCL: SharePosts -> onClickDelete -> postId", postId)
            message.success('Xóa thành công!')
        }, err => {
            message.error('Xóa thất bại!')
        })

    }

    ratePost(postId) {
        this.props.ratePostRequest(postId, null, null)
    }

    render() {
        const { totalPosts, posts = { post: [], me_like: 0 }, meRate = null, me = {} } = this.props
        return (
            <div style={{ width: '100%', marginTop: '30px', padding: '15px' }}>
                <div style={{ width: '100%', }}>
                    {
                        posts && Array.isArray(posts) && posts.map((post = { post: {}, me_like: 0 }) => {
                            // post = post.post
                            let images = []
                            if (post.post.homestay.homestay_id) {
                                images = post.post.homestay.images.split('$')
                            }
                            let hasAction = me.user_id && me.user_id + '' === (post.post.user ? post.post.user.id + '' : '');
                            console.log('loggg: ',hasAction)
                            return (
                                <SharePost
                                    content={post.post.content}
                                    avatar={post.post.user ? post.post.user.avatar : null}
                                    username={post.post.user ? post.post.user.user_name : null}
                                    datePost={post.post.created_at}
                                    homestay={post.post.homestay}
                                    countLike={post.post.count_like}
                                    meRate={meRate}
                                    customStyle={{ marginBottom: '50px' }}
                                    imageCovers={images}
                                    hasAction={hasAction}
                                    onClickDelete={e => this.onClickDelete(post.post.post_id)}
                                    meLikePost={post.me_like}
                                    ratePost={e => this.ratePost(post.post.post_id)}
                                />
                            )
                        })
                    }

                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Pagination
                        defaultCurrent={1}
                        total={totalPosts}
                        pageSize={3}
                        onChange={this.onChangePagination.bind(this)}
                    />
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        me: state.authReducer.user,
        posts: state.communityReducer.posts,
        totalPosts: state.communityReducer.totalPosts,
    }
}

const mapDispatchToProps = {
    getPostsRequest,
    deletePostsRequest,
    ratePostRequest
}
export default SharePosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(SharePosts);
