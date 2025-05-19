
import { useState } from 'react'
import './App.css'

function App() {

  // facciamo una variabile che poi andremo ad assegnarla a uno useState dove questa variabile a sua volta conterra i vari input
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    specializzazione: "",
    esperienza:"",
    descrizione: ""
  })

  //Ora facciamo handleChange
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    // console.log("Valore cambiato:", e.target.name, e.target.value);
  }

  //funzione per onSumbit
  function handleSubmit(e) {
    e.preventDefault()

    if (
      !formData.name.trim() ||
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.specializzazione ||
      !formData.esperienza ||
      !formData.descrizione.trim()) 
      {

      alert("Tutti i campi devono essere Compilati!!!");
      return

    } 


    if(Number(formData.esperienza) <= 0 ){
      alert("Gli anni devono essere un numero positivo")
      return
    }


    console.log("hai complilato tutto il form",formData)
  }

  
  return (
    <>
      {/* 📌 Milestone 1: Creare un Form con Campi Controllati */}
      <header>
        <h2>Form di Registrazione</h2>
      </header>

      <main>
        <div>
          <form action="submit" onSubmit={handleSubmit}>
            <input type="text" name='name' value={formData.name} onChange={handleChange} />

            <input type="text" name='username' value={formData.username} onChange={handleChange} />
            <input type="password" name='password' value={formData.password} onChange={handleChange} />

            <select value={formData.specializzazione} onChange={handleChange} name='specializzazione'>
              <option value="">--Seleziona--</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>

            <input type="number" min="1" name="esperienza" value={formData.esperienza} onChange={handleChange} />
            
            <textarea name="descrizione" id="" value={formData.descrizione} onChange={handleChange}>

            </textarea>
            <button>Invia</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default App

//     Aggiungi una validazione al submit, verificando che:
//         Tutti i campi siano compilati
//         L'input Anni di esperienza sia un numero positivo
//         La Specializzazione sia selezionata

//     Al submit, se il form è valido, stampa in console i dati.
