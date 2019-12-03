import React from "react";
import Header from '../components/Header';
import {getInfo} from '../lib/utils.js'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={search: ""};
  }

  async handleSearch(evt){
    this.setState({search: evt.target.value});
    const item = await getInfo(evt.target.value);
    this.setState({item});
  }


  render() {
    return (
     
      <div style={{ margin: "auto auto", width: "1000px", textAlign: "center", border: "2px solid green", padding: "9px" }}>
            
            <Header />
            
            <h2>Super Search</h2>

              <p><input placeholder = 'search...' type='text' value={this.state.search} onChange={this.handleSearch.bind(this)}/></p>
                  
                  {'item' in this.state && this.state.search != '' && this.state.item.type == 'movies' ? <div>
                      <br />
                      <table>
                        <tbody>
                          {this.state.item.results.map((thing, key) =>
                              <tr>
                                  <td>{thing.movie}</td>
                                  <td>{thing.theater}</td>
                                  <td>{thing.address}</td>
                                  <td>{thing.city}</td>
                                  <td>{thing.zip}</td>
                              </tr>
                            )}
                          
                        </tbody>
                      </table>


                  </div> : null}

                  {'item' in this.state && this.state.search != '' && this.state.item.type == 'stores' ? <div>
                    <br />
                      <table>
                        <tbody>
                          {this.state.item.results.map((thing, key) =>
                            <tr>
                              <td>{thing.name}</td>
                              <td>{thing.typename}</td>
                              <td>{thing.address}</td>
                              <td>{thing.city}</td>
                              <td>{thing.zip}</td>
                            </tr>
                            )}
                          
                        </tbody>
                      </table>
                    </div> : null}


              


              <style jsx>{`
                  h1{
                    color:black; 
                    font-family: "Arial";
                    margin: "auto auto"; 
                    width: 100%;
                    display: inline; 
                    textAlign: "center";
                    padding: "0 px";
                  }

                  h2,
                  a{
                    font-family: "Arial";
                    textAlign: "center";
                    color: black;
                    margin:"auto auto";
                    padding:"9px";
                  }

                  .h3{
                    font-family: "Arial";
                    textAlign: center;
                    color: black;
                  }

                  .p{
                    font-family: "Arial";
                    textAlign: center;
                    color: black;
                  }

                  .button-style{
                    margin: auto auto;
                    cursor: pointer;
                    background-color: green;
                    color: #ffffff;
                    width: 100px;
                    font-family: "Arial";
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
                  table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                  }

                  td, th {
                    border: 1px solid #ffffff;
                    text-align: left;
                    padding: 8px;
                  }

                  tr:nth-child(even) {
                    background-color: #dddddd;
                  }
              `}</style>
      </div>
    );
  }
}

export default Home;
