import GallerySection from "../../../views/pages/gallery/GallerySection";

interface GalleryCategoryPageProps {
  params: {
    category: string;
  };
}

export default function GalleryCategoryPage({
  params,
}: GalleryCategoryPageProps) {
  return <GallerySection initialCategory={params.category} />;
}

export const metadata = {
  title: "Gallery - Radiant Research",
  description:
    "Explore our gallery showcasing our state-of-the-art facilities, laboratory equipment, and research infrastructure at Radiant Research.",
  keywords:
    "gallery, facilities, laboratory, infrastructure, clinical research, equipment, Radiant Research",
};
