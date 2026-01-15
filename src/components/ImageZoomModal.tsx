/**
 * @fileoverview Image Zoom Modal Component
 * Displays images in a modal with zoom functionality and clean design
 * Enhanced with white background and better UI
 */
 
import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface ImageZoomModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  open,
  onClose,
  imageSrc,
  imageAlt,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Handle keyboard events
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          margin: isMobile ? 0 : theme.spacing(2),
          borderRadius: isMobile ? 0 : theme.spacing(2),
          overflow: "hidden",
          position: "relative",
          maxWidth: isMobile ? "100vw" : "95vw",
          maxHeight: isMobile ? "100vh" : "95vh",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: theme.spacing(2),
          right: theme.spacing(2),
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: theme.palette.text.primary,
          zIndex: 10,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s ease-in-out",
          width: 40,
          height: 40,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Image Title - Removed as requested */}

      <DialogContent
        sx={{
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: isMobile ? "100vh" : "70vh",
          backgroundColor: "#ffffff",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={imageAlt}
          sx={{
            width: isMobile ? "calc(100vw - 32px)" : isTablet ? "85vw" : "75vw",
            height: isMobile ? "calc(100vh - 120px)" : isTablet ? "75vh" : "70vh",
            objectFit: "contain",
            backgroundColor: "#ffffff",
            borderRadius: theme.spacing(1),
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            display: "block",
            margin: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          draggable={false}
        />
      </DialogContent>

      {/* Instructions */}
      {/* <Box
        sx={{
          position: "absolute",
          bottom: theme.spacing(2),
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: theme.spacing(1, 2),
          borderRadius: theme.spacing(1),
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
            textAlign: "center",
          }}
        >
          Press ESC or click outside to close
        </Typography>
      </Box> */}
    </Dialog>
  );
};

export default ImageZoomModal;
 
 