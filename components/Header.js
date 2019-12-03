import Link from 'next/link';
import jsCookie from "js-cookie";

const linkStyle = {
  marginRight: 10,
  marginLeft: 10,
  color: "black",
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    
    <Link href="/Search">
      <a style={linkStyle}>Search</a>
    </Link>

    {jsCookie.get("username") ?
    <Link href="/Logout">
      <a style={linkStyle}>Logout</a>
    </Link>
    :
    <Link href="/Login">
      <a style={linkStyle}>Login</a>
    </Link>}
    {jsCookie.get("username")}

    <Link href="/Register">
      <a style={linkStyle}>Register</a>
    </Link>
  
  </div>
);

export default Header;
