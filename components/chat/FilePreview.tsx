"use client";

import Image from "next/image";
import { X, File, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatFileSize } from "@/lib/chat";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export const FilePreview = ({ file, onRemove }: FilePreviewProps) => {
  const isImage = file.type.startsWith("image/");
  const isPDF = file.type === "application/pdf";
  const isText = file.type === "text/plain";

  return (
    <Card className="relative p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          {isImage ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center">
              {isPDF || isText ? (
                <FileText
                  className={`w-8 h-8 text-gray-500 ${isPDF && "text-red-500"}`}
                />
              ) : (
                <File className="w-8 h-8 text-gray-500" />
              )}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {file.type.split("/")[1]?.toUpperCase() || "FILE"}
            </Badge>
            <span className="text-xs text-gray-500">
              {formatFileSize(file.size)}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="shrink-0 h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
