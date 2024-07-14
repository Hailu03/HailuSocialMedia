import { Link, useLocation } from "react-router-dom";
// import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import Logo from "../assets/logo.png";
import "./NavBar.css";
let { Sider } = Layout;
import { useEffect,useState } from "react";
import { HomeOutlined, SearchOutlined, HeartOutlined,MessageOutlined,UserOutlined } from "@ant-design/icons";

const NavBar = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location]);

    return (
        <Sider
            className={`navbar-container`}
            width={100}
        >
            <div className="navbar-logo-container">
                <Link to="/">
                    <img src={Logo} alt="Logo" className="navbar-logo" />
                </Link>
            </div>

            <Menu
                mode="vertical"
                className="navbar-menu-bar"
                selectedKeys={[activeMenu]}
            >
                <Menu.Item key="/" style={{ height: '76px'}}>
                    <Link to="/">
                        <HomeOutlined style={{ fontSize: '40px', padding: '15px 8px', color:'#FD6FED' }} />
                    </Link>
                </Menu.Item>
                <Menu.Item key="/search" style={{ height: '76px'}}>
                    <Link to="/search">
                        <SearchOutlined style={{ fontSize: '40px', padding: '15px 8px' , color:'#FD6FED'}} />
                    </Link>
                </Menu.Item>
                <Menu.Item key="/notification" style={{ height: '76px'}}>
                    <Link to="/notification">
                        <HeartOutlined style={{ fontSize: '40px', padding: '15px 8px', color:'#FD6FED' }} />
                    </Link>
                </Menu.Item>
                <Menu.Item key="/message" style={{ height: '76px'}}>
                    <Link to="/message">
                        <MessageOutlined style={{ fontSize: '40px', padding: '15px 8px', color:'#FD6FED'}} />
                    </Link>
                </Menu.Item>
                <Menu.Item key="/user" style={{ height: '76px'}}>
                    <Link to="/user">
                        <UserOutlined style={{ fontSize: '40px', padding: '15px 8px', color:'#FD6FED'}} />
                    </Link>
                </Menu.Item>

                
            </Menu>

        </Sider>
    )
};

export default NavBar;