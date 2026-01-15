/**
 * @fileoverview Cart modal component to display cart items
 */

"use client";

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material/styles';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';

interface CartItem {
  id: string;
  configNo: string;
  studyType: string;
  price: number;
  numSamples: number;
  createdOn: string;
  validTill: string;
  description: string;
  category: string;
  sampleForm: string;
  sampleSolvent: string;
  application: string;
  selectedGuidelines: string[];
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  applicationGuidelines?: string[];
  image?: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onGenerateQuotation: (item: CartItem) => void;
  onViewFullDetails: (item: CartItem) => void;
  onEditItem?: (item: CartItem) => void;
  onProceedToCheckout: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onGenerateQuotation,
  onViewFullDetails,
  onEditItem,
  onProceedToCheckout
}: CartModalProps) {
  const theme = useTheme();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onRemoveItem(itemToDelete);
      setItemToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setDeleteConfirmOpen(false);
  };



  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', sm: '100%', md: '800px' },
          height: '100vh',
          maxWidth: { xs: '100vw', sm: '100vw', md: '800px' },
          zIndex: 1600,
          backgroundImage: 'url(/assets/images/home-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderTopLeftRadius: { xs: 0, md: '8px' },
          borderBottomLeftRadius: { xs: 0, md: '8px' },
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.15)',
          animation: 'slideInFromRight 0.4s ease-out',
          overflow: 'auto',
          opacity: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: { xs: 2, md: 3 }, 
          borderBottom: '1px solid rgba(25, 118, 210, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main, fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' } }}>
            My Cart ({cartItems.length} items)
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: '#666', fontSize: '1.3rem' }}>×</Typography>
          </IconButton>
        </Box>

                 {/* Cart Items */}
         <Box sx={{ p: { xs: 2, md: 3 }, pb: 2, flex: 1, overflow: 'auto' }}>
           {cartItems.length === 0 ? (
             <Box sx={{ textAlign: 'center', py: 8 }}>
               {/* Empty Cart Illustration */}
               <Box sx={{ mb: 4 }}>
                 <Box
                   sx={{
                     width: 120,
                     height: 120,
                     margin: '0 auto',
                     position: 'relative',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                   }}
                 >
                   {/* Sad Folder */}
                   <Box
                     sx={{
                       width: 80,
                       height: 60,
                       backgroundColor: theme.palette.primary.main,
                       borderRadius: '8px 8px 0 0',
                       position: 'relative',
                       '&::before': {
                         content: '""',
                         position: 'absolute',
                         top: -8,
                         left: 8,
                         width: 64,
                         height: 8,
                         backgroundColor: theme.palette.primary.main,
                         borderRadius: '4px 4px 0 0'
                       },
                       '&::after': {
                         content: '""',
                         position: 'absolute',
                         top: 15,
                         left: 20,
                         width: 40,
                         height: 30,
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         fontSize: '24px',
                         color: 'white',
                         fontWeight: 'bold'
                       }
                     }}
                   >
                     <Typography sx={{ 
                       position: 'absolute', 
                       top: 15, 
                       left: 20, 
                       fontSize: '24px', 
                       color: 'white', 
                       fontWeight: 'bold',
                       lineHeight: 1
                     }}>
                       X X
                     </Typography>
                     <Typography sx={{ 
                       position: 'absolute', 
                       top: 35, 
                       left: 30, 
                       fontSize: '16px', 
                       color: 'white', 
                       fontWeight: 'bold'
                     }}>
                       __
                     </Typography>
                   </Box>
                   
                   {/* Floating Document with X */}
                   <Box
                     sx={{
                       position: 'absolute',
                       top: -10,
                       right: 10,
                       width: 40,
                       height: 50,
                       backgroundColor: 'white',
                       borderRadius: '4px',
                       border: '2px solid #ccc',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                       '&::after': {
                         content: '""',
                         position: 'absolute',
                         top: 8,
                         left: 8,
                         width: 24,
                         height: 24,
                         backgroundColor: theme.palette.primary.main,
                         borderRadius: '50%',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         color: 'white',
                         fontSize: '16px',
                         fontWeight: 'bold'
                       }
                     }}
                   >
                     <Typography sx={{ 
                       position: 'absolute', 
                       top: 8, 
                       left: 8, 
                       width: 24, 
                       height: 24, 
                       backgroundColor: theme.palette.primary.main,
                       borderRadius: '50%',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: 'white',
                       fontSize: '16px',
                       fontWeight: 'bold'
                     }}>
                       ✕
                     </Typography>
                   </Box>
                 </Box>
               </Box>
               
               <Typography variant="h5" sx={{ 
                 fontWeight: 700, 
                 color: theme.palette.primary.main, 
                 mb: 2,
                 fontSize: { xs: '1.5rem', sm: '1.8rem' }
               }}>
                 Nothing to show here !
               </Typography>
               <Typography variant="body1" sx={{ 
                 color: '#666', 
                 fontSize: { xs: '0.9rem', sm: '1rem' }
               }}>
                 Your cart is empty. Add some items to get started.
               </Typography>
             </Box>
           ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  sx={{
                    p: 3,
                    border: 'none',
                    outline: 'none',
                    backgroundColor: `${theme.palette.text.primary}15 !important`,
                    borderRadius: '16px',
                    boxShadow: theme.shadows[4],
                    position: 'relative',
                    transition: theme.transitions.create(
                      ["transform", "box-shadow"],
                      {
                        duration: theme.transitions.duration.standard,
                      }
                    ),
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[8],
                      backgroundColor: `${theme.palette.text.primary}20 !important`,
                    },
                  }}
                >
                                     {/* Item Header */}
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                     <Avatar
                       sx={{
                         width: 60,
                         height: 60,
                         backgroundColor: theme.palette.primary.main,
                         fontSize: '1.5rem'
                       }}
                     >
                       {item.studyType.charAt(0)}
                     </Avatar>
                     <Box>
                       <Chip
                         label={item.studyType}
                         size="small"
                         sx={{
                           backgroundColor: theme.palette.primary.main,
                           color: 'white',
                           fontWeight: 600,
                           fontSize: '0.75rem',
                           mb: 0.5
                         }}
                       />
                       <Chip
                         label={item.category}
                         size="small"
                         variant="outlined"
                         sx={{
                           borderColor: theme.palette.secondary.main,
                           color: theme.palette.secondary.main,
                           fontWeight: 500,
                           fontSize: '0.7rem',
                           ml: 0.5
                         }}
                       />
                     </Box>
                   </Box>


                                      {/* Specific Details and Guidelines - Inline Design */}
                   <Box sx={{ mb: 2 }}>
                     {/* Sample Form with Guidelines */}
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                       <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600, minWidth: '100px' }}>
                         Sample Form:
                       </Typography>
                       <Typography variant="body2" sx={{ color: theme.palette.primary.main, mr: 1 }}>
                         {item.sampleForm}
                       </Typography>
                       {item.studyType === 'Invitro Study' ? (
                         // For Invitro Study, show sample form specific therapeutic areas
                         item.sampleFormGuidelines && item.sampleFormGuidelines.length > 0 && (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                             {item.sampleFormGuidelines.slice(0, 3).map((area, index) => (
                               <Chip
                                 key={index}
                                 label={area}
                                 size="small"
                                 variant="outlined"
                                 sx={{
                                   borderColor: theme.palette.primary.main,
                                   color: theme.palette.primary.main,
                                   fontSize: '0.7rem',
                                   height: '22px'
                                 }}
                               />
                             ))}
                             {item.sampleFormGuidelines.length > 3 && (
                               <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontSize: '0.65rem' }}>
                                 +{item.sampleFormGuidelines.length - 3} more areas
                               </Typography>
                             )}
                           </Box>
                         )
                       ) : (
                         // For other study types, show sample form guidelines
                         item.sampleFormGuidelines && item.sampleFormGuidelines.length > 0 && (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                             {item.sampleFormGuidelines.map((guideline, index) => (
                               <Chip
                                 key={index}
                                 label={guideline}
                                 size="small"
                                 variant="outlined"
                                 sx={{
                                   borderColor: theme.palette.primary.main,
                                   color: theme.palette.primary.main,
                                   fontSize: '0.7rem',
                                   height: '22px'
                                 }}
                               />
                             ))}
                           </Box>
                         )
                       )}
                     </Box>

                     {/* Sample Solvent with Guidelines */}
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                       <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600, minWidth: '100px' }}>
                         Sample Solvent:
                       </Typography>
                       <Typography variant="body2" sx={{ color: theme.palette.primary.main, mr: 1 }}>
                         {item.sampleSolvent}
                       </Typography>
                       {item.studyType === 'Invitro Study' ? (
                         // For Invitro Study, show sample solvent specific therapeutic areas
                         item.sampleSolventGuidelines && item.sampleSolventGuidelines.length > 0 && (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                             {item.sampleSolventGuidelines.slice(0, 3).map((area, index) => (
                               <Chip
                                 key={index}
                                 label={area}
                                 size="small"
                                 variant="outlined"
                                 sx={{
                                   borderColor: theme.palette.primary.main,
                                   color: theme.palette.primary.main,
                                   fontSize: '0.7rem',
                                   height: '22px'
                                 }}
                               />
                             ))}
                             {item.sampleSolventGuidelines.length > 3 && (
                               <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontSize: '0.65rem' }}>
                                 +{item.sampleSolventGuidelines.length - 3} more areas
                               </Typography>
                             )}
                           </Box>
                         )
                       ) : (
                         // For other study types, show sample solvent guidelines
                         item.sampleSolventGuidelines && item.sampleSolventGuidelines.length > 0 && (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                             {item.sampleSolventGuidelines.map((guideline, index) => (
                               <Chip
                                 key={index}
                                 label={guideline}
                                 size="small"
                                 variant="outlined"
                                 sx={{
                                   borderColor: theme.palette.primary.main,
                                   color: theme.palette.primary.main,
                                   fontSize: '0.7rem',
                                   height: '22px'
                                 }}
                               />
                             ))}
                           </Box>
                         )
                       )}
                     </Box>

                     {/* Selected Therapeutic Areas from Left Side */}
                     {item.studyType === 'Invitro Study' && item.selectedTherapeuticAreas && item.selectedTherapeuticAreas.length > 0 && (
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                         <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600, minWidth: '100px' }}>
                           Therapeutic Areas:
                         </Typography>
                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                           {item.selectedTherapeuticAreas.slice(0, 3).map((area, index) => (
                             <Chip
                               key={index}
                               label={area}
                               size="small"
                               variant="outlined"
                               sx={{
                                 borderColor: theme.palette.primary.main,
                                 color: theme.palette.primary.main,
                                 fontSize: '0.7rem',
                                 height: '22px'
                               }}
                             />
                           ))}
                           {item.selectedTherapeuticAreas.length > 3 && (
                             <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontSize: '0.65rem' }}>
                               +{item.selectedTherapeuticAreas.length - 3} more areas
                             </Typography>
                           )}
                         </Box>
                       </Box>
                     )}

                     {/* Application with Guidelines - Hide for Invitro Study */}
                     {item.studyType !== 'Invitro Study' && (
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                         <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600, minWidth: '100px' }}>
                           Application:
                         </Typography>
                         <Typography variant="body2" sx={{ color: theme.palette.primary.main, mr: 1 }}>
                           {item.application}
                         </Typography>
                         {item.applicationGuidelines && item.applicationGuidelines.length > 0 && (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                             {item.applicationGuidelines.map((guideline, index) => (
                               <Chip
                                 key={index}
                                 label={guideline}
                                 size="small"
                                 variant="outlined"
                                 sx={{
                                   borderColor: theme.palette.primary.main,
                                   color: theme.palette.primary.main,
                                   fontSize: '0.7rem',
                                   height: '22px'
                                 }}
                               />
                             ))}
                           </Box>
                         )}
                       </Box>
                     )}
                   </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => onViewFullDetails(item)}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.dark,
                          backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                      }}
                    >
                      View Full Details
                    </Button>
                    {onEditItem && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onEditItem(item)}
                        sx={{
                          borderColor: theme.palette.secondary.main,
                          color: theme.palette.secondary.main,
                          '&:hover': {
                            borderColor: theme.palette.secondary.dark,
                            backgroundColor: 'rgba(156, 39, 176, 0.04)'
                          }
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(item.id)}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>

                 {/* Footer with Total */}
         {cartItems.length > 0 && (
           <Box sx={{ 
             p: { xs: 2, md: 3 }, 
             pb: { xs: 6, md: 8 }, // Increased padding-bottom even more
             borderTop: '1px solid rgba(25, 118, 210, 0.1)',
             backgroundColor: 'transparent',
             position: 'sticky',
             bottom: 0,
             zIndex: 10,
             backdropFilter: 'blur(10px)',
             marginBottom: { xs: 2, md: 3 }
           }}>

                           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onProceedToCheckout}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    py: 1.5,
                    px: 3,
                    pb: 2,
                    mb: 1, // Added bottom margin
                    borderRadius: '12px', // Added border radius
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
                    },
                    '&.MuiButton-contained': {
                      backgroundColor: theme.palette.primary.main,
                      color: 'white'
                    }
                  }}
                >
                  Proceed 
                </Button>
              </Box>
           </Box>
         )}
      </Box>

                                                                                       {/* Backdrop */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: deleteConfirmOpen ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
              backdropFilter: deleteConfirmOpen ? 'blur(3px)' : 'none',
              zIndex: 1550,
              animation: 'fadeIn 0.3s ease-out',
              transition: 'all 0.3s ease'
            }}

          />

       {/* Delete Confirmation Modal */}
       <DeleteConfirmationModal
         isOpen={deleteConfirmOpen}
         onClose={handleCancelDelete}
         onConfirm={handleConfirmDelete}
         title="Are you sure you want to delete this quotation?"
         message="This action will permanently remove the quotation and its details. You won't be able to recover it later."
         confirmButtonText="Yes, Delete"
         cancelButtonText="No"
       />
    </>
  );
}
                                                                                                                                                                                                            