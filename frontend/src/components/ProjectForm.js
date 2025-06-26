import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE from "../api";

const ProjectForm = ({ onCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_BASE}/api/projects`, data);
      reset();
      if (onCreated) onCreated();
      alert("Project created!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating project");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-2 card">
      <h3 className="font-bold">Create Project</h3>
      <input
        {...register("name", { required: true })}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("description", { required: true })}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("startDate", { required: true })}
        type="date"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("endDate", { required: true })}
        type="date"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("requiredSkills")}
        placeholder="Skills (comma separated)"
        className="w-full border p-2 rounded"
      />
      <input
        {...register("teamSize", { required: true, min: 1 })}
        type="number"
        placeholder="Team Size"
        className="w-full border p-2 rounded"
      />
      <button className="btn-primary w-full" type="submit">
        Create
      </button>
      {errors.name && <span className="text-red-500">Name is required</span>}
    </form>
  );
};

export default ProjectForm;
