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
              Summarize_RU
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

  const groupedPrompts = data.allPrompts2Csv.edges.reduce((acc, edge) => {
    const key = edge.node['Prompt_RU'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(edge.node);
    return acc;
  }, {});

  console.log(data.allPrompts2Csv.edges);

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
        <p className={styles.intro} style={{ fontSize: '20px', fontFamily: 'PT Sans' }}>
          Выберите лучший промпт для решения вашей задачи.
        </p>
        <h2 style={{ textAlign: 'start', fontFamily: 'PT Sans' }}>
          💼 Профессия
        </h2>
        <div className={styles.buttonGroup}>
          {jobOptions.map(job => (
            <Button
              key={job}
              type={currentFilter === job ? "primary" : "default"}
              onClick={() => setCurrentFilter(job)}
              style={{ margin: "5px", fontFamily: 'PT Sans' }}
            >
              {job}
            </Button>
          ))}
        </div>
        <h2 style={{ textAlign: 'start', fontFamily: 'PT Sans' }}>
          👨‍💻 Промпты
        </h2>
        <div className={styles.cardGroup}>
          {
            Object.entries(groupedPrompts)
              .filter(([_, nodes]) => currentFilter === 'Все' || nodes.some(node => node['Job_RU'] === currentFilter))
              .map(([promptContent, nodes]) => (
                <Card
                  title={
                    <span style={{
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                    }}>
                      {nodes[0]['Summarize_RU']}
                    </span>
                  }
                  headStyle={{ fontFamily: 'PT Sans' }}
                  key={nodes[0].id}
                  style={{
                    margin: '0px',
                    textAlign: 'start',
                    alignContent: 'start',
                    width: '300px',
                    height: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    justifyContent: 'space-between'
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
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'PT Sans',
                    }}>
                      <Button
                        type="text"
                        style={{ color: '#1677FF' }}
                        icon={<CopyOutlined />}
                        onClick={() => {
                          copyToClipboard(promptContent);
                          message.success('Промпт скопирован');
                        }}
                      >
                      </Button>
                    </div>
                  }
                >
                  <div style={{
                    overflowY: 'auto',
                    flex: 1,
                    maxHeight: '250px',
                    marginBottom: '10px',
                    textAlign: 'start',
                    paddingLeft: '4px',
                    paddingRight: '4px',
                    fontFamily: 'PT Sans',
                    fontSize: '16px'
                  }}>
                    {promptContent}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                  >
                    {nodes.map(node => (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #d9d9d9',
                        borderRadius: '16px',
                        padding: '5px 10px',
                        marginTop: 'auto',
                        marginRight: '10px',
                        marginBottom: '5px',
                        maxWidth: 'calc(100% - 0px)',
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#1677FF',
                          borderRadius: '50%',
                          marginRight: '10px',

                        }}>
                        </div>
                        <span style={{
                          fontSize: '12px',
                          maxWidth: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>{node['Job_RU']}</span>
                      </div>
                    ))} </div>
                </Card>
              ))
          }
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
