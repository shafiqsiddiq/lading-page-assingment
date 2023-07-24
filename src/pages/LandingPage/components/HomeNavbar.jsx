import { Menu, Button, Drawer, Col, Layout, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

import IMAGES from "../../../assets/images";

const { Header } = Layout;
function HomeNavbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid px-5">
      <div className="navbarComponent px-5">
        <Layout className="layout">
          <Header className="home-header">
            <Row justify="space-between" align="middle">
              <Col xs={18} sm={15} md={9}>
                <div className="logo">
                  <img alt="logo" src={IMAGES.LOGO} width={65} />
                  <span className="page-title">treaty</span>
                </div>
              </Col>
              <Col xs={0} sm={0} md={15}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                  className="menu-item"
                >
                  <Menu.Item key="1" className="">
                    Home
                  </Menu.Item>
                  <Menu.Item key="2">About us</Menu.Item>
                  <Menu.Item key="3">Services</Menu.Item>
                  <Menu.Item key="4">Contact us</Menu.Item>

                  <Menu.Item key="5" className="ml-auto p-0">
                    <Button type="primary" className="navbar-btn">
                      Login / Register
                    </Button>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col sm={2} md={0}>
                <Button type="primary" onClick={showDrawer}>
                  <MenuOutlined />
                </Button>
              </Col>
            </Row>
            <Drawer
              title="Menu List"
              placement="left"
              onClick={onClose}
              onClose={onClose}
              visible={visible}
            >
              <Menu mode="vertical" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">About us</Menu.Item>
                <Menu.Item key="3">Services</Menu.Item>
                <Menu.Item key="4">Contact us</Menu.Item>
                <Menu.Item key="5" className="p-0">
                  <Button type="primary" style={{ marginRight: "10px" }}>
                    Login
                  </Button>
                  <Button>Register</Button>
                </Menu.Item>
              </Menu>
            </Drawer>
          </Header>
        </Layout>
      </div>
    </div>
  );
}

export default HomeNavbar;
