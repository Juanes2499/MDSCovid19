import { Modal, Button} from 'rsuite';

export const Confirmation = ({size, show, titulo, cuerpo, handleAceptar, handleClose}) => {
    return(
        <div>
            <Modal show={show} style={{display:'flex', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                <Modal.Header closeButton={false}>
                    <div style={{marginTop:'5%'}}>
                        <span style={{ marginLeft:'10%',fontFamily:'Roboto', fontSize:22, fontWeight:'bold'}}>{titulo}</span>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div style={{marginLeft:'10%', marginRight:'10%'}}>
                        <span style={{fontFamily:'Roboto', fontSize:15}}>{cuerpo}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button key={1} onClick={handleAceptar} color='green' appearance='subtle'>
                        <span style={{fontFamily: 'Roboto', fontSize:15}}>Aceptar</span>
                    </Button>
                    <Button key={2} onClick={handleClose} color='blue' appearance='subtle'>
                        <span style={{fontFamily: 'Roboto', fontSize:15}}>Cancelar</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
