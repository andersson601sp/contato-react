import { useState } from 'react';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

function ListaContato() {

    const FIXER_URL = 'http://localhost:44385/email/';
    const _contatos = [];
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idContato, setIdContato] = useState('0');
    const [formValidado, setFormValidado] = useState(false);
    const [exibirSpinner, setExibirSpinner] = useState(false);
    const [exibirMsgErro, setExibirMsgErro] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);

    function handleNome(event) {
        setNome(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handleFecharModal(event) {

    }

    function salvar(event) {
        let urlAlterar = 'Alterar';
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            setExibirSpinner(true);

            const data = { id: idContato, email: email, nome: nome };

            const options = {
                headers: { 'Content-Type': 'application/json' }
            };

            axios.post(`${FIXER_URL}${urlAlterar}`, data, options)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                });
        }
    }

    function excluirContato(event, id) {
        let urlAlterar = 'Alterar';
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            setExibirSpinner(true);

            const data = { id: idContato };

            const options = {
                headers: { 'Content-Type': 'application/json' }
            };

            axios.post(`${FIXER_URL}Excluir`, data, options)
                .then((res) => {
                    console.log("RESPONSE RECEIVED: ", res);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                });
        }
    }

    function editar(id, nome, email) {
        idContato(id);
        nome(nome);
        email(email);
        exibirModal(true);
    }

    function exibirErro() {
        setExibirMsgErro(true);
        setExibirSpinner(true);
    }

    function buscarContatos() {
        return (
            axios.get(`${FIXER_URL}lista`)
                .then(res => {
                    _contatos = res.data;
                    listaContatos();
                })
                .catch(err => exibirErro())
        )
    }

    function listaContatos() {
        return (
            <tbody>
                {
                   _contatos.map(cntt =>
                        <tr>
                            <td>{cntt.id}</td>
                            <td>{cntt.nome}</td>
                            <td>{cntt.email}</td>
                            <td>
                                <Button variant="success" onClick={editar(cntt.id, cntt.nome, cntt.email)} data-testid="btn-editar">
                                    <span>Editar</span>
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={this.excluirContato.bind(this, cntt.id)} data-testid="btn-excluir">
                                    <span className={exibirSpinner ? null : 'hidden'} >
                                        <Spinner animation="border" size="sm" /></span>
                                    <span className={exibirSpinner ? 'hidden' : null}>Excluir</span>
                                </Button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        )
    };

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {buscarContatos}
            </Table>
            <Modal show={exibirModal} onHide={handleFecharModal} data-testeid="modal">
                <Modal.Header closeButton>
                    <Modal.Title> Editar Contato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={salvar} noValidate validated={formValidado}>
                        <Form.Row>
                            <Col sm="5">
                                <Form.Control placeholder="IdContato" value={idContato} required />
                            </Col>
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
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListaContato;

