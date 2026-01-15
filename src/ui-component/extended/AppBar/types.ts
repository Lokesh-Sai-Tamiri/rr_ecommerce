/**
 * @fileoverview Type definitions for AppBar components
 */

import { ReactElement, CSSProperties, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface ElevationScrollProps {
  children: ReactElement<{ elevation?: number; style?: CSSProperties }>;
  window?: Node;
  disableSticky?: boolean;
  transparentBackground?: boolean;
}

export interface AppBarProps {
  sx?: any;
  disableSticky?: boolean;
  FooterComponent?: React.ComponentType;
}

export interface NavigationItem {
  label: string;
  labelKey?: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  labelKey?: string;
  href: string;
  description?: string;
}

export interface MenuItemProps {
  href: string;
  children: ReactNode;
}

export interface NavButtonProps {
  item: NavigationItem;
  isActive?: boolean;
  sx?: SxProps<Theme>;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  [key: string]: any; // For additional props
}

export interface DesktopNavigationProps {
  showHamburgerMenu: boolean;
}

export interface DesktopLoginIconProps {
  showHamburgerMenu: boolean;
}

export interface MobileMenuProps {
  showHamburgerMenu: boolean;
  drawerToggle: boolean;
  drawerToggler: (open: boolean) => (event: any) => void;
  FooterComponent?: React.ComponentType;
}

export interface MobileDrawerProps {
  drawerToggle: boolean;
  drawerToggler: (open: boolean) => (event: any) => void;
  FooterComponent?: React.ComponentType;
}
