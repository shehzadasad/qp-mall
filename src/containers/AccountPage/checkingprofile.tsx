import React, { useState } from "react";

function CheckingProfile() {
  const [filebase64, setFileBase64] = useState<string>("");

  function convertFile(files: FileList | null) {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      // console.log("This file upload is of type:",fileType)
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={(e) => convertFile(e.target.files)} />
      <hr />
      {filebase64 && (
        <>
          {/* if it's an image */}
          {filebase64.indexOf("image/") > -1 && (
            <img src={filebase64} width={300} />
          )}
          {/* if it's an image */}
        </>
      )}
    </div>
  );
}

export default CheckingProfile;
