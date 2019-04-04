import React from "react";
import { Modal, Button, Row, Content, Form, Input, message } from "antd";
import { reduxForm, reset } from "redux-form/immutable";
import { connect } from "react-redux";
import { loginRequest } from "../../../store/actions/authAction";
import "./index.css";
import { SubmissionError } from "redux-form";
import { NavLink, withRouter } from "react-router-dom";
import { TextInput } from "../../commons/input/InputField";
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
class Login extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true
        });
    };


    handleCancel = e => {
        this.props.close();
    };
    register = () => {
        this.props.close();
        this.props.history.push("/register");
    };
    login = values => {
		console.log('TCL: Login -> values', values)
        const pm = new Promise((resolve, reject) => {
            this.props.dispatch(loginRequest(values, resolve, reject));
        });
        let self = this;
        return pm.then(
            () => {
                console.log("login success");

                self.props.dispatch(reset("Login"));
                self.props.close();
            },
            err => {
                return message.error('Sai tên tài khoản hoặc mật khẩu!')
            }
        );
    };

    render() {
        const { handleSubmit = () => { }, pristine, reset, submitting, valid } = this.props;

        return (
            <div className="modal-login">
                <Modal
                    width="586px"
                    className="modal-login"
                    visible={this.props.show}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div>

                        <div className="text-login-other">
                            Đăng nhập ngay bây giờ
                        </div>
                        <form onSubmit={handleSubmit(this.login)}>
                            <TextInput
                                name="username"
                                component={AInput}
                                // type="email"
                                placeholder="Nhập email của bạn"
                            />
                            <TextInput
                                name="password"
                                component={AInput}
                                type="password"
                                placeholder="Nhập mật khẩu của bạn"
                            />

                            <FormItem {...tailFormItemLayout}>
                                <Button
                                    className="btn btn-login"
                                    htmlType="submit"
                                    style={{ marginRight: "10px", float: 'right' }}
                                >
                                    Đăng nhập
                                    </Button>

                                <div className="text-register">
                                    Bạn chưa có tài khoản?{" "}
                                    <strong onClick={this.register}>Đăng ký ngay</strong>
                                </div>

                            </FormItem>
                        </form>
                    </div>
                </Modal>
            </div>
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
    return errors;
};

export default reduxForm({
    form: "Login", // a unique identifier for this form
    validate
})(withRouter(Login));
