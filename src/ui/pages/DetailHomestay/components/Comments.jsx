import React from "react";
import { Row, Col, Avatar, Button, Input, List, Comment, Icon } from 'antd'
import '../index.css'
const TextArea = Input.TextArea


export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentComment: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        let typeHeader = nextProps.typeHeader;
        if (!typeHeader) return;
        return this.setState({
            typeHeader
        })
    }

    onTypingComment(e) {
        const text = e.target.value
        if (text && text.trim() !== '') {
            this.setState({
                contentComment: text
            })
        }
    }

    render() {
        const { numberOfComments, myAvatarUrl, dataComment, onPressEnterComment } = this.props
        const countPositive = dataComment.filter(el => el.sentiment === 1).length
        const countNegative = dataComment.filter(el => el.sentiment === 2).length
        return (
            <div style={{ width: '100%', marginTop: '35px' }}>
                <div style={{ width: '100%', fontSize: '20px', fontWeight: '600', marginBottom: '30px' }}>
                    Đánh giá
                </div>
                <div className='comment-popover-see-all'>
                    <div style={{ fontWeight: '600' }}>
                        Xem tất cả bình luận ({numberOfComments})
                    </div>
                    <div style={{ fontWeight: '600', display: 'flex' }}>
                        <div style={{marginRight: '10px'}}>{countPositive} tích cực</div><Icon style={{ color: 'green', fontSize: '23px', marginRight: '10px'}} type="smile" />
                        <div style={{marginRight: '10px'}}>{countNegative} tiêu cực</div><Icon style={{ color: 'red', fontSize: '23px'}} type="frown" />
                    </div>
                </div>
                <div className='comment-popover-type-comment'>
                    <div style={{ height: '100%', width: '100%' }}>
                        <div style={{ height: '100%', width: '48px', float: 'left' }}>
                            <img style={{ borderRadius: '50%' }} width='48px' height='48px' alt='' src={myAvatarUrl}></img>
                        </div>
                        <div style={{ height: '100%', width: 'calc(100% - 58px)', float: 'left', marginLeft: '10px' }}>
                            <TextArea
                                onChange={this.onTypingComment.bind(this)}
                                autosize
                                placeholder='Viết bình luận của bạn...'
                                style={{ border: 'none', borderRadius: '8px' }}
                                onKeyPress={e => onPressEnterComment(e, this.state.contentComment)} />
                        </div>
                    </div>
                </div>
                <div className='comment-popover-list-comments-div'>
                    <List
                        className="comment-popover-list-comments-list"
                        header={null}
                        itemLayout="horizontal"
                        dataSource={dataComment}
                        renderItem={item => {
                            console.log("TCL: Comments -> render -> item", item)

                            return (
                                <Comment
                                    // actions={item.actions}
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                    datetime={<div style={{ display: 'flex' }}><div style={{ fontWeight: 'normal' }}>{item.datetime}</div><div>{item.sentiment === 1 ? (<Icon style={{ color: 'green', fontSize: '20px', marginTop: '-3px', marginLeft: '10px' }} type="smile" />) : (item.sentiment === 0 ? (<Icon style={{ color: 'black', fontSize: '20px', marginTop: '-3px', marginLeft: '10px' }} type="meh" />) : (<Icon style={{ color: 'red', fontSize: '20px', marginTop: '-3px', marginLeft: '10px' }} type="frown" />))}</div></div>}
                                />
                            )
                        }}
                    />
                </div>
            </div>
        );
    }
}

