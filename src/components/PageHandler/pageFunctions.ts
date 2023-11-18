export function hasPreviousPage(page: number): boolean {
  return page > 1;
}

export function hasNextPage(count: number, page: number, itemsPerPage: number) {
  return count > page * itemsPerPage;
}

type CallBackType = (value: number) => void;

export const handleDecrement = (value: number, callback: CallBackType) => {
  if (value < 2) return;
  const goToPage = value - 1;
  callback(goToPage);
};

export const handleIncrement = (value: number, callback: CallBackType) => {
  const goToPage = value + 1;
  callback(goToPage);
};
