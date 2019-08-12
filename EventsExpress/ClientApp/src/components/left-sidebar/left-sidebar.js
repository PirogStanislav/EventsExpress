import React from 'react';
import './left-sidebar.css';
import HeaderProfileWrapper from '../../containers/header-profile';
import { Link } from 'react-router-dom';

const NavItem = ({to, icon, text}) => {
    return (<li className="sidebar-header">
        <Link to={ to } className="active">
            <span className="link">
                <i className= { icon } ></i>
                <span className="hiden"> &nbsp; { text } </span>
                <strong></strong>
            </span>
        </Link>
    </li>
    );
}


const LeftSidebar = (props) =>{
    return (
    <div id="colorlib-page">
            <button id="sidebarCollapse" className="js-colorlib-nav-toggle colorlib-nav-toggle" > <i></i> </button>  
            <div id="colorlib-aside" role="complementary" className="js-fullheight">
                <HeaderProfileWrapper/>
                <nav id="colorlib-main-menu" role="navigation">

                    <ul className="list-unstyled">
                        
                        <NavItem to={'/home/events/?page=1'} icon={'fa fa-home'} text={"Home"} />
                        {props.user.id &&
                            <>
                            <NavItem to={'/user/' + props.user.id} icon={'fa fa-user'} text={"Profile"} />
                            <NavItem to={'/search/users?page=1'} icon={'fa fa-users'} text={"Seach Users"} />
                      </>
                            
                            }
                        {props.user.role === "Admin" &&
                        <>
                            <NavItem to={'/admin/categories/'} icon={'fa fa-hashtag'} text={"Categories"} />
                            
                            <NavItem to={'/admin/users?page=1'} icon={'fa fa-users'} text={"Users"} />
                            
                            <NavItem to={'/admin/events?page=1'} icon={'fa fa-calendar'} text={"Events"} />
                        </>
                        }

                        
                </ul>
            </nav>
            
        </div> </div>
            );
}

export default LeftSidebar;