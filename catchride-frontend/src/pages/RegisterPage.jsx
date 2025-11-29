import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "traveller", phone: "" });
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", form);
      setUser(res.data);
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <Box className="app-container">
      <Typography variant="h5">Register</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 480 }}>
        <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Phone (10 digits)" name="phone" value={form.phone} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField fullWidth type="password" label="Password" name="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} required />
        <TextField select fullWidth label="Role" name="role" value={form.role} onChange={handleChange} SelectProps={{ native: true }} sx={{ mb: 2 }}>
          <option value="traveller">Traveller</option>
          <option value="rider">Rider</option>
        </TextField>

        <Button variant="contained" type="submit">Register</Button>
      </Box>
    </Box>
  );
}
