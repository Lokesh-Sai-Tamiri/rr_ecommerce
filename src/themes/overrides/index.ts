// material-ui
import { Theme } from '@mui/material/styles';

// third party
import { merge } from 'lodash-es';

// project imports
import Chip from './Chip';
import Landing from './Landing'; // ← ADD THIS IMPORT

// ===============================||  OVERRIDES - MAIN  ||=============================== //

export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Chip(theme),
    Landing(theme) // ← ADD THIS LINE
  );
}
