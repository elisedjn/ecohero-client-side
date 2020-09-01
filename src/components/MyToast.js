import React from "react";
import Button from "react-bootstrap/Button";
import { useToasts } from 'react-toast-notifications';
import './styles/MyToast.css'

const MyToast = (props) => {
  let test = useToasts()
  console.log(test.addToast)
  const { addToast } = useToasts()
  return (
    <Button onClick={() => addToast( "Test toast", {
      appearance: 'success',
      autoDismiss: true,
    })}>
      Add Toast
    </Button>
  )
}

export default MyToast
