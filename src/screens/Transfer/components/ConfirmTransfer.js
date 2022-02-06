import React , {useEffect , useState} from "react";
import { ScrollView , View , Text} from "react-native";
import BottomModal from "../../../components/BottomModal/BottomModal";
import { IconGen } from "../../../components/IconGenerator/IconGenerator";
import { scale } from "../../../lib/utils/scaleUtils";

export default function ConfirmTransfer ({
    isModalOpen,
    closeModal ,
    data
}) {
    console.log(isModalOpen);
    return (
        <BottomModal
            isModalOpen={isModalOpen}
            closeModal = {closeModal}
            
        >
            <Text>Some Random Content</Text>
        </BottomModal>
    )
}