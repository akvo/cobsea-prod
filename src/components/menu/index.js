import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Fade as Hamburger } from 'hamburger-react';
import './style.scss';
import { useState, useEffect, useRef } from 'react';
import { Dropdown, Menu, Drawer } from 'antd';
import { DropdownIcon } from 'components/icons';

const menuList = [
  {
    key: 'Knowledge Hub',
    id: 'Knowledge Hub',
    children: [
      {
        to: '/knowledge-hub',
        title: 'Library',
        key: 'Library',
        id: 'Library',
        subtitle: 'Resources on marine litter and plastic pollution',
      },
      {
        to: '/case-studies',
        title: 'Case Studies',
        key: 'Case Studies',
        id: 'Case Studies',
        subtitle: 'Resources on marine litter and plastic pollution',
      },
      {
        to: '/knowledge/learning-centre',
        title: 'Learning Centre',
        key: 'Learning Centre',
        id: 'Learning Centre',
        subtitle: 'Learning and capacity development resources',
        iconClass: 'learning',
      },
    ],
  },
  {
    key: 'Data Hub',
    id: 'Data Hub',
    children: [
      {
        key: 'Reasearch Database',
        id: 'Reasearch Database',
        to: '/research/about',
      },
      {
        key: 'Maps',
        id: 'Maps',
        link: 'https://globalplasticshub.org/data/maps',
      },
      {
        key: 'Country Dashboard',
        id: 'Country Dashboard',
        link: 'https://globalplasticshub.org/country-dashboard',
      },
    ],
  },
  {
    key: 'Community Hub',
    id: 'Community',
    children: [
      {
        key: 'Reasearch Network',
        id: 'GPML Community',
        to: '/research-network',
      },
      {
        key: 'Events',
        id: 'Events',
        link: 'https://www.unep.org/cobsea/events',
      },
      {
        key: 'Partner Network',
        id: 'Partner Network',
        link: 'https://globalplasticshub.org/community-hub',
      },
    ],
  },
  {
    key: 'About',
    id: 'About',
    children: [
      {
        key: 'About Us',
        id: 'About Us',
        to: '/about-us',
      },
      {
        key: 'Contact Us',
        id: 'Contact Us',
        to: '/contact-us',
      },
    ],
  },
];

const MenuBar = ({ landing }) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  let headerHeight = useRef(0);

  useEffect(() => {
    headerHeight.current = document.getElementById('header')?.clientHeight;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClose = () => setVisible(false);

  const renderMenuItems = () =>
    menuList.map((item) => (
      <Dropdown
        key={item.id}
        placement="bottom"
        overlayClassName="nav-menu-item"
        overlay={
          <Menu>
            {item.children.map((child) => (
              <Menu.Item key={child.id}>
                {child.to ? (
                  <Link to={child.to}>{child.key}</Link>
                ) : (
                  <a
                    href={child.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {child.key}
                  </a>
                )}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <button
          type="button"
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          {item.key} <DropdownIcon />
        </button>
      </Dropdown>
    ));

  return (
    <>
      <header
        id="header"
        className={classNames('nav-header', { 'at-landing': landing })}
      >
        <div className="ui container">
          <Link to="/" className="logo-a">
            <div className="logo-container">
              <div className="combined">
                <img src="/unep.svg" className="unep" alt="UNEP" />
                <img src="/cobsea.svg" alt="COBSEA" />
              </div>
            </div>
          </Link>

          {isMobile ? (
            <>
              <Hamburger toggled={visible} toggle={setVisible} />
              <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                bodyStyle={{ padding: 0 }}
              >
                <Menu mode="inline">
                  {menuList.map((item) => (
                    <Menu.SubMenu key={item.key} title={item.key}>
                      {item.children.map((child) => (
                        <Menu.Item key={child.id}>
                          {child.to ? (
                            <Link to={child.to}>{child.key}</Link>
                          ) : (
                            <a
                              href={child.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {child.key}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ))}
                </Menu>
              </Drawer>
            </>
          ) : (
            <ul className="ant-menu">{renderMenuItems()}</ul>
          )}
        </div>
      </header>
    </>
  );
};

export default MenuBar;
