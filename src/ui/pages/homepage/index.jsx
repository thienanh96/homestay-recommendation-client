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
    Affix
} from "antd";
import { connect } from "react-redux";
import history from '../../../lib/history'
import SearchBanner from "../../commons/components/SearchBanner";
import SlideShow from '../../commons/components/SlideShow'
import CardHomestay from '../../commons/components/HomestayCard'
import { getBestHomestayRequest, getConformHomstayRequest } from '../../../store/actions/homeAction'
import { resolve } from "path";
import './index.css'
import { Link } from 'react-router-dom'
import DestinationCard from '../../commons/components/DestinationCard'


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homestayIDs: null,
            city: null,
            priceRange: null,
            topDestinations: [{
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_8_1546584483.png',
                name: 'Hà Nội',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_6_1546584469.png',
                name: 'Hạ Long',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_4_1546584448.png',
                name: 'Hòa Bình',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_2_1546584433.png',
                name: 'Khánh Hòa',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_7_1546584476.png',
                name: 'Hồ Chí Minh',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_5_1546584455.png',
                name: 'Đà Nẵng',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_3_1546584441.png',
                name: 'Lào Cai',
            }, {
                imgCover: 'https://cdn.luxstay.com/home/location/small/location_1_1546584395.png',
                name: 'Đà Nẵng',
            }]
        }
    }

    componentWillMount() {
        this.props.getBestHomestayRequest({
            limitParams: 10,
            offsetParams: 0,
            orderByParams: 'likes'
        })
        this.props.getConformHomstayRequest(20, 0)
    }

    // componentWillReceiveProps() {
    //     this.props.getBestHomestayRequest({
    //         limitParams: 10,
    //         offsetParams: 0,
    //         orderByParams: 'likes'
    //     })
    // }

    handleChangeOnSelectHomestay(items) {
        if (!items) {
            return this.setState({
                homestayIDs: null
            })
        }
        this.setState({
            homestayIDs: items.map(homestay => homestay.id).join(',')
        })

    }

    handleChangeOnSearchCity(city) {
        this.setState({
            city: city
        })
    }

    handleChangeOnPriceRange(startPrice, endPrice) {
        startPrice = startPrice * 100000
        endPrice = endPrice * 100000

        this.setState({
            priceRange: [startPrice, endPrice].join(',')
        })
    }

    async onSearchSubmit(e) {
        const { homestayIDs, city, priceRange } = this.state
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


    render() {
        const { bestHomestays, conformHomestays } = this.props
        console.log("TCL: Homepage -> render -> conformHomestays", conformHomestays)
        return (
            <Row>
                <Col sm={0} md={4}>
                </Col>
                <Col sm={24} md={16}>
                    <div style={{ width: '100%', position: 'relative' }}>
                        <img alt='banner-homepage.jpg' style={{ borderRadius: '0px 0px 8px 8px' }} width='100%' src={'/banner-homepage.jpg'}></img>
                        <SearchBanner
                            handleChangeOnSelectHomestay={this.handleChangeOnSelectHomestay.bind(this)}
                            handleChangeOnSearchCity={this.handleChangeOnSearchCity.bind(this)}
                            handleChangeOnPriceRange={this.handleChangeOnPriceRange.bind(this)}
                            onSearchSubmit={this.onSearchSubmit.bind(this)}
                        />
                    </div>
                    <div className='best-choice-homepage'>
                        <div style={{ width: '100%', color: 'black', fontSize: '32px', fontWeight: '600', marginBottom: '30px' }}>
                            Lựa chọn tốt nhất
                        </div>
                        <div style={{ width: '100%' }}>
                            <SlideShow
                                contentSlides={bestHomestays.map((homestay, index) => <CardHomestay
                                    key={index}
                                    homestay={homestay}
                                    customStyle={{ width: '100%', float: 'left', padding: '10px' }}
                                />)}
                                style={{
                                    // height: '150px'
                                }}
                                initialSlideToShow={4}
                            />
                        </div>
                    </div>
                    <div className='best-choice-homepage'>
                        <div style={{ width: '100%', color: 'black', fontSize: '32px', fontWeight: '600', marginBottom: '30px' }}>
                            Lựa chọn phù hợp nhất
                        </div>
                        <div style={{ width: '100%' }}>
                            <SlideShow
                                contentSlides={conformHomestays.map((homestay, index) => <CardHomestay
                                    key={index}
                                    homestay={homestay}
                                    customStyle={{ width: '100%', float: 'left', padding: '10px' }}
                                />)}
                                style={{
                                    // height: '150px'
                                }}
                                initialSlideToShow={4}
                            />
                        </div>
                    </div>
                    <div className='top-destination-homepage'>
                        <div style={{ width: '100%', color: 'black', fontSize: '32px', fontWeight: '600' }}>
                            Điểm đến hàng đầu
                        </div>
                        <div style={{ width: '100%' }}>
                            {
                                this.state.topDestinations.map(dest =>
                                    <Link to={`/homestays?limit=9&offset=0&city=${dest.name}`}>
                                        <DestinationCard
                                            imgSrc={dest.imgCover}
                                            cityName={dest.name}
                                            countHomestay={dest.countHomestay}
                                            customStyle={{ width: '25%', padding: '10px' }}
                                        />
                                    </Link>

                                )
                            }
                        </div>
                    </div>
                </Col>
                <Col sm={0} md={4}>
                </Col>
            </Row>
        )
    }
}
function mapStateToProps(state) {
    return { ...state.homeReducer }
}

const mapDispatchToProps = {
    getBestHomestayRequest,
    getConformHomstayRequest
}
export default Homepage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);

