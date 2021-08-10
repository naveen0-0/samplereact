import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {

  const [persons,setPersons] = useState([]);
  const [loading,setLoading] = useState(true);
  const [msg,setMsg] = useState(null);
  const [name,setName] = useState("");

  const fetchPersons = async () => {
    try {
      const { data } = await axios.get('https://samplereact12905.herokuapp.com/allpersons');
      if(data.statusload){
        setPersons(data.persons);
        setLoading(false);
      }else{
        setMsg(data.msg);
        setLoading(false);
      }
    } catch (error) {
      setMsg("Error while fetching data");
      setLoading(false);
    }
  }

  const formSubmit = async e => {
    e.preventDefault();
    try {
      let {data} = await axios.post('https://samplereact12905.herokuapp.com/create',{name:name});
      if(data.statusload){
        setPersons(()=>{
          return [...persons,{name:name}]
        })
      }
    } catch (error) {
      setMsg("Unable to post");
    }
  }

  useEffect(()=>{
    fetchPersons();
  },[])

  if(loading){
    return (
      <div>
        Fetching Data
      </div>
    )
  }else{
    return (
      <div>
        <div>
          <form onSubmit={formSubmit}>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
            <input type="submit" value="Send"/>
          </form>
        </div>
        <div>
          {persons.map((person,index)=>{
            return (
              <div key={index}>
                {person.name}
              </div>
            )
          })}
        </div>

        <div>
          <Link to="/about">Go To About Page🥖</Link>
        </div>

        <div>
          {msg}
        </div>
      </div>
    )
  }
}

export default HomePage
