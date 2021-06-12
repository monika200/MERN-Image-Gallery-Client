import React, { Component } from 'react';
import AppNavbar from './components/navbar';
import axios from 'axios';

class App extends Component {

  state = {
    images : []
  }

  componentDidMount(){
    axios
      .get('https://mern-image-gallery.herokuapp.com/api/files')
      .then(res => {
          console.log(res)
          this.setState({
            images : res.data.images
          })
      })
  }

  onDelete = id => {
      axios
        .delete(`https://mern-image-gallery.herokuapp.com/api/file/`+id)
        .then(res => {
          if(res.data.success){
            window.location.reload()
          }
        })
  }

  render() { 

    return ( 
      <div>
          <AppNavbar/>
          <br/><br/>

          <div className="container row">

          {
            this.state.images.length === 0 ? (
              <h4>You have not uploaded any images</h4>
            ) : (
              this.state.images.map(img => {
              let address = 'https://mern-image-gallery.herokuapp.com/api/'+img.address;
            
              return(
                <div key={img._id}>
                  <div className="col s6">
                    <div className="card">
                      <div className="card-image">
                        <img src={address} alt="Image"/>
                        <a className="btn-floating halfway-fab waves-effect waves-light red">
                          
                        <button onClick={() => this.onDelete(img._id)} style={{
                            backgroundColor : "transparent",
                            border : 0
                          }}>
                          <i className="material-icons">
                            delete
                          </i>
                        </button>
                        </a>
                      </div>
                      <div className="card-content">
                        <p>Image Id : {img._id}</p>
                      </div>
                    </div>
                  </div>
                  </div>
              )

            }
            )
          )
        }

        </div>
      </div>
     );
  }
}
 
export default App;