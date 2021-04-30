import React from "react"

const EmbeddedREPL = (props) => (
    <div>
        <iframe height="800px" width="100%" src={props.address} scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
    </div>
)
  
export default EmbeddedREPL
  