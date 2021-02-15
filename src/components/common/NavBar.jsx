import React from 'react' 

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

function NavBar() {

    return(
        <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">TBD</Menu.Item>
        <Menu.Item key="3">TBD</Menu.Item>
      </Menu>
    </Header>
      

    )

}

export default NavBar

