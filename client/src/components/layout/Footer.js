import React from "react";

export default function Footer() {
  return (
    <div>
      <div style={{ marginTop: "80px" }} />
      <footer className="bg-dark text-white mt-5 p-1 text-center fixed-bottom">
        Copyright &copy; {new Date().getFullYear()} Dev Forum
      </footer>
    </div>
  );
}
