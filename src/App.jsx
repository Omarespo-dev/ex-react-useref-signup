
import { useState } from 'react'
import './App.css'

function App() {

  // facciamo una variabile che poi andremo ad assegnarla a uno useState dove questa variabile a sua volta conterra i vari input

  // Oggetto con i valori iniziali del form
  const initialFormData = {
    nomeCompleto: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: "",
    descrizione: ""
  }

  // Stato per gestire i dati del form
  const [formData, setFormData] = useState(initialFormData)
  
  // Stringhe contenenti i caratteri validi per la password
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";
  

  





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
            <strong>
              {formData.username.includes(letters) || formData.username.includes(numbers) ? "ok" :"errato" && formData.username.length < 6 ? "inserisci almeno 6 caratteri":"apposto"}
            </strong>
            

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



// 📌 Milestone 2: Validare in tempo reale

//     Aggiungere la validazione in tempo reale dei seguenti campi:

//     ✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

//     ✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

//     ✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

//     Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

// const letters = "abcdefghijklmnopqrstuvwxyz";

// const numbers = "0123456789";

// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";

//     Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi.
