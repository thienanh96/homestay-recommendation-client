import React from "react";
import { Button, Input, Icon, Carousel } from "antd";
import ReactResizeDetector from "react-resize-detector";

const PreviousIcon = ({ style, prevTapped }) => {
    return (
        <div style={{ position: "absolute", ...style }} onClick={prevTapped}>
            <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d)">
                    <circle
                        cx="26"
                        cy="26"
                        r="24"
                        transform="rotate(-180 26 26)"
                        fill="white"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d"
                        x="0"
                        y="0"
                        width="56"
                        height="56"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
            <Icon
                type="left"
                style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontSize: "20px"
                }}
            />
        </div>
    );
};

const NextIcon = ({ style, nextTapped }) => {
    return (
        <div style={{ position: "absolute", ...style }} onClick={nextTapped}>
            <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d)">
                    <circle
                        cx="26"
                        cy="26"
                        r="24"
                        transform="rotate(-180 26 26)"
                        fill="white"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d"
                        x="0"
                        y="0"
                        width="56"
                        height="56"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dx="2" dy="2" />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow"
                            result="shape"
                        />
                    </filter>
                </defs>
            </svg>
            <Icon
                type="right"
                style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontSize: "20px"
                }}
            />
        </div>
    );
};

export default class SlideShow extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
        this.state = {
            slidesToShow: 0
        };
    }

    next() {
        this.carousel.next();
    }

    previous() {
        this.carousel.prev();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.initialSlideToShow !== nextProps.initialSlideToShow) {
            this.adjustSlideshowOnResize(window.innerWidth, nextProps.initialSlideToShow)
        }
    }

    componentDidMount() {
        this.adjustSlideshowOnResize(window.innerWidth, this.props.initialSlideToShow);
    }

    adjustSlideshowOnResize(width, initialSlideToShow) {
		console.log("TCL: SlideShow -> adjustSlideshowOnResize -> initialSlideToShow", initialSlideToShow)
        if(!initialSlideToShow) return;
        let slidesToShow = initialSlideToShow 
        if (width <= 576) {
            this.setState({
                slidesToShow: 1
            });
        } else if (width > 576 && width <= 768) {
            this.setState({
                slidesToShow: 2
            });
        } else {
            this.setState({
                slidesToShow: slidesToShow
            });
        }
    }

    onResize() {
        this.adjustSlideshowOnResize(window.innerWidth);
    }

    render() {
        const { url_cover, style, contentSlides } = this.props;
        const props = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: this.state.slidesToShow,
            slidesToScroll: 1
        };
        return (
            <div style={{ position: "relative" }}>
                <ReactResizeDetector handleWidth onResize={this.onResize.bind(this)} />
                <PreviousIcon
                    style={{
                        zIndex: 1,
                        top: "100px",
                        left: "-18px",
                        cursor: "pointer"
                    }}
                    prevTapped={this.previous}
                />
                <Carousel
                    autoplay
                    ref={node => (this.carousel = node)}
                    // afterChange={this.onChange}
                    {...props}
                >
                    {contentSlides.map(el => el)}
                </Carousel>
                <NextIcon
                    style={{
                        zIndex: 1,
                        top: "100px",
                        right: "-29px",
                        // float: "right",
                        cursor: "pointer"
                    }}
                    nextTapped={this.next}
                />
            </div>
        );
    }
}
