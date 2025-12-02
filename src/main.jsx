import { Analytics } from "@vercel/analytics/react"

import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { StrictMode, Suspense } from 'react'

import Loader from './Components/Loader.jsx'
import App from './App.jsx'
import './index.css'

console.log("Hi if you notice a bug please contact me daivik1520@gmail.com")


const isMobile = () => {
    return ( ( window.innerWidth <= 1000 ) && ( window.innerHeight <= 800 ) );
  }

const root = ReactDOM.createRoot(document.querySelector('#root'))

const fovForMobile = 100
const fovForPc = 45

root.render(
    <StrictMode>
        <Canvas
            camera={{
            fov: isMobile() ? fovForMobile : fovForPc,
            near: 0.1,
            far: 200,
            position: [52, 7, 12],
        }}
        >
            <Suspense fallback={<Loader/>}>
                <App/>   
            </Suspense>

            {/*<Perf position="top-left" />*/}
        </Canvas>

        <Analytics/>
        <div style={{ display: "none" }}>
  <section aria-hidden="true">
    <h1>Daivik Reddy - AI Enthusiast</h1>
    <h2>Computer Science Student</h2>
    <h2>Python and AI Specialist</h2>
    <h2>Specialized in Artificial Intelligence and Machine Learning</h2>
  </section>
  <section aria-hidden="true">
    <h2>Skills and Expertise</h2>
    <ul>
      <li>Python Developer</li>
      <li>AI and Machine Learning Engineer</li>
      <li>Computer Vision Specialist</li>
      <li>OpenCV and MediaPipe Developer</li>
      <li>JavaScript and React Developer</li>
    </ul>
  </section>
  <section aria-hidden="true">
    <p>
      Welcome to the 3D portfolio of Daivik Reddy. This immersive portfolio has 
      been created using React Three Fiber and GSAP, with custom 3D models designed 
      in Blender. Explore innovative AI and web development projects that blend creativity and technology.
    </p>
  </section>
  <noscript>
    <p>
      This 3D portfolio of Daivik Reddy showcases creative web development and AI projects using 
      React Three Fiber, Three.js, and GSAP. Please enable JavaScript to explore 
      the immersive experience.
    </p>
  </noscript>
</div>



    </StrictMode>

        
    
)