import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const UserDetailPage = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/users/${id}`);

        console.log('API RESPONSE:', res.data);

        setUser(res.data); // OR res.data.user (depends backend)
      } catch (err) {
        console.log(err);
        toast.error('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success('Note deleted');
      navigate('/');
    } catch (error) {
      console.log('Error deleting the note:', error);
      toast.error('Failed to delete note');
    }
  };

  const handleSave = async () => {
    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim()) {
      toast.error('Please add  on blank');
      return;
    }

    setSaving(true);

    try {
      await api.put(`/users/${id}`, user);
      toast.success('user updated successfully');
      navigate('/');
    } catch (error) {
      console.log('Error saving the user:', error);
      toast.error('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Users
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete User
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="first name"
                  className="input input-bordered"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">email </span>
                </label>
                <input
                  type="text"
                  placeholder="email "
                  className="input input-bordered"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  placeholder="Write your note here..."
                  className="input input-bordered"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetailPage;
