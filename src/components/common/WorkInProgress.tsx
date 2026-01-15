'use client';

// next
import Link from 'next/link';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import { ThemeMode } from 'config';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const image = '/assets/images/maintenance/img-build.svg';
const imageBackground = '/assets/images/maintenance/img-bg-grid.svg';
const imageDarkBackground = '/assets/images/maintenance/img-bg-grid-dark.svg';
const imageParts = '/assets/images/maintenance/img-bg-parts.svg';

// styles
const CardMediaWrapper = styled('div')({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative'
});

const PageContentWrapper = styled('div')({
  maxWidth: 500,
  margin: '0 auto',
  textAlign: 'center'
});

const WorkInProgressCard = styled(Card)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  padding: '2rem',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'fadeIn 0.8s ease-in-out',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
});

const CardMediaBuild = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '5s bounce ease-in-out infinite',
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)'
    },
    '40%': {
      transform: 'translateY(-10px)'
    },
    '60%': {
      transform: 'translateY(-5px)'
    }
  }
});

const CardMediaParts = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '10s blink ease-in-out infinite',
  '@keyframes blink': {
    '0%, 90%, 100%': {
      opacity: 1
    },
    '95%': {
      opacity: 0.5
    }
  }
});

// ========================|| WORK IN PROGRESS COMPONENT ||======================== //

export default function WorkInProgress() {
  const theme = useTheme();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <WorkInProgressCard>
      <CardContent sx={{ width: '100%' }}>
        <Grid container spacing={gridSpacing} sx={{ justifyContent: 'center' }}>
          <Grid size={12}>
            <CardMediaWrapper>
              <CardMedia
                component="img"
                image={theme.palette.mode === ThemeMode.DARK ? imageDarkBackground : imageBackground}
                title="Background"
                sx={{ 
                  opacity: 0.7,
                  borderRadius: '12px'
                }}
              />
              <CardMediaParts src={imageParts} title="Parts" />
              <CardMediaBuild src={image} title="Work in Progress" />
            </CardMediaWrapper>
          </Grid>
          <Grid size={12}>
            <PageContentWrapper>
              <Grid container spacing={gridSpacing}>
                <Grid size={12}>
                  <Typography 
                    variant="h1" 
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      mb: 2
                    }}
                  >
                    Work in Progress
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      mb: 3
                    }}
                  >
                    We're currently working on the My Orders feature. This section will be available soon with exciting new functionality!
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <AnimateButton>
                      <Button 
                        variant="outlined" 
                        size="large" 
                        onClick={handleGoBack}
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            borderColor: theme.palette.primary.dark,
                            backgroundColor: 'rgba(17, 82, 147, 0.04)'
                          }
                        }}
                      >
                        <ArrowBackIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Go Back
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <Button 
                        variant="contained" 
                        size="large" 
                        component={Link} 
                        href="/my-quotations"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark
                          }
                        }}
                      >
                        My Quotations
                      </Button>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            </PageContentWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </WorkInProgressCard>
  );
}