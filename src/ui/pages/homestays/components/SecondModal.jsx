import React, { Component } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import "../index.css";
// import UploadImages from '../../components/upload-images/index'
import moment from "moment";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const regexCheckUTCTime = /\b[0-9]{2}-[0-9]{2}-[0-9]{4}\s+[0-9]{2}:[0-9]{2}:[0-9]{2}\b/

class SecondModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            submitButtonText: "Create",
            imagesURL: [],
        };
    }


    componentDidMount() {
        const { currentHomestay } = this.props;
        if (currentHomestay) {
            const { main_price, price_detail = {data: []} } = currentHomestay
            let priceDetail = {}
            price_detail.data.map(el => {
                priceDetail = {...priceDetail,...el}
            })
            priceDetail['Thứ sáu - Chủ nhật'] = priceDetail['Thứ sáu - Chủ nhật'].replace(/đ/g,'')
            priceDetail['Phí khách tăng thêm'] = priceDetail['Phí khách tăng thêm'].replace(/đ/g,'')
            priceDetail['Số đêm tối thiểu'] = priceDetail['Số đêm tối thiểu'].replace(/đêm/g,'')
            this.props.form.setFieldsValue({
                mondayToThursday: main_price,
                firdayToSunday: priceDetail['Thứ sáu - Chủ nhật'],
                extraPrice: priceDetail['Phí khách tăng thêm'],
                minCountNight: priceDetail['Số đêm tối thiểu'],
                cancelPolicy: priceDetail['Chính sách hủy']
            });
            this.props.form.validateFields((err, values) => {
				console.log("TCL: SecondModal -> componentDidMount -> values", values)
                if (err) {
                    return this.props.getValuesFromSecondModal(null);
                }
                return this.props.getValuesFromSecondModal(values)
            });
        }
    }

    eraseData() {
        this.setState({
            imagesURL: []
        });
        this.props.form.setFieldsValue({
            name: null,
            city: null,
            district: null,
            main_price: null,
            price_detail: null,
            descriptions: null,
            highlight: null,
            amenities: null,
            amenities_around: null,
            images: null
        });
    }

    onValuesChange() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return this.props.getValuesFromSecondModal(null)
            }
            return this.props.getValuesFromSecondModal(values)
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
                <FormItem {...formItemLayout} label="Thứ hai - Thứ năm">
                    {getFieldDecorator("mondayToThursday", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập giá"
                            },
                            // {
                            //     pattern: /^[0-9]+$/g,
                            //     message: "Giá phải là các chữ số"
                            // }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Thứ sáu - Chủ Nhật">
                    {getFieldDecorator("firdayToSunday", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập giá"
                            },
                            // {
                            //     pattern: /^[0-9]+$/g,
                            //     message: "Giá phải là các chữ số"
                            // }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Phí khách tăng thêm">
                    {getFieldDecorator("extraPrice", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập giá"
                            },
                            // {
                            //     pattern: /^[0-9]+$/g,
                            //     message: "Giá phải là các chữ số"
                            // }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Số đêm tối thiểu">
                    {getFieldDecorator("minCountNight", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập số điểm tối thiểu"
                            },
                            // {
                            //     pattern: /^[0-9]+$/g,
                            //     message: "Số đêm tối thiểu phải là các chữ số"
                            // }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Chính sách hủy">
                    {getFieldDecorator("cancelPolicy", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập chính sách hủy"
                            }
                        ]
                    })(<TextArea autosize />)}
                </FormItem>
            </Form>
        );
    }

    handleSubmit = e => { };



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

export default Form.create()(SecondModal);
