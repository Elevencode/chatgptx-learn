import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Button } from "antd";

const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
    }}
  >
    <div>
      <Link
        to="/"
        style={{
          fontSize: `var(--font-sm)`,
          textDecoration: `none`,
        }}
      >
        <StaticImage
          alt="gptx-logo"
          height={30}
          style={{ marginRight: 4, alignSelf: 'center' }}
          src="../images/logo.png"
        />
        <span style={{ color: `black`, fontSize: 16, verticalAlign: 'bottom', fontFamily: 'PT Sans' }}>ChatGPTx.learn</span>
      </Link>
    </div>
    <a href="https://app.chatgptx.ru" target="_blank" rel="noopener noreferrer">
      <Button type="primary" style={{ fontWeight: 700, fontFamily: 'PT Sans' }}>Перейти в чат</Button> {/* Добавленная кнопка */}
    </a>

  </header>
)

export default Header
