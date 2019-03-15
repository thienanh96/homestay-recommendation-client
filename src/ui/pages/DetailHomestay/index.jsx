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
import { getDetailHomestayRequest } from '../../../store/actions/detailHomestayAction'
import SlideShow from '../../commons/components/SlideShow'
import { changeStatusHeader } from '../../../store/actions/guiChangeAction'
import { resolve } from "path";
import SearchBanner from "../../commons/components/SearchBanner";
import ImageHomestay from '../../commons/components/ImageHomestay'
import Header from './components/Header'


class DetailHomestay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHomestay: {
                homestayIDs: null,
                city: null,
                priceRange: null,
            }
        }
    }

    componentWillMount() {
        this.props.getDetailHomestayRequest(10003)
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
        if (!items) {
            return this.setState({
                searchHomestay: {
                    ...this.state.searchHomestay, homestayIDs: null
                }
            })
        }
        return this.setState({
            searchHomestay: {
                ...this.state.searchHomestay, homestayIDs: items.map(homestay => homestay.id).join(',')
            }
        })

    }

    handleChangeOnSearchCity(city) {
        if (!city) {
            return this.setState({
                searchHomestay: {
                    ...this.state.searchHomestay, city: null
                }
            })
        }
        return this.setState({
            searchHomestay: {
                ...this.state.searchHomestay, city: city
            }
        })
    }

    handleChangeOnPriceRange(startPrice, endPrice) {
        if (!startPrice || !endPrice) {
            return this.setState({
                searchHomestay: {
                    ...this.state.searchHomestay, priceRange: null
                }
            })
        }
        startPrice = startPrice * 100000
        endPrice = endPrice * 100000
        return this.setState({
            searchHomestay: {
                ...this.state.searchHomestay, priceRange: [startPrice, endPrice].join(',')
            }
        })
    }

    async onSearchSubmit(e) {
        const { homestayIDs, city, priceRange } = this.state.searchHomestay
        let api = '/homestays?limit=9&offset=0'
        if (homestayIDs) {
            api += '&ids=' + homestayIDs
        }
        if (city) {
            api += '&city=' + city
        }
        if (priceRange) {
            api += '&price_range=' + priceRange
        }
        this.props.history.push(api)
    }

    onChangeAffixScroll(aff) {
        this.props.changeStatusHeader()
    }



    render() {
        const { detailHomestay } = this.props
        console.log('TCL: DetailHomestay -> render -> detailHomestay', detailHomestay)
        const images = detailHomestay.images ? detailHomestay.images.split(',') : []
        return (
            <Row style={{ marginTop: '20px', height: '1000px' }}>
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
                    <div style={{ width: '100%', marginTop: '20px' }}>
                        <SlideShow
                            contentSlides={images.map((imageUrl, index) => <ImageHomestay
                                imageUrl={imageUrl}
                            />)}
                            style={{

                            }}
                            initialSlideToShow={3}
                        />
                    </div>
                    <div style={{ width: '100%', marginTop: '20px' }}>
                        <Row>
                            <Col sm={24} md={17}>
                                <Header
                                    title={detailHomestay.name ? detailHomestay.name : 'Homestay '}
                                    homestayId={detailHomestay.homestay_id}
                                    countLike={detailHomestay.likes ? detailHomestay.likes : 0}
                                    countDislike={detailHomestay.dislikes ? detailHomestay.dislikes : 0}
                                    city={detailHomestay.city ? detailHomestay.city : 'Chưa rõ'}
                                    district = {detailHomestay.district ? detailHomestay.district : 'Chưa rõ'}
                                    customStyle
                                />
                            </Col>
                            <Col sm={24} md={7}>
                                ew
                                </Col>
                        </Row>
                    </div>
                </Col>
                <Col sm={0} md={4}>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        detailHomestay: state.detailHomestayReducer.detailHomestay
    }
}

const mapDispatchToProps = {
    getDetailHomestayRequest,
    changeStatusHeader
}
export default DetailHomestay = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailHomestay);

