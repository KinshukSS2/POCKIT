import { Link } from "react-router-dom";
import Threads from './Threads';

export default function Home() {
  return (
    <div
    
      style={{
        width: '100%',
        height: '100vh', // Full screen height
        position: 'relative',
        backgroundColor: '#0b0b1d',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Overlay text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <h1 style={{ color: '#fff',
    fontWeight: 100,
    fontSize: '7rem',
    letterSpacing: '0.1em',
    lineHeight: '1.2',
    margin: 0, }}>
          Explore the unexplored
        </h1>
        <div style={{ marginTop: '1.5rem' }}>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              marginRight: '1rem',
              borderRadius: '2rem',
              border: 'none',
              fontWeight: '600',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <Link
              to="/MainDashBoard"
              style={{
                textDecoration: 'none',
                color: '#000',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'inline-block',
              }}
            >
              Smart Wallet
            </Link>
          </button>

          <button
  style={{
    padding: '0.75rem 1.5rem',
    marginRight: '1rem',
    borderRadius: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // light transparent white
    backdropFilter: 'blur(10px)', // creates blur behind
    WebkitBackdropFilter: 'blur(10px)', // for Safari
    cursor: 'pointer',
  }}
>
  <Link
    to="/about"
    style={{
      textDecoration: 'none',
      color: '#fff',
      fontSize: '1rem',
      fontWeight: '600',
      display: 'inline-block',
    }}
  >
    About Us
  </Link>
  </button>
        </div>
      </div>
      <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
    </div>
  );
}
  