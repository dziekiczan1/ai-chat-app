export const AUTH_CONTENT = {
  login: {
    title: "Welcome back!",
    subtitle: "Log in to continue",
    submitButton: "Log in",
    loadingButton: "Logging in...",
  },
  testCredentials: {
    title: "Test login credentials",
    email: {
      label: "Email",
      value: "test@example.com",
    },
    password: {
      label: "Password",
      value: "password123",
    },
  },
  fields: {
    email: {
      label: "Email",
      placeholder: "your@email.com",
    },
    password: {
      label: "Password",
      placeholder: "password123",
    },
  },
  errors: {
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
    passwordRequired: "Password is required",
    invalidCredentials: "Invalid login credentials",
  },
  footer: {
    createdBy: "Created by Piotr Rzadkowolski",
  },
} as const;
