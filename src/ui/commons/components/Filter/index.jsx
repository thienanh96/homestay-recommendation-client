import React from "react";
import { post, get, puts } from "../../../../client/index";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Input,
    Row,
    Col,
    Dropdown,
    Avatar,
    Affix,
    Slider,
    Popover,
    Select as SelectDropdown
} from "antd";
import './index.css'

const Option = SelectDropdown.Option


class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { handleChange } = this.props
        return (
            <SelectDropdown
                showSearch
                style={{ width: '120px', }}
                placeholder={<div>Lọc</div>}
                onChange={handleChange}
            >
                <Option value="newest">Mới  nhất</Option>
                <Option value="like">Lượt thích</Option>
                <Option value="by-me">Của tôi</Option>
            </SelectDropdown>
        )
    }

}

export default Filter
