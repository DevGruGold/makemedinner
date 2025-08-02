import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
}

export const VideoUpload = ({ onVideoSelect }: VideoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onVideoSelect(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
    }
  }, [onVideoSelect, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [],
    },
    maxFiles: 1,
  });

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment", // Rear camera
          width: { ideal: 1920, max: 1920 },
          height: { ideal: 1080, max: 1080 }
        },
        audio: true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const startRecording = async () => {
    try {
      if (!showCamera) {
        await startCamera();
      }
      
      if (!videoRef.current?.srcObject) {
        throw new Error('Camera not available');
      }

      const stream = videoRef.current.srcObject as MediaStream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setPreview(url);
        
        const file = new File([blob], "recorded-video.webm", { type: "video/webm" });
        onVideoSelect(file);
        
        if (videoRef.current?.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach(track => track.stop());
          setShowCamera(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording error:', error);
      toast({
        title: "Recording Error",
        description: "Unable to start recording. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setShowCamera(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {!preview ? (
        <>
          {!showCamera ? (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-mobile p-8 text-center cursor-pointer transition-colors mobile-fade-in
                ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                {isDragActive
                  ? "Drop your video here..."
                  : "Drag and drop a video, or click to select"}
              </p>
            </div>
          ) : null}
          
          <div className="flex flex-col space-y-3">
            {!showCamera && (
              <Button
                onClick={startCamera}
                size="lg"
                className="h-[var(--mobile-button-height)] text-base font-medium mobile-bounce"
              >
                <Camera className="mr-2 h-5 w-5" />
                Open Camera
              </Button>
            )}
            
            {showCamera && (
              <>
                <div className="relative rounded-mobile overflow-hidden bg-black mobile-slide-up">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full aspect-video object-cover"
                  />
                  
                  {/* Camera controls overlay */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 px-4">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={stopCamera}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      onClick={isRecording ? stopRecording : startRecording}
                      size="icon"
                      className={`h-16 w-16 rounded-full ${
                        isRecording 
                          ? "bg-destructive hover:bg-destructive/90" 
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {isRecording ? (
                        <div className="w-6 h-6 bg-white rounded-sm" />
                      ) : (
                        <div className="w-6 h-6 bg-white rounded-full" />
                      )}
                    </Button>
                  </div>
                  
                  {isRecording && (
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                      REC
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="relative rounded-mobile overflow-hidden mobile-fade-in">
          <video
            src={preview}
            controls
            className="w-full rounded-mobile shadow-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-10 w-10 rounded-full bg-destructive/80 backdrop-blur-sm"
            onClick={clearPreview}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};