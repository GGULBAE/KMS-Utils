

class ScreenCapture  {
  mediaDevices: MediaDevices;
  isStreaming: Boolean;

  constructor() {
    this.mediaDevices = navigator.mediaDevices;
    this.isStreaming = false;

    console.log(this);
  }

  startCapture(ref: React.RefObject<HTMLVideoElement>) {
    if (this.isStreaming) {
      console.warn("Already capturing");
      return ;
    }
    

    this.mediaDevices.getDisplayMedia({
      video: true, audio: false
    }).then((mediaStream) => {
      this.isStreaming = true;
      
      if (!ref.current) {
        console.error("Target ref is not prepared!");
        return;
      }
      console.log(mediaStream);

      ref.current.srcObject = mediaStream;
      ref.current.play();
      console.log('srcObject');
    }).catch((error) => {
      this.isStreaming = false;

      console.error(error);
    });
  }

  endCapture() {

  }
}

export default ScreenCapture;