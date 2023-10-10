import React, { useState,useEffect } from "react";
import CropperImage from "antd-cropper-img";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
// import Figure from "react-bootstrap/Figure";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const ImportImage=({ projectID, dimID,image,CallDatabasesFilter}: { projectID: number; dimID: number;image:string[];CallDatabasesFilter: () => void; })=>{
    const { addImage,getDatabaseProjects} = useDatabaseProjects();
    const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isImage,setIsImage]=useState(false)
  const [hasUploaded, setHasUploaded] = useState(false); // Track whether an image has been uploaded

  // console.log("projectID,dimID,image:",projectID,dimID,image,isImage)
  

  const IsImages=()=>{
    if (image.length>0){
      setIsImage(true)
    }
  }
  useEffect(() => {
    IsImages();
  }, [image]);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {

    if (hasUploaded) {
      // If an image has already been uploaded, prevent further uploads
      return;
    }
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);

      // Set the hasUploaded flag to prevent further uploads
      setHasUploaded(true);

      
        
    });
    addImage(projectID, dimID, info.file.originFileObj as RcFile)
    getDatabaseProjects()
    CallDatabasesFilter()
    console.log("Upload info",info);
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);

    //     // Set the hasUploaded flag to prevent further uploads
    //     setHasUploaded(true);

    //     addImage(projectID, dimID, info.file.originFileObj as RcFile);
          
    //   });
    // }
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8, color:"blue" }}>Add Drawing</div>
    </div>
  );

  return (
    <div >
      <header >
      
      
        <CropperImage>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={{showRemoveIcon:true}}
            // showUploadList={{
            //   showPreviewIcon: false, // Hide preview icon
            //   showRemoveIcon: false, // Hide remove icon
            // }}
            // action="./supertol/test"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onPreview={onPreview}
          >
            {uploadButton}
          </Upload>
        </CropperImage>
       

      </header>
    </div>
  );
}

export default ImportImage