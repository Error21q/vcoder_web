import { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import {
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { Box, Typography } from "@mui/joy";
import {
  MicNoneOutlined,
  PauseCircleOutline,
  PlayCircleOutline,
  StopCircleOutlined,
} from "@mui/icons-material";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

const AudioRecorder = (props: AudioRecorderProps) => {
  const { onRecordingComplete } = props;
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = useReactMediaRecorder({
    audio: true,
    onStop: (_, blob) => {
      onRecordingComplete(blob);
      clearInterval(intervalId as NodeJS.Timeout);
      setTimer(0);
    },
  });

  useEffect(() => {
    if (status === "recording" && !isPaused) {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else if (status !== "recording" || isPaused) {
      clearInterval(intervalId as NodeJS.Timeout);
    }

    return () => {
      clearInterval(intervalId as NodeJS.Timeout);
    };
  }, [status, isPaused]);

  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
      setIsPaused(false);
    } else {
      pauseRecording();
      setIsPaused(true);
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const mainBtnText: string =
    status === "recording" || status === "paused"
      ? formatTimer()
      : status === "idle"
      ? "Start"
      : status === "acquiring_media"
      ? "Acquiring Media"
      : "Start";

  return (
    <Card>
      <FormControl required>
        <FormLabel>
          <Typography level="title-lg">Record Your Voice</Typography>
        </FormLabel>
      </FormControl>

      <Typography
        level="body-xs"
        fontWeight={400}
        sx={{ color: "text.secondary" }}
      >
        Please take a moment to speak for at least 1 minute about your
        experience in the cryptocurrency field, your team size, and the most
        recent project you have worked on.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="soft"
          size="sm"
          onClick={startRecording}
          disabled={status === "recording" || status === "paused"}
          startDecorator={
            status === "recording" ? (
              <CircularProgress color="primary" />
            ) : (
              <MicNoneOutlined />
            )
          }
        >
          {mainBtnText}
        </Button>

        {(status === "recording" || status === "paused") && (
          <Button
            variant="soft"
            size="sm"
            color="warning"
            onClick={handlePauseResume}
            startDecorator={
              isPaused ? <PlayCircleOutline /> : <PauseCircleOutline />
            }
          >
            {isPaused ? "Resume" : "Pause"}
          </Button>
        )}

        {(status === "recording" || status === "paused") && (
          <Button
            variant="soft"
            size="sm"
            color="danger"
            onClick={stopRecording}
            disabled={status !== "recording" && status !== "paused"}
            startDecorator={<StopCircleOutlined />}
          >
            Stop
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default AudioRecorder;
