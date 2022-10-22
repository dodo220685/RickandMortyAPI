import { useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react'

function App() {
 
  const [personajes, setPersonajes]=useState([])
  const [busqueda, setBusqueda]=useState("")
  const [select, setSelect] = useState("")
  const [gender, setGender] = useState("")

  useEffect(()=>{
    const obtenerPersonajes = async()=>{
      const respuesta= await axios.get ('https://rickandmortyapi.com/api/character')
      console.log(respuesta.data.results)
      setPersonajes(respuesta.data.results)
    }
    obtenerPersonajes()
  },[])

  const buscarNombre = (e) =>{
    e.preventDefault()
    setBusqueda(e.target.value)
    filtrar(e.target.value)
    console.log (e.target.value)
  }

  const filtrar = (terminoBusqueda)=>{
    const resultadoBusqueda=personajes.filter((personaje)=>{
      if(personaje.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return personaje
      }
    })
    setPersonajes(resultadoBusqueda)
  }

  const buscarSelect = (e) =>{
    e.preventDefault()
    setSelect(e.target.value)
    filtroSelect(e.target.value)
    console.log(e.target.value)
  }

  const filtroSelect =(opcion)=>{
    const resultadoSelect = personajes.filter((personaje)=>{
      if(personaje.status.includes(opcion))
      return personaje
    })
    setPersonajes(resultadoSelect)
  }
  // buscarSelect(setSelect)

  const buscarGender = (e) =>{
    e.preventDefault()
    setGender(e.target.value)
    filtroGender(e.target.value)
    console.log(e.target.value)
  }

  const filtroGender =(opcion)=>{
    const resultadoGender = personajes.filter((personaje)=>{
      if(personaje.gender.includes(opcion))
      return personaje
    })
    setPersonajes(resultadoGender)
  }

  return (
    <div className='container p-3 mb-3'>
      <h1>Rick and Morty API</h1>
      <div className='container'>
        <div className='row mt-3'>
          <div className='containerInput col-md-6'>
        <input className='form-control'
        value={busqueda}
        placeholder="Buscar por Nombre"
        onChange={buscarNombre}
        
        />
        </div>
        <div className='col-md-3'>
        <select className="form-select" aria-label="Default select example" onChange={buscarSelect} value={select} >
            <option selected >Buscar por estado</option>
            <option   value="Alive">Alive</option>
            <option   value="Dead">Dead</option>
            <option   value="unknown">unknown</option>
        </select>
        </div>
        <div className='col-md-3'>
        <select className="form-select" aria-label="Default select example" onChange={buscarGender} value={gender} >
            <option selected >Buscar por genero</option>
            <option   value="Male">Masculino</option>
            <option   value="Female">Femenino</option>
            
        </select>
        </div>
        </div>
        </div>
      <div className='container p-4'>
        <div className='row'>
        {
          personajes.map( value => (
          <div className='container col-md-4'>
            <div>
          <div className="card mb-3 maximagen" key={value.id}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={value.image} className="img-fluid rounded-start" alt="..."/>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{value.name}</h5>
                <p className="card-text">{value.status} - {value.species}</p>
                <p className="card-text"><small class="text-muted">Ubicación: {value.location.name}</small></p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        ))
        }
        </div>
        </div>

    </div>
  )
}

export default App
