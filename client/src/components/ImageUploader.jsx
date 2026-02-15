"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ImageUploader({
  aspectRatio = 16 / 9,
  maxSize = 5 * 1024 * 1024,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/webp"],
  onImageCropped,
  className,
}) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [open, setOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFile = (file) => {
    if (!acceptedFileTypes.includes(file.type)) {
      alert("Unsupported file type");
      return;
    }

    if (file.size > maxSize) {
      alert("File too large");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      setOpen(true);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleCropSave = async () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      canvas.toBlob((blob) => {
        onImageCropped(blob);
        setOpen(false);
      }, "image/jpeg");
    };
  };

  return (
    <>
      {/* Upload Area */}
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition 
        ${dragActive ? "border-primary bg-muted" : "border-muted-foreground/30"} 
        ${className}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <Upload className="w-10 h-10 mb-4 opacity-70" />

        <p className="text-sm">
          Drag and drop an image here or click to browse
        </p>

        <p className="text-xs text-muted-foreground mt-2">
          Accepted formats: .jpeg, .png, .webp
        </p>

        <p className="text-xs text-muted-foreground">
          Max size: {Math.round(maxSize / (1024 * 1024))}MB
        </p>

        <input
          id="fileInput"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* Crop Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <div className="relative w-full h-[400px] bg-black">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="mt-4">
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCropSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
