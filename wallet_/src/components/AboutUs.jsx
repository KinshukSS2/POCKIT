// src/components/AboutUs.jsx
import React from 'react';
import CardSwap, { Card } from './CardSwap';
import LetterGlitch from './LetterGlitch';
import TiltedCard from './TiltedCard'; // Make sure path is correct

export default function AboutUs() {
  return (
    <div
      className="about-page"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Background glitch animation */}
      <LetterGlitch
        className="glitch-background"
        glitchSpeed={60}
        glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
        smooth={true}
        outerVignette={true}
        centerVignette={false}
      />

      {/* Foreground content */}
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column', // stack TiltedCard and CardSwap vertically
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '20px',
        }}
      >
        {/* Tilted Card Component */}
        <TiltedCard
          imageSrc="/metaqrcode.jpg" // Replace with your image path
          altText=""
          captionText="Help the community"
          imageHeight="250px"
          imageWidth="250px"
          containerHeight="260px"
          showMobileWarning={false}
          displayOverlayContent={true}
          overlayContent={
            <div style={{ color: '#fff', padding: '10px' }}>
              
            </div>
          }
        />

        {/* CardSwap animation */}
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={true}
        >
          <Card>

                  <img
          src="https://wundertrading.com/journal/upload/media/default/0001/02/thumb_1939_default_mob_big.jpeg"
          alt="Digital Ownership"
          style={{ width: '100%', borderRadius: '0.5rem', marginBottom: '1rem' }}
        />
            <h3 style={{ color: '#fff', fontSize:'1rem', fontWeight:'1rem'}}>True Digital Ownership</h3>
           
          </Card>
          <Card style={{ background: '#111', borderRadius: '1rem', overflow: 'hidden' }}>
          <img
            src="https://cdn.washingtontechnology.com/media/img/cd/2024/09/12/SecurebydesignWT20240912/860x394.jpg"
            alt="Security by Design"
            style={{
              width: '100%',
              height: '200px', // adjust as needed
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div style={{ padding: '1rem' }}>
            <h3 style={{ color: '#fff', margin: 0 }}>Security by Design</h3>
            <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
              Built with cryptographic principles and decentralized infrastructure to safeguard every interaction.
            </p>
          </div>
        </Card>
          <Card>
             <img
          src="https://images.moneycontrol.com/static-mcnews/2017/11/Rubique_Blockchain_3-e1522159134338-770x435.jpg?impolicy=website&width=1600&height=900"
          alt="Digital Ownership"
          style={{ width: '100%', borderRadius: '1px', marginBottom: '1rem' }}
        />
            <h3 style={{ color: '#fff',  fontSize:'1rem', fontWeight:'1rem'}}>You’re in Control</h3>
            
          </Card>
        </CardSwap>
      </div>
    </div>
  );
}
