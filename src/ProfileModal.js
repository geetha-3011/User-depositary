// src/ProfileModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

export default function ProfileModal({ open, user, onClose }) {
  if (!user) return null;

  const avatarId = (user.id % 70) + 1;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ background: "linear-gradient(90deg,#1976d2,#6a11cb)", color: "#fff" }}>
        {user.name}
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
          <Avatar
            src={`https://i.pravatar.cc/150?img=${avatarId}`}
            alt={user.name}
            sx={{ width: 90, height: 90, border: "3px solid #1976d2" }}
          />
          <Box>
            <Typography variant="subtitle1">@{user.username.toLowerCase()}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Typography variant="body2">{user.phone}</Typography>
          </Box>
        </Box>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
          Address
        </Typography>
        <Typography variant="body2">
          {user.address.suite}, {user.address.street}, {user.address.city} - {user.address.zipcode}
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
          Company
        </Typography>
        <Typography variant="body2">
          {user.company.name}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {user.company.catchPhrase}
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
          Website
        </Typography>
        <Typography variant="body2">
          {user.website}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
