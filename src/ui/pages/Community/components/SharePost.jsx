import React from "react";
import { Row, Rate, Skeleton, Icon, Col, Breadcrumb, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import ShowMore from 'react-show-more';
// import "./style.css";
import '../index.css'
import { resolve } from "path";
import { reject } from "q";
import GridGallery from './GridGallery'
import RateHomestay from '../../../commons/components/RateHomestay'
import moment from 'moment'
import 'moment/locale/vi';
moment.locale('vi')

const imageCovers = [
    'https://tour.dulichvietnam.com.vn/uploads/tour/thung-lung-muong-hoa.jpg.jpg',
    'https://fantasea.vn/wp-content/uploads/2018/10/sapa.jpg',
    'https://travel.com.vn/Images/destination/tf_160905050651_358438.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwNJrQ4prjV9NgGiTEITJ2yfowkj-yBBuuPGsZTeGd3ZnnUeNIxQ'
]

export default class SharePost extends React.Component {

    onClickLike(e, homestayID, userID) {
        console.log('hhhh')
        this.props.rateDetailHomestay(homestayID, userID, 1)
    }

    onClickDislike(e, homestayID, userID) {
        this.props.rateDetailHomestay(homestayID, userID, 2)

    }

    render() {
        const { content, avatar, username, datePost, homestay = {}, countLike, customStyle, imageCovers, hasAction, onClickDelete, ratePost, meLikePost } = this.props;
        console.log("TCL: SharePost -> render -> datePost", datePost)
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', ...customStyle }}>
                <div style={{ width: '64px', height: '64px' }}>
                    <img style={{ width: '100%', borderRadius: '50%' }} alt='' src={avatar ? avatar : 'https://www.w3schools.com/howto/img_avatar2.png'}></img>
                </div>
                <div style={{ width: 'calc(100% - 160px)' }}>
                    <div style={{ height: '50px', width: '100%' }}>
                        <div style={{ width: 'calc(100% - 160px)', height: '100%', float: 'left' }}>
                            <div className='share-post-userinfo'>
                                <div>
                                    <b><span>{username ? username : 'Ản danh'} </span> </b> đã chia sẻ một homestay
                                </div>
                            </div>
                            <div className='share-post-userinfo' style={{ color: 'grey' }}>
                                <div>
                                    <b><span>{
                                        moment(datePost).calendar()
                                    } </span> </b>
                                </div>
                            </div>
                        </div>
                        {
                            hasAction ? (
                                <div style={{ width: '160px', height: '100%', float: 'left', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Icon onClick={onClickDelete} style={{ fontSize: 24, color: 'red', float: 'right' }} type="delete" />
                                </div>
                            ) : (
                                    <div style={{ width: '160px', height: '100%', float: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ width: '80%', textAlign: 'center', fontSize: '16px' }}>
                                            {countLike} lượt thích
                                            </div>
                                        <div style={{ width: '20%', textAlign: 'center' }} onClick={ratePost}>
                                            {
                                                meLikePost === 0 && <Icon type="heart" style={{ fontSize: '32px',cursor: 'pointer' }} />
                                            }
                                            {
                                                meLikePost === 1 && <Icon type="heart" theme='filled' style={{ fontSize: '32px', cursor: 'pointer' }} />
                                            }

                                        </div>
                                    </div>

                                )
                        }



                    </div>
                    <div style={{ width: '100%' }}>
                        <div>
                            <ShowMore
                                lines={2}
                                more='Xem thêm'
                                less='Thu nhỏ'
                                anchorClass=''
                            >
                                {content}
                            </ShowMore>
                        </div>
                    </div>
                    <Link to={`/homestays/${homestay.homestay_id}`}>
                        <div style={{ width: '100%', border: '1px solid orange', borderRadius: '8px', padding: '20px', marginTop: '12px', color: 'black' }}>
                            <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div>
                                    {homestay.city ? homestay.city : 'Không rõ'} - {homestay.district ? homestay.district : 'Không rõ'}
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '40px', fontSize: '25px', fontWeight: '600', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <div>
                                    {homestay.name ? homestay.name : 'Không rõ'}
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '30px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: 'grey' }}>
                                <div>
                                    Từ {homestay.main_price ? homestay.main_price : 'Không rõ'}đ / đêm
                            </div>
                            </div>
                            <GridGallery
                                imageCovers={imageCovers}
                                customStyle={{ marginTop: '10px' }}
                            />
                            <div style={{ marginTop: '20px', width: '100%', color: 'grey', fontWeight: '600', marginBottom: '20px' }}>
                                <ShowMore
                                    lines={3}
                                    more='Xem thêm'
                                    less='Thu nhỏ'
                                    anchorClass='share-post-highlights'
                                >
                                    {homestay.highlight && homestay.highlight.split('$').join('. ')}
                                </ShowMore>
                            </div>
                            <div style={{ borderBottom: 'solid 1px orange', width: '50%' }} />
                            <div>
                                <RateHomestay
                                    homestayId={homestay.homestay_id}
                                    // onClickDislike
                                    // onClickLike
                                    countLike={homestay.likes ? homestay.likes : 0}
                                    countDislike={homestay.dislikes ? homestay.dislikes : 0}
                                    countShare={homestay.shares ? homestay.shares : 0}
                                />
                            </div>
                        </div>
                    </Link>

                </div>
            </div >
        );
    }
}