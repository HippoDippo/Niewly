import React from 'react';
import './About.css';

export default function About(props) {
  return (
    <div className="about">
      <h1 className="about-heading">About Niewly</h1>
      <p className="about-body">Niewly is a place where people just starting out in the tech industry can share their experiences, findings, and general wisdom for a mutually beneficial cause. Long story short, Niewly is where Stack Overflow meets Medium.</p>
      <p>The awesome magnifying glass icon on the users page was created by <a href="https://thenounproject.com/vijayashastry362/">Fantastic</a>.</p>
    </div>
  );
}