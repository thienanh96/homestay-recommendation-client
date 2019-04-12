import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import Header from "./Header";
import Footer from "./Footer";

class LayoutWeb extends React.Component {
  render() {
    return (
      <Layout style={{backgroundColor: 'white'}} className="layout">
        <Header />
        {this.props.children}
        {/* <Footer /> */}
      </Layout>
    );
  }
}
export default LayoutWeb;
