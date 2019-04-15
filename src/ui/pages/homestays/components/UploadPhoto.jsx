import React, { Component } from "react";

import { Icon, Modal, Upload, message } from "antd";
import { post } from '../../../../client/index'

// import './style.css';
class UploadImages extends Component {
    state = {
        previewVisible: false,
        previewImage: "",
        fileList: [
            //   {
            //     uid: "-1",
            //     name: "xxx.png",
            //     status: "done",
            //     url:
            //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            //   }
        ],
        imageURLs: []
    };

    componentWillMount() {
        this.setState({
            fileList: this.getCorrectFormatOfFiles(this.props.initialImagesURL) || [],
            imageURLs: this.getCorrectFormatOfFiles(this.props.initialImagesURL) || []
        });
    }

    getCorrectFormatOfFiles(imageURLs) {
        if(!imageURLs) return null;
        return imageURLs.map((imageURL, index) => {
            return {
                uid: "-" + index + Date.now(),
                status: "done",
                url: imageURL
            };
        });
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };

    handleRemove = file => {
        let uidFile = file.uid;
        let files = this.state.imageURLs.filter(
            image => image.uid + "" !== uidFile + ""
        );
        this.setState(
            {
                imageURLs: files
            },
            () => {
                return this.props.imagesURL(files.map(el => el.url));
            }
        );
    };

    handleChange = ({ fileList }) => {
        // console.log("file-listttt: ", fileList);
        this.setState({ fileList });
        console.log("dang run");
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    customRequest={async ({ onSuccess, onError, file }) => {
                        console.log("TCL: render -> onSuccess, onError, file", onSuccess, onError, file)
                        // post(`/api/homestay/upload-image`,file)
                        const response = await post("/api/homestay/upload-image", {
                            "img": file,
                            hasFile: true
                        }, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).catch(err => {
                                message.error(`${file.name} upload thất bại`);
                                return onError(event => {});
                            })
                        const url = response ? response.data.url : ''
                        this.setState(
                            {
                                imageURLs: [
                                    ...this.state.imageURLs,
                                    {
                                        uid: file.uid,
                                        url: url
                                    }
                                ]
                            },
                            () => {
                                console.log('fff: ',this.state.imageURLs)
                                return this.props.imagesURL(
                                    this.state.imageURLs.map(el => el.url)
                                );
                            }
                        );
                        message.success(`${file.name} upload thành công`);
                        return onSuccess(response => {});
                    }}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default UploadImages;
