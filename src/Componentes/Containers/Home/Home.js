import React, {Component } from 'react';
import HeroSection from '../../Elements/HeroSection/HeroSection';
import videoHome from '../../../Videos/Home/HomeVideo.mp4';
import imageHome from '../../../Imagenes/Home/Covid19.png'
import login from '../../Modals/Login/Login';
import '../../../App.css';

class Home extends Component{
  render() {
    return (
      <div>
        <HeroSection 
          type = 'image'
          srcVideo={videoHome}
          srcImg = {imageHome}
          tittle=''
          tittle2=''
          subtitulo=''
          footer=''
          login={login}
        />
      </div>
    );
  }
}


export default Home;
