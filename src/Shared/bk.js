import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import './masterPage.css';
import { Container, Header, Content, Footer, Sidebar, Navbar, Nav, Dropdown, Icon, Sidenav } from 'rsuite';
import * as FaIcons from 'react-icons/fa';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

//Elemts
// import Footer from '../Componentes/Elements/Footer/Footer';
import {LoginAction_CerrarSesion} from '../Acciones/Login/LoginAction';

export const masterPage =  (ComposedComponent) => {      
    
    class global extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
              expand: false,
              navbar: {
                width:'100%'
              }
            };
            this.handleToggle = this.handleToggle.bind(this);
          }

          handleToggle() {
            
            let navbarNew = '';

            if(!this.state.expand){
                navbarNew = {
                    width:'85%'
                }
            }else{
                navbarNew = {
                    width:'100%'
                }
            }
            
            this.setState({
              expand: !this.state.expand,
              navbar: navbarNew,  
            });

          }

          render() {

            const { expand } = this.state;
            const { location, history } = this.props

            
            return (
              <div className="show-fake-browser sidebar-page">
                <Container>
                    <Sidebar
                        style={{ display: 'flex', flexDirection: 'column', height:'100%'}}
                        width={expand ? '15%' : '56px'}
                        collapsible
                    >
                        <Sidenav expanded={expand} className="sidebar-body">
                            <Nav>
                                <Nav.Item eventKey="1" active icon={<Icon icon="avatar" style={{color:'#FFF'}} />}>
                                    <span className="sidebar-header-labels"> MDS Software</span>
                                </Nav.Item>
                                <hr style={{marginLeft:'5%', marginRight:'5%', width:'90%'}}/>
                                <Nav.Item eventKey="2" active icon={<Icon icon="book" style={{color:'#FFF'}} />} onSelect={() => history.push(`/V3/Covid-19/ListByCountries`)}>
                                    <span className="sidebar-body-labels">List By Countries</span>
                                </Nav.Item>
                                <Nav.Item eventKey="3" active icon={<Icon icon="task" style={{color:'#FFF'}} />}>
                                    <span className="sidebar-body-labels">Gestión de Operaciones</span>
                                </Nav.Item>
                                <Nav.Item eventKey="4" active icon={<Icon icon="sliders" style={{color:'#FFF'}} />}>
                                    <span className="sidebar-body-labels">Perfiles</span>
                                </Nav.Item>
                                <Nav.Item eventKey="5" active icon={<Icon icon="character-authorize" style={{color:'#FFF'}} />}>
                                    <span className="sidebar-body-labels">Roles</span>
                                </Nav.Item>
                                <Nav.Item eventKey="6" active icon={<Icon icon="group" style={{color:'#FFF'}} />}>
                                    <span className="sidebar-body-labels">Usuarios</span>
                                </Nav.Item>
                                <Nav.Item eventKey="7" active icon={<Icon icon="bar-chart" style={{color:'#FFF'}} />}>
                                    <span className="sidebar-body-labels">Reportes</span>
                                </Nav.Item>
                            </Nav>
                        </Sidenav>
                    </Sidebar>
        
                  <Container>
                    <Header>
                    <nav className='sidebar' style={this.state.navbar}>
                        <div className='sidebar-container'>
                        <div className='content-left'>
                            <Nav pullRight>
                                <Nav.Item onClick={this.handleToggle}  style={{ width: 56, textAlign: 'center' }}>
                                    <Icon icon={expand ? 'angle-left' : 'bars'}  style={{color: '#1d43ad'}}/>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className='content-right'>
                            <div className='right-container'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="40" height="40" viewBox="0 0 32 32"
                            >
                                <g transform="translate(-1093 -16.291)">
                                <circle style={{fill:'#E7E7EE'}} cx="16" cy="16" r="16" transform="translate(1093 16.291)"/>
                                <path style={{fill:'#3b3798'}} d="M133.942,21.313a3.949,3.949,0,1,0-3.955-3.955A3.956,3.956,0,0,0,133.942,21.313Zm0-6.867a2.912,2.912,0,1,1-2.912,2.912A2.92,2.92,0,0,1,133.942,14.446Z" transform="translate(974.749 11.139)"/><path className="b" d="M.522,346.41H14.256a.518.518,0,0,0,.522-.522,4.968,4.968,0,0,0-4.962-4.962H4.962A4.968,4.968,0,0,0,0,345.888.518.518,0,0,0,.522,346.41Zm4.441-4.441H9.815a3.916,3.916,0,0,1,3.882,3.4H1.08A3.927,3.927,0,0,1,4.962,341.969Z" transform="translate(1101.326 -307.782)"/></g></svg>
                            <div>
                                <p className='nombre-user'>Prueba</p>
                                <p className='email-user'>Prueba</p>
                            </div>
                            <svg 
                                onClick={() => {
                                LoginAction_CerrarSesion();
                                    // history.push('/Home')
                                }}  
                                xmlns="http://www.w3.org/2000/svg" 
                                width="30" 
                                height="30"
                                viewBox="0 0 24 24" 
                                style={{fill:'#E7E7EE'}}><g transform="translate(0 -0.85)"><g transform="translate(0 0.85)"><g transform="translate(0 0)"><path className="a" d="M11.444,22.85H2.861a.978.978,0,0,1-.954-1v-18a.978.978,0,0,1,.954-1h8.583a.977.977,0,0,0,.954-1,.977.977,0,0,0-.954-1H2.861A2.937,2.937,0,0,0,0,3.85v18a2.937,2.937,0,0,0,2.861,3h8.583a1,1,0,0,0,0-2Z" transform="translate(0 -0.85)"/></g></g><g transform="translate(8.665 6.174)"><path className="a" d="M185.151,113.161l-5.8-5.722a.954.954,0,0,0-1.339,1.358l4.144,4.089h-11.1a.954.954,0,0,0,0,1.907h11.1l-4.144,4.089a.954.954,0,1,0,1.339,1.358l5.8-5.722a.953.953,0,0,0,0-1.358Z" transform="translate(-170.1 -107.165)"/></g></g></svg>
                            </div>
                        </div>
                        </div>
                    </nav>
                    </Header>
                    <Content>
                        {/* <div className='body-container'> */}
                            <ComposedComponent {...this.props} />
                        {/* </div> */}
                    </Content>
                  </Container>
                </Container>
              </div>
            );
          }
    }

    return withRouter(global);
}