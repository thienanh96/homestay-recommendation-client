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
    Pagination,
    message
} from "antd";
import { connect } from "react-redux";
import { compose } from 'redux'
import history from '../../../lib/history'
import './index.css'
import { getDetailHomestayRequest, rateDetailHomestay, getSimilarHomestayRequest, updateHomestayRequest } from '../../../store/actions/detailHomestayAction'
import SlideShow from '../../commons/components/SlideShow'
import { changeStatusHeader } from '../../../store/actions/guiChangeAction'
import { getCommentsRequest, createCommentRequest } from '../../../store/actions/commentAction'
import { resolve } from "path";
import SearchBanner from "../../commons/components/SearchBanner";
import ImageHomestay from '../../commons/components/ImageHomestay'
import Header from './components/Header'
import BoxHightlight from './components/BoxHightlight'
import Description from './components/Description'
import Amenity from './components/Amenity'
import AmenityAround from './components/AmenityAround'
import PriceRoom from './components/PriceRoom'
import Host from './components/Host'
import Comment from './components/Comments'
import SimilarHomestays from './components/SimilarHomestay'
import withSearch from '../WithSearch/index'
import { createPostsRequest } from '../../../store/actions/communityAction'
import { getHomestayRequest } from '../../../store/actions/homestayAction'

import { reject } from "q";
import Tabs from '../homestays/components/Tabs'


