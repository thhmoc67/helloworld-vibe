export const BLOG_PAGE_SIZE = 30;

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const safePage = Math.max(1, page);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const clampedPage = Math.min(safePage, pageCount);
  const start = (clampedPage - 1) * pageSize;
  return {
    pageItems: items.slice(start, start + pageSize),
    page: clampedPage,
    pageCount,
  };
}
