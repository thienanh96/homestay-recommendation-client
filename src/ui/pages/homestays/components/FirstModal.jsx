import React, { Component } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import "../index.css";
// import UploadImages from '../../components/upload-images/index'
import moment from "moment";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const regexCheckUTCTime = /\b[0-9]{2}-[0-9]{2}-[0-9]{4}\s+[0-9]{2}:[0-9]{2}:[0-9]{2}\b/

class FirstModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    componentDidMount() {
        const { currentHomestay } = this.props;
        if (currentHomestay) {
            const { name, city, district, descriptions, highlight, images } = currentHomestay
            this.props.form.setFieldsValue({
                name,
                city,
                district,
                descriptions,
                highlight
            });
            this.props.form.validateFields((err, values) => {
                console.log("TCL: FirstModal -> onValuesChange -> values", values)
                if (err) {
                    return this.props.getValuesFromFirstModal(null)
                }
                return this.props.getValuesFromFirstModal(values)
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

    onValuesChange(props, changedValues, allValues) {
        this.props.form.validateFields((err, values) => {
			console.log("TCL: FirstModal -> onValuesChange -> values", values)
            if (err) {
                return this.props.getValuesFromFirstModal(null)
            }
            return this.props.getValuesFromFirstModal(values)
        });
    }

    onSelectCity(opts){
        this.props.form.validateFields((err, values) => {
			values.city = opts;
            if (err) {
                return
            }
            return this.props.getValuesFromFirstModal(values)
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
                <FormItem {...formItemLayout} label="Tên">
                    {getFieldDecorator("name", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập tên"
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Mô tả">
                    {getFieldDecorator("descriptions", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập mô tả"
                            }
                        ]
                    })(<TextArea autosize />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Nổi bật">
                    {getFieldDecorator("highlight", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập nổi bật"
                            }
                        ]
                    })(<TextArea autosize />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Thành phố">
                    {getFieldDecorator("city", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhâp thành phố"
                            }
                        ]
                    })(
                        <Select
                            onSelect = {this.onSelectCity.bind(this)}
                            showSearch
                            style={{ width: "60%" }}
                            placeholder="Chọn thành phố"
                        >
                            {this.props.listCity.map((city, index) => (
                                <Option key={city}>{city}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Quận/Huyện">
                    {getFieldDecorator("district", {
                        rules: [
                            {
                                required: true,
                                message: "Xin nhập tên quận huyện"
                            }
                        ]
                    })(<Input type="text" />)}
                </FormItem>
                {/* <FormItem {...formItemLayout} label="Giá / 1 đêm (VNĐ)">
                        {getFieldDecorator("main_price", {
                            rules: [
                                {
                                    required: true,
                                    message: "Xin nhập giá"
                                },
                                {
                                    pattern: /^[0-9]+$/g,
                                    message: "Giá phải là các chữ số"
                                }
                            ]
                        })(<Input type="text" />)}
                    </FormItem> */}
                {/* <FormItem {...formItemLayout} label="Images">
                        <UploadImages
                            collectionName='concerts'
                            imagesURL={this.getImageURL}
                            initialImagesURL={this.state.imagesURL}
                        />
                    </FormItem> */}
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

export default Form.create()(FirstModal);
