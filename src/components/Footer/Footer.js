import React from 'react';
import './Footer.css';

export default function Footer(props) {
  return (
    <div className="footer">
      { props.user ? <h3 className="footer-message">{'<'} Coded with ❤️ by <a href="http://www.HippoDippo.com">Kaycee Ingram</a> {'/>'} {'<'} <a href="http://localhost:3000/#/about">About</a> {'/>'}</h3> : <h3 className="footer-message">{'<'} Coded with ❤️ by <a href="http://www.HippoDippo.com">Kaycee Ingram</a> {'/>'}</h3> }
    </div>
  );
}