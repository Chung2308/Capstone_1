import React, { Component } from "react";
import "./Resources.css";
import data_qs from './../CreateTests/Question.json'

export default class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_title: "",
      data_Resources: data_qs,
    };
  }
  isChange(event) {
    var value = event.target.value;
    var name = event.target.name;
    this.setState({
      [name]: value,
    });
    // console.log(this.state.test);
  }
  addTitle() {
    return (
      <div className="title">
        <input
          type="text"
          id="content_title"
          placeholder="Enter title content"
          name="add_title"
          onChange={(event) => {
            this.isChange(event);
          }}
        />
      </div>
    );
  }
  getImage(event) {
    const getFile = event.target.files[0];
    console.log(getFile);
    return getFile
  }
  selectFile() {
    console.log(this.FileAttachment);
    return (
      <div className="select-file">
        <div className="content-select-file">
          <p>Drop files here to start uploading</p>
          <p>or</p>
          <div className="file-upload btn btn-info">
            <span>Select File</span>
            <input
              type="file"
              name="FileAttachment"
              id="FileAttachment"
              className="upload"
              onChange={(event) => {
                this.getImage(event);
              }}
            />
          </div>
          <input
            type="text"
            id="fileuploadurl"
            readOnly
            placeholder="Maximum file size is 1GB"
          />
        </div>
      </div>
    );
  }
  // showInfor(value_1, value_2) {
  //   var file = [];
  //   (file.name_title = value_1), (file.content_file = value_2);
  //   var file2 = this.state.data_Resources;
  //   file2.push(file);
  // }
  render() {
    // console.log(getImage());
    return (
      <div className="resources">
        {this.addTitle()}
        {this.selectFile()}
        <div className="add-file">
          <button
            className="add"
            onClick={(value_1, value_2) => {
              this.showInfor(value_1, value_2);
            }}
          >
            ADD
          </button>
        </div>
        <div className="content-file">
          <div className="title-file">
            <h4 name="name_title">Name File: {this.state.add_title}</h4>
          </div>
          <div className="content-title">
            <label htmlFor name="content_file">
              DB: Content File  {this.getFile}
            </label>
          </div>
        </div>
      </div>
    );
  }
}

// import React from 'react'
// import { useState } from "react";
// import "./Resources.css";
// import dataQs from './../CreateTests/Question.json'

// export default function Resources() {
//   const [addTitle, setAddTitle] = useState("");
//   const [dataResource, setDataResource] = useState("dataQs");
//   const [test, setTest] = useState({
//   });
//   const isChange = (event) => {
//     setTest({ ...test, [event.target.name]: event.target.value });
//   };
//   const addContentTitle = () => {
//     <div className="title">
//         <input
//           type="text"
//           id="content_title"
//           placeholder="Enter title content"
//           name="add_title"
//           onChange={(event) => {
//             isChange(event);
//           }}
//         />
//       </div>
//   };
//   const getNewFile = (event) =>{
//     var getFile = event.target.files[0].name;
//     console.log(getFile);
//     return getFile
//   }
//   const selectFile = () =>{
//     <div className="select-file">
//         <div className="content-select-file">
//           <p>Drop files here to start uploading</p>
//           <p>or</p>
//           <div className="file-upload btn btn-info">
//             <span>Select File</span>
//             <input
//               type="file"
//               name="FileAttachment"
//               id="FileAttachment"
//               className="upload"
//               onChange={(event) => {
//                 getNewFile(event);
//               }}
//             />
//           </div>
//           <input
//             type="text"
//             id="fileuploadurl"
//             readOnly
//             placeholder="Maximum file size is 1GB"
//           />
//         </div>
//       </div>
//   }
//   const showInfor = (value_1, value_2) => {
//     var file = [];
//     (file.name_title = value_1), (file.content_file = value_2);
//     var file2 = this.state.data_Resources;
//     file2.push(file);
//   };
//   return (
//     <div className="resources">
//       {addContentTitle()}
//       {selectFile()}
//       <div className="add-file">
//         <button
//           className="add"
//           onClick={(value_1, value_2) => {
//             showInfor(value_1, value_2);
//           }}
//         >
//           ADD
//         </button>
//       </div>
//       <div className="content-file">
//         <div className="title-file">
//           <h4 name="name_title">Name File: {addTitle}</h4>
//         </div>
//         <div className="content-title">
//           <label htmlFor name="content_file">
//             DB: Content File
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }
