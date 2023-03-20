import React from 'react'
import './footer.css'

const Footer = () => (
  <footer className='web-footer-container align-c' data-testid='web-page-main-footer'>
    <p className='footer-p padding-l-xxl'>
      © Zenitech. All rights reserved
    </p>
    <a 
      href="https://zenitech.co.uk" 
      className='decorate-none padding-r-xxl' 
      target="_blank" 
      rel="noreferrer"
    >
      zenitech.co.uk
    </a>
  </footer>
)

export default Footer;