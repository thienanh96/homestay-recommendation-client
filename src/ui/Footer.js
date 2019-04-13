import React from "react";
import { Layout, Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

class FooterWeb extends React.Component {
  render() {
    return (
      <Footer style={{
        zIndex: 3
      }}>
        <Row type="flex" justify="center">
          <Link to="/#" style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            {/* <img src="./icons/iconFb.png" alt="Facebook" /> */}
            <Icon type="facebook" style={{ fontSize: '26px', marginRight: '5px' }} /> <div>Facebook</div>
          </Link>
          <Link to="/#" style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
            <Icon type="instagram" style={{ fontSize: '26px', marginRight: 5 }} /> <div>Instagram</div>
          </Link>

          <Link to="/#" style={{ display: 'flex', alignItems: 'center' }}>
            <Icon type="google" style={{ fontSize: '26px', marginRight: 5 }} /> <div>Google</div>
          </Link>
        </Row>
        <Row type="flex" justify="center" style={{ margin: "30px 0" }}>
          <Col>
            <Row
              className="tittleDefaut fontSize18"
              style={{ margin: "10px 0", textAlign: 'center' }}
            >
              Về HomestayHub
            </Row>
            <Row style={{ margin: "10px 0", textAlign: 'center' }}>
              <Link to="/#" className="textDefault fontSize18">
                Điều khoản dịch vụ
              </Link>
            </Row>
            <Row style={{ margin: "10px 0", textAlign: 'center' }}>
              <Link to="/#" className="textDefault fontSize18">
                Giới thiệu
              </Link>
            </Row>
            <Row style={{ margin: "10px 0", textAlign: 'center' }}>
              <Link to="/#" className="textDefault fontSize18">
                Báo chí
              </Link>
            </Row>
            <Row style={{ margin: "10px 0", textAlign: 'center' }}>
              <Link to="/#" className="textDefault fontSize18">
                Cơ hội việc làm
              </Link>
            </Row>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col
            span={6}
            style={{
              height: "1px",
              backgroundColor: "#000000",
              marginBottom: "20px"
            }}
          />
        </Row>
        <Row type="flex" justify="center" className="tittleDefaut fontSize14">
          2019 © Bản quyền thuộc về HomestayHub.vn
        </Row>
      </Footer>
    );
  }
}
export default FooterWeb;
