'use client';

import { FaTrash } from 'react-icons/fa';
import React from 'react';
import deleteRoom from '@/app/actions/deleteRoom';
import { toast } from 'react-toastify';

const DeleteRoomButton = ({ roomId }) => {
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this room?');
    if (confirm) {
      try {
        const response = await deleteRoom(roomId);
        toast.success('Room deleted successfully');
      } catch (e) {
        console.log(e);
        toast.error('An error occurred');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className="inline mr-1" />Delete
    </button>
  );
};

export default DeleteRoomButton;
