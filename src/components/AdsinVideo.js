import React, { useEffect, useRef, useState } from 'react';

const AdsinVideo = () => {
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoSource, setVideoSource] = useState('https://cdn.pixabay.com/video/2024/04/13/207829_large.mp4');
  const [ads, setAds] = useState(false);
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    videoads();
  }, []);

  const videoads = () => {
    const video2 = document.getElementById('video2');
    if (video2) {
      video2.style.display = "none";
    }
  };

  const handleLoadedMetadata = (event) => {
    const duration = event.target.duration;
    setVideoDuration(duration);
  };

  const handlePlayButtonClick = () => {
    const video = document.getElementById('video');
    video.play().catch(error => {
      console.error('Play error', error);
    });
    startCounter();
  };

  const handlePauseButtonClick = () => {
    const video = document.getElementById('video');
    video.pause();
    clearInterval(intervalId);
  };

  const startCounter = () => {
    const id = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handlerunvideo2 = ()=>{
    const video2 = document.getElementById('video2');
    video2.play()
  }

  const handleforads = () => {
    const video = document.getElementById('video');
    const video2 = document.getElementById('video2');
    if (video2) {
      video2.style.display = "block";
      handlerunvideo2()
    }
    if (video) {
      video.pause();
      video.style.display = "none";
    }
    setAds(true);
  };

  const handleremoveads = () => {
    const video = document.getElementById('video');
    const video2 = document.getElementById('video2');
    if (video2) {
      video2.style.display = "none";
      video2.pause();
    }
    if (video) {
      video.style.display = "block";
      video.play();
    }
    setAds(false);
  };

  const handleTimeUpdate = (event) => {
    const currentTime = Math.round(event.target.currentTime);
  };


  useEffect(()=>{
    if (counter === 7) {
      handleforads();
    }
    if (counter >= 19 && counter <= 21) {
      handleremoveads();
    }
    if (Math.round(videoDuration) === counter) {
      clearInterval(intervalId);
    }
  },[counter])

  return (
    <>
    {/* https://cdn.pixabay.com/video/2019/12/06/29881-378294323_large.mp4 */}
      <section className='main_container'>
        <div className='main_wrapper'>
          <div style={{ width: '500px', height: '500px', backgroundColor: 'black' }}>
            <video id="video" style={{ width: '500px', height: '500px' }} onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={handleTimeUpdate}>
              <source src={videoSource} type="video/mp4" id='source' />
            </video>
            {ads &&
              <video style={{ width: '500px', height: '500px' }} id="video2" ref={video2Ref}  controls>
              <source src="https://cdn.pixabay.com/video/2019/12/06/29881-378294323_large.mp4" type="video/mp4" id='source' />
              </video>
            }
          </div>
          <button onClick={handlePlayButtonClick} style={{ marginRight: '10px' }}>Play Video</button>
          <button onClick={handlePauseButtonClick}>Pause Video</button>
        </div>
      </section>
      {videoDuration && (
        <p style={{ fontSize: '20px', textAlign: 'center', paddingLeft: '40px' }}>Video length: {Math.round(videoDuration)} seconds</p>
      )}

      {ads && <p style={{ fontSize: '20px', textAlign: 'center', paddingLeft: '40px',color:'red',paddingTop:'20px' }}>Currently Ads Video Running</p>

      }

      {/* <p style={{ fontSize: '20px', textAlign: 'center', paddingLeft: '40px' }}>Counter: {counter} seconds</p> */}
    </>
  );
};

export default AdsinVideo;
