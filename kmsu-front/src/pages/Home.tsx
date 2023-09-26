import { useRef } from 'react';
import Components from "../components";
import ScreenCapture from '../apis/ScreenCapture';


function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return <Components.Wrapper>
    <button onClick={() => {
      const SC = new ScreenCapture();
      SC.startCapture(videoRef)
      
    }}>test</button>
    <div style={{ backgroundColor: 'red'}}>
      <video ref={videoRef} width={400} height={400}/>
    </div>
    Home
  </Components.Wrapper>
}

export default Home;