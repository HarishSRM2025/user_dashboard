import { useState } from "react";
import "./auth.css";
const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
console.log( authApiUrl);
const MODULES = [
  { icon: "fa-users", label: "People" },
  { icon: "fa-clock", label: "Attendance" },
  { icon: "fa-money-bill-wave", label: "Payroll" },
  { icon: "fa-chart-pie", label: "Analytics" },
  { icon: "fa-graduation-cap", label: "Learning" },
  { icon: "fa-file-contract", label: "Compliance" },
];

const STATS = [
  { icon: "fa-users", value: "12.4K", label: "Employees" },
  { icon: "fa-building", value: "340+", label: "Companies" },
  { icon: "fa-star", value: "4.9", label: "Avg Rating" },
  { icon: "fa-shield-halved", value: "99.9%", label: "Uptime SLA" },
];

function getStrength(pw) {
  if (!pw) return 0;

  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;

  return s;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "fill-weak", "fill-fair", "fill-good", "fill-strong"];

async function readApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const message = await response.text();
  return {
    success: false,
    message: message || `Request failed with status ${response.status}`,
  };
}

function SignInSection({ isActive, onToggle, onSwitchToSignup }) {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_email: "",
    user_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = async () => {
    if (!form.user_email || !form.user_password) {
      alert("Please fill all fields");
      return;
    }
    
    try {
      setLoading(true);

      const response = await fetch(`${authApiUrl}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await readApiResponse(response);

      if (response.ok) {
        localStorage.setItem("hrm_user_data", JSON.stringify(data));


        console.log("Saved User Data:", data);

        // Example redirect
        window.location.href = "/";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Signin Error:", error);
      alert("Something went wrong while signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-section ${isActive ? "active" : ""}`}>
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <div className="section-icon signin-icon">
            <i className="fa-solid fa-right-to-bracket" />
          </div>

          <div className="section-header-text">
            <div className="section-title">Sign In</div>
            <div className="section-sub">
              {isActive
                ? "Enter your credentials below"
                : "Already have an account? Click to sign in"}
            </div>
          </div>
        </div>

        <div className="section-chevron">
          <i className="fa-solid fa-chevron-down" />
        </div>
      </div>

      <div className="section-body">
        <div className="section-body-inner">
          <div className="form-body">
            <div className="fg">
              <label className="fl">
                Work Email <span className="fl-req">*</span>
              </label>

              <div className="iw">
                <i className="fa-regular fa-envelope ii" />
                <input
                  className="fi"
                  type="email"
                  name="user_email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={form.user_email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fg">
              <label className="fl">
                Password <span className="fl-req">*</span>
              </label>

              <div className="iw">
                <i className="fa-solid fa-lock ii" />

                <input
                  className="fi fi-r"
                  type={showPw ? "text" : "password"}
                  name="user_password"
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  value={form.user_password}
                  onChange={handleChange}
                />

                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                >
                  <i className={`fa-regular ${showPw ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            <div className="extras">
              <label className="check-lbl">
                <input type="checkbox" />
                Keep me signed in
              </label>

              <a href="#" className="forgot">
                Forgot password?
              </a>
            </div>

            <button
              className="submit-btn signin-btn"
              type="button"
              onClick={handleSignin}
              disabled={loading}
            >
              <span className="btn-inner">
                <i className="fa-solid fa-right-to-bracket" />
                {loading ? "Signing In..." : "Sign In to Dashboard"}
              </span>
            </button>

            <div className="switch-txt">
              New to PeopleOS?
              <button type="button" onClick={onSwitchToSignup}>
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpSection({ isActive, onToggle, onSwitchToSignin }) {
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_password: "",
  });

  const strength = getStrength(form.user_password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { user_name, user_email, user_phone, user_password } = form;

    if (!user_name || !user_email || !user_phone || !user_password) {
      alert("Please fill all fields");
      return;
    }

    if (user_password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${authApiUrl}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await readApiResponse(response);

      if (response.ok) {
        localStorage.setItem("hrm_user_data", JSON.stringify(data));

        onSwitchToSignin();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong while signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-section ${isActive ? "active" : ""}`}>
      <div className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <div className="section-icon signup-icon">
            <i className="fa-solid fa-user-plus" />
          </div>

          <div className="section-header-text">
            <div className="section-title">Create Account</div>
            <div className="section-sub">
              {isActive
                ? "Fill in the details to get started"
                : "New here? Register your account"}
            </div>
          </div>
        </div>

        <div className="section-chevron">
          <i className="fa-solid fa-chevron-down" />
        </div>
      </div>
      <div className="section-body">
        <div className="section-body-inner">
          <div className="form-body">
            <div className="fg">
              <label className="fl">
                Username <span className="fl-req">*</span>
              </label>

              <div className="iw">
                <i className="fa-regular fa-user ii" />
                <input
                  className="fi"
                  type="text"
                  name="user_name"
                  placeholder="e.g. ravi.kumar"
                  autoComplete="username"
                  value={form.user_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="half-row">
              <div className="fg">
                <label className="fl">
                  Work Email <span className="fl-req">*</span>
                </label>

                <div className="iw">
                  <i className="fa-regular fa-envelope ii" />
                  <input
                    className="fi"
                    type="email"
                    name="user_email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    value={form.user_email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="fg">
                <label className="fl">
                  Phone <span className="fl-req">*</span>
                </label>

                <div className="iw">
                  <i className="fa-solid fa-phone ii" />
                  <input
                    className="fi"
                    type="tel"
                    name="user_phone"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    value={form.user_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="fg">
              <label className="fl">
                Password <span className="fl-req">*</span>
              </label>

              <div className="iw">
                <i className="fa-solid fa-lock ii" />

                <input
                  className="fi fi-r"
                  type={showPw ? "text" : "password"}
                  name="user_password"
                  placeholder="••••••••••"
                  value={form.user_password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                >
                  <i className={`fa-regular ${showPw ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>

              {form.user_password && (
                <>
                  <div className="strength-bar">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`strength-seg ${
                          strength >= i ? STRENGTH_COLORS[strength] : ""
                        }`}
                      />
                    ))}
                  </div>

                  <div className="strength-hint">
                    {STRENGTH_LABELS[strength]} password
                  </div>
                </>
              )}
            </div>

            <div className="fg">
              <label className="fl">
                Confirm Password <span className="fl-req">*</span>
              </label>

              <div className="iw">
                <i className="fa-solid fa-lock ii" />

                <input
                  className="fi fi-r"
                  type={showCpw ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowCpw((v) => !v)}
                >
                  <i className={`fa-regular ${showCpw ? "fa-eye-slash" : "fa-eye"}`} />
                </button>
              </div>
            </div>

            <button
              className="submit-btn signup-btn"
              type="button"
              onClick={handleSignup}
              disabled={loading}
            >
              <span className="btn-inner">
                <i className="fa-solid fa-user-check" />
                {loading ? "Creating Account..." : "Create My Account"}
              </span>
            </button>

            <p className="terms">
              By registering, you agree to our <a href="#">Terms of Service</a>,{" "}
              <a href="#">Privacy Policy</a> & <a href="#">Data Processing Agreement</a>.
            </p>

            <div className="switch-txt">
              Already have an account?
              <button type="button" onClick={onSwitchToSignin}>
                Sign in instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HRMSAuth() {
  const [active, setActive] = useState("signin");

  const toggle = (section) => {
    setActive((prev) => (prev === section ? null : section));
  };

  return (
    <div className="hrms-root">
      <div className="hrms-left">
        <div className="left-logo">
          <div className="logo-mark">
            <i className="fa-solid fa-sitemap" />
          </div>
          <span className="logo-text">PeopleOS</span>
          <span className="logo-badge">HRMS</span>
        </div>

         {/* Hero */}
        <div className="left-hero">
          <div className="left-eyebrow">
            <div className="left-eyebrow-dot" />
            <span>Trusted by 340+ organisations</span>
          </div>

          <h1 className="left-title">
            Your People,<br />
            <span className="italic">Unified.</span>
          </h1>

          <p className="left-subtitle">
            End-to-end HR management — from onboarding to payroll,
            attendance to performance — all in one intelligent platform.
          </p>

          {/* Stats */}
          <div className="stat-cards">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-icon">
                  <i className={`fa-solid ${s.icon}`} />
                </div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Module pills */}
          <div>
            <div
              className="role-label-sm"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Modules included
            </div>
            <div className="module-pills">
              {MODULES.map((m) => (
                <span className="module-pill" key={m.label}>
                  <i className={`fa-solid ${m.icon}`} />
                  {m.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="left-footer">
          <div className="avatars">
            <div className="av av-1">R</div>
            <div className="av av-2">S</div>
            <div className="av av-3">K</div>
            <div className="av av-4">P</div>
          </div>
          <span className="footer-txt">
            <strong>12,400+ employees</strong> managed daily
          </span>
        </div>
        
      </div>

      <div className="hrms-right">
        <div className="auth-sections">
          <SignInSection
            isActive={active === "signin"}
            onToggle={() => toggle("signin")}
            onSwitchToSignup={() => setActive("signup")}
          />

          <SignUpSection
            isActive={active === "signup"}
            onToggle={() => toggle("signup")}
            onSwitchToSignin={() => setActive("signin")}
          />
        </div>
      </div>
    </div>
  );
}
