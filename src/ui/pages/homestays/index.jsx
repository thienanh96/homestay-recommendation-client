import React from "react";
import { post, get, puts } from "../../../client/index";
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Input,
    Row,
    Col,
    Dropdown,
    Avatar,
    Select,
    Affix,
    Pagination,
    Button,
    message,
    List
} from "antd";
import { connect } from "react-redux";
import history from '../../../lib/history'
import './index.css'
import { getHomestayRequest, createHomestayRequest, createHomestaySimilarityRequest } from '../../../store/actions/homestayAction'
import CardHomestay from '../../commons/components/HomestayCard'
import { changeStatusHeader } from '../../../store/actions/guiChangeAction'
import { resolve } from "path";
import SearchBanner from "../../commons/components/SearchBanner";
import { createQueryString } from '../../../lib/utils'
import Tabs from './components/Tabs'



class Homestays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limitParams: null,
            offsetParams: null,
            orderByParams: null,
            cityParams: null,
            nameParams: null,
            priceRangeParams: null,
            showModal: false,
            completeCreateHomestay: false,
            defaultPagination: 1
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
            this.setState({
                defaultPagination: Math.round(parseInt(this.state.offsetParams) / parseInt(this.state.limitParams)) + 1
            })

            this.props.getHomestayRequest(this.state)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.location.pathname === nextProps.location.pathname && this.props.location.search !== nextProps.location.search
        ) {
            console.log('chay lai__________________')
            let location = nextProps.location.search
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
                if (!isNaN(this.state.offsetParams) && !isNaN(this.state.limitParams)) {
                    this.setState({
                        defaultPagination: Math.round(parseInt(this.state.offsetParams) / parseInt(this.state.limitParams)) + 1
                    })
                }
                this.props.getHomestayRequest(this.state)
            })
        }
    }




    onChangePagination(page, pageSize) {
        this.setState({
            offsetParams: parseInt(pageSize * (page - 1))
        }, () => {
            const api = createQueryString(this.state)
            this.props.history.push('/homestays' + api)
        })
    }

    handleChangeOnSelectHomestay(items) {
        if (!items) {
            return this.setState({
                idsParams: null
            })
        }
        return this.setState({
            idsParams: items.map(homestay => homestay.id).join(',')
        })

    }

    handleChangeOnSearchCity(city) {
        if (!city) return;
        this.setState({
            cityParams: city
        })
    }

    handleChangeOnPriceRange(startPrice, endPrice) {
        startPrice = startPrice * 100000
        endPrice = endPrice * 100000
        if (!startPrice || !endPrice) {
            return;
        }
        this.setState({
            priceRangeParams: [startPrice, endPrice].join(',')
        })
    }

    onSearchSubmit(e) {
        this.props.getHomestayRequest(this.state)
        const api = createQueryString(this.state)
        this.props.history.push('/homestays' + api)
    }

    onChangeAffixScroll(aff) {
        this.props.changeStatusHeader(!aff)
    }

    getNewHomestay(newHomestay) {
		console.log("TCL: Homestays -> getNewHomestay -> newHomestay", newHomestay)
        if (newHomestay) {
            const pm = new Promise((resolve, reject) => {
                this.props.createHomestayRequest(newHomestay, resolve, reject)
            })
            pm.then(data => {
                this.setState({
                    completeCreateHomestay: true
                })
                if (data && data['homestay_id']) {
                    message.success('Tạo mới homestay thành công. Xin chờ Admin phê duyệt!')
                    this.props.createHomestaySimilarityRequest(data['homestay_id'])
                    return this.setState({ showModal: false })
                } else {
                    message.error('Tạo mới homestay thất bại')
                }
            }, err => {
                this.setState({
                    completeCreateHomestay: true
                })
                return message.error('Tạo mới homestay thất bại')
            }).catch(err => {
                this.setState({
                    completeCreateHomestay: true
                })
                return message.error('Tạo mới homestay thất bại')
            })

        }
    }


    render() {
        const { homestays, total } = this.props
        console.log("TCL: Homestays -> render -> homestays", homestays)
        return (
            <Row>
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
                    <div style={{ marginTop: '40px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                        <Button
                            type={'primary'}
                            style={{ background: 'rgb(255, 153, 0)', border: 'none', height: '38px', fontSize: '18px', color: 'black' }}
                            onClick={() => {
                                this.setState({
                                    showModal: true
                                })
                            }}
                        >Đăng Homestay</Button>
                    </div>
                    <div>
                        {
                            this.state.showModal && <Tabs
                                listCity={['Hà Nội']}
                                getData={this.getNewHomestay.bind(this)}
                                close={() => { this.setState({ showModal: false }) }}
                            />
                        }

                    </div>
                    {
                        homestays && <List
                            grid={{
                                gutter: 8,
                                xs: 1,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 3,
                                xxl: 3
                            }}
                            dataSource={homestays}
                            renderItem={(homestay = {}, index) => (
                                <List.Item>
                                    <CardHomestay
                                        key={index}
                                        homestay={homestay}
                                    // customStyle={{ width: '33.333%', float: 'left', padding: '10px' }}
                                    />
                                </List.Item>

                            )}
                        />
                    }
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Pagination
                            // defaultCurrent={this.state.defaultPagination}
                            current={this.state.defaultPagination}
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
    changeStatusHeader,
    createHomestayRequest,
    createHomestaySimilarityRequest
}
export default Homestays = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homestays);

