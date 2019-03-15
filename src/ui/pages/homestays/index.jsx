import React from "react";
import { post, get, puts } from "../../../client/index";
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
    Select,
    Affix,
    Pagination
} from "antd";
import { connect } from "react-redux";
import history from '../../../lib/history'
import './index.css'
import { getHomestayRequest } from '../../../store/actions/homestayAction'
import CardHomestay from '../../commons/components/HomestayCard'
import { changeStatusHeader } from '../../../store/actions/guiChangeAction'
import { resolve } from "path";
import SearchBanner from "../../commons/components/SearchBanner";
import { createQueryString } from '../../../lib/utils'



class Homestays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limitParams: null,
            offsetParams: null,
            orderByParams: null,
            cityParams: null,
            nameParams: null,
            priceRangeParams: null
        }
    }

    componentWillMount() {
        let location = this.props.location.search
        const params = new URLSearchParams(location)
        this.setState({
            limitParams: params.get('limit'),
            offsetParams: params.get('offset'),
            orderByParams: params.get('order_by'),
            cityParams: params.get('city'),
            nameParams: params.get('name'),
            idsParams: params.get('ids'),
            priceRangeParams: params.get('price_range')
        }, () => {
            this.props.getHomestayRequest(this.state)
        })
    }




    onChangePagination(page, pageSize) {
        let location = this.state.location;
        let newLocation = location.replace(/offset=\d+/i, 'offset=' + parseInt(pageSize * (page - 1)))
        this.props.getHomestayRequest(newLocation)
        this.props.history.push('/homestays' + newLocation)
        this.setState({
            location: newLocation
        })

    }

    handleChangeOnSelectHomestay(items) {
        if(!items){
            return this.setState({
                idsParams: null
            })
        }
        return this.setState({
            idsParams: items.map(homestay => homestay.id).join(',')
        })

    }

    handleChangeOnSearchCity(city) {
        if(!city) return;
        this.setState({
            cityParams: city
        })
    }

    handleChangeOnPriceRange(startPrice, endPrice) {
        startPrice = startPrice * 100000
        endPrice = endPrice * 100000
        if(!startPrice || !endPrice){
            return;
        }
        this.setState({
            priceRangeParams: [startPrice, endPrice].join(',')
        })
    }

    onSearchSubmit(e) {
        console.log('state: ',this.state)
        this.props.getHomestayRequest(this.state)
        const api = createQueryString(this.state)
		console.log('TCL: Homestays -> onSearchSubmit -> api', api)
        this.props.history.push('/homestays' + api)
        // this.setState({
        //     limitParams: params.get('limit'),
        //     offsetParams: params.get('offset'),
        //     orderByParams: params.get('order_by'),
        //     cityParams: params.get('city'),
        //     nameParams: params.get('name'),
        //     idsParams: params.get('ids'),
        //     priceRangeParams: params.get('price_range')
        // }, () => {
        //     this.props.getHomestayRequest(this.state)
        // })
    }

    onChangeAffixScroll(aff) {
        this.props.changeStatusHeader()
    }


    render() {
        const { homestays, total } = this.props
        return (
            <Row style={{ marginTop: '20px' }}>
                <Col sm={0} md={4}>
                </Col>
                <Col sm={24} md={16}>
                    <div>
                        <Affix onChange={this.onChangeAffixScroll.bind(this)}>
                            <SearchBanner
                                handleChangeOnSelectHomestay={this.handleChangeOnSelectHomestay.bind(this)}
                                handleChangeOnSearchCity={this.handleChangeOnSearchCity.bind(this)}
                                handleChangeOnPriceRange={this.handleChangeOnPriceRange.bind(this)}
                                onSearchSubmit={this.onSearchSubmit.bind(this)}
                                customStyle={{ position: 'unset', width: '100%' }}
                            />
                        </Affix>
                    </div>
                    {
                        homestays.map((homestay, index) =>
                            <CardHomestay
                                key={index}
                                homestay={homestay}
                                customStyle={{ width: '33.333%', float: 'left', padding: '10px' }}
                            />
                        )
                    }
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Pagination
                            defaultCurrent={1}
                            total={total}
                            pageSize={9}
                            onChange={this.onChangePagination.bind(this)}
                        />
                    </div>
                </Col>
                <Col sm={0} md={4}>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.homestayReducer }
}

const mapDispatchToProps = {
    getHomestayRequest,
    changeStatusHeader
}
export default Homestays = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homestays);

