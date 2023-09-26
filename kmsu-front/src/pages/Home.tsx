import { useRef } from 'react';
import Components from "../components";
import ScreenCapture from '../apis/ScreenCapture';
import axios from 'axios';

function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const handleCaptureStart = () => {
    const SC = new ScreenCapture();
    SC.startCapture(videoRef)
  }

  const getSnapShot = () => {
    if (!videoRef.current){
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.style.width = '320px';
    canvas.style.height = '320px';
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    canvas.width = 720;
    canvas.height = 720;

    ctx.drawImage(videoRef.current, 0, 0);

    canvasWrapperRef.current?.appendChild(canvas);
  }

  const handleSubmit = () => {
    const children = canvasWrapperRef.current?.children;
    const canvasURLArray: string[] = [];

    for (let i = 0; children && i < children.length; i++) {
      // @ts-ignore
      const childCanvas:HTMLCanvasElement = children[i];
      canvasURLArray.push(childCanvas.toDataURL());
    }

    axios.post('localhost:3001/guildRecognition', {
      URLArray: canvasURLArray
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return <Components.Wrapper>
    <button onClick={handleCaptureStart}>화면 Capture 시작</button>
    <button onClick={getSnapShot}>비디오 Capture</button>
    <button onClick={handleSubmit}>전송</button>
    {/* <button onClick={handleCropGuildPage}>길드창 뽑아내기</button> */}
    <div>
      <video ref={videoRef} width={400} height={400} crossOrigin="anonymous" style={{ display: 'none' }}/>
      <div className='CanvasWrapper' ref={canvasWrapperRef}>

      </div>
      {/* <canvas ref={canvasRef}/> */}
    </div>
  </Components.Wrapper>
}

export default Home;