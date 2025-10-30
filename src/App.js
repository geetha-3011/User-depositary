// src/App.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Box,
  Fade,
  CssBaseline,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Brightness4, Brightness7, Delete } from "@mui/icons-material";
import UserCard from "./UserCard";
import ProfileModal from "./ProfileModal";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("searchHistory") || "[]");
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  // Save recent searches (unique, up to 5)
  useEffect(() => {
    if (query && !searchHistory.includes(query)) {
      const updated = [query, ...searchHistory].slice(0, 5);
      setSearchHistory(updated);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleDeleteHistory = (item) => {
    const updated = searchHistory.filter((q) => q !== item);
    setSearchHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };

  // Filter users
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <CssBaseline />
      <Box className="app" sx={{ minHeight: "100vh" }}>
        {/* Header */}
        <header
          className="header centered-header"
          style={{
            padding: "25px 0 15px", // ⬅️ Reduced blue area height
            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "4px", fontSize: "1.9rem" }}>
            Users Directory
          </h1>
          <p className="subtitle" style={{ margin: 0, fontSize: "0.95rem" }}>
            Discover and connect with amazing people 👥
          </p>
        </header>

        <Container
          maxWidth="lg"
          className="app-container"
          sx={{ mt: -2 }} // moves search bar closer to header
        >
          {/* Top-right theme toggle only */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: 0.5, mb: 0 }} // ⬅️ Reduced top margin for toggle
          >
            <Tooltip
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <IconButton
                onClick={() => setDarkMode((s) => !s)}
                sx={{ color: darkMode ? "#ffeb3b" : "#1565c0" }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Search Bar */}
          <Box className="search-bar" sx={{ mb: 1, mt: 0.3 }}> {/* ⬅️ Reduced space below header */}
            <TextField
              variant="outlined"
              placeholder="🔍 Search by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 25,
                  backgroundColor: darkMode ? "#424242" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  boxShadow: darkMode
                    ? "0px 0px 10px rgba(255,255,255,0.04)"
                    : "0px 3px 10px rgba(0,0,0,0.06)",
                  border: `2px solid ${darkMode ? "#6a11cb" : "#6a11cb"}`,
                },
              }}
            />
          </Box>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <Box sx={{ mt: 0.3, mb: 1 }}>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {searchHistory.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    onClick={() => setQuery(item)}
                    onDelete={() => handleDeleteHistory(item)}
                    deleteIcon={<Delete sx={{ fontSize: 16 }} />}
                    sx={{
                      background: darkMode
                        ? "rgba(106,17,203,0.9)"
                        : "#e3f2fd",
                      color: darkMode ? "#fff" : "#0d47a1",
                      borderRadius: "16px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Loader or User Cards */}
          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="stretch"
                sx={{ mt: 3 }} // keeps space between search bar and profiles
              >
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                      <Fade in timeout={500 + index * 100}>
                        <div>
                          <UserCard
                            user={user}
                            onView={() => setSelectedUser(user)}
                          />
                        </div>
                      </Fade>
                    </Grid>
                  ))
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 3 }}
                  >
                    <p style={{ color: darkMode ? "#bbb" : "#333" }}>
                      😕 No users found. Try a different name.
                    </p>
                  </Box>
                )}
              </Grid>

              <ProfileModal
                open={!!selectedUser}
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            </>
          )}

          {/* Footer */}
          <footer className="footer" style={{ marginTop: 30 }}>
            <p>© {new Date().getFullYear()} RemitBee Test Project</p>
          </footer>
        </Container>
      </Box>
    </>
  );
}
