
import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';
import FAIcon from '../../component/faicon'
import './index.scss'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

const header_key = 'yt_'

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    convertSidebarMenu(menuData, key) {

        return menuData.map((val, index) => {
            if (val.children && val.children.length != 0) {
                return (
                    <SubMenu key={key + val.path} title={<span><FAIcon name={val.icon}/><span>{val.name}</span></span>}>
                        {
                            this.convertSidebarMenu(val.children, key)
                        }
                    </SubMenu>
                )

            } else {
                return (
                    <Item key={key + val.path}>
                        <Link to={val.path}><FAIcon name={val.icon}/><span>{val.name}</span></Link>
                    </Item>
                )

            }
        })
    }

    getSideBarMenu() {
        let menuData = this.props.menuData;
        return this.convertSidebarMenu(menuData, header_key)
    }

    getMenuPath(menuData, pathName) {
        let menuPath = []
        let currentPath = pathName.split('/')

        function getPath(data, pathName, parentPath) {
            if (!data) return

            for (let i = 0; i < data.length; i++) {
                let path = parentPath.slice()
                path.push(data[i].path)
                if (data[i].path == pathName) {
                    menuPath = path
                    break
                } else {
                    getPath(data[i].children, pathName, path)
                }
            }
        }

        while (menuPath.length === 0 && currentPath.length > 1) {
            getPath(menuData, currentPath.join('/'), [])
            currentPath.pop()
        }

        // menuPath array     current array
        return {
            menuPath: menuPath.slice(0, menuPath.length - 1).map(v => header_key + v),
            current: menuPath.slice(menuPath.length - 1, menuPath.length).map(v => header_key + v)
        }
    }


    render() {
        const { menuData } = this.props;
        const mini = this.props.miniMode
        const mode = mini ? 'vertical' : 'inline'
        const pathname = this.props.location.pathname === '/' ? '/home' : this.props.location.pathname

        const {current} = this.getMenuPath(menuData, pathname)

        let openKeys = [];

        menuData.map((record)=> {
           if (record.path == pathname) {
           } else if (record.children && record.children.length != 0) {
             record.children.map((item)=> {
                if (item.path == pathname) {
                  openKeys = [header_key+record.path];
                }
             })
           }
        })
        let key = ''
        if (menuData && openKeys.length != 0) {
          key = pathname;
        }

        return (
            <div className="sidebarName">
            <aside className="yt-admin-framework-sidebar">
                <Menu theme="light"
                      defaultOpenKeys={openKeys}
                      selectedKeys={current}
                      mode={mode}
                      key={key}
                >
                    {
                        this.getSideBarMenu()
                    }
                </Menu>
            </aside>
            </div>
        )
    }
}

export default Sidebar
