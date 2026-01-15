/**
 * @fileoverview Success Modal for Quotation Request Submission
 */

import React from "react";
import { createPortal } from "react-dom";
import {
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { QUOTATION_CONFIG } from "../../constants/quotationConfig";

interface RequestSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onNavigateToQuotations?: () => void;
  quotationNumber?: string;
  configNumber?: string;
}

export default function RequestSuccessModal({
  open,
  onClose,
  onNavigateToQuotations,
  quotationNumber,
  configNumber,
}: RequestSuccessModalProps) {
  const theme = useTheme();
  const router = useRouter();

  const handleMyQuotationsClick = () => {
    if (onNavigateToQuotations) {
      onNavigateToQuotations();
    } else {
      onClose();
      router.push(QUOTATION_CONFIG.MY_QUOTATIONS_PATH);
    }
  };

  if (!open) return null;

  return createPortal(
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Paper
        sx={{
          width: { xs: "90%", sm: "500px" },
          maxWidth: "500px",
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          backgroundImage: "url(/assets/images/home-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "rgba(0,0,0,0.6)",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Content */}
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "rgba(76, 175, 80, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: 48,
                color: "#4CAF50",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
            }}
          >
            {QUOTATION_CONFIG.REQUEST_SUCCESS_TITLE}
          </Typography>

          {/* Quotation Number */}
          {quotationNumber && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                mb: 2,
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                padding: "8px 16px",
                borderRadius: "8px",
                border: `1px solid ${theme.palette.primary.main}`,
                textAlign: "center",
              }}
            >
              Quotation #: {quotationNumber}
            </Typography>
          )}

          {/* Message */}
          <Typography
            variant="body1"
            sx={{
              color: "rgba(0,0,0,0.7)",
              mb: 4,
              lineHeight: 1.6,
              fontSize: "1rem",
              maxWidth: "400px",
            }}
          >
            {QUOTATION_CONFIG.REQUEST_SUCCESS_MESSAGE}
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                py: 1.2,
                px: 3,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderRadius: "8px",
                fontSize: "0.95rem",
                minWidth: "120px",
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handleMyQuotationsClick}
              sx={{
                py: 1.2,
                px: 3,
                backgroundColor: theme.palette.primary.main,
                borderRadius: "8px",
                fontSize: "0.95rem",
                minWidth: "120px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {QUOTATION_CONFIG.MY_QUOTATIONS_BUTTON_TEXT}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>,
    document.body
  );
}