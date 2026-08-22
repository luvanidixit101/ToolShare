import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, User, Phone, Check } from 'lucide-react';
import AuthLayout from '@/components/layout/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/common/Toast';
import { classNames } from '@/utils';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const passwordChecks = {
    length: form.password.length >= 8,
    match: form.password === form.confirmPassword && form.password.length > 0,
    hasUpper: /[A-Z]/.test(form.password),
    hasNumber: /\d/.test(form.password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      toast('success', 'Account created! Welcome to ToolShare.');
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Your Account" subtitle="Join ToolShare and start sharing tools today">
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                placeholder="John"
                className="input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label">Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              placeholder="Doe"
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
              className="input pl-10"
            />
          </div>
        </div>
        <div>
          <label className="label">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="input pl-10"
            />
          </div>
        </div>
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="••••••••"
              className="input pl-10 pr-10"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {form.password.length > 0 && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { ok: passwordChecks.length, label: '8+ characters' },
              { ok: passwordChecks.hasUpper, label: 'Uppercase letter' },
              { ok: passwordChecks.hasNumber, label: 'A number' },
              { ok: passwordChecks.match, label: 'Passwords match' },
            ].map((c) => (
              <div key={c.label} className={classNames('flex items-center gap-1.5', c.ok ? 'text-green-600' : 'text-gray-400')}>
                <Check size={14} className={c.ok ? 'text-green-500' : 'text-gray-300'} />
                {c.label}
              </div>
            ))}
          </div>
        )}
        <div>
          <label className="label">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              placeholder="••••••••"
              className="input pl-10"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
