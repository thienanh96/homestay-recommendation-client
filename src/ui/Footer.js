import React from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

class FooterWeb extends React.Component {
  render() {
    return (
      <Footer style={{
        zIndex: 3
      }}>
        <Row type="flex" justify="center">
          <Link to="/#">
            <img src="./icons/iconFb.png" alt="Facebook" />
          </Link>
          <Link to="/#">
            <img
              src="./icons/iconFb.png"
              alt="Instagram"
              style={{
                margin: "0 15px"
              }}
            />
          </Link>

          <Link to="/#">
            <img src="./icons/iconFb.png" alt="Facebook" />
          </Link>
        </Row>
        <Row type="flex" justify="space-around" style={{ margin: "30px 0" }}>
          <Col>
            <Row
              className="tittleDefaut fontSize18"
              style={{ margin: "10px 0" }}
            >
              Về 12Go.vn
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Điều khoản dịch vụ
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Giới thiệu
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Báo chí
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Cơ hội việc làm
              </Link>
            </Row>
          </Col>

          <Col>
            <Row
              className="tittleDefaut fontSize18"
              style={{ margin: "10px 0" }}
            >
              Chủ nhà
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Nên tham gia vì?
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Ứng dụng của chủ nhà
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Trợ giúp
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Kinh nghiệm
              </Link>
            </Row>
          </Col>

          <Col>
            <Row
              className="tittleDefaut fontSize18"
              style={{ margin: "10px 0" }}
            >
              Phượt thủ
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Địa danh hấp dẫn
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Giới thiệu chủ nhà
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Chia sẻ trải nghiệm
              </Link>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Link to="/#" className="textDefault fontSize18">
                Trợ giúp
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
          2019 © Bản quyền thuộc về 12Go.vn
        </Row>
      </Footer>
    );
  }
}
export default FooterWeb;
