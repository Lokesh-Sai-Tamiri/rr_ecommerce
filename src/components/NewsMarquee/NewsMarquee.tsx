"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { NewsItem, getCachedNews } from "services/newsService";
import useConfig from "hooks/useConfig";

interface NewsMarqueeProps {
  readonly refreshInterval?: number;
}

export default function NewsMarquee({
  refreshInterval = 900000,
}: NewsMarqueeProps) {
  // 15 minutes default
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { i18n } = useConfig();

  // Helper function to extract plain text from HTML title
  // Works in both SSR and client-side contexts
  const extractTextFromHtml = (html: string): string => {
    // Remove HTML tags using regex
    let text = html.replace(/<[^>]*>/g, "");
    // Decode HTML entities
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, " ");
    return text.trim();
  };

  const fetchNews = async () => {
    try {
      const newsData = await getCachedNews();
      setNews(newsData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    // Set up refresh interval
    intervalRef.current = setInterval(fetchNews, refreshInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshInterval]);

  // Hide the entire component when language is Korean
  if (i18n === "ko") {
    return null;
  }

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1024px",
          margin: "0 auto",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.9rem" }}
        >
          Loading latest news...
        </Typography>
      </Box>
    );
  }

  if (news.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1024px",
          margin: "0 auto",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.9rem" }}
        >
          No news available at the moment
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        height: "40px",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        justifyContent: "flex-start",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      data-component="news-marquee"
    >
      {/* Latest News Label */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0",
          height: "100%",
          minWidth: "140px",
          fontSize: "1.1rem",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            whiteSpace: "nowrap",
            color: "text.primary",
            textAlign: "left",
            padding: "4px 12px",
            borderRadius: "20px",
            background: (theme) =>
              `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.primary.main}20)`,
            //  border: (theme) => `2px solid ${theme.palette.primary.main}`,
            boxShadow: (theme) => `0 2px 8px ${theme.palette.primary.main}30`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: (theme) =>
                `0 4px 12px ${theme.palette.primary.main}50`,
            },
            //  textTransform: "uppercase",
          }}
        >
          Latest News
        </Typography>
      </Box>

      {/* News Marquee Container */}
      <Box
        sx={{
          flex: 1,
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          key={news.length > 0 ? news[0]?.title : "loading"} // Force re-render when news changes
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
          dangerouslySetInnerHTML={{
            __html: `
              <marquee behavior="scroll" direction="left" scrollamount="3" style="width: 100%; height: 40px; display: flex; align-items: center;">
                ${news
                  .map((item, index) => {
                    // Extract plain text from title (removes HTML tags)
                    const titleText = extractTextFromHtml(item.title);
                    // Escape HTML entities to prevent XSS
                    const escapedTitle = titleText
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/"/g, "&quot;")
                      .replace(/'/g, "&#039;");
                    // Use item.link (external URL) instead of any href from title
                    const escapedLink = item.link
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/"/g, "&quot;")
                      .replace(/'/g, "&#039;");
                    return `
                  <span style="margin-right: 32px;">
                    <a href="${escapedLink}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; text-decoration: none; color: inherit;">
                      <span style="margin-right: 8px; font-size: 1.2rem; color: #666;">•</span>
                      <span style="margin-right: 4px; font-size: 0.9rem; font-weight: normal;">${escapedTitle}</span>
                      <svg style="width: 10px; height: 10px; opacity: 0.7;" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                      </svg>
                    </a>
                  </span>
                `;
                  })
                  .join("")}
              </marquee>
            `,
          }}
        />
      </Box>
    </Box>
  );
}
