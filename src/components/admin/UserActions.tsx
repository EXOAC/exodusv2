import { useState } from 'react';
import { MoreVertical, Shield, Ban, Check } from 'lucide-react';
import { useUsers, type User } from '../../hooks/useUsers';
import toast from 'react-hot-toast';

interface UserActionsProps {
  user: User;
}

export default function UserActions({ user }: UserActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { banUser, unbanUser, updateUser } = useUsers();

  const handleBan = async () => {
    try {
      await banUser.mutateAsync(user._id);
      toast.success('User banned successfully');
    } catch (error) {
      toast.error('Failed to ban user');
    }
  };

  const handleUnban = async () => {
    try {
      await unbanUser.mutateAsync(user._id);
      toast.success('User unbanned successfully');
    } catch (error) {
      toast.error('Failed to unban user');
    }
  };

  const handleRoleToggle = async () => {
    try {
      await updateUser.mutateAsync({
        id: user._id,
        role: user.role === 'admin' ? 'user' : 'admin'
      });
      toast.success('User role updated successfully');
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-orange-500/20 rounded-lg shadow-xl">
          <button
            onClick={handleRoleToggle}
            className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Shield className="w-4 h-4" />
            <span>Toggle Admin Role</span>
          </button>

          {user.status === 'active' ? (
            <button
              onClick={handleBan}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-400 hover:text-red-400 hover:bg-white/5"
            >
              <Ban className="w-4 h-4" />
              <span>Ban User</span>
            </button>
          ) : (
            <button
              onClick={handleUnban}
              className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-400 hover:text-green-400 hover:bg-white/5"
            >
              <Check className="w-4 h-4" />
              <span>Unban User</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}