import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Layout, Menu, Dropdown } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
// import CustomHeader from "./Header";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import IMAGES from "../../../assets/images";
import SIDEBAR_ITEMS from "./SidebarItems";
import { logout } from "../../../app/features/auth/auth.slice";
import PATH from "../../../Navigation/Path";

const { Header } = Layout;

const { Sider } = Layout;

const { Content } = Layout;

function PrivateLayout({ children }) {
  let sideBottomMenuItems = [];
  // if (user?.role === "user") {
  //   sideBottomMenuItems = [...SIDE_MENU_LIST.USER_BOTTOM_MENU];
  // } else {
  //   sideBottomMenuItems = [...SIDE_MENU_LIST.ADMIN_BOTTOM_MENU];
  // }
  sideBottomMenuItems = [...SIDEBAR_ITEMS[1]];
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const goToAccount = () => {
    navigate(PATH.CLIENT_ACCOUNT);
  };
  const items = [
    {
      label: "Account",
      key: "account",
      onClick: () => {
        goToAccount();
      },
    },
    {
      label: "Logout",
      key: "logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update the windowWidth state whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="private-layout">
      <Layout>
        <Sider
          className="sidebar"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapse, type) => {
            console.log(collapse, type);
          }}
          trigger={null}
          collapsed={windowWidth > 768 ? false : collapsed}
          width="260px"
        >
          <div className="d-flex align-items-center justify-content-center">
            {/* <img src={IMAGES.LOGO} alt="logo" className="mr-3" /> */}
            <p className="fs-lg text-black fw-heavy p-4">UML Logo</p>
            <CloseSquareOutlined
              onClick={() => setCollapsed(!collapsed)}
              className="sidebar-trigger-collapsed close-icon"
              style={{ fontSize: "18px", color: "#fff" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sideBottomMenuItems}
          />
          <div style={{ height: "100px" }} />
        </Sider>
        <Layout
          className={`${
            windowWidth > 768 ? "sider-not-collapsed" : "sidercollapsed"
          }`}
        >
          {/* <CustomHeader /> */}
          <Header
            style={{
              position: "fixed",
              top: 0,
              left: windowWidth > 768 ? "260px" : 0,
              right: 0,
              zIndex: 8,
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <h1 className="page-title d-none d-md-block">My Gene Data</h1>
            <FaBars
              size="22"
              className={`d-block d-md-none ${
                collapsed ? "" : "visibility-none"
              } trigger align-self-center sidebar-trigger-large cursor-pointer text-purple`}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div className="d-flex align-items-center">
              <AiOutlineBell size="32" />
              <img
                className="user-avatar ml-3"
                src={IMAGES.USER_AVATAR}
                alt="user"
              />
              <Col className="ml-3 d-none d-lg-block">
                <p className="m-0 font-md fw-bold text-black">Robert Fox</p>
                <p className="m-0 font-sm text-black">Coach</p>
              </Col>
              <Dropdown
                className="cursor-pointer"
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <IoIosArrowDown size="20" className="ml-3" />
              </Dropdown>
            </div>
          </Header>
          <Content>
            <div className="layout-child">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivateLayout;
