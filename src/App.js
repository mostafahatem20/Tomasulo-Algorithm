import React, { useState } from 'react'

export default function App() {
  const [counter, setCounter] = useState(0)
  const [cycle, setCycle] = useState(1)
  const [addCycles, setAddCycles] = useState(4)
  const [mulCycles, setMulCycles] = useState(6)
  const [divCycles, setDivCycles] = useState(10)
  const [loadCycles, setLoadCycles] = useState(2)
  const [storeCycles, setStoreCycles] = useState(2)
  const [start, setStart] = useState(false)

  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td style={{ fontSize: '3vw', textAlign: 'center' }}>
            Tomasulo's Algorithm
          </td>
        </tr>
        <tr>
          <td>
            <table
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                width: '75vw',
                marginTop: '1vw',
                fontSize: '1vw',
              }}
            >
              <tbody>
                <tr>
                  <td>
                    Add/Sub Cycles{' '}
                    <input
                      type='number'
                      min='2'
                      value={addCycles}
                      onChange={(e) => setAddCycles(e.target.value)}
                      style={{ width: '4vw' }}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    MUl Cycles{' '}
                    <input
                      type='number'
                      min='2'
                      value={mulCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setMulCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    Div Cycles{' '}
                    <input
                      type='number'
                      min='2'
                      value={divCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setDivCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    Load Cycles{' '}
                    <input
                      type='number'
                      min='2'
                      value={loadCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setLoadCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    Store Cycles{' '}
                    <input
                      type='number'
                      min='2'
                      value={storeCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setStoreCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
