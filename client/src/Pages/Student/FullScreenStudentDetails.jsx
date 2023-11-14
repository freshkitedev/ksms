import React, { useState } from 'react';
import './StudentForm.css';
import {useNavigate } from 'react-router-dom';


const FullScreenStudentDetails = ({ student,onClose }) => {

  console.log("student",student);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();
  // Function to show the edit form
  const handleEditClick = () => {
    setShowEditForm(true);
    console.log("updating")
    navigate('/studentform', { state: { data: student } });
  };
  const getFullName = (name) => {
    const { firstName, middleName, lastName } = name;
    let fullName = firstName;
  
    if (middleName) {
      fullName += ` ${middleName}`;
    }
  
    if (lastName) {
      fullName += ` ${lastName}`;
    }
  
    return fullName;
  };
  return (  
    <div className="Student">
      <h2 className='d-flex justify-content-center align-items-center'>Student Details</h2>
      <div className="student-flex-container">
        <div className='details1'>
            <p>Full Name: {getFullName(student.Name)}</p>
            <p>Roll Number: {student.rollNumber}</p>
            <p>Father Name: {student.fatherName}</p>
            <p>Mother's Name: {student.motherName}</p>
            <p>Email: {student.emailID}</p>
            <p>Mobile No: {student.mobileNo}</p>
            <p>Date of Birth: {student.dateOfBirth}</p>
            <p>homeAddress: {student.homeAddress}</p>
            <p>enrollmentDate: {student.enrollmentDate}</p>
            <p>lastDate: {student.lastDate}</p>
            <p>activeIndicator: {student.activeIndicator}</p>
            <p>userGroup: {student.userGroup}</p>
            <p>grade: {student.grade}</p>
            <button onClick={onClose} className='btn btn-danger'>
                  Close
              </button>
        </div>
        <div className='details2'>
            <p>section: {student.section}</p>
            <p>emisNumber: {student.emisNumber}</p>
            <p>group: {student.group}</p>
            <p>admissionNo: {student.admissionNo}</p>
            <p>category: {student.category}</p>
            <p>academicYear: {student.academicYear}</p>
            <p>concessionApplicable: {student.concessionApplicable}</p>
            <p>vanApplicable: {student.vanApplicable}</p>
            <p>vanStop: {student.vanStop}</p>
            <p>newStudent: {student.newStudent}</p>
            <p>admissionFeeCategory: {student.admissionFeeCategory}</p>
            <button className='btn2' onClick={handleEditClick}>
                Edit
            </button>        
        </div>  
      </div>
    </div>  
  );
};

export default FullScreenStudentDetails;