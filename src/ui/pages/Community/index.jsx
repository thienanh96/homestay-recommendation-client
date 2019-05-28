import React from "react";
import { post, get, puts } from "../../../client/index";
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
    Affix,
    Pagination
} from "antd";
import { connect } from "react-redux";
import { compose } from 'redux'
import './index.css'
import { getPostsRequest, ratePostRequest } from '../../../store/actions/communityAction'
import CardHomestay from '../../commons/components/HomestayCard'
import { changeStatusHeader } from '../../../store/actions/guiChangeAction'
import { getMyRateHomestayRequest } from '../../../store/actions/rateHomestayAction'
import { resolve } from "path";
import withSearch from '../WithSearch/index'
import SharePost from './components/SharePost'
import Filter from '../../commons/components/Filter'
import { reject } from "q";



class Community extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: null,
            currentPage: 1
        }
    }

    componentWillMount() {
        this.props.getPostsRequest('newest', 3, 0)
    }

    onChangePagination(page, pageSize) {
        this.setState({
            currentPage: page || 1
        })
        this.props.getPostsRequest(this.state.filter, 3, parseInt(pageSize * (page - 1)))
    }


    handleChangeFilter(value) {
        this.setState({
            filter: value,
            currentPage: 1
        })
        if (value === 'like') {
            this.props.getPostsRequest('like', 3, 0)
        }
        if (value === 'newest') {
            this.props.getPostsRequest('newest', 3, 0)
        }
        if (value === 'by-me') {
            this.props.getPostsRequest('by-me', 3, 0)
        }
    }

    ratePost(postId, currentMeLike) {
        console.log("TCL: Community -> ratePost -> currentMeLike", currentMeLike)
        let destMeLike = null
        if (currentMeLike === 0) {
            destMeLike = 1
        } else if (currentMeLike === 1) {
            destMeLike = 0
        }
        console.log("TCL: Community -> ratePost -> destMeLike", destMeLike)

        this.props.ratePostRequest(postId, null, null, destMeLike)
    }



    render() {
        const { totalPosts, posts = [], meRate = null } = this.props
        return (
            <div style={{ width: '100%', marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', height: '80px', alignItems: 'center' }}>
                    <Filter
                        handleChange={this.handleChangeFilter.bind(this)}
                    />
                </div>
                <div style={{ width: '100%', }}>
                    {
                        posts && Array.isArray(posts) && posts.map((post = { post: {}, me_like: 0 }) => {
                            let images = []
                            if (post.post.homestay.homestay_id) {
                                images = post.post.homestay.images.split('$')
                            }
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
                                    meLikePost={post.me_like}
                                    ratePost={e => this.ratePost(post.post.post_id, post.me_like)}
                                />
                            )
                        })
                    }

                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Pagination
                        defaultCurrent={1}
                        current={this.state.currentPage}
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
        posts: state.communityReducer.posts,
        totalPosts: state.communityReducer.totalPosts,
        meRate: state.rateHomestayReducer.meRate
    }
}

const mapDispatchToProps = {
    getPostsRequest,
    changeStatusHeader,
    getMyRateHomestayRequest,
    ratePostRequest
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps), withSearch
)(Community)

