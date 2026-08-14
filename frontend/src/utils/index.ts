import type { ToolCondition, BookingStatus } from '@/types';

export const CURRENCY_SYMBOL = '₹';

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

export const conditionLabels: Record<ToolCondition, string> = {
  NEW: 'New',
  LIKE_NEW: 'Like New',
  GOOD: 'Good',
  FAIR: 'Fair',
};

export const bookingStatusConfig: Record<
  BookingStatus,
  { label: string; color: string }
> = {
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-800' },
  APPROVED: { label: 'Approved', color: 'bg-blue-100 text-blue-800' },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  ACTIVE: { label: 'Active', color: 'bg-green-100 text-green-800' },
  COMPLETED: { label: 'Completed', color: 'bg-gray-100 text-gray-700' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
};

export function classNames(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ');
}
