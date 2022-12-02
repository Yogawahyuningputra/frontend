import React from "react"
import Modal from "react-bootstrap/Modal"

function ModalPopUp({ show, onHide }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            width="10%"
            height="30px"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4 style={{ color: "#469F74", width: "auto", height: "auto" }} className="text-center m-0 p-5">
                    Topping Berhasil Di Tambahkan </h4>
            </Modal.Body>
        </Modal>
    )
}

export default ModalPopUp