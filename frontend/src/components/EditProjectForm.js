import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const EditProjectForm = ({ project, onClose, onUpdated }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: project.name,
      description: project.description,
      startDate: project.startDate?.slice(0, 10),
      endDate: project.endDate?.slice(0, 10),
      requiredSkills: project.requiredSkills?.join(", "),
      teamSize: project.teamSize,
      status: project.status,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/projects/${project._id}`, {
        ...data,
        requiredSkills: data.requiredSkills.split(",").map((s) => s.trim()),
      });
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating project");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow max-w-md w-full"
      >
        <h3 className="font-bold mb-2">Edit Project</h3>
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          {...register("description", { required: true })}
          placeholder="Description"
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
          {...register("requiredSkills")}
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          {...register("teamSize", { required: true, min: 1 })}
          type="number"
          placeholder="Team Size"
          className="w-full border p-2 rounded mb-2"
        />
        <select
          {...register("status")}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
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

export default EditProjectForm;
