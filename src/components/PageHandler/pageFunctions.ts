export function hasPrevious(page: number): boolean {
  return page > 1;
}

export function hasNext(count: number, page: number, itemsPerPage: number) {
  return count > page * itemsPerPage;
}
