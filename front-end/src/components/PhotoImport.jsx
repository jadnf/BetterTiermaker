import React, { useState } from "react";

function UploadPhoto({ onUpload }) {
  //const [imagePreview, setImagePreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    //setImagePreview(imageUrl);

    // send image back to TierlistPage
    if (onUpload) {
      onUpload(imageUrl);
    }
  }

  return (
    <div>
      <h2>This is the Photo Import</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* {imagePreview && (
        <div>
          <h3>Preview:</h3>
          <img src={imagePreview} alt="Uploaded" width="150" />
        </div>
      )} */}
    </div>
  );
}

export default UploadPhoto;
