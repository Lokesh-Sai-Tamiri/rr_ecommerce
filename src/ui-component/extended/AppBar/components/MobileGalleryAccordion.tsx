/**
 * @fileoverview Mobile gallery accordion component for drawer navigation
 */

'use client';

import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter, usePathname } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import { THEME_COLORS } from '../constants';
import { DropdownItem } from '../types';

interface MobileGalleryAccordionProps {
  dropdownItems: DropdownItem[];
  onItemClick: () => void;
}

export default function MobileGalleryAccordion({ dropdownItems, onItemClick }: MobileGalleryAccordionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleGalleryClick = (href: string) => {
    // Close the accordion and drawer first
    setExpanded(false); // Close the accordion
    onItemClick(); // Close the mobile drawer
    
    // Then navigate (even if it's the same page)
    router.push(href);
  };

  const isActiveItem = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href);
  };

  const isGalleryActive = dropdownItems.some((item) => isActiveItem(item.href));

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      disableGutters
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        color: THEME_COLORS.secondary,
        '&:before': {
          display: 'none'
        },
        '& .MuiAccordionSummary-root': {
          minHeight: 56,
          height: 56,
          px: 2,
          py: 1,
          backgroundColor: 'transparent',
          borderRadius: 2,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            backgroundColor: THEME_COLORS.secondary,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(17, 82, 147, 0.4)',
            color: THEME_COLORS.secondary,
            '& .MuiTypography-root': {
              color: THEME_COLORS.white + ' !important'
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              color: THEME_COLORS.white + ' !important'
            }
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 4px rgba(17, 82, 147, 0.6)'
          },
          '& .MuiAccordionSummary-content': {
            margin: 0
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: THEME_COLORS.secondary,
            transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'all 0.3s ease-in-out',
            fontSize: '2rem !important',
            width: '2rem !important',
            height: '2rem !important'
          }
        },
        '& .MuiAccordionDetails-root': {
          px: 0,
          pb: 1,
          pt: 1
        }
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="gallery-panel-content" id="gallery-panel-header">
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            color: THEME_COLORS.secondary,
            lineHeight: 1.75,
            transition: 'color 0.3s ease',
            '@media (max-width: 375px)': {
              fontSize: '0.85rem',
              lineHeight: 1.6
            },
            '@media (max-width: 320px)': {
              fontSize: '0.8rem',
              lineHeight: 1.5
            }
          }}
        >
          <FormattedMessage id="navigation.mobile.gallery" defaultMessage="Gallery" />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding sx={{ pl: 1 }}>
          {dropdownItems.map((item, index) => {
            const isActive = isActiveItem(item.href);
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleGalleryClick(item.href)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    py: 1,
                    px: 2,
                    minHeight: 56,
                    height: 56,
                    backgroundColor: 'transparent',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                      backgroundColor: THEME_COLORS.secondary,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(17, 82, 147, 0.4)',
                      color: THEME_COLORS.white,
                      '& .MuiListItemText-primary': {
                        color: THEME_COLORS.white + ' !important'
                      }
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 4px rgba(17, 82, 147, 0.6)'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        className="gallery-item-text"
                        sx={{
                          color: THEME_COLORS.secondary,
                          fontSize: '1rem',
                          fontWeight: 700,
                          letterSpacing: '0.01em',
                          lineHeight: 1.75,
                          textAlign: 'left',
                          transition: 'color 0.3s ease',
                          '.MuiListItemButton-root:hover &': {
                            color: THEME_COLORS.white + ' !important'
                          },
                          '@media (max-width: 375px)': {
                            fontSize: '0.85rem',
                            lineHeight: 1.6
                          },
                          '@media (max-width: 320px)': {
                            fontSize: '0.8rem',
                            lineHeight: 1.5
                          }
                        }}
                      >
                        {item.labelKey ? (
                          <FormattedMessage id={item.labelKey} defaultMessage={item.label} />
                        ) : (
                          item.label
                        )}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
} 