/**
 * @fileoverview Gallery section data and content configuration
 * Centralized data management for Gallery section
 */

/**
 * Gallery item interface
 */
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  alt: string;
}

/**
 * Accreditation item interface
 */
export interface AccreditationItem {
  image: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

/**
 * Gallery configuration constants
 */
export const GALLERY_CONFIG = {
  IMAGES: [
    "certification_1.png",
    "certification_2.png",
    "certification_3.png",
    "certification_4.png",
    "certification_5.png",
    "certification_6.png",
    "certification_7.png",
    "certification_8.png",
  ],
  BASE_PATH: "/assets/images/landing/accreditation/",
  CATEGORIES: ["All", "Radiant Team", "Radiant Lab"], // 'Korea Expo 2025' commented out until event happens

  GRID: {
    COLUMNS: 3,
    GAP: 6,
    CONTAINER_MAX_WIDTH: "1000px",
    CARD_MAX_WIDTH: "300px",
    IMAGE_HEIGHT: 240,
  },
} as const;

/**
 * Gallery content data
 */
export const GALLERY_CONTENT = {
  TITLE: "Gallery",
  CATEGORIES_LABEL: "CATEGORIES",

  ITEMS: [
    {
      title: "ISO 9001:2015 Norwegian Accreditation",
      description:
        "International quality management certification ensuring consistent service delivery",
      category: "Radiant Team",
    },
    {
      title: "MOEF CPCSEA Registration",
      description:
        "Committee for the Purpose of Control and Supervision of Experiments on Animals registration",
      category: "Radiant Lab",
    },
    // {
    //   title: 'Ministry of AYUSH Approved Drug Testing Laboratory',
    //   description: 'Government approved facility for pharmaceutical and herbal drug testing',
    //   category: 'Korea Expo 2025'
    // }
  ],
} as const;

/**
 * Get image URL helper function
 */
export const getImageUrl = (imageName: string): string => {
  return `${GALLERY_CONFIG.BASE_PATH}${imageName}`;
};

/**
 * Get accreditation items
 */
export const getAccreditationItems = (): AccreditationItem[] => {
  return GALLERY_CONFIG.IMAGES.map((image, index) => ({
    image,
    alt: `Certification ${index + 1}`,
    title: GALLERY_CONTENT.ITEMS[index].title,
    description: GALLERY_CONTENT.ITEMS[index].description,
    category: GALLERY_CONTENT.ITEMS[index].category,
  }));
};

/**
 * Get gallery items for display
 */
export const getGalleryItems = (): GalleryItem[] => {
  const accreditationItems = getAccreditationItems();

  return accreditationItems.map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.description,
    image: getImageUrl(item.image),
    category: item.category,
    alt: item.alt,
  }));
};

/**
 * Filter gallery items by category
 */
export const getFilteredGalleryItems = (
  selectedCategory: string
): GalleryItem[] => {
  const allItems = getGalleryItems();

  return selectedCategory === "All"
    ? allItems
    : allItems.filter((item) => item.category === selectedCategory);
};
