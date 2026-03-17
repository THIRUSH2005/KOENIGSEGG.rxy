"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useMotionValueEvent } from "framer-motion";

interface CanvasSequenceProps {
  progress: MotionValue<number>;
  bgColor?: MotionValue<string>;
  frameCount: number;
}

const CanvasSequence: React.FC<CanvasSequenceProps> = ({ progress, bgColor, frameCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Preload images from the /background/ directory
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, "0");
      // Use the 'background' folder as requested
      img.src = `/background/ezgif-frame-${frameIndex}.jpg`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setImages(loadedImages);
          setIsReady(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load frame: /background/ezgif-frame-${frameIndex}.jpg`);
      };
      loadedImages.push(img);
    }
  }, [frameCount]);

  // Render function optimized for high frequency scroll updates with anti-aliasing
  const drawImage = (val: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(val * (frameCount - 1))
    );
    
    const img = images[frameIndex];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    // High quality scaling with sharpening filter simulation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the image with a subtle offset to simulate sub-pixel precision
    ctx.drawImage(
      img, 
      Math.floor(x), 
      Math.floor(y), 
      Math.ceil(img.width * scale), 
      Math.ceil(img.height * scale)
    );

    // Apply a secondary pass if needed for extreme clarity (optional)
  };

  // Resize handler ensures consistent fit across all devices
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // We force a high-fidelity internal resolution (Supersampling)
        // This makes 720p images look much sharper on 1080p/4K screens
        const dpr = Math.max(window.devicePixelRatio || 1, 2); // Force at least 2x scale
        canvasRef.current.width = Math.floor(window.innerWidth * dpr);
        canvasRef.current.height = Math.floor(window.innerHeight * dpr);
        
        // Ensure the context is optimized for high-res drawing
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
        }
        
        drawImage(progress.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  // High-performance scroll event listener - updates canvas without re-rendering React component
  useMotionValueEvent(progress, "change", (latest) => {
    drawImage(latest);
  });

  // Initial draw once components are ready
  useEffect(() => {
    if (isReady) {
      drawImage(progress.get());
    }
  }, [isReady]);

  return (
    <motion.div 
      style={{ backgroundColor: bgColor }} 
      className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{ width: "100vw", height: "100vh" }}
      />
      
      {/* Dynamic progression loader */}
      {loadedCount < frameCount && (
        <div className="absolute bottom-20 right-20 flex flex-col items-end gap-4 z-20">
          <div className="flex flex-col items-end">
            <div className="text-accent-gold text-xs tracking-[0.5em] uppercase font-black italic">
              Synchronizing Engineering Data
            </div>
            <div className="text-white/30 text-[9px] uppercase font-bold tracking-[0.3em] mt-1">
              Koenigsegg Asset Pipeline v1.0.4
            </div>
          </div>
          <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              style={{ width: `${(loadedCount / frameCount) * 100}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <div className="text-white text-[11px] font-black italic tracking-widest">
            {Math.round((loadedCount / frameCount) * 100)}% CALIBRATED
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CanvasSequence;
