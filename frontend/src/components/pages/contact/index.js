import React from 'react'
import ContactForm from './components/ContactForm'
import PageContainer from '../../styled/PageContainer'
import contactImg from '../../../assets/img/stockphoto/laser-therapy-in-hand-used-to-treat-pain-selective-focus.jpg&size=1024.jpg'
const Contact = () => {
  return (
    <PageContainer backImgSrc={contactImg}>
      <ContactForm right />
    </PageContainer>
  )
}

export default Contact
