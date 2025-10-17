const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;
const DOCUMENT_MIME_TYPES = ["application/pdf", "text/plain"] as const;

type ImageMimeType = (typeof IMAGE_MIME_TYPES)[number];
type DocumentMimeType = (typeof DOCUMENT_MIME_TYPES)[number];
type SupportedMimeType = ImageMimeType | DocumentMimeType;

export const SUPPORTED_FILE_TYPES = {
  images: {
    mimeTypes: IMAGE_MIME_TYPES as readonly string[],
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    maxSize: 5 * 1024 * 1024,
  },
  documents: {
    mimeTypes: DOCUMENT_MIME_TYPES as readonly string[],
    extensions: [".pdf", ".txt"],
    maxSize: 10 * 1024 * 1024,
  },
} as const;

export const CHAT_CONTENT = {
  errors: {
    unsupportedFileType:
      "Unsupported file type. Supported formats: images (JPG, PNG, GIF, WebP) and documents (PDF, TXT)",
    fileTooLarge: "The file is too large. Maximum size:",
    invalidFile: "Invalid file",
  },
  filePreview: {
    title: "Attachment preview",
    remove: "Remove",
    size: "Size:",
  },
  placeholder: "Type a message...",
  emptyState: {
    title: "Start a conversation with AI",
    subtitle: "Ask a question or upload a file to begin the chat",
  },
} as const;

const isSupportedMimeType = (type: string): type is SupportedMimeType => {
  return [...IMAGE_MIME_TYPES, ...DOCUMENT_MIME_TYPES].includes(
    type as SupportedMimeType,
  );
};

export const isFileSupported = (file: File): boolean => {
  return isSupportedMimeType(file.type);
};

export const getMaxFileSize = (file: File): number => {
  if ((IMAGE_MIME_TYPES as readonly string[]).includes(file.type)) {
    return SUPPORTED_FILE_TYPES.images.maxSize;
  }
  if ((DOCUMENT_MIME_TYPES as readonly string[]).includes(file.type)) {
    return SUPPORTED_FILE_TYPES.documents.maxSize;
  }
  return 0;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
