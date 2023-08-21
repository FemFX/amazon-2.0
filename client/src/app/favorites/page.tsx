"use client";

import Catalog from "@/components/ui/catalog/Catalog";
import { useProfile } from "@/hooks/useProfile";

const Favorites = () => {
  const { profile } = useProfile();
  return (
    <>
      <Catalog products={profile?.favorites || []} title="Favorites" />
    </>
  );
};

export default Favorites;
