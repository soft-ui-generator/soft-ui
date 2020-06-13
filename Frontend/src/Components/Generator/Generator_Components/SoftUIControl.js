import React, {Fragment} from "react";
import ControlStagesWrapper from "./ControlStages/ControlStagesWrapper";
import OptionBar from "./OptionBar/OptionBar";
import Card from "../../Updated/Card";
import {calculateTintAndShades, fontColorHex} from "../../../Functions";


const SoftUIControl = () => {

    const controlCardBG = "#F0F0F0";
    const darkShadow = calculateTintAndShades(240,240,240,85)
    const lightShadow = calculateTintAndShades(240,240,240,105)

    return (
        <div id={'Control Panel'}
            style={{
            height:"100%",
            display:'grid',
            gridGap:'1rem',
            gridTemplateRows:'1fr 2fr 1fr',
            gridTemplateColumns:'4rem minmax(284px, 498px) 4rem',
            backgroundColor: '#F0F0F0'}}>
            <div
                style={{
                    gridRow:'2/3',
                    gridColumn:'2/3',
                }}
            >
                <Card
                    backgroundColor={controlCardBG}
                    sameColorShadow = {true}
                    style={{width:'minmax(0px, 498px'}}
                >
                    <ControlStagesWrapper/>
                    <div style={{marginTop:'1rem'}}>
                        <OptionBar/>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SoftUIControl;