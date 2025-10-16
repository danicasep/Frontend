"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { isView } from "@/config/view";

interface HlsPlayerProps {
  src: string; // URL ke file index.m3u8 kamu
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
}

export default function HlsPlayer({
  src,
  autoPlay = false,
  controls = true,
  muted = false,
}: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = isView("mobile");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari (native support)
      video.src = src;
    } else if (Hls.isSupported()) {
      // Browser lain pakai hls.js
      const hls = new Hls({
        maxBufferLength: 10, // biar rendah latency
      });
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log("Recovering network error...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("Recovering media error...");
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        hls.destroy();
      };
    } else {
      console.error("This browser does not support HLS.");
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay={autoPlay}
      controls={controls}
      muted={muted}
      playsInline
      style={{
        width: isMobile ? "100%" : "80%",
        borderRadius: "12px",
        backgroundColor: "black",
      }}
    />
  );
}
