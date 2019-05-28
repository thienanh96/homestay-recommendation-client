import React from "react";
import { Modal, Button, Row, Content, Form, Input, message } from "antd";
import { reduxForm, reset } from "redux-form/immutable";
import { NavLink, withRouter } from "react-router-dom";
import { SubmissionError } from "redux-form";
import { TextInput } from "../../commons/input/InputField";
import "./index.css";
import { registerRequest } from '../../../store/actions/authAction'
// import { registerRequest } from "../../../store/actions/auth";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
    }
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 24,
            offset: 0
        }
    }
};

const makeField = Component => ({
    input,
    meta,
    children,
    hasFeedback,
    label,
    ...rest
}) => {
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...input} {...rest} children={children} />
        </FormItem>
    );
};

const AInput = makeField(Input);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class Register extends React.Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.props.close();
    };

    confirmOTP = () => {
        this.props.close();
        // this.props.history.push("/OTPrequest");
    };

    login = () => {
        this.props.close();
        // this.props.history.push("/login");
    };

    register = values => {
        if (!values['avatar']) {
            values = { ...values, avatar: 'https://www.w3schools.com/howto/img_avatar2.png' }
        }
        const pm = new Promise((resolve, reject) => {
            this.props.dispatch(registerRequest(values, resolve, reject));
        });
        return pm.then(
            () => {
                message.success('Đăng kí thành công!')
                this.props.dispatch(reset("Register"));
                this.props.close();
            },
            err => {
                console.log("TCL: Register -> err", err)
                let errors = err.response.data.errors;
                throw new SubmissionError({
                    fullname: 'Tên đăng nhập đã tồn tại!'
                });
            }
        );
    };

    render() {
        const { show, pristine, handleSubmit } = this.props;
        return (
            <div>
                <p>
                    {" "}
                    <div className="text-register-other">Hoặc đăng ký bằng tài khoản</div>
                    <form onSubmit={handleSubmit(this.register)}>
                        <TextInput
                            name="phone"
                            component={AInput}
                            placeholder="Số  điện thoại của bạn"
                        />
                        <TextInput
                            name="email"
                            component={AInput}
                            placeholder="Email của bạn"
                        />
                        <TextInput
                            name="fullname"
                            component={AInput}
                            // type="name"
                            placeholder="Tên hiển thị"
                        />
                        <TextInput
                            name="password"
                            component={AInput}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                        <TextInput
                            name="reNewPassword"
                            component={AInput}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                        />
                        <FormItem {...tailFormItemLayout}>
                            <Button
                                className="btn btn-register"
                                disabled={pristine}
                                htmlType="submit"
                                style={{ marginRight: "10px" }}
                            >
                                Đăng ký
                            </Button>
                            <p>
                                <div className="text-register">
                                    Bạn đã có tài khoản?{" "}
                                    <strong style={{ cursor: "pointer" }} onClick={this.login}>
                                        Đăng nhập ngay
                                    </strong>
                                </div>
                            </p>
                        </FormItem>
                    </form>
                </p>
            </div>
            //   </Modal>
            // </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = "Bắt buộc";
    }
    if (!values.password) {
        errors.password = "Bắt buộc";
    }
    if (!values.fullname) {
        errors.fullname = "Bắt buộc";
    }
    if (!values.phone) {
        errors.phone = "Bắt buộc";
    }
    if (!values.reNewPassword) {
        errors.reNewPassword = "Bắt buộc";
    }
    if (
        values.password &&
        values.reNewPassword &&
        values.reNewPassword != values.password
    )
        errors.reNewPassword = "Mật khẩu không khớp";
    return errors;
};

export default reduxForm({
    form: "Register",
    validate
})(withRouter(Register));
