"use client";

import { useState, useRef, useEffect } from "react";
import {
  Paperclip,
  Send,
  StopCircle,
  AlertCircle,
  Mic,
  MicOff,
} from "lucide-react";

import { FilePreview } from "./FilePreview";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import {
  CHAT_CONTENT,
  formatFileSize,
  getMaxFileSize,
  isFileSupported,
} from "@/lib/chat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  status: string;
  onSubmit: (files: File[]) => void;
  onStop: () => void;
}

export const ChatInputForm = ({
  input,
  setInput,
  status,
  onSubmit,
  onStop,
}: ChatInputFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(input ? input + " " + transcript : transcript);
    }
  }, [transcript]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    setFileError(null);
    const newFiles: File[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (!isFileSupported(file)) {
        errors.push(`${file.name}: ${CHAT_CONTENT.errors.unsupportedFileType}`);
        return;
      }

      const maxSize = getMaxFileSize(file);
      if (file.size > maxSize) {
        errors.push(
          `${file.name}: ${CHAT_CONTENT.errors.fileTooLarge} ${formatFileSize(maxSize)}`,
        );
        return;
      }

      newFiles.push(file);
    });

    if (errors.length > 0) {
      setFileError(errors.join("\n"));
    }

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileError(null);
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && files.length === 0) return;

    onSubmit(files);
    setInput("");
    setFiles([]);
    setFileError(null);
  };

  return (
    <div className="shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSubmit} className="px-4 py-4">
        <div className="flex flex-col gap-3">
          {fileError && (
            <Card className="p-3 border-red-200 bg-red-50">
              <div className="flex items-start gap-2 text-red-600">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-xs whitespace-pre-line">{fileError}</span>
              </div>
            </Card>
          )}

          {isListening && (
            <Card className="p-3 bg-red-50 border-red-200">
              <div className="flex items-center gap-2 text-red-600">
                <Mic className="h-4 w-4 animate-pulse" />
                <span className="text-xs font-medium">Nagrywanie...</span>
              </div>
            </Card>
          )}

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, index) => (
                <FilePreview
                  key={`${file.name}-${index}`}
                  file={file}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
              ref={fileInputRef}
              accept="image/*,.pdf,.txt"
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => fileInputRef.current?.click()}
              disabled={status !== "ready"}
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            {isSupported && (
              <Button
                type="button"
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                className="shrink-0"
                onClick={handleMicToggle}
                disabled={status !== "ready"}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}

            <Input
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={CHAT_CONTENT.placeholder}
              disabled={status !== "ready"}
            />

            {status === "submitted" || status === "streaming" ? (
              <Button
                type="button"
                onClick={onStop}
                variant="destructive"
                size="icon"
                className="shrink-0"
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                className="shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={
                  status !== "ready" || (!input.trim() && files.length === 0)
                }
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
