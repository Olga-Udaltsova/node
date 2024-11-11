import React from "react";
import './style.css'

export const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
