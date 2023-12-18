import React, { useState, useRef } from "react";

import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import Button from "../../ui/Button/Button";
import axios from "axios";

import "react-image-crop/dist/ReactCrop.css";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import useUser from "../../hooks/useUser";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const CropBox = () => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(undefined > 16 / 9);
  const [uploading, setUploading] = useState(false);
  const { uploadAvatar } = useUser();

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    setUploading(true);
    try {
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error("Crop canvas does not exist");
      }

      // This will size relative to the uploaded image
      // size. If you want to size according to what they
      // are looking at on screen, remove scaleX + scaleY
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const offscreen = new OffscreenCanvas(
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );
      const ctx = offscreen.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        offscreen.width,
        offscreen.height
      );

      const cloudname = "dixxfsshj";
      const upload_preset = "magic_post_uet";

      const blob = await offscreen.convertToBlob({
        type: "image/png",
      });
      const formData = new FormData();
      formData.append("file", await blobToBase64(blob));
      formData.append("upload_preset", upload_preset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        formData
      );
      const { secure_url } = response.data;
      await uploadAvatar(secure_url);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className="Cropbox">
      <div className="Crop-Controls">
        <input
          style={{ display: "none" }}
          id="upload"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
        {!imgSrc && (
          <Button
            className={"action"}
            text={"Chọn ảnh"}
            onClick={() => {
              document.getElementById("upload").click();
            }}
          />
        )}
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          // minWidth={400}
          minHeight={100}
          // circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div style={{ display: "none" }}>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Button
              text={uploading ? "Đang tải lên..." : "Chọn ảnh"}
              className={"submit"}
              onClick={onDownloadCropClick}
            />
            <Button
              text={"Chọn ảnh khác"}
              className={"action"}
              onClick={() => {
                document.getElementById("upload").click();
              }}
            />
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default CropBox;
