import React from "react";
import Header from '../components/Header';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     
      <div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "20px dotted black" }}>
         
         <body>
            <Header />
            <h1>Super Search</h1>
            <img src="/static/search.jpg" style={{height:360,width:750}} />
            <p>Search For Information About Your Local Community</p>
          </body>

        <style jsx>{`
          h1,
          h2,
          a,
          p {
            font-family: "Arial";
            textAlign: center;
            color: black;
          }

          .description {
            font-family: "Arial";
            font-size: "10px";
          }
          
          a {
            text-decoration: underline;
            color: green;
          }

          a:hover {
            opacity: 0.6;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
