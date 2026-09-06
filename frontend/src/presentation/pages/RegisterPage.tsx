import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../components/common/Input/Input";
import { Button } from "../components/common/Button/Button";
import type { UserRole } from "../../domain/user/types";

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ các thông tin bắt buộc");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu tối thiểu 8 ký tự");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });
      navigate(role === "restaurant_owner" ? "/business" : "/");
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        const validationErrors = requestError.response?.data?.errors as
          | Record<string, string[]>
          | undefined;
        const firstMessage = validationErrors
          ? Object.values(validationErrors).flat()[0]
          : undefined;

        setError(
          firstMessage ??
            requestError.response?.data?.message ??
            "Đăng ký không thành công.",
        );
      } else {
        setError("Đăng ký không thành công. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <h1
        style={{
          fontSize: "var(--font-size-2xl)",
          fontWeight: 800,
          marginBottom: "8px",
          color: "var(--color-text-main)",
        }}
      >
        Đăng ký tài khoản
      </h1>
      <p
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-sm)",
          marginBottom: "20px",
        }}
      >
        Tham gia cộng đồng đánh giá ẩm thực lớn nhất TP. Long Xuyên
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "var(--color-danger-bg)",
            color: "var(--color-danger-text)",
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            marginBottom: "16px",
            fontSize: "var(--font-size-sm)",
          }}
        >
          {error}
        </div>
      )}

      {/* Role Selector Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => setRole("user")}
          style={{
            padding: "10px",
            borderRadius: "var(--radius-md)",
            border: `1.5px solid ${role === "user" ? "var(--color-primary)" : "var(--color-border)"}`,
            backgroundColor:
              role === "user"
                ? "var(--color-primary-subtle)"
                : "var(--color-bg-card)",
            color:
              role === "user"
                ? "var(--color-primary)"
                : "var(--color-text-body)",
            fontWeight: 600,
            fontSize: "var(--font-size-sm)",
          }}
        >
          👤 Thực khách
        </button>
        <button
          type="button"
          onClick={() => setRole("restaurant_owner")}
          style={{
            padding: "10px",
            borderRadius: "var(--radius-md)",
            border: `1.5px solid ${role === "restaurant_owner" ? "var(--color-primary)" : "var(--color-border)"}`,
            backgroundColor:
              role === "restaurant_owner"
                ? "var(--color-primary-subtle)"
                : "var(--color-bg-card)",
            color:
              role === "restaurant_owner"
                ? "var(--color-primary)"
                : "var(--color-text-body)",
            fontWeight: 600,
            fontSize: "var(--font-size-sm)",
          }}
        >
          🏪 Chủ quán ăn
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Họ và tên"
          placeholder="Ví dụ: Nguyễn Văn A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Địa chỉ Email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Tối thiểu 8 ký tự"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading}
        >
          Hoàn tất đăng ký
        </Button>
      </form>

      <div
        style={{
          marginTop: "24px",
          textAlign: "center",
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-secondary)",
        }}
      >
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          style={{ color: "var(--color-primary)", fontWeight: 600 }}
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};
