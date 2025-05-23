
import { useState,useRef } from 'react'
import './App.css'

function App() {

  // facciamo una variabile che poi andremo ad assegnarla a uno useState dove questa variabile a sua volta conterra i vari input
  console.log("rendering");
  
  // Oggetto con i valori iniziali del form
  const initialFormData = {
    username: "",
    password: "",
  }

  const inputName= useRef()
  const inputSpecializzazione = useRef()
  const inputEsperienza = useRef()
  const inputDescrizione = useRef()

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
      !inputName.current.value.trim() ||
      !formData.username.trim() ||
      !formData.password.trim() ||
      !inputSpecializzazione.current.value ||
      !inputEsperienza.current.value ||
      !inputDescrizione.current.value.trim()) {

      alert("Tutti i campi devono essere Compilati!!!");
      return

    }




    if (Number(inputEsperienza.current.value) <= 0) {
      alert("Gli anni devono essere un numero positivo")
      return
    }


    console.log(`hai complilato tutto il form :
      -Name:${inputName.current.value}
      -Username:${formData.username}
      -Passowrd:${formData.password}
      -Specializzazione:${inputSpecializzazione.current.value}
      -Esperienza:${inputEsperienza.current.value}
      -Descrizione:${inputDescrizione.current.value}`)


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
            <input type="text" name='name' ref={inputName} />

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
            <select  name='specializzazione' ref={inputSpecializzazione}>
              <option value="">--Seleziona--</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
            </select>

            {/* Campo numerico per gli anni di esperienza */}
            <input type="number" min="1" name="esperienza" ref={inputEsperienza} />


            {/* Area di testo per la descrizione con validazione */}
            <textarea name="descrizione" id="" ref={inputDescrizione} />

            {/* {showMessage("descrizione")} */}

            {/* Pulsante di invio */}
            <button>Invia</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default App





// 📌 Milestone 3: Convertire i Campi Non Controllati

// Non tutti i campi del form necessitano di essere aggiornati a ogni carattere digitato. Alcuni di essi non influenzano direttamente l’interfaccia mentre l’utente li compila, quindi è possibile gestirli in modo più efficiente.

//     Analizza il form: Identifica quali campi devono rimanere controllati e quali invece possono essere non controllati senza impattare l’esperienza utente.
//     Converti i campi non controllati: Usa useRef() per gestirli e recuperare il loro valore solo al momento del submit.
//     Assicurati che la validazione continui a funzionare: Anche se un campo non è controllato, deve comunque essere validato correttamente quando l’utente invia il form.
