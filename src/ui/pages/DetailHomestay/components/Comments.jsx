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
        return (
            <div style={{ width: '100%', marginTop: '35px' }}>
                <div style={{ width: '100%', fontSize: '20px', fontWeight: '600', marginBottom: '30px' }}>
                    Đánh giá
                </div>
                <div className='comment-popover-see-all'>
                    <div style={{ fontWeight: '600' }}>
                        Xem tất cả bình luận ({numberOfComments})
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

