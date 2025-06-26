import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProjectForm from "../components/ProjectForm";
import AssignmentForm from "../components/AssignmentForm";
import EditProjectForm from "../components/EditProjectForm";
import EditAssignmentForm from "../components/EditAssignmentForm";
import { AuthContext } from "../context/AuthContext";
import API_BASE from "../api";

const ManagerDashboard = () => {
  const { token } = useContext(AuthContext);
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Refactor: fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [projectsRes, assignmentsRes, engineersRes] = await Promise.all([
        axios.get(`${API_BASE}/api/projects`),
        axios.get(`${API_BASE}/api/assignments`),
        axios.get(`${API_BASE}/api/engineers`),
      ]);
      setProjects(projectsRes.data);
      setAssignments(assignmentsRes.data);
      setEngineers(engineersRes.data);
    } catch {
      setProjects([]);
      setAssignments([]);
      setEngineers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!token) return;
    fetchDashboardData();
    // eslint-disable-next-line
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Team Overview</h2>
      <button
        className="btn-primary mb-4"
        onClick={() => setShowAssignmentForm((v) => !v)}
      >
        {showAssignmentForm ? "Hide Assignment Form" : "Create Assignment"}
      </button>
      {showAssignmentForm && <AssignmentForm onCreated={fetchDashboardData} />}
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Seniority</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {engineers.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>
                {e.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </td>
              <td>{e.seniority}</td>
              <td>
                <div className="w-32 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${e.currentWorkload}%` }}
                  ></div>
                </div>
                <span className="text-xs">{e.currentWorkload}% allocated</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <button
          className="btn-primary mb-4"
          onClick={() => setShowProjectForm((v) => !v)}
        >
          {showProjectForm ? "Hide Project Form" : "Create Project"}
        </button>
        {showProjectForm && <ProjectForm onCreated={fetchDashboardData} />}
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Team Size</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.status}</td>
                <td>
                  {p.currentTeamSize} / {p.teamSize}
                </td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => setEditingProject(p)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingProject && (
          <EditProjectForm
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onUpdated={fetchDashboardData} // <--- update here
          />
        )}
      </div>

      <div className="mt-8 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">All Assignments</h2>
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th>Engineer</th>
              <th>Project</th>
              <th>Role</th>
              <th>Allocation</th>
              <th>Start</th>
              <th>End</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td>{a.engineerId?.name}</td>
                <td>{a.projectId?.name}</td>
                <td>{a.role}</td>
                <td>{a.allocationPercentage}%</td>
                <td>{new Date(a.startDate).toLocaleDateString()}</td>
                <td>{new Date(a.endDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => setEditingAssignment(a)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingAssignment && (
          <EditAssignmentForm
            assignment={editingAssignment}
            onClose={() => setEditingAssignment(null)}
            onUpdated={fetchDashboardData}
          />
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
