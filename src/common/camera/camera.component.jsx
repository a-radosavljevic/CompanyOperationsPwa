import { useEffect, useState } from "react";
import { useRef } from "react";
import { dataURLToByteArray } from "../../utils/helper-methods";
import TextDanger from "../text-danger/TextDanger.component";

const Camera = ({ handleTakingPhoto, errors }) => {
  const [preview, setPreview] = useState(false);
  const [stream, setStream] = useState(false);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const tracks = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      closeCamera();
    };
  }, []);

  useEffect(() => {
    if (stream) {
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream;
      }
      tracks.current = stream.getTracks();
    }
  }, [stream]);

  const startCamera = async () => {
    setPreview(false);
    try {
      setStream(await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }));
    } catch (err) {
      console.error(err);
    }
  };

  const closeCamera = () => {
    tracks.current.forEach(function (track) {
      track.stop();
    });
    if (cameraRef.current) {
      cameraRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    if (cameraRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = cameraRef.current.videoWidth;
      canvasRef.current.height = cameraRef.current.videoHeight;
      context.drawImage(
        cameraRef.current,
        0,
        0,
        cameraRef.current.videoWidth,
        cameraRef.current.videoHeight
      );
      const photoDataUrl = canvasRef.current.toDataURL("image/jpg");
      const photo = dataURLToByteArray(photoDataUrl);
      setPreview(true);
      handleTakingPhoto(photo, "jpg");
      closeCamera();
    }
  };

  return (
    <>
      <div className="slide-up-anim">
        <video
          name="content"
          ref={cameraRef}
          style={{ display: preview ? "none" : "block" }}
          autoPlay
          playsInline
          width="100%"
        ></video>
        <canvas
          ref={canvasRef}
          style={{ display: preview ? "block" : "none" }}
        ></canvas>
        {!preview && (
          <button
            className="btn btn-outline-primary block-btn"
            onClick={takePhoto}
          >
            Fotografiši
          </button>
        )}
        {preview && (
          <button
            className="btn btn-outline-primary block-btn"
            onClick={startCamera}
          >
            Fotografiši ponovo
          </button>
        )}
      </div>
      <TextDanger message={errors?.content}></TextDanger>
    </>
  );
};

export default Camera;
