import React from "react";
import { useNavigate } from "react-router-dom";

export default function Backbutton() {
  const navigate = useNavigate();
  const BackNav = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <button
        className="btn-success p-2 fw-bold"
        style={{ marginLeft: "40px", marginTop: "95px" , position: "fixed" ,top:"10px"}}
        onClick={BackNav}
      >
        <i class="bi bi-arrow-left-square-fill" ></i>Back
      </button>
    </div>
  );
}
