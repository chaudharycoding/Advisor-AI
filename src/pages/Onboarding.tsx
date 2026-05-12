import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Onboarding = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last name');
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile({ firstName: firstName.trim(), lastName: lastName.trim() });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save your information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-glow mb-4">
            <span className="text-3xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Welcome!</h1>
          <p className="text-slate-400 mt-2">Let's get to know you</p>
        </div>

        <div className="bg-dark-panel/40 backdrop-blur-xl border border-dark-border/30 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border/40 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 transition-all"
                placeholder="Sam"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg/60 border border-dark-border/40 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 transition-all"
                placeholder="Smith"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
