import React from "react"

import DocsNavLogoLockup from "./docs-nav-logo-lockup"

const style = {
};

const DocsMobileHeader = () => (
  <div className="DocsMobileHeader">
    <a className="DocsMobileHeader--cloudflare-logo-link Link Link-without-underline" href="/docs/">
      <DocsNavLogoLockup
        small={true}
        logo={<img style={style} src="/static/images/covalent-logomark-white.png" />}
        text={(
          <>
            <span data-text="Covalent">Covalent</span>
            <span>&nbsp;</span>
            <span data-text="Docs">Docs</span>
          </>
        )}
      />
    </a>
  </div>
)

export default DocsMobileHeader

