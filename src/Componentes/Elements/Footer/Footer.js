import React from 'react'
import './Footer.css';
import logoSapphireSoftware from '../../../Logos/LogoSapphireSoftware.png'

function Footer() {
    return (
        <div>
            <footer className='footer'>
                <div className='footer-container'>
                    <div className='content-logo'>
                        <img src={logoSapphireSoftware} alt="logoSapphireSoftware" style={{height:'30px',width:'120px'}}/>
                    </div>
                    <div className='content-copyRigth'>
                        <span className='copyRigth'>Copyrigth {new Date().getFullYear()}</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
