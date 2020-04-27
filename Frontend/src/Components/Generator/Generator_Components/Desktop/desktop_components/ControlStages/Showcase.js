import React, {Fragment, useContext, useState} from "react";
import ThemeContext from "../../../../../../contexts/theme/ThemeContext";
import Button from "../../../Layout/Button";
import Card from "../../../Layout/Card";
import Badge from "../../../../../Badge/Badge.component";
import {calculateTintAndShades, hexToRGB, fontColor} from "../../../../../../Functions";
import Input from "../../../Layout/Input";
import { CirclePicker } from 'react-color';

const Showcase = () => {
    const themeContext = useContext(ThemeContext);

    const {colorRGB, darkShadowFactor, shadows, lightShadowFactor, shadowBlur} = themeContext;
    const {Red, Green, Blue} = colorRGB

    const lighterShadows = shadows.ligherShadowArray;
    const darkerShadows = shadows.darkerShadowArray;
    const lighterShadow = `rgb(${lighterShadows[0]}, ${lighterShadows[1]}, ${lighterShadows[2]})`;
    const darkerShadow = `rgb(${darkerShadows[0]}, ${darkerShadows[1]}, ${darkerShadows[2]})`;

    const [darkModeFactor ,setFactor] = useState(75);
    const [activeWindow, setActiveWindow] = useState(0)

    const darkmodeDarkShadowFactor = Math.round(darkModeFactor * .75);
    const darkmodeLightShadowFactor = Math.round(darkModeFactor * .9);
    const darkModeBackground = calculateTintAndShades(Red, Green, Blue, darkModeFactor);
    const darkModeDarkShadow = calculateTintAndShades(
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkModeFactor)).Red,
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkModeFactor)).Green,
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkModeFactor)).Blue,
        Math.round(darkShadowFactor * 100))
    console.log('darkModeFactor',darkModeFactor)
    const darkModeLightShadow = calculateTintAndShades(
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeLightShadowFactor)).Red,
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeLightShadowFactor)).Green,
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeLightShadowFactor)).Blue,
        Math.round(lightShadowFactor * 100)
    )
    const darkModeFont = fontColor(
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeDarkShadowFactor)).Red,
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeDarkShadowFactor)).Green,
        hexToRGB(calculateTintAndShades(Red, Green, Blue, darkmodeDarkShadowFactor)).Blue
    )

    const isDarkModeMoreThan100 = (darkModeFactor) => {
        if (darkModeFactor > 100){
            return false
        } else if (darkModeFactor <= 100){
            return true
        }
    }

    const onChangeFactor = (event) => setFactor(event.target.value)

    const DarkModeCard = (
        <Card
            background={darkModeBackground}
            style={{
                height:'300px',
                //TODO FIX box shadow
                boxShadow: `${darkModeDarkShadow} 5px 5px ${shadowBlur}px 0px inset,
                ${darkModeLightShadow} -5px -5px ${shadowBlur}px 0px inset`,
                display:'flex',justifyContent:'center', alignItems:'center'
            }}
        >
            <Card
                background={darkModeBackground}
                darkShadow={darkModeDarkShadow}
                lightShadow={darkModeLightShadow}
                color={darkModeFont}
                style={{marginRight:'2rem',marginLeft:'2rem'}}
            >
                <h6 style={{fontSize:'1.05rem'}}>Automatic{" "}
                    {isDarkModeMoreThan100(darkModeFactor) ? 'darkmode' : 'lightmode'} generation.
                </h6>
                Hi! 👋 I am a {isDarkModeMoreThan100(darkModeFactor) ? 'dark' : 'light'} mode card!

                {/*TODO if 100% return "Hi I am darkmode card but currently my color is the same as the main color 😜"*/}
                <div className={'row mt-3'}>
                    <div className={'col-5'}>
                        <Button
                            background={darkModeBackground}
                            darkShadow={darkModeDarkShadow}
                            lightShadow={darkModeLightShadow}
                            color={darkModeFont}
                        >
                            Click me!
                        </Button>
                    </div>
                    <div className={'col-7'}>
                        <Input
                            type={'number'}
                            background={darkModeBackground}
                            darkShadow={darkModeDarkShadow}
                            lightShadow={darkModeLightShadow}
                            color={darkModeFont}
                            value={darkModeFactor}
                            onChange={event => onChangeFactor(event)}
                            placeholder={'Enter value'}
                        />
                    </div>
                </div>
            </Card>
        </Card>
    )

    const ColorShowcaseCard = (
        <Card
            style={{
                height:'300px',
                //TODO FIX box shadow
                boxShadow: `${darkerShadow} 5px 5px ${shadowBlur}px 0px inset,
                ${lighterShadow} -5px -5px ${shadowBlur}px 0px inset`,
                display:'flex',justifyContent:'center', alignItems:'center'
            }}
        >
            <Card
                style={{marginRight:'2rem',marginLeft:'2rem'}}
            >
                <h6 style={{fontSize:'1.05rem'}}>Works with every color!</h6>
                <div className={'row mt-3'}>
                    <div className={'col-12'}>
                        <CirclePicker />
                    </div>
                </div>
            </Card>
        </Card>
    )

    const showCaseWindowWrapper = (activeWindow) => {
        console.log('active window',activeWindow)
        switch (activeWindow) {
            case 0:
                return DarkModeCard;
            case 1:
                return ColorShowcaseCard;
            default:
                return null
        }
    }

    return (
        <Fragment>
            <Card type={"top"}>
                <Badge>Showcase</Badge>
                {showCaseWindowWrapper(activeWindow)}
            </Card>
            <Card
                type={'bottom'}
                style={{display:'flex',justifyContent:'center', alignItems:'center',}}
            >
                <Button
                    style={{marginRight:'1rem'}}
                    onClick={() => setActiveWindow(0)}
                    children={'Darkmode'}
                />
                <Button
                    // style={{width:'90%'}}
                    onClick={() => setActiveWindow(1)}
                    children={'Works with every color!'}
                />
            </Card>
        </Fragment>
    )
}

export default Showcase;