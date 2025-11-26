"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { isView } from "@/config/view";

interface HlsPlayerProps {
  src: string; // URL ke file index.m3u8 kamu
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  onError?: (error: any) => void;
  maxRetries?: number; // Maksimal retry attempts
  retryDelay?: number; // Delay antar retry (ms)
}

export default function HlsPlayer({
  src,
  autoPlay = true,
  controls = true,
  muted = true,
  onError,
  maxRetries = 5,
  retryDelay = 3000,
}: HlsPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = isView("mobile");

  // Function untuk cleanup
  const cleanup = () => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  };

  // Function untuk retry loading
  const retryLoading = () => {
    if (retryCount >= maxRetries) {
      console.error(`Max retries reached (${maxRetries}). Stopping retry attempts.`);
      setError(`Failed to load after ${maxRetries} attempts`);
      setIsRetrying(false);
      return;
    }

    console.log(`Retrying to load HLS stream... Attempt ${retryCount + 1}/${maxRetries}`);
    setIsRetrying(true);
    setError(null);

    retryTimeoutRef.current = setTimeout(() => {
      setRetryCount(prev => prev + 1);
      initializePlayer();
    }, retryDelay);
  };

  // Function untuk initialize player
  const initializePlayer = () => {
    const video = videoRef.current;
    if (!video) return;

    // Reset states
    setIsLoading(true);
    setError(null);
    setIsRetrying(false);

    // Clear any existing HLS instance
    cleanup();

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari (native support)
      video.src = src;

      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => {
        setIsLoading(false);
        setRetryCount(0); // Reset retry count on successful load
      };
      const handleError = (e: any) => {
        const errorMsg = `Video error: ${e.message || 'Unknown error'}`;
        console.error("Native video error:", e);
        setError(errorMsg);
        onError?.(e);

        // Auto retry for native video errors
        if (retryCount < maxRetries) {
          retryLoading();
        }
      };

      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // Cleanup listeners
      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };

    } else if (Hls.isSupported()) {
      // Browser lain pakai hls.js
      const hls = new Hls({
        // Konfigurasi untuk live streaming yang lebih responsif
        lowLatencyMode: true,
        backBufferLength: 90,

        // Live sync settings - lebih agresif untuk update terbaru
        liveSyncDuration: 1,
        liveMaxLatencyDuration: 5,
        liveDurationInfinity: true,

        // Buffer settings - lebih kecil untuk responsivitas
        maxBufferLength: 10,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,

        // Loading timeouts dengan retry yang lebih agresif
        manifestLoadingTimeOut: 10000,
        fragLoadingTimeOut: 10000,
        manifestLoadingRetryDelay: 1000,
        levelLoadingRetryDelay: 1000,
        fragLoadingRetryDelay: 1000,

        // Retry attempts
        manifestLoadingMaxRetry: 3,
        levelLoadingMaxRetry: 3,
        fragLoadingMaxRetry: 3,

        // Worker dan performance
        enableWorker: true,
        startFragPrefetch: true,

        // CORS settings
        xhrSetup: (xhr, url) => {
          xhr.setRequestHeader('Cache-Control', 'no-cache');
          xhr.setRequestHeader('Pragma', 'no-cache');
        },
      });

      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      // Event listeners untuk monitoring
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Manifest parsed, starting playback");
        setIsLoading(false);
        setRetryCount(0); // Reset retry count on successful load
      });

      hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
        console.log(`Fragment loaded: ${data.frag.sn}, duration: ${data.frag.duration}`);
      });

      hls.on(Hls.Events.LEVEL_UPDATED, (event, data) => {
        console.log("Level updated with new fragments");
      });

      // Enhanced error handling dengan auto retry
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);

        if (data.fatal) {
          const errorMsg = `Fatal error: ${data.reason || data.type}`;
          setError(errorMsg);

          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log("Network error - attempting recovery...");
              if (retryCount < maxRetries) {
                setTimeout(() => {
                  if (hlsRef.current) {
                    hlsRef.current.startLoad();
                  }
                }, 1000);
              } else {
                console.log("Network error - starting full retry...");
                retryLoading();
              }
              break;

            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("Media error - attempting recovery...");
              try {
                if (hlsRef.current) {
                  hlsRef.current.recoverMediaError();
                }
              } catch (recoveryError) {
                console.error("Recovery failed, retrying full initialization...");
                retryLoading();
              }
              break;

            case Hls.ErrorTypes.MUX_ERROR:
              console.log("Mux error - retrying...");
              retryLoading();
              break;

            default:
              console.log("Unknown fatal error, retrying...");
              retryLoading();
              break;
          }

          onError?.(data);
        } else {
          // Non-fatal errors
          console.warn("Non-fatal HLS error:", data);

          // Still retry for some non-fatal errors that might affect playback
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR && data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
            console.log("Manifest load error, retrying...");
            retryLoading();
          }
        }
      });

      // Monitor connection issues
      hls.on(Hls.Events.BUFFER_EOS, () => {
        console.log("Buffer end of stream");
      });

      hls.on(Hls.Events.BUFFER_APPENDED, () => {
        // Buffer telah di-append dengan data baru
      });

      // Monitor for stalled playback
      video.addEventListener('stalled', () => {
        console.warn("Video playback stalled, attempting recovery...");
        if (hlsRef.current && retryCount < maxRetries) {
          setTimeout(() => {
            if (hlsRef.current) {
              hlsRef.current.startLoad();
            }
          }, 2000);
        }
      });

      // Monitor for waiting state (buffering)
      let waitingTimeout: NodeJS.Timeout;
      video.addEventListener('waiting', () => {
        console.log("Video is waiting for more data...");
        // If stuck in waiting state for too long, retry
        waitingTimeout = setTimeout(() => {
          console.warn("Video stuck in waiting state, retrying...");
          if (retryCount < maxRetries) {
            retryLoading();
          }
        }, 15000); // 15 seconds timeout
      });

      video.addEventListener('playing', () => {
        if (waitingTimeout) {
          clearTimeout(waitingTimeout);
        }
      });

    } else {
      const errorMsg = "This browser does not support HLS.";
      setError(errorMsg);
      console.error(errorMsg);
    }
  };

  // Initialize player on mount and src change
  useEffect(() => {
    setRetryCount(0); // Reset retry count when src changes
    initializePlayer();

    return cleanup;
  }, [src]);

  // Force refresh setiap 30 detik untuk memastikan mendapat update terbaru
  useEffect(() => {
    const interval = setInterval(() => {
      if (hlsRef.current && hlsRef.current.media && !hlsRef.current.media.paused) {
        console.log("Force refreshing HLS stream...");
        try {
          // Method 1: Simple reload source
          const hls = hlsRef.current;
          const currentSrc = hls.url;
          const currentTime = hls.media.currentTime;

          if (currentSrc) {
            // Temporary store current time
            hls.loadSource(currentSrc);

            // Restore playback position after a short delay
            setTimeout(() => {
              if (hls.media && !isNaN(currentTime) && currentTime > 0) {
                // For live streams, seek to live edge instead
                const duration = hls.media.duration;
                if (duration && duration > 0) {
                  hls.media.currentTime = duration - 2; // 2 seconds from live edge
                }
              }
            }, 1000);
          }

        } catch (error) {
          console.error("Error during force refresh:", error);
          if (retryCount < maxRetries) {
            retryLoading();
          }
        }
      }
    }, 30000); // 30 detik

    return () => clearInterval(interval);
  }, [retryCount, maxRetries, retryLoading]);

  // Manual retry function
  const handleManualRetry = () => {
    setRetryCount(0);
    initializePlayer();
  };

  return (
    <div style={{ position: 'relative' }}>
      {(isLoading || isRetrying) && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 10,
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <div>{isRetrying ? 'Retrying...' : 'Loading...'}</div>
          {isRetrying && (
            <div style={{ fontSize: '12px', marginTop: '5px' }}>
              Attempt {retryCount + 1} of {maxRetries}
            </div>
          )}
        </div>
      )}

      {error && retryCount >= maxRetries && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          backgroundColor: 'rgba(255,0,0,0.8)',
          padding: '20px',
          borderRadius: '8px',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '300px'
        }}>
          <div style={{ marginBottom: '10px' }}>{error}</div>
          <button
            onClick={handleManualRetry}
            style={{
              padding: '8px 16px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      )}

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
        onTimeUpdate={(e) => {
          // Monitor jika video terlalu jauh dari live edge
          const video = e.currentTarget;
          if (hlsRef.current && video.duration) {
            const lag = video.duration - video.currentTime;
            if (lag > 10) {
              console.log(`Video lag detected: ${lag.toFixed(2)}s, seeking to live edge`);
              video.currentTime = video.duration - 2;
            }
          }
        }}
        onError={() => {
          // Additional error handler for video element errors
          if (retryCount < maxRetries) {
            console.log("Video element error detected, retrying...");
            retryLoading();
          }
        }}
      />
    </div>
  );
}