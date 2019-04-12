import React from "react";
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, List, Pagination, message
} from 'antd';
import { getHomestayRequest } from '../../../../store/actions/homestayAction'
import { connect } from "react-redux";
import CardHomestay from '../../../commons/components/HomestayCard'
import SharePost from '../../Community/components/SharePost'
import { getPostsRequest } from '../../../../store/actions/communityAction'
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

    render() {
        const { totalPosts, posts, meRate = null } = this.props
        return (
            <div style={{ width: '100%', marginTop: '30px', padding: '15px' }}>
                <div style={{ width: '100%', }}>
                    {
                        posts && Array.isArray(posts) && posts.map((post = {}) => {
                            if (!post || (post && !post.homestay)) {
                                return null
                            }
                            let images = []
                            if (post.homestay.homestay_id) {
                                images = post.homestay.images.split('$')
                            }
                            return (
                                <SharePost
                                    content={post.content}
                                    avatar={post.user ? post.user.avatar : null}
                                    username={post.user ? post.user.user_name : null}
                                    datePost={post.created_at}
                                    homestay={post.homestay}
                                    countLike={post.count_like}
                                    meRate={meRate}
                                    customStyle={{ marginBottom: '50px' }}
                                    imageCovers={images}
                                    hasAction={true}
                                    onClickDelete={e => this.onClickDelete(post.post_id)}
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
    deletePostsRequest
}
export default SharePosts = connect(
    mapStateToProps,
    mapDispatchToProps
)(SharePosts);
