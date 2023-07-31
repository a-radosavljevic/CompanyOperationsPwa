import { useEffect, useState } from "react";
import { useRef } from "react"
import { dataURLToByteArray } from '../../utils/helper-methods'

const Camera = ({ handleTakingPhoto }) => {
    const [preview, setPreview] = useState(false)
    const [stream, setStream] = useState(false)
    const cameraRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        startCamera();
        return () => {
            if (cameraRef.current) {
                // zatvaranje strimaova za kameru nakon gasenja komponente
                stream && stream.getTracks().forEach(function (track) {
                    track.stop();
                });
                cameraRef.current.srcObject = null;
            }
        }
    }, [])

    useEffect(() => {
        if (stream) {
            if (cameraRef.current) {
                cameraRef.current.srcObject = stream;
            }
        }
    }, [stream])

    const startCamera = async () => {
        try {
            setStream(await navigator.mediaDevices.getUserMedia({ video: true }));
        } catch (err) {
            console.error(err);
        }
    }

    const takePhoto = () => {
        if (cameraRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = cameraRef.current.videoWidth;
            canvasRef.current.height = cameraRef.current.videoHeight;
            context.drawImage(cameraRef.current, 0, 0, cameraRef.current.videoWidth, cameraRef.current.videoHeight);
            const photoDataUrl = canvasRef.current.toDataURL('image/jpg');
            const photo = dataURLToByteArray(photoDataUrl);
            setPreview(true);
            handleTakingPhoto(photo, 'jpg');
        }
    }

    return (
        <>
            <video name='content' ref={cameraRef} style={{ display: preview ? 'none' : 'block' }} autoPlay playsInline></video>
            <canvas ref={canvasRef} style={{ display: preview ? 'block' : 'none' }}></canvas>
            {!preview && <button className="btn btn-outline-primary" onClick={takePhoto}>Fotografiši</button>}
            {preview && <button className="btn btn-outline-primary" onClick={() => setPreview(false)}>Fotografiši ponovo</button>}
        </>
    )
}

export default Camera;