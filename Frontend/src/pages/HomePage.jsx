import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
import axios from 'axios';
import UserCard from '../components/UserCard';
import UserNotFound from '../components/UserNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');

        console.log(res.data.users);

        setUsers(res.data.users); // 🔥 FIXED
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching Users');
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load Users');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">is loading....</div>
        )}
        {users.length === 0 && !isRateLimited && <UserNotFound />}
        {users.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => {
              return (
                <UserCard key={user._id} user={user} setUsers={setUsers} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
