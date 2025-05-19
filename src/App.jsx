
import { useState } from 'react'
import './App.css'

function App() {

  // facciamo una variabile che poi andremo ad assegnarla a uno useState dove questa variabile a sua volta conterra i vari input

  // Oggetto con i valori iniziali del form
  const initialFormData = {
    name: "",
    username: "",
    password: "",
    specializzazione: "",
    esperienza: "",
    descrizione: ""
  }

  // Stato per gestire i dati del form e gli errori
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  // Stringhe contenenti i caratteri validi per la password
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";


  // Funzione di validazione dei campi
  const validate = (name, value) => {
    let error = ""

    // Validazione username: minimo 6 caratteri alfanumerici
    if (name === "username") {
      const isValid = /^[a-zA-Z0-9]{6,}$/.test(value)
      if (!isValid) error = "Almeno 6 caratteri alfanumerici, senza spazi o simboli"
    }

    // Validazione password: minimo 8 caratteri con lettere, numeri e simboli
    if (name === "password") {
      const hasLetter = [...value].some(c => letters.includes(c))
      const hasNumber = [...value].some(c => numbers.includes(c))
      const hasSymbol = [...value].some(c => symbols.includes(c))
      if (!(value.length >= 8 && hasLetter && hasNumber && hasSymbol)) {
        error = "Minimo 8 caratteri, 1 lettera, 1 numero, 1 simbolo"
      }
    }

    // Validazione descrizione: tra 100 e 1000 caratteri
    if (name === "descrizione") {
      const len = value.trim().length
      if (len < 100 || len > 1000) error = "Tra 100 e 1000 caratteri"
    }

    // Aggiorna lo stato degli errori
    setErrors(prev => ({ ...prev, [name]: error }))
  }




  // Gestore del cambiamento dei campi input
  const handleChange = (e) => {
    const { name, value } = e.target
    // Aggiorna lo stato del form
    setFormData(prev => ({ ...prev, [name]: value }))
    // Valida i campi specifici
    if (["username", "password", "descrizione"].includes(name)) {
      validate(name, value)
    }
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
      !formData.descrizione.trim()) {

      alert("Tutti i campi devono essere Compilati!!!");
      return

    }




    if (Number(formData.esperienza) <= 0) {
      alert("Gli anni devono essere un numero positivo")
      return
    }


    console.log("hai complilato tutto il form", formData)


  }

  // Funzione per mostrare messaggi di errore o successo
  const showMessage = (name) => {
    if (!formData[name]) return null
    return errors[name]
      ? <p className="error">{errors[name]}</p>
      : <p className="success">✅ Valido</p>
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

            {/* Campo Username con validazione */}
            <input type="text" name='username' value={formData.username} onChange={handleChange} />
            {showMessage("username")}
            {/* <strong>
              {formData.username.includes(letters) || formData.username.includes(numbers) ? "ok" :"errato" && formData.username.length < 6 ? "inserisci almeno 6 caratteri":"apposto"}
            </strong> */}

            {/* Campo Password con validazione */}
            <input type="password" name='password' value={formData.password} onChange={handleChange} />
            {showMessage("password")}

            {/* Menu a tendina per la Specializzazione */}
            <select value={formData.specializzazione} onChange={handleChange} name='specializzazione'>
              <option value="">--Seleziona--</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>

            {/* Campo numerico per gli anni di esperienza */}
            <input type="number" min="1" name="esperienza" value={formData.esperienza} onChange={handleChange} />


            {/* Area di testo per la descrizione con validazione */}
            <textarea name="descrizione" id="" value={formData.descrizione} onChange={handleChange} />

            {showMessage("descrizione")}

            {/* Pulsante di invio */}
            <button>Invia</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default App



