import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [totalRepo, setTotalRepo] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [cari, setCari] = useState('');
  const [error, setError] = useState(false);

  useEffect(()=>{
    fetch('https://api.github.com/users/riyansubekti')
      .then(res => res.json())
      .then(data => {
        setDataUser(data)
      })
  },[])

  const setDataUser = ({
    login,
    name,
    bio,
    avatar_url,
    location,
    public_repos,
    followers,
    following
  }) => {
    setUsername(login)
    setName(name)
    setDesc(bio)
    setImage(avatar_url)
    setLocation(location)
    setTotalRepo(public_repos)
    setFollowers(followers)
    setFollowing(following)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${cari}`)
      .then(res => res.json())
      .then(data => {
        if(data.message){
          setError(true)
        }else{
          setError(false)
          setDataUser(data)
        }
      })
  }

  return (
    <div className="container mt-4">
      <h3>Example Github API</h3>
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="input-group mb-3">
            <input type="text" onChange={e => setCari(e.target.value)} className="form-control" placeholder="username" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button onClick={handleSubmit} className="btn btn-outline-secondary" type="button" id="button-addon2">Cari</button>
          </div>
          {
            !error ?
            <div className="card">
              <img src={image} className="card-img-top" alt=""/>
              <div className="img-body">
              <div className="p-2">
                <div className="card-title" style={{ fontSize: '18px' }}>
                  {name}
                  <div className="text-muted">
                    {username}
                  </div>
                </div>
                <p className="card-text">{desc}</p>
                <p className="card-text text-muted">{location}</p>
              </div>
              <ul className="list-group">
                <li className="list-group-item">Total Repo : {totalRepo}</li>
                <li className="list-group-item">Followers : {followers}</li>
                <li className="list-group-item">Following : {following}</li>
              </ul>
              </div>
            </div> : 
            <h6 className="p-3">
              Username Not Found
            </h6>
          }
        </div>
        <div className="col-sm-12 col-md-8">
          
        </div>
      </div>
    </div>
  );
}

export default App;
