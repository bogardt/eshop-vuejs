export function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? "12", 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
