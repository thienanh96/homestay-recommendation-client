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
            firstData: null,
            secondData: null,
            thirdData: null,
            forthData: null,
            images: null
        };
    }

    onChangeTabs() {

    }

    handleOkModal() {
        this.setState({
            isLoading: false
        });
        const finalData = this.convertToFinalData(this.state)
    }

    handleCancel() {
        this.props.close()
    }

    validateData(finalData) {
        for (let value of Object.values(finalData)) {
            if (!value) return false
        }
        return true
    }

    convertToFinalData(rawData) {
        const { firstData, secondData, thirdData, forthData, images } = this.state
        console.log("TCL: UpdateTabs -> convertToFinalData -> firstData, secondData, thirdData, forthData", firstData, secondData, thirdData, forthData)
        let finalData = {}
        finalData = firstData ? { ...firstData, name: firstData.name } : null
        let priceDetail = secondData ? {
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
        } : null
        let amenity = thirdData ? {
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
        } : null
        let amenityAround = forthData ? {
            data: [
                {
                    "Ẩm thực": forthData.cuisine ? forthData.cuisine : 'Không có'
                },
                {
                    "Mua sắm": forthData.shopping ? forthData.shopping : 'Không có'
                },
                {
                    "Giao thông": forthData.transport ? forthData.transport : 'Không có'
                },
                {
                    "Giải trí": forthData.entertainment ? forthData.entertainment : 'Không có'
                },
                {
                    "Cơ quan ban ngành": forthData.office ? forthData.office : 'Không có'
                }
            ]
        } : null
        finalData = { ...finalData, main_price: secondData ? (secondData.mondayToThursday ? secondData.mondayToThursday : 0) : null, price_detail: priceDetail, amenities: amenity, amenities_around: amenityAround, images }
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
        console.log("TCL: UpdateTabs -> getValuesFromFirstModal -> values", values)
        this.setState({
            firstData: values
        })
    }

    getValuesFromSecondModal(values) {
        console.log("TCL: UpdateTabs -> getValuesFromSecondModal -> values", values)
        this.setState({
            secondData: values
        })
    }

    getValuesFromThirdModal(values) {
        console.log("TCL: UpdateTabs -> getValuesFromThirdModal -> values", values)
        this.setState({
            thirdData: values
        })
    }

    getValuesFromForthModal(values) {
        console.log("TCL: UpdateTabs -> getValuesFromForthModal -> values", values)
        this.setState({
            forthData: values
        })
    }

    render() {
        const { listCity, currentHomestay } = this.props
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
                    <TabPane tab="Thông tin chung" key="1" forceRender={true}>
                        <FirstModal
                            listCity={listCity}
                            currentHomestay={currentHomestay}
                            getValuesFromFirstModal={this.getValuesFromFirstModal.bind(this)}
                        />
                    </TabPane>
                    <TabPane tab="Giá" key="2" forceRender={true}>
                        <SecondModal
                            currentHomestay={currentHomestay}
                            getValuesFromSecondModal={this.getValuesFromSecondModal.bind(this)}
                        />
                    </TabPane>
                    <TabPane tab="Tiện nghi" key="3" forceRender={true}>
                    <ThirdModal
                            currentHomestay={currentHomestay}
                            getValuesFromThirdModal={this.getValuesFromThirdModal.bind(this)}
                        />
                    </TabPane>
                    <TabPane tab="Tiện nghi xung quanh và ảnh" key="4" forceRender={true}>
                    <ForthModal
                            currentHomestay={currentHomestay}
                            getValuesFromForthModal={this.getValuesFromForthModal.bind(this)}
                            getImageURL={(images) => {
                                console.log("TCL: UpdateTabs -> render -> images", images)
                                this.setState({
                                    images: images.join('$')
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
