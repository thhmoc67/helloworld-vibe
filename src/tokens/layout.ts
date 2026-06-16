/**
 * Page layout tokens aligned with helloworld-next HDP container
 * (src/containers/HDP/index.tsx): max-w-7xl shell, 60% / 35% two-column at md+.
 */
export const pageLayout = {
  container: "mx-auto max-w-7xl px-4 sm:px-6",
  containerWithTopPadding: "mx-auto max-w-7xl px-4 pt-4 sm:px-6 md:pt-6",
  twoColumn: "md:flex md:items-start md:justify-between md:gap-8",
  mainColumn: "min-w-0 md:max-w-[60%]",
  sidebarColumn:
    "hidden md:block md:w-[35%] md:shrink-0 md:self-start md:px-3",
  mobileStickyBottomPadding: "pb-24 md:pb-0",
} as const;
