import React from "react";
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
import SearchBanner from '../../commons/components/SearchBanner'
import { changeStatusHeader } from '../../../store/actions/guiChangeAction'


const withSearch = WrappedComponent => {
    class SearchComponent extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                homestayIDs: null,
                city: null,
                priceRange: null,
            }
        }

        componentDidMount(){
            this.props.changeStatusHeader(true)
        }


        handleChangeOnSelectHomestay(items) {
            if (!items) {
                return this.setState({
                    ...this.state, homestayIDs: null
                })
            }
            return this.setState({
                ...this.state, homestayIDs: items.map(homestay => homestay.id).join(',')
            })

        }

        handleChangeOnSearchCity(city) {
            if (!city) {
                return this.setState({
                    ...this.state, city: null
                })
            }
            return this.setState({
                ...this.state, city: city
            })
        }

        handleChangeOnPriceRange(startPrice, endPrice) {
            if (!startPrice || !endPrice) {
                return this.setState({
                    ...this.state, priceRange: null
                })
            }
            startPrice = startPrice * 100000
            endPrice = endPrice * 100000
            return this.setState({
                ...this.state, priceRange: [startPrice, endPrice].join(',')
            })
        }

        onSearchSubmit(e) {
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

        onChangeAffixScroll(aff) {
			console.log("TCL: SearchComponent -> onChangeAffixScroll -> aff", aff)
            this.props.changeStatusHeader(!aff)
        }


        render() {
            console.log('hoc call')
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
                        <div>
                            <WrappedComponent
                                {...this.props}
                            />
                        </div>
                    </Col>
                    <Col sm={0} md={4}>
                    </Col>
                </Row>
            );
        }
    }

    // const mapDispatchToProps = {
    //     changeStatusHeader,
    // }
    // return connect(
    //     null,
    //     mapDispatchToProps
    // )(SearchComponent);
    return SearchComponent
}


export default withSearch

