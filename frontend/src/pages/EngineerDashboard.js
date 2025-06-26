import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const EngineerDashboard = () => {
  const { token } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorAssignments, setErrorAssignments] = useState("");
  const [errorProfile, setErrorProfile] = useState("");

  // Fetch assignments
  useEffect(() => {
    if (!token) return;
    setLoadingAssignments(true);
    setErrorAssignments("");
    axios
      .get("/api/assignments/my")
      .then((res) => setAssignments(res.data))
      .catch((err) => {
        setErrorAssignments(
          err.response?.data?.message || "Failed to load assignments."
        );
        setAssignments([]);
      })
      .finally(() => setLoadingAssignments(false));
  }, [token]);

  // Fetch profile info
  useEffect(() => {
    if (!token) return;
    setLoadingProfile(true);
    setErrorProfile("");
    axios
      .get("/api/auth/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        setErrorProfile(
          err.response?.data?.message || "Failed to load profile."
        );
        setProfile(null);
      })
      .finally(() => setLoadingProfile(false));
  }, [token]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">My Assignments</h2>
      {loadingAssignments ? (
        <div>Loading assignments...</div>
      ) : errorAssignments ? (
        <div className="text-red-600 mb-4">{errorAssignments}</div>
      ) : (
        <table className="min-w-full bg-white rounded shadow mb-8">
          <thead>
            <tr>
              <th>Project</th>
              <th>Role</th>
              <th>Start</th>
              <th>End</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No assignments found.
                </td>
              </tr>
            ) : (
              assignments.map((a) => (
                <tr key={a._id}>
                  <td>{a.projectId?.name}</td>
                  <td>{a.role}</td>
                  <td>{new Date(a.startDate).toLocaleDateString()}</td>
                  <td>{new Date(a.endDate).toLocaleDateString()}</td>
                  <td>{a.allocationPercentage}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      {loadingProfile ? (
        <div>Loading profile...</div>
      ) : errorProfile ? (
        <div className="text-red-600 mb-4">{errorProfile}</div>
      ) : profile ? (
        <div className="card max-w-md p-4">
          <div>
            <b>Name:</b> {profile.name}
          </div>
          <div>
            <b>Email:</b> {profile.email}
          </div>
          <div>
            <b>Department:</b> {profile.department}
          </div>
          <div>
            <b>Seniority:</b> {profile.seniority}
          </div>
          <div>
            <b>Skills:</b>{" "}
            {profile.skills && profile.skills.length > 0
              ? profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 text-xs"
                  >
                    {skill}
                  </span>
                ))
              : "No skills listed"}
          </div>
        </div>
      ) : (
        <div>No profile data found.</div>
      )}
    </div>
  );
};

export default EngineerDashboard;
