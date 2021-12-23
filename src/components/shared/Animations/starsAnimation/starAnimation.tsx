import React from "react";
import './starAnimation.css'

function Stars() {
    let rows = []
    for(let i=1; i<7; i++){
      rows.push(<div key={i} className={`s s-${i}`} />)
    }

    return (
        <div className="Stars">
            {rows}
        </div>
    )
}

export default Stars