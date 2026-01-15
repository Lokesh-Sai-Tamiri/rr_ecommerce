import { redirect } from "next/navigation";

export default function GalleryPage() {
  redirect("/gallery/radiant-team");
}

export const metadata = {
  title: "Gallery - Radiant Research",
  description:
    "Explore our gallery showcasing our state-of-the-art facilities, laboratory equipment, and research infrastructure at Radiant Research.",
  keywords:
    "gallery, facilities, laboratory, infrastructure, clinical research, equipment, Radiant Research",
};
