import React, { Component } from "react";
import { Form, Input, message, Modal, Select, Checkbox } from "antd";
import "../index.css";
// import UploadImages from '../../components/upload-images/index'
import moment from "moment";
import UploadImages from './UploadPhoto'

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


class ForthModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            imagesURL: [],
        };
    }


    componentDidMount() {
        if (!this.props.currentHomestay) return;
        const { amenities_around, images } = this.props.currentHomestay;
        let amenityAround = {}
        amenities_around.data.map(el => {
            amenityAround = { ...amenityAround, ...el }
        })
        if (amenityAround) {
            this.props.form.setFieldsValue({
                cuisine: amenityAround['Ẩm thực'],
                shopping: amenityAround['Mua sắm'],
                transport: amenityAround['Giao thông'],
                entertainment: amenityAround['Giải trí'],
                office: amenityAround['Cơ quan ban ngành'],
            });
            this.setState({
                imagesURL: images.split('$')
            })
            this.props.getImageURL(images.split('$'))
            this.props.form.validateFields((err, values) => {
                console.log("TCL: ForthModal -> componentDidMount -> values", values)
                if (err) {
                    return;
                }
                return this.props.getValuesFromForthModal({
                    ...values, images: images.split('$')
                })
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
            return this.props.getValuesFromForthModal({
                ...values, images: this.state.imagesURL
            })
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { getImageURL, currentHomestay = { images: null } } = this.props
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
                <FormItem {...formItemLayout} label="Ẩm thực">
                    {getFieldDecorator("cuisine", {
                        rules: [
                        ]
                    })(<TextArea autosize type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Mua sắm">
                    {getFieldDecorator("shopping", {
                        rules: [
                        ]
                    })(<TextArea autosize type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Giao thông">
                    {getFieldDecorator("transport", {
                        rules: [
                        ]
                    })(<TextArea autosize type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Giải trí">
                    {getFieldDecorator("entertainment", {
                        rules: [
                        ]
                    })(<TextArea autosize type="text" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Cơ quan ban ngành">
                    {getFieldDecorator("office", {
                        rules: [
                        ]
                    })(
                        <TextArea autosize type="text" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="Images">
                    <UploadImages
                        imagesURL={getImageURL}
                        initialImagesURL={currentHomestay.images ? currentHomestay.images.split('$') : null}
                    />
                </FormItem>
            </Form>
        );
    }

    handleSubmit = e => { };
}

export default Form.create()(ForthModal);
