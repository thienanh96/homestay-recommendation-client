import React from "react";
import './index.css'
import { Icon, Modal, Input } from 'antd'
import { connect } from "react-redux";
import { getMyRateHomestayRequest } from '../../../../store/actions/rateHomestayAction'
const { TextArea } = Input;

export default class RateHomestay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleShareModal: false,
            value: ''
        }
    }

    handleShareOk(e) {
        const {value} = this.state
        this.props.onClickShare(e,value)
        this.setState({
            visibleShareModal: false
        })
    }
    openShareModal(e) {
        this.setState({
            visibleShareModal: true
        })
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        })
    }


    handleShareCancel() {
        this.setState({
            visibleShareModal: false
        })
    }

    render() {
        const { meRate, customStyle, countLike, countDislike, onClickLike, onClickDislike, countShare } = this.props
        return (
            <div>
                <Modal
                    title={<div style={{ fontWeight: '600' }}>Nhập nhận xét của bạn</div>}
                    visible={this.state.visibleShareModal}
                    onOk={this.handleShareOk.bind(this)}
                    onCancel={this.handleShareCancel.bind(this)}
                >
                    <TextArea onChange={this.handleChange.bind(this)}  rows={4} autosize />
                </Modal>
                <div className="likes-detail-homestay-card" style={customStyle}>
                    <Icon theme={meRate === 'like' ? 'filled' : ''} style={{ float: 'left', fontSize: '25px' }} type="like" onClick={onClickLike} />
                    <div style={{ float: 'left', marginLeft: '5px' }}>{countLike} </div>
                    <Icon theme={meRate === 'dislike' ? 'filled' : ''} style={{ float: 'left', fontSize: '25px', marginLeft: '20px' }} type="dislike" onClick={onClickDislike} />
                    <div style={{ float: 'left', marginLeft: '5px' }}>{countDislike} </div>
                    <Icon style={{ float: 'left', fontSize: '25px', marginLeft: '20px' }} type="share-alt" onClick={this.openShareModal.bind(this)} />
                    <div style={{ float: 'left', marginLeft: '5px' }} onClick={this.openShareModal.bind(this)}>{countShare} </div>
                </div>
            </div>

        )
    }


}
