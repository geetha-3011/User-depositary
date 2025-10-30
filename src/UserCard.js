// src/UserCard.js
import React from "react";
import { Card, CardContent, Avatar, Typography, Button } from "@mui/material";
import "./App.css";

export default function UserCard({ user, onView }) {
  // Use user.id or index-like fallback for avatar variation
  const avatarId = (user.id % 70) + 1; // keep within pravatar range

  return (
    <Card className="card custom-card">
      <CardContent style={{ padding: 20, textAlign: "center" }}>
        <div className="avatar">
          <Avatar
            alt={user.name}
            src={`https://i.pravatar.cc/150?img=${avatarId}`}
            sx={{ width: 80, height: 80, margin: "0 auto", border: "3px solid #1976d2" }}
          />
        </div>

        <Typography variant="h6" component="h3" sx={{ mt: 1, color: "#1976d2", fontWeight: 600 }}>
          {user.name}
        </Typography>

        <Typography className="username" sx={{ fontStyle: "italic", mt: 0.5 }}>
          @{user.username.toLowerCase()}
        </Typography>

        <Typography sx={{ fontSize: 14, mt: 1 }}>
          <strong>Email:</strong> {user.email}
        </Typography>

        <Typography sx={{ fontSize: 14 }}>
          <strong>City:</strong> {user.address?.city}
        </Typography>

        <Button
          variant="contained"
          className="view-btn"
          sx={{ mt: 1 }}
          onClick={onView}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}
