import React from "react";
import Generator_mobile from "./Generator_Components/Mobile/Generator_mobile";
import Generator_desktop from "./Generator_Components/Desktop/Generator_desktop";


//rgb 0 9 62 night sky color
// 1 161 255 rgb blue

//#DCFE4B yellow
// #8BD173 green
// #33D2D0 blue
// #56CAF4 sky blue
// #04A883 green
//#ADC009 green
//#FBA50E light orange
//#E63387 Pink

const Generator = () => {
    const viewportWidth = window.innerWidth
    //TODO rename Function, make no sense now
    function getContainerHeight(viewportWidth) {
        if(viewportWidth < 500){
            return <Generator_mobile />
        } else {
            return <Generator_desktop/>
        }
    }

    return (
      <div className={"container mb-5"}>
        <h1 style={{fontSize:'1.75rem'}} className={'mb-3 mt-3 text-center text-sm-left'}>Soft UI generator</h1>
          {getContainerHeight(viewportWidth)}
      </div>
  );
};

export default Generator;
