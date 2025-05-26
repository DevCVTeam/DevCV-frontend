export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
};
