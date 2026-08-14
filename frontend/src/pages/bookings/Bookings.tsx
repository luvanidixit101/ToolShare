import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Eye, X, MessageSquare, Star, Clock, User, AlertCircle,
} from 'lucide-react';
import { getBookings, cancelBooking, updateBookingStatus } from '@/services/bookingService';
import type { Booking, BookingStatus } from '@/types';
import { formatPrice, formatDate, bookingStatusConfig, classNames } from '@/utils';
import { FullPageSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState, ErrorState } from '@/components/common/EmptyState';
import Modal from '@/components/common/Modal';
import { toast } from '@/components/common/Toast';

const tabs: { key: BookingStatus | 'ALL'; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PENDING', label: 'Pending' },
  { key: 'APPROVED', label: 'Approved' },
  { key: 'ACTIVE', label: 'Active' },
  { key: 'COMPLETED', label: 'Completed' },
  { key: 'CANCELLED', label: 'Cancelled' },
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<BookingStatus | 'ALL'>('ALL');
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getBookings()
      .then(setBookings)
      .catch((err) => setError(err?.message || 'Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = activeTab === 'ALL' ? bookings : bookings.filter((b) => b.status === activeTab);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    setActionLoading(cancelTarget.id);
    try {
      await cancelBooking(cancelTarget.id);
      setBookings((prev) => prev.map((b) => b.id === cancelTarget.id ? { ...b, status: 'CANCELLED' } : b));
      toast('success', 'Booking cancelled.');
      setCancelTarget(null);
    } catch {
      toast('error', 'Failed to cancel booking.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReturn = async (booking: Booking) => {
    setActionLoading(booking.id);
    try {
      await updateBookingStatus(booking.id, 'COMPLETED');
      setBookings((prev) => prev.map((b) => b.id === booking.id ? { ...b, status: 'COMPLETED' } : b));
      toast('success', 'Tool marked as returned.');
    } catch {
      toast('error', 'Failed to update booking.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <FullPageSpinner label="Loading your bookings..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-1">Manage your tool rentals and bookings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              activeTab === tab.key
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
            {tab.key !== 'ALL' && (
              <span className="ml-1.5 text-xs text-gray-400">
                ({bookings.filter((b) => b.status === tab.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {error && <ErrorState message={error} onRetry={load} />}

      {!error && filtered.length === 0 && (
        <EmptyState
          title="No bookings found"
          message={activeTab === 'ALL' ? "You haven't booked any tools yet." : `No ${activeTab.toLowerCase()} bookings.`}
          icon={<Calendar size={28} />}
          action={<Link to="/tools" className="btn-primary">Browse Tools</Link>}
        />
      )}

      {!error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const config = bookingStatusConfig[booking.status];
            return (
              <div key={booking.id} className="card p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Tool image */}
                  <Link to={`/tools/${booking.toolId}`} className="shrink-0">
                    {booking.toolImage ? (
                      <img src={booking.toolImage} alt={booking.toolName} className="w-full sm:w-28 h-28 rounded-lg object-cover" />
                    ) : (
                      <div className="w-full sm:w-28 h-28 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                        <Calendar size={28} />
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/tools/${booking.toolId}`} className="font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                          {booking.toolName}
                        </Link>
                        <p className="text-sm text-gray-500 mt-0.5">Booking ID: {booking.id}</p>
                      </div>
                      <span className={classNames('badge px-3 py-1 shrink-0', config.color)}>
                        {config.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Owner</p>
                        <p className="font-medium text-gray-700 flex items-center gap-1"><User size={13} /> {booking.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Start Date</p>
                        <p className="font-medium text-gray-700">{formatDate(booking.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">End Date</p>
                        <p className="font-medium text-gray-700">{formatDate(booking.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Total Price</p>
                        <p className="font-bold text-gray-900">{formatPrice(booking.totalPrice)}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Link to={`/tools/${booking.toolId}`} className="btn-secondary text-xs px-3 py-2">
                        <Eye size={14} /> View
                      </Link>
                      <Link to="/chat" className="btn-secondary text-xs px-3 py-2">
                        <MessageSquare size={14} /> Contact Owner
                      </Link>
                      {(booking.status === 'ACTIVE') && (
                        <button
                          onClick={() => handleReturn(booking)}
                          disabled={actionLoading === booking.id}
                          className="btn-primary text-xs px-3 py-2"
                        >
                          <Calendar size={14} /> Return Tool
                        </button>
                      )}
                      {(booking.status === 'COMPLETED') && (
                        <button className="btn-accent text-xs px-3 py-2">
                          <Star size={14} /> Leave Review
                        </button>
                      )}
                      {(booking.status === 'PENDING' || booking.status === 'APPROVED' || booking.status === 'ACTIVE') && (
                        <button
                          onClick={() => setCancelTarget(booking)}
                          disabled={actionLoading === booking.id}
                          className="btn-ghost text-xs px-3 py-2 text-red-500 hover:bg-red-50"
                        >
                          <X size={14} /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        title="Cancel Booking?"
        footer={
          <>
            <button onClick={() => setCancelTarget(null)} className="btn-secondary">Keep Booking</button>
            <button onClick={handleCancel} disabled={actionLoading === cancelTarget?.id} className="btn-danger">
              {actionLoading === cancelTarget?.id ? 'Cancelling...' : 'Yes, Cancel'}
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to cancel your booking for <span className="font-semibold">{cancelTarget?.toolName}</span>?
          You may lose your security deposit depending on the cancellation policy.
        </p>
      </Modal>
    </div>
  );
}
