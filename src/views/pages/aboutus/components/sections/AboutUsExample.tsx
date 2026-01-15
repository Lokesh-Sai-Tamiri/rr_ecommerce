/**
 * @fileoverview Example component showing how to use multilingual About Us data
 * This demonstrates the usage of the new i18n functionality
 */

"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAboutUsTranslations from "hooks/useAboutUsTranslations";

/**
 * Example component demonstrating multilingual About Us content
 */
const AboutUsExample: React.FC = () => {
  const theme = useTheme();
  const {
    visionTitle,
    visionContent,
    missionTitle,
    missionContent,
    getVisionMission,
    getValues,
    currentLocale,
  } = useAboutUsTranslations();

  const visionMissionSections = getVisionMission();
  const valuesData = getValues();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        About Us Content (Current Language: {currentLocale.toUpperCase()})
      </Typography>

      {/* Vision & Mission Cards */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        {visionMissionSections.map((section, index) => (
          <Card key={section.title} sx={{ flex: 1, minWidth: 300 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <section.icon sx={{ mr: 1, color: section.color }} />
                <Typography variant="h6" component="h3">
                  {section.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {section.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Values Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Our Values
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 2,
        }}
      >
        {valuesData.sections.map((valueSection, index) => (
          <Card key={valueSection.title} sx={{ height: "fit-content" }}>
            <CardContent>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                color="primary"
              >
                {valueSection.title}
              </Typography>
              <List dense>
                {valueSection.points.map((point, pointIndex) => (
                  <ListItem key={pointIndex} sx={{ px: 0 }}>
                    <ListItemText
                      primary={point}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Direct access example */}
      <Box sx={{ mt: 4, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Direct Access Example:
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>{visionTitle}:</strong> {visionContent}
        </Typography>
        <Typography variant="body2">
          <strong>{missionTitle}:</strong> {missionContent}
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUsExample;
