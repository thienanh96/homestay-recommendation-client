import React from "react";
import '../index.css'

const DEFAULT_IMAGE = 'https://tour.dulichvietnam.com.vn/uploads/tour/thung-lung-muong-hoa.jpg.jpg'

export default class GridGallery extends React.Component {

    render() {
        const { imageCovers, customStyle } = this.props
        let styleImcover = {
            backgroundRepeat: "no-repeat",
            // backgroundImage: "url('" + url_cover + "')",
            width: "100%",
            backgroundSize: "cover",
            borderRadius: "8px"
        };
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', ...customStyle }}>
                <div style={{ ...styleImcover, height: '300px', width: '60%', backgroundImage: "url('" + imageCovers[0] + "')" }}>

                </div>
                <div style={{ width: 'calc(40% - 10px)', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                    <div style={{ ...styleImcover, height: '150px', width: '100%', backgroundImage: "url('" + imageCovers[1] + "')" }}>

                    </div>
                    <div style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px'
                    }} >
                        <div style={{ ...styleImcover, height: '140px', width: '50%', backgroundImage: "url('" + imageCovers[2] + "')" }}>

                        </div>
                        <div style={{ ...styleImcover, height: '140px', width: 'calc(50% - 10px)', backgroundImage: "url('" + imageCovers[3] + "')" }}>
                            <div className='last-photo-grid-gallery'>
                                <div>{imageCovers && Array.isArray(imageCovers) ? (imageCovers.length > 4 ? parseInt(imageCovers.length - 4) + '+' : '') : ''}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}