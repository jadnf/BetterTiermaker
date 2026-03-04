import React from "react";

function UploadPhoto({ onUpload }) {

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
  if (!files.length) return;

    files.forEach(file => {
      const imageUrl = URL.createObjectURL(file);
      if (onUpload) {
      onUpload(imageUrl, file.name);
    }});
  }

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default UploadPhoto;
