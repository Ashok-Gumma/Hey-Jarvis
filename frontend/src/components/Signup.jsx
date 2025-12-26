import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProfileSelection from "../components/ProfileSelection";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hobbies: [],
    strengths: [],
    weaknesses: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSelect = (category, value) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (
      form.hobbies.length === 0 ||
      form.strengths.length === 0 ||
      form.weaknesses.length === 0
    ) {
      setError(
        "Please select at least one hobby, strength, and weakness to personalize your AI friend!"
      );
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-large">
        <h2 className="auth-title">Create Your Account</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
            required
            minLength={6}
          />

          {/* Profile Selection */}
          <div className="signup-profile-section">
            <h3 className="signup-profile-title">
              Tell us about you (AI personalization)
            </h3>

            <ProfileSelection
              selections={form}
              onSelect={handleSelect}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up & Meet Your AI Friend"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
