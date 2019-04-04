import React, { Component } from "react";
import { Form, Input, message, Modal, Select, Tabs } from "antd";
import "../index.css";
// import UploadImages from '../../components/upload-images/index'
import moment from "moment";
import FirstModal from './FirstModal'
import SecondModal from './SecondModal'
import ThirdModal from './ThirdModal'
import ForthModal from './ForthModal'
const TabPane = Tabs.TabPane;

class UpdateTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            firstData: {},
            secondData: {},
            thirdData: {},
            forthData: {},
            images: ''
        };
    }

    onChangeTabs() {

    }

    handleOkModal() {
        this.setState({
            isLoading: true
        });
        const finalData = this.convertToFinalData(this.state)
    }

    handleCancel() {
        this.props.close()
    }

    validateData(finalData) {
        for (let value of Object.values(finalData)) {
            console.log("TCL: UpdateTabs -> validateData -> key", value)
            if (!value) return false
        }
        return true
    }

    convertToFinalData(rawData) {
        const { firstData, secondData, thirdData, forthData, images } = this.state
        let finalData = {}
        finalData = { ...firstData, name: firstData.title }
        delete finalData.title
        let priceDetail = {
            data: [
                {
                    "Thứ hai - Thứ năm": secondData.mondayToThursday ? secondData.mondayToThursday + 'đ' : 0 + 'đ',
                },
                {
                    "Thứ sáu - Chủ nhật": secondData.firdayToSunday ? secondData.firdayToSunday + 'đ' : 0 + 'đ'
                },
                {
                    "Phí khách tăng thêm": secondData.extraPrice ? secondData.extraPrice + 'đ' : 0 + 'đ',
                },
                {
                    "Số đêm tối thiểu": secondData.minCountNight ? secondData.minCountNight + 'đêm' : 0 + ' đêm',
                },
                {
                    "Chính sách hủy": secondData.cancelPolicy ? secondData.cancelPolicy : 'Không có'
                }
            ]
        }
        let amenity = {
            data: [
                {
                    "Phòng ngủ": [`Tối đa ${thirdData.maxTourist ? thirdData.maxTourist : 0} khách`, `${thirdData.countRoom ? thirdData.countRoom : 0} phòng ngủ`, `${thirdData.countBed ? thirdData.countBed : 0} giường`]
                },
                {
                    "Phòng tắm": [`${thirdData.countBadroom ? thirdData.countBadroom : 0} phòng tắm`]
                },
                {
                    "Cho gia đình": thirdData.forFamily ? thirdData.forFamily : ['Không có']
                },
                {
                    "Tiện ích bếp": thirdData.kitchen ? thirdData.kitchen : ['Không có']
                },
                {
                    "Hoạt động giải trí": thirdData.entertainment ? thirdData.entertainment : ['Không có']
                },
                {
                    "Tiện ích phòng": thirdData.roomAmenity ? thirdData.roomAmenity : ['Không có']
                },
                {
                    "Tiện ích": thirdData.generalAmenity ? thirdData.generalAmenity : ['Không có']
                }
            ]
        }
        let amenityAround = {
            data: [
                {
                    "Ẩm thực": forthData.cuisine ? forthData.cuisine : ['Không có']
                },
                {
                    "Mua sắm": forthData.shopping ? forthData.shopping : ['Không có']
                },
                {
                    "Giao thông": forthData.transport ? forthData.transport : ['Không có']
                },
                {
                    "Giải trí": forthData.entertainment ? forthData.entertainment : ['Không có']
                },
                {
                    "Cơ quan ban ngành": forthData.office ? forthData.office : ['Không có']
                }
            ]
        }
        finalData = { ...finalData, main_price: secondData.mondayToThursday ? secondData.mondayToThursday : 0, price_detail: priceDetail, amenities: amenity, amenities_around: amenityAround, images: images }

        const validateResult = this.validateData(finalData)
        if (!validateResult) {
            this.setState({
                isLoading: false
            })
            return message.error('Thông tin không hợp lệ!')
        }
        return this.props.getData(finalData)
    }

    getValuesFromFirstModal(values) {
        this.setState({
            firstData: values
        })
    }

    getValuesFromSecondModal(values) {
        this.setState({
            secondData: values
        })
    }

    getValuesFromThirdModal(values) {
        this.setState({
            thirdData: values
        })
    }

    getValuesFromForthModal(values) {
        this.setState({
            forthData: values
        })
    }

    render() {
        const { listCity } = this.props
        return (
            <Modal
                title="Cập nhật Homestay của bạn"
                visible={true}
                onOk={this.handleOkModal.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                okText={this.state.submitButtonText}
                confirmLoading={this.state.isLoading}
                closable={true}
                width="50%"
                centered={true}
            >
                <Tabs defaultActiveKey="1" onChange={this.onChangeTabs.bind(this)}>
                    <TabPane tab="Thông tin chung" key="1">
                        <FirstModal
                            listCity={listCity}
                            getValuesFromFirstModal={this.getValuesFromFirstModal.bind(this)}
                        />
                    </TabPane>
                    <TabPane tab="Giá" key="2">
                        <SecondModal
                            getValuesFromSecondModal={this.getValuesFromSecondModal.bind(this)}
                        />
                    </TabPane>
                    <TabPane tab="Tiện nghi" key="3">\
                    <ThirdModal
                            getValuesFromThirdModal={this.getValuesFromThirdModal.bind(this)}
                        />
                    </TabPane>
                    <TabPane tab="Tiện nghi xung quanh và ảnh" key="4">\
                    <ForthModal
                            getValuesFromForthModal={this.getValuesFromForthModal.bind(this)}
                            getImageURL={(images) => {
                                this.setState({
                                    images: images.join(',')
                                })
                            }}
                        />
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }

}

export default UpdateTabs
