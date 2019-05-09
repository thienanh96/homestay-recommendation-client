import React from "react";
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const { Option } = Select;


class ProfileUpdate extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialInfo && this.props.initialInfo && nextProps.initialInfo.id !== this.props.initialInfo.id) {

            const { address, user_name, phone, email } = nextProps.initialInfo
            let phoneWithoutPrefix = phone.length > 3 ? phone.substr(2) : phone;
            this.props.form.setFieldsValue({
                address,
                username: user_name,
                phone: phoneWithoutPrefix,
                email
            });

        }
        // if(this.props.initialInfo !== this.pr)
    }


    // componentWillReceiveProps(nextProps) {
    //     let previousID = null
    //     let nextID = null
    //     console.log('loggg: ', this.props.initialInfo, nextProps.initialInfo)
    //     if (this.props.initialInfo && this.props.initialInfo.id) {
    //         previousID = this.props.initialInfo.id
    //         console.log("TCL: ProfileUpdate -> componentWillReceiveProps -> previousID", previousID)

    //     }
    //     if (nextProps.initialInfo && nextProps.initialInfo.id) {
    //         nextID = nextProps.initialInfo.id
    //         console.log("TCL: ProfileUpdate -> componentWillReceiveProps -> nextID", nextID)
    //     }
    //     console.log(previousID, nextID)
    //     if (previousID !== nextID) {
    //         const { address, user_name, phone } = nextProps.initialInfo
    //         console.log("TCL: ProfileUpdate -> componentWillReceiveProps -> nextProps.initialInfo", nextProps.initialInfo)
    //         nextProps.form.setFieldsValue({
    //             address,
    //             username: user_name,
    //             phone
    //         });
    //     }
    // }

    componentDidMount() {
        if (this.props.initialInfo) {
            const { address, user_name, phone, email } = this.props.initialInfo
            let phoneWithoutPrefix = phone.length > 3 ? phone.substr(2) : phone;
            this.props.form.setFieldsValue({
                address,
                username: user_name,
                phone: phoneWithoutPrefix,
                email
            });
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.getUpdatedInfo(values)
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Mật khẩu xác nhận không khớp. Vui lòng nhập lại!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { id } = this.props.initialInfo
        if (!this.props.me) {
            this.props.history.replace('/')
            return null
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                    label="Mật khâủ"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Xác nhận mật khẩu"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    label="Email"
                >
                    {getFieldDecorator('email')(
                        <Input type="text" disabled />
                    )}
                </Form.Item>
                <Form.Item
                    label={(
                        <span>
                            Tên đăng nhập&nbsp;
                <Tooltip title="Bạn muốn chúng tôi gọi bạn là gì?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('username')(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label={(
                        <span>
                            Địa chỉ&nbsp;
                <Tooltip title="Bạn ở đâu?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('address')(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                >
                    {getFieldDecorator('phone')(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {
                        this.props.me.user_id && this.props.me.user_id + '' === id + '' && <Button
                            type={'primary'}
                            style={{ background: 'rgb(255, 153, 0)', border: 'none', height: '38px', fontSize: '14px', color: 'black', float: 'right' }}
                            htmlType='submit'
                            disabled={this.props.me.user_id ? (this.props.me.user_id !== this.props.initialInfo.id) : false}
                        >
                            Cập nhật
                    </Button>
                    }
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(ProfileUpdate);

