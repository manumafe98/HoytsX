import { Close, DownloadCloudIcon } from "@/icons";
import { useRef, useState } from "react";

interface ImageUploaderProps {
  handleImageChange: (file: File | undefined) => void;
}

export const ImageUploader = ({ handleImageChange }: ImageUploaderProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFile = (file: File | undefined) => {
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAltText(file.name);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
    handleImageChange(file);
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setAltText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-[75%] max-md:w-[85%] h-[40%] border-4 border-dashed border-primary p-5 relative text-white rounded-xl"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {!image ? (
        <>
          {isDragging ? (
            <>
              <DownloadCloudIcon className="size-48" />
            </>
          ) : (
            <>
              <span className="max-sm:text-sm max-sm:text-center">
                Upload file: JPG, PNG, WEPB Max 10MB
              </span>
              <DownloadCloudIcon className="fill-current text-primary" />
              <span className="max-sm:text-center">Drag & Drop File</span>
              <span>or</span>
              <span
                className="mt-2 underline opacity-50 cursor-pointer max-sm:text-sm max-sm:text-center hover:opacity-70"
                role="button"
                onClick={selectFiles}
              >
                Browse Media on your device
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <Close
            className="absolute fill-current text-white size-8 right-2 top-2 cursor-pointer hover:opacity-75"
            onClick={removeImage}
          />
          <img src={previewUrl as string} alt={altText} className="max-h-72" />
        </>
      )}
      <input
        className="hidden"
        type="file"
        name="file"
        multiple={false}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};
