export const AUTH_CONTENT = {
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
} as const;
