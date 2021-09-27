import { Modal, Button} from 'rsuite';

export const ShowInformation = ({size, show, titulo, cuerpo, handleClose, footer}) => {
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
                    <Button onClick={handleClose} appearance="subtle" color='blue'>
                        <span style={{fontFamily: 'Roboto', fontSize:15}}>Cancelar</span>
                    </Button>
                    {
                        footer.map((item, index) => {
                            return(
                                <Button key={index} onClick={item.onClick} color={item.color} appearance={item.appearance}>
                                    {item.icon === true ? <i className={item.nameIcon} style={{marginRight:'7%'}}></i> : ''}
                                    <span style={{fontFamily: 'Roboto', fontSize:15}}>{item.labelButton}</span>
                                </Button>
                            )
                        })
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}
