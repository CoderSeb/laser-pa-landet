import React from 'react'
import ContactForm from './components/ContactForm'
import TextField from '../../styled/TextField'

const Contact = () => {
  return (
    <div>
      <TextField>
        Kontakta mig gärna via formuläret nedan!
      </TextField>
      <ContactForm left />
    </div>
  )
}

export default Contact;
