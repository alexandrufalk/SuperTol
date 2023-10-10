// src/components/ImageCropper.js
import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css";
// import "antd-cropper-img/dist/index.css";
import Cropper from "antd-cropper-img";

const ImageCropper = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div>
      <Upload
        action="/your-upload-api"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title="Preview"
        footer={null}
        onCancel={handleCancel}
      >
        <Cropper
          src={previewImage}
          style={{ height: 400, width: "100%" }}
          // Optional configurations for the cropper
          // crop={{ aspect: 16 / 9 }}
          // zoomWithScroll={false}
        />
      </Modal>
    </div>
  );
};

export default ImageCropper;
