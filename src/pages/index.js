import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Button, Card, message } from "antd";
import { CopyOutlined } from '@ant-design/icons';

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allPrompts2Csv {
        edges {
          node {
              id
              Job
              Prompt
              Job_RU
              Prompt_RU
          }
        }
      }
    }
  `);

  const [currentFilter, setCurrentFilter] = useState('Все');
  const jobOptions = ['Все', ...new Set(data.allPrompts2Csv.edges.map(edge => edge.node['Job_RU']))];

  const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };


  return (
    <Layout>
      <div className={styles.textCenter}>
        <StaticImage
          src="../images/computer.png"
          loading="eager"
          width={64}
          quality={95}
          formats={["auto", "webp", "avif"]}
          alt=""
          style={{ marginBottom: `var(--space-3)` }}
        />
        <h1>
          <b style={{ color: '#1677FF' }}>ChatGPTx</b>
        </h1>
        <p className={styles.intro} style={{fontSize: '20px', fontFamily: 'PT Sans'}}>
          Выберите лучший промпт для решения вашей задачи.
        </p>
        <h2 style={{textAlign: 'start', fontFamily: 'PT Sans'}}>
        💼 Профессия
        </h2>
        <div className={styles.buttonGroup}>
          {jobOptions.map(job => (
            <Button
              key={job}
              type={currentFilter === job ? "primary" : "default"}
              onClick={() => setCurrentFilter(job)}
              style={{ margin: "5px", fontFamily: 'PT Sans'}}
            >
              {job}
            </Button>
          ))}
        </div>
        <h2 style={{textAlign: 'start', fontFamily: 'PT Sans'}}>
        👨‍💻 Промпты
        </h2>
        <div className={styles.cardGroup}>
          {data.allPrompts2Csv.edges
            .filter(edge => currentFilter === 'Все' || edge.node['Job_RU'] === currentFilter)
            .map(edge => (
              <Card
                key={edge.node.id}
                style={{
                  margin: '0px',
                  width: '300px',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                bodyStyle={{
                  flex: 1,
                  margin: "10px",
                  padding: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                extra={
                  <Button
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      copyToClipboard(edge.node['Prompt_RU']);
                      message.success('Скопировано');
                    }}
                  >
                  </Button>
                }
              >
                <div style={{
                  overflowY: 'auto',
                  flex: 1,
                  maxHeight: '200px',
                  marginBottom: '10px',
                  textAlign: 'start',
                  paddingLeft: '4px',
                  paddingRight: '4px',
                  fontFamily: 'PT Sans',
                  fontSize: '16px'
                }}>
                  {edge.node['Prompt_RU']}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #d9d9d9',
                  borderRadius: '16px',
                  padding: '5px 10px',
                  marginTop: 'auto',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#1677FF',
                    borderRadius: '50%',
                    marginRight: '10px'
                  }}>
                  </div>
                  <span style={{ fontSize: '12px' }}>{edge.node['Job_RU']}</span>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
