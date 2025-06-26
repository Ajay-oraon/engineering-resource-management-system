import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AssignmentForm = ({ onCreated }) => {
  const { register, handleSubmit, reset } = useForm();
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/api/engineers").then((res) => setEngineers(res.data));
    axios.get("/api/projects").then((res) => setProjects(res.data));
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/assignments", data);
      reset();
      if (onCreated) onCreated();
      alert("Assignment created!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating assignment");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-2 card">
      <h3 className="font-bold">Create Assignment</h3>
      <select
        {...register("engineerId", { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Engineer</option>
        {engineers.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>
      <select
        {...register("projectId", { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        {...register("allocationPercentage", {
          required: true,
          min: 1,
          max: 100,
        })}
        type="number"
        placeholder="Allocation %"
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
        {...register("role")}
        placeholder="Role (optional)"
        className="w-full border p-2 rounded"
      />
      <button className="btn-primary w-full" type="submit">
        Assign
      </button>
    </form>
  );
};

export default AssignmentForm;
