import {
  PropertyGalleryDesktop,
  PropertyGalleryMobile,
} from "@/components/marketing/property-gallery";

function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </p>
  );
}

export function PropertyGalleryDemo() {
  return (
    <div className="grid gap-16 xl:grid-cols-1 xl:items-start">
      <div className="min-w-0">
        <DemoLabel>Desktop</DemoLabel>
        <PropertyGalleryDesktop />
      </div>
      <div>
        <DemoLabel>Mobile</DemoLabel>
        <PropertyGalleryMobile />
      </div>
    </div>
  );
}