class DetailHomestay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: null,
            currentHomestayID: null,
            showModal: false
        }

        this.onClickLike = this.onClickLike.bind(this)
        this.onClickDislike = this.onClickDislike.bind(this)
    }

    componentWillMount() {
        const id = this.props.match.params.id
        const params = new URLSearchParams(this.props.location.search)
        if (id && !isNaN(id)) {
            this.setState({
                currentHomestayID: id
            })
            if (params.get('type-get') === 'admin') {
                this.props.getDetailHomestayRequest(parseInt(id), 'admin')
            } else {
                this.props.getDetailHomestayRequest(parseInt(id), null)
            }
            this.props.getCommentsRequest(id)
            this.props.getSimilarHomestayRequest(id)
        } else {
            this.props.history.push('/')
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }




    onChangePagination(page, pageSize) {
        let location = this.state.location;
        let newLocation = location.replace(/offset=\d+/i, 'offset=' + parseInt(pageSize * (page - 1)))
        this.props.getHomestayRequest(newLocation)
        this.props.history.push('/homestays' + newLocation)
        this.setState({
            location: newLocation
        })

    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.location.pathname !== nextProps.location.pathname
        ) {
            const id = nextProps.match.params.id
            if (id && !isNaN(id)) {
                this.setState({
                    currentHomestayID: id
                })
                this.props.getDetailHomestayRequest(parseInt(id))
                this.props.getCommentsRequest(id)
                this.props.getSimilarHomestayRequest(id)
            } else {
                this.props.history.push('/')
            }
        }
    }


    // onTypingComment(e) {
    //     const text = e.target.value
    //     if (text && text.trim() !== '') {
    //         this.setState({
    //             commentContent: text
    //         })
    //     }
    // }

    onPressEnterComment(e, content) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.target.value = null
            const pm = new Promise((resolve, reject) => {
                this.props.createCommentRequest(this.state.currentHomestayID, content, resolve, reject)
            })
            pm.then((comment) => {
                message.success('Đăng bình luận thành công!')
            }, () => {
                message.error('Đăng bình luận thất bại!')
            })
        }
    }

    toComments(dataRaw) {
        console.log("TCL: DetailHomestay -> toComments -> dataRaw", dataRaw)
        return dataRaw.map(raw => {
            return {
                author: (
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "black" }}>
                        {raw.author}
                    </div>
                ),
                avatar: raw.avatar,
                content: <p>{raw.content}</p>,
                sentiment: parseInt(raw.sentiment),
                datetime: (
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "black" }}>
                        {raw.datetime}
                    </div>
                )
            };
        });
    }

    onClickLike(e, homestayID, userID) {
        this.props.rateDetailHomestay(homestayID, userID, 1)
    }

    onClickDislike(e, homestayID, userID) {
        this.props.rateDetailHomestay(homestayID, userID, 2)
    }

    onClickShare(e, content, homestayID, userID) {
        const pm = new Promise((resolve, reject) => {
            this.props.createPostsRequest(homestayID, content, resolve, reject)
        })
        pm.then(() => {
            message.success('Chia sẻ thành công!')
        }, () => {
            message.error('Chia sẻ thất bại!')
        }).catch(err => {
            message.error('Chia sẻ thất bại!')
        })
    }

    getNewHomestay(newHomestay) {
        console.log("TCL: DetailHomestay -> getNewHomestay -> newHomestay", newHomestay)
        if (newHomestay) {
            const pm = new Promise((resolve, reject) => {
                this.props.updateHomestayRequest(this.state.currentHomestayID, newHomestay, resolve, reject)
            })
            pm.then(data => {
                if (data && data['homestay_id']) {
                    message.success('Cập nhật homestay thành công!')
                    // this.props.createHomestaySimilarityRequest(data['homestay_id'])
                    return this.setState({ showModal: false })
                } else {
                    message.error('Cập nhật homestay thất bại')
                }
            }, err => {
                return message.error('Cập nhật homestay thất bại')
            }).catch(err => {

                return message.error('Cập nhật homestay thất bại')
            })

        }
    }




    render() {
        const { homestay_info, host_info, me_rate } = this.props.detailHomestay
        const similarHomestays = this.props.similarHomestays
        const { myProfile = { username: null, avatar: null, user_id: null } } = this.props
        const { username, avatar, user_id } = myProfile
        const comments = this.props.comments
        if (!homestay_info) return null
        const dataRaw = comments.map(comment => {
            return {
                author: comment.user.user_name,
                avatar: comment.user.avatar,
                content: comment.content,
                datetime: comment.user.join_date,
                sentiment: comment.sentiment
            }
        })
        let images = []
        const dataComment = this.toComments(dataRaw);
        if (homestay_info.homestay_id) {
            images = homestay_info.images ? homestay_info.images.split('$') : []
        }
        console.log('maimes: ', images.length)
        return (
            <div style={{ width: '100%', marginTop: '20px' }}>
                <Row>
                    <SlideShow
                        contentSlides={images.map((imageUrl, index) => <ImageHomestay
                            imageUrl={imageUrl}
                        />)}
                        initialSlideToShow={images.length > 3 ? 3 : 1}
                    />
                </Row>
                {
                    this.state.showModal && <Tabs
                        listCity={['Hà Nội']}
                        getData={this.getNewHomestay.bind(this)}
                        close={() => { this.setState({ showModal: false }) }}
                        currentHomestay={homestay_info}
                    />
                }
                <Row gutter={30} style={{ marginTop: '20px' }}>
                    <Col sm={24} md={17}>
                        <Header
                            title={homestay_info.name ? homestay_info.name : 'Homestay '}
                            homestayId={homestay_info.homestay_id}
                            countLike={homestay_info.likes ? homestay_info.likes : 0}
                            countDislike={homestay_info.dislikes ? homestay_info.dislikes : 0}
                            city={homestay_info.city ? homestay_info.city : 'Chưa rõ'}
                            district={homestay_info.district ? homestay_info.district : 'Chưa rõ'}
                            customStyle
                            onClickLike={e => this.onClickLike(e, homestay_info.homestay_id, user_id)}
                            onClickDislike={e => this.onClickDislike(e, homestay_info.homestay_id, user_id)}
                            onClickShare={(e, content) => this.onClickShare(e, content, homestay_info.homestay_id, user_id)}
                            meRate={me_rate}
                            countShare={homestay_info.shares ? homestay_info.shares : 0}
                            updateHomestayNode={user_id === (host_info ? host_info.id : '') ? <Icon onClick={e => { this.setState({ showModal: true }) }} style={{ fontSize: 28 }} type="edit" /> : null}
                        />
                        <div>
                            <BoxHightlight
                                content={homestay_info.highlight ? homestay_info.highlight : 'Chưa rõ'}
                            />
                        </div>
                        <div>
                            <Description
                                content={homestay_info.descriptions ? homestay_info.descriptions : 'Chưa rõ'}
                            />
                        </div>
                        <div>
                            <Amenity
                                content={homestay_info.amenities ? homestay_info.amenities : {}}
                            />
                        </div>
                        <div>
                            <PriceRoom
                                content={homestay_info.price_detail ? homestay_info.price_detail : {}}
                            />
                        </div>
                        <div>
                            <AmenityAround
                                content={homestay_info.amenities_around ? homestay_info.amenities_around : {}}
                            />
                        </div>
                        <div>
                            <Host
                                username={host_info ? host_info.user_name : 'Ẩn danh'}
                                avatar={host_info ? host_info.avatar : 'https://www.w3schools.com/howto/img_avatar.png'}
                                joinDate={host_info ? host_info.join_date : 'Chưa xác định'}
                            />
                        </div>
                        <div>
                            <Comment
                                myAvatarUrl={
                                    avatar ? avatar : "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                                }
                                numberOfComments={20}
                                customStyle={{ width: "800px", position: "absolute" }}
                                dataComment={dataComment}
                                onPressEnterComment={this.onPressEnterComment.bind(this)}
                            />
                        </div>
                    </Col>

                    <Col sm={24} md={7}>
                        {
                            similarHomestays && <SimilarHomestays
                                homestays={similarHomestays}
                                currentHomestayID={this.props.match.params.id}
                            />
                        }

                    </Col>
                </Row>
            </div>

        )
    }
}

function mapStateToProps(state) {
    console.log("TCL: mapStateToProps -> state", state)
    return {
        detailHomestay: state.detailHomestayReducer.detailHomestay,
        comments: state.commentsReducer.comments,
        myProfile: state.authReducer.user,
        similarHomestays: state.detailHomestayReducer.similarHomestays
    }
}

const mapDispatchToProps = {
    getDetailHomestayRequest,
    rateDetailHomestay,
    getCommentsRequest,
    changeStatusHeader,
    createCommentRequest,
    getSimilarHomestayRequest,
    createPostsRequest,
    updateHomestayRequest
}
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(withSearch(DetailHomestay));

export default compose(
    connect(mapStateToProps, mapDispatchToProps), withSearch
)(DetailHomestay)

