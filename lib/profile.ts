export const AVAILABLE_AVATARS = [
  "/avatars/av1.webp",
  "/avatars/av2.webp",
  "/avatars/av3.webp",
  "/avatars/av4.webp",
  "/avatars/av5.webp",
] as const;

export const PROFILE_CONTENT = {
  title: "Your Profile",
  subtitle: "Manage your information",
  fields: {
    name: {
      label: "Name",
      placeholder: "Your name",
    },
    email: {
      label: "Email",
      placeholder: "your@email.com",
    },
    avatar: {
      label: "Choose an avatar",
    },
  },
  buttons: {
    save: "Save changes",
    saving: "Saving...",
    cancel: "Cancel",
  },
  messages: {
    success: "Profile updated successfully!",
    error: "An error occurred while updating the profile",
  },
  errors: {
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
  },
} as const;
