const S3_IMAGE_BUCKET_BASE_URL =
  process.env.NEXT_PUBLIC_S3_IMAGE_BUCKET_BASE_URL ??
  "https://hw-production-compressed-image.s3.ap-south-1.amazonaws.com/";

export function imageUrlFormatter(page: "srp" | "hdp", url: string): string {
  if (!url) return "";
  if (url.includes("http")) {
    return url.replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/ /g, "%20");
  }

  const variant = page === "srp" ? "srp/desktop" : "hdp/desktop";
  const imgSrc = `${S3_IMAGE_BUCKET_BASE_URL}${url.replace("original", variant)}`;
  return imgSrc.replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/ /g, "%20");
}
