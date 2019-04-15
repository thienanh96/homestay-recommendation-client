import React, { Component } from "react";
import { Form, Input, message, Modal, Select, Checkbox } from "antd";
import "../index.css";
// import UploadImages from '../../components/upload-images/index'
import moment from "moment";
const CheckboxGroup = Checkbox.Group;

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const regexCheckUTCTime = /\b[0-9]{2}-[0-9]{2}-[0-9]{4}\s+[0-9]{2}:[0-9]{2}:[0-9]{2}\b/

const forFamilyOptions = ['Không hút thuốc', 'Đệm bổ sung', 'Phù hợp với trẻ nhỏ'];
const kitchenOptions = ['Bếp điện', 'Lò vi sóng', 'Tủ lạnh', 'Bếp ga']
const entertainmentOptions = ['BBQ', 'Cảnh quan đẹp', 'Gần sân golf', 'Bể bơi', 'Hướng biển', 'Cho thú cưng', 'Câu cá']
const roomAmenityOptions = ['Ban công']
const generalAmenityOptions = ['Wifi', 'Máy giặt', 'Dầu gội,Dầu xả', 'Giấy vệ sinh', 'Giấy ăn', 'Nước khoáng', 'Khăn tắm', 'Kem đánh răng', 'Xà phòng tắm', 'Thang máy', 'Staircase', 'Thang bộ', 'Máy sấy']



class ThirdModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            submitButtonText: "Create",
            imagesURL: [],
        };
        this.getImageURL = this.getImageURL.bind(this);
    }


    componentDidMount() {
        if(!this.props.currentHomestay) return;
        const { amenities } = this.props.currentHomestay;
        let priceDetail = {}
        amenities.data.map(el => {
            priceDetail = {...priceDetail,...el}
        })
        if (priceDetail) {
			console.log("TCL: componentDidMount -> currentHomestay", priceDetail)
            this.props.form.setFieldsValue({
                maxTourist: priceDetail['Phòng ngủ'][0].split(' ').filter(el => !isNaN(el))[0],
                countRoom: priceDetail['Phòng ngủ'][1].split(' ').filter(el => !isNaN(el))[0],
                countBed: priceDetail['Phòng ngủ'][2].split(' ').filter(el => !isNaN(el))[0],
                countBadroom: priceDetail['Phòng tắm'][0].split(' ').filter(el => !isNaN(el))[0],
                forFamily: priceDetail['Cho gia đình'],
                kitchen: priceDetail['Tiện ích bếp'],
                entertainment: priceDetail['Hoạt động giải trí'],
                roomAmenity: priceDetail['Tiện ích phòng'],
                generalAmenity: priceDetail['Tiện ích'],
            });
            this.props.form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                return this.props.getValuesFromThirdModal(values)
            });
        }
    }

    // eraseData() {
    //     this.setState({
    //         imagesURL: []
    //     });
    //     this.props.form.setFieldsValue({
    //         name: null,
    //         city: null,
    //         district: null,
    //         main_price: null,
    //         price_detail: null,
    //         descriptions: null,
    //         highlight: null,
    //         amenities: null,
    //         amenities_around: null,
    //         images: null
    //     });
    // }

    onValuesChange() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            return this.props.getValuesFromThirdModal(values)
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 33 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };

        return (
            <Form onChange={this.onValuesChange.bind(this)}>
                <FormItem {...formItemLayout} label="Số khách tối đa">
                    {getFieldDecorator("maxTourist", {
                        rules: [
                            {
                                required: true,
                                message: "Không được bỏ trống"
                            },
                            {
                                pattern: /^[0-9]+$/g,
                                message: "Số khách tối đa phải là các chữ số"
                            }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Số phòng">
                    {getFieldDecorator("countRoom", {
                        rules: [
                            {
                                required: true,
                                message: "Không đuọc bỏ trống"
                            },
                            {
                                pattern: /^[0-9]+$/g,
                                message: "Số phòng phải là các chữ số"
                            }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Số giường">
                    {getFieldDecorator("countBed", {
                        rules: [
                            {
                                required: true,
                                message: "Không đuọc bỏ trống"
                            },
                            {
                                pattern: /^[0-9]+$/g,
                                message: "Số giường phải là các chữ số"
                            }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Số phòng tắm">
                    {getFieldDecorator("countBadroom", {
                        rules: [
                            {
                                required: true,
                                message: "Không đuọc bỏ trống"
                            },
                            {
                                pattern: /^[0-9]+$/g,
                                message: "Số phòng tắm phải là các chữ số"
                            }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Cho gia đình">
                    {getFieldDecorator("forFamily", {
                        rules: [
                            // {
                            //     required: true,
                            //     message: "Không đuọc bỏ trống"
                            // }
                        ]
                    })(
                        <CheckboxGroup options={forFamilyOptions} value={this.state.checkedList} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Tiện ích bếp">
                    {getFieldDecorator("kitchen", {
                        rules: [
                            // {
                            //     required: true,
                            //     message: "Không đuọc bỏ trống"
                            // }
                        ]
                    })(<CheckboxGroup options={kitchenOptions} value={this.state.checkedList} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Hoạt động giải trí">
                    {getFieldDecorator("entertainment", {
                        rules: [
                            // {
                            //     required: true,
                            //     message: "Không đuọc bỏ trống"
                            // }
                        ]
                    })(<CheckboxGroup options={entertainmentOptions} value={this.state.checkedList} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Tiện ích phòng">
                    {getFieldDecorator("roomAmenity", {
                        rules: [
                            // {
                            //     required: true,
                            //     message: "Không đuọc bỏ trống"
                            // }
                        ]
                    })(<CheckboxGroup options={roomAmenityOptions} value={this.state.checkedList} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Tiện ích chung">
                    {getFieldDecorator("generalAmenity", {
                        rules: [
                            // {
                            //     required: true,
                            //     message: "Không đuọc bỏ trống"
                            // }
                        ]
                    })(<CheckboxGroup options={generalAmenityOptions} value={this.state.checkedList} />)}
                </FormItem>
            </Form>
        );
    }

    handleSubmit = e => { };

    getImageURL(imageURLs) {
        this.setState({
            imagesURL: imageURLs
        })
    }


    // handleOkModal() {
    //     this.setState({
    //         isLoading: true
    //     });
    //     this.props.form.validateFields((err, values) => {
    //         if (err) {
    //             this.setState({
    //                 isLoading: false
    //             });
    //             return message.error("Error occurred. Invalid values!");
    //         }
    //         return this.props.getValuesFromFirstModal(values)
    //     });
    // }

    // handleCancel() {

    // }
}

export default Form.create()(ThirdModal);
