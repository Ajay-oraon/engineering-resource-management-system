import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditAssignmentForm = ({ assignment, onClose, onUpdated }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      allocationPercentage: assignment.allocationPercentage,
      startDate: assignment.startDate?.slice(0, 10),
      endDate: assignment.endDate?.slice(0, 10),
      role: assignment.role,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/assignments/${assignment._id}`, data);
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating assignment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow max-w-md w-full"
      >
        <h3 className="font-bold mb-2">Edit Assignment</h3>
        <input
          {...register("allocationPercentage", {
            required: true,
            min: 1,
            max: 100,
          })}
          type="number"
          placeholder="Allocation %"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          {...register("startDate", { required: true })}
          type="date"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          {...register("endDate", { required: true })}
          type="date"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          {...register("role")}
          placeholder="Role"
          className="w-full border p-2 rounded mb-2"
        />
        <div className="flex gap-2">
          <button className="btn-primary flex-1" type="submit">
            Save
          </button>
          <button
            className="btn-secondary flex-1"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAssignmentForm;
