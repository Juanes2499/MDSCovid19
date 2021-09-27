import React,{useState} from 'react'
import { Sidenav, Nav, Icon, Dropdown } from 'rsuite';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'

const Sidemenu = ({show, dataMenu, homePage}) => {

    const [activeKey, setActiveKey] = useState(1)

    const handleSelect = (eventKey) =>{
        setActiveKey(eventKey)
    };
    
    const history = useHistory()
    
    return (
        <div style={{ width:400, zIndex:1, position:'absolute'}}>
            <Sidenav
                expanded={show}
                activeKey={activeKey}
                onSelect={handleSelect}
                appearance="default"
            >
                <Sidenav.Header>
                    <div style={{padding:18, height:56, backgroundColor: 'rgba(225, 227, 227, 0.863)', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <Icon icon="creative" size="lg" style={{ verticalAlign: 0, color:'rgb(85, 85, 85)'}} />
                        <span style={{fontFamily:'Roboto', fontSize:20, fontWeight:'bold', color:'rgb(85, 85, 85)', marginLeft: 13 }}> ResCity</span>
                    </div>
                </Sidenav.Header>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item
                            onClick={()=>history.push(homePage)}
                            icon={<Icon icon='dashboard' />}
                        >
                            <span  onClick={()=>history.push(homePage)} style={{fontFamily:'Roboto', fontWeight:'lighter', fontSize:'100%'}}>Dashboard</span>
                        </Nav.Item>
                        {
                            dataMenu.map((item,index) => {
                                return(
                                    <Dropdown
                                        key={index}
                                        placement="rightStart"
                                        eventKey={item.orden+1}
                                        title={<span style={{fontFamily:'Roboto', fontWeight:'lighter', fontSize:'100%'}}>{item.title}</span>}
                                        icon={<Icon icon={item.icon} />}
                                    >
                                        {
                                            item.subNav.map((itemSubNav, indexSubNav) => {
                                                return(
                                                    <Dropdown.Item 
                                                        key={indexSubNav}
                                                        onSelect={() => history.push(`${itemSubNav.path}`)} 
                                                        eventKey={`${item.orden+1}-${itemSubNav.orden}`}
                                                    >
                                                        <i className={`${itemSubNav.icon}`} style={{marginRight:'10%'}}/>
                                                        <span style={{fontFamily:'Roboto', fontWeight:'lighter'}}>{itemSubNav.title}</span>
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown>
                                )
                            })
                        }
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
}

export default Sidemenu;
