"use client";

import { SrpCard, type SrpCardProps } from "@/components/marketing/srp-card";
import { useOptionalWishlist } from "@/components/wishlist/wishlist-provider";

export type WishlistSrpCardProps = Omit<SrpCardProps, "saved" | "onSaveToggle"> & {
  propertyId?: number;
};

export function WishlistSrpCard({
  propertyId,
  ...props
}: WishlistSrpCardProps) {
  const wishlist = useOptionalWishlist();
  const canWishlist = propertyId != null && wishlist != null;

  return (
    <SrpCard
      {...props}
      saved={canWishlist ? wishlist.isWishlisted(propertyId) : false}
      onSaveToggle={
        canWishlist
          ? () => {
              void wishlist.toggleWishlist(propertyId, props.name);
            }
          : undefined
      }
    />
  );
}
