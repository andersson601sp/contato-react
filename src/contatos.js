import { useState } from 'react';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import ListaContato from './ListaContato';

function Contatos(){

    const FIXER_URL = 'http://localhost:44385/email/';

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [ formValidado, setFormValidado] = useState(false); 
    const [ exibirSpinner, setExibirSpinner] = useState(false);
    const [ exibirMsgErro, setExibirMsgErro] = useState(false); 
    const [ exibirModal, setExibirModal] = useState(false); 

    function handleNome(event){
        setNome(event.target.value);
    }

    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handleFecharModal(event){

    }

    function salvar(event){
        let urlInserir =  'Inserir';
      event.preventDefault();
      setFormValidado(true);
      if(event.currentTarget.checkValidity() === true){
          setExibirSpinner(true);

          const data = { email: email,  nome: nome };
          
          const options = {  headers: {'Content-Type': 'application/json' }
          };
                  
          axios.post(`${FIXER_URL}${urlInserir}`,  data, options)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
      }
    }

    function Editar(event){

    }

    function exibirErro(){
       setExibirMsgErro(true);
       setExibirSpinner(true);
    }

    return(
        <div>
            <h1>Contatos</h1>
            <Alert variant="danger" show="exibirMsgErro">
               Erro no processamento, tente novamente.
            </Alert>
            { <Jumbotron>
                <Form onSubmit={salvar} noValidate validated={formValidado}>
                    <Form.Row>
                        <Col sm="5">
                            <Form.Control placeholder="Nome" value={nome} onChange={handleNome} required />
                        </Col>
                        <Col sm="5">
                            <Form.Control placeholder="Email" value={email} onChange={handleEmail} required />
                        </Col>
                        <Col sm="2">
                            <Button variant="success" type="submit" data-testid="btn-salvar">
                                <span className={exibirSpinner ? null : 'hidden'} >
                                <Spinner animation="border" size="sm" /></span>
                                <span className={exibirSpinner ? 'hidden' : null}>Salvar</span>
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Jumbotron> }
            <hr />
        <ListaContato />
        </div>
    )

}

export default Contatos;