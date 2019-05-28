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
import AsyncSelect from 'react-select/lib/Async';
import makeAnimated from 'react-select/lib/animated';
const Option = SelectDropdown.Option
const LIST_CITIES = [
    'Hà Giang',
    'Lào Cai',
    'Sơn La',
    'Hòa Bình',
    'Thái Nguyên',
    'Hải Phòng',
    'Quảng Ninh',
    'Bắc Nnh',
    'Hà Nội',
    'Vĩnh Phúc',
    'Ninh Bình',
    'Thanh Hóa',
    'Nghệ An',
    'Quảng Bình',
    'Đà Nẵng',
    'Thừa Thiên Huế',
    'Quảng Nam',
    'Quảng Ngãi',
    'Bình Định',
    'Gia Lai',
    'Phú Yên',
    'Đắc Lắk',
    'Đắk Nông',
    'Lâm Đồng',
    'Ninh Thuận',
    'Bình Thuận',
    'Khánh Hòa',
    'Bà Rịa Vũng Tàu',
    'Tiền Giang',
    'Vĩnh Long',
    'Hồ  Chí Minh',
    'Tây Ninh',
    'Long An',
    'Kiên Giang',
    'Cần Thơ',
    'Băngkok',
]

class CitySearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { handleChangeOnSearchCity } = this.props
        return (
            <SelectDropdown
                showSearch
                style={{ width: '100%', height: '100%' }}
                placeholder={<div>Chọn thành phố</div>}
                optionFilterProp="children"
                onChange={handleChangeOnSearchCity}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {
                    LIST_CITIES.map(city => (<Option value={city}>{city}</Option>))
                }
            </SelectDropdown>
        )
    }

}


class PriceSearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startPrice: 0,
            endPrice: 100,
            showPricePopover: false
        }
    }

    onChange(value) {
        this.props.onChange(value)
        return this.setState({
            startPrice: value[0],
            endPrice: value[1]
        })
    }

    convertPrice(rawPrice) {
        if (rawPrice < 10) {
            return rawPrice + ' trăm nghìn/đêm'
        } else {
            return parseFloat(rawPrice / 10) + ' triệu/đêm'
        }
    }

    render() {
        const { startPrice, endPrice, onChange } = this.state;
        return (
            <div style={{ height: '90px' }}>
                <Slider range step={1} defaultValue={[1, 100]} onChange={this.onChange.bind(this)} />
                <div style={{ marginTop: '25px' }}>
                    Khoảng giá : <strong>{this.convertPrice(startPrice)}</strong> đến <strong>{this.convertPrice(endPrice)}</strong>
                </div>
            </div>
        )

    }
}


class SearchBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            showPricePopover: false
        }
    }

    handleChangeOnSelectHomestay(selectedItems) {
        this.setState({
            selectedItems: selectedItems
        })
        if ((!selectedItems) || selectedItems.length === 0) {
            return this.props.handleChangeOnSelectHomestay(null)
        }
        return this.props.handleChangeOnSelectHomestay(selectedItems)
    }

    // toOptions(raws) {
    //     return raws.map(raw => {
    //         return {
    //             id: raw.id,
    //             label: raw.name,
    //             value: raw.name
    //         }
    //     })
    // }

    handleVisiblePricePopover(visible) {
        return this.setState({
            showPricePopover: visible
        })
    }

    handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '');
        return this.props.onTyping(inputValue)
    }

    async loadOptions(inputValue) {
        if (!inputValue || inputValue === '') return []
        const response = await get('/api/homestays?name=' + inputValue + '&limit=10&offset=0')
        const data = response.data.data.map(el => {
            return {
                id: el.homestay_id,
                label: el.name,
                value: el.name
            }
        })
        return data
    }

    handleChangeOnSearchCity(value) {
        if (!value && value === '') {
            return this.props.handleChangeOnSearchCity(null)
        }
        return this.props.handleChangeOnSearchCity(value)
    }

    handleChangeOnPriceRange(value) {
        if ((!value) || value.length === 0) {
            return this.props.handleChangeOnPriceRange(null)
        }
        return this.props.handleChangeOnPriceRange(value[0], value[1])
    }

    render() {
        const { onSearchSubmit, customStyle } = this.props
        const { showPricePopover } = this.state;
        return (
            <div className='search-banner-row' style={customStyle}>
                <Row gutter={15} >
                    <Col sm={24} md={12}>
                        <AsyncSelect
                            placeholder='Nhập tên Homestay...'
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultOptions
                            isMulti
                            onChange={this.handleChangeOnSelectHomestay.bind(this)}
                        // onInputChange={this.handleInputChange.bind(this)}
                        />
                    </Col>
                    <Col sm={24} md={4} style={{ height: '38px', display: 'flex', alignItems: 'center' }}>
                        <CitySearchContent
                            handleChangeOnSearchCity={this.handleChangeOnSearchCity.bind(this)}
                        />
                    </Col>
                    <Col sm={24} md={4}>
                        <Popover
                            content={
                                <PriceSearchContent
                                    onChange={this.handleChangeOnPriceRange.bind(this)}
                                />
                            }
                            title="Chọn giá"
                            trigger="click"
                            placement={'bottomLeft'}
                            visible={showPricePopover}
                            overlayClassName='price-search-content'
                            onVisibleChange={this.handleVisiblePricePopover.bind(this)}
                        >
                            <Button style={{ width: '100%', height: '38px', fontSize: '18px', backgroundColor: '#f90', border: 'none', }} type="primary">Giá</Button>
                        </Popover>
                    </Col>
                    <Col sm={24} md={4}>
                        <Button style={{ width: '100%', height: '38px', fontSize: '18px', backgroundColor: '#f4511e', border: 'none' }} onClick={onSearchSubmit} type="primary">Tìm kiếm</Button>

                    </Col>
                </Row>
            </div>

        )
    }
}
export default SearchBanner
