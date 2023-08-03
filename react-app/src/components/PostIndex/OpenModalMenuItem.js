import React from 'react';
import { useModal } from '../../context/Modal';
import DeleteIcon from '../IconCollection/DeleteIcon';
import EditIcon from '../IconCollection/EditIcon';

function OpenModalMenuItem({
    itemType,
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <>
            {itemType === 'list' && (<li onClick={onClick}>{itemText}</li>)}
            {itemType === 'button' && (<button onClick={onClick}>{itemText}</button>)}
            {itemType === 'delete_icon' && (<DeleteIcon onClick={onClick} />)}
            {itemType === 'edit_icon' && (<EditIcon onClick={onClick} />)}
        </>
    );
}

export default OpenModalMenuItem;
