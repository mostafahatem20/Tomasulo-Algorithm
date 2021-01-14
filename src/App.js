import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import nextCycle from './Helpers'
import Cycle from './Cycle'

export default function App() {
  const [counter, setCounter] = useState(0)
  const [cycle, setCycle] = useState(1)
  const [addCycles, setAddCycles] = useState(4)
  const [mulCycles, setMulCycles] = useState(6)
  const [divCycles, setDivCycles] = useState(10)
  const [loadCycles, setLoadCycles] = useState(2)
  const [storeCycles, setStoreCycles] = useState(2)
  const [start, setStart] = useState(false)
  const [instructions, setInstructions] = useState([])
  const [instAddType, setInstAddType] = useState('')
  const [instAddD, setInstAddD] = useState('')
  const [instAddJ, setInstAddJ] = useState('')
  const [instAddK, setInstAddK] = useState('')
  const [aluInst, setAlutInst] = useState(true)
  const [allCycles, setAllCycles] = useState([])
  const [done, setDone] = useState(false)
  const [instructionQueueG, setInstructionQueue] = useState([])
  const [addSubRsG, setAddSubRs] = useState([
    { name: 'A1', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
    { name: 'A2', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
    { name: 'A3', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
  ])
  const [mulDivRsG, setMulDivRs] = useState([
    { name: 'M1', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
    { name: 'M2', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
  ])
  const [loadBufferG, setLoadBuffer] = useState([
    { name: 'L1', busy: 0, address: 0, index: -1 },
    { name: 'L2', busy: 0, address: 0, index: -1 },
  ])
  const [storeBufferG, setStoreBuffer] = useState([
    { name: 'S1', busy: 0, address: 0, V: '', Q: '', index: -1 },
    { name: 'S2', busy: 0, address: 0, V: '', Q: '', index: -1 },
  ])
  const [registerFileG, setRegisterFile] = useState([
    { reg: 'F0', Q: 0 },
    { reg: 'F1', Q: 0 },
    { reg: 'F2', Q: 0 },
    { reg: 'F3', Q: 0 },
    { reg: 'F4', Q: 0 },
    { reg: 'F5', Q: 0 },
    { reg: 'F6', Q: 0 },
    { reg: 'F7', Q: 0 },
    { reg: 'F8', Q: 0 },
    { reg: 'F9', Q: 0 },
    { reg: 'F10', Q: 0 },
  ])
  const [dataMemory, setDataMemory] = useState([
    23,
    3,
    9,
    34,
    434,
    8,
    2,
    24,
    23,
    4,
    23,
    3,
    9,
    34,
    434,
    8,
    2,
    24,
    23,
    4,
    23,
    3,
    9,
    34,
    434,
    8,
    2,
    24,
    23,
    4,
    1,
    2,
  ])
  const [writeBuffer, setWriteBuffer] = useState([])
  const [error, setError] = useState('')
  //remember that you are making the assumption that R1 and R2 have constant values
  //add reset button
  const aluTypes = ['ADD.D', 'SUB.D', 'MUL.D', 'DIV.D']
  const memTypes = ['L.D', 'S.D']
  const regList = ['F0', 'F2', 'F4', 'F6', 'F8', 'F10']
  const regList1 = ['R1', 'R2']

  const handleNextCycle = () => {
    setStart(true)

    if (!done && instructionQueueG.length > 0) {
      nextCycle(
        setInstructionQueue,
        setCycle,
        setDone,
        setRegisterFile,
        setLoadBuffer,
        setStoreBuffer,
        setAddSubRs,
        setMulDivRs,
        setWriteBuffer,
        setCounter,
        setDataMemory,
        instructionQueueG,
        cycle,
        registerFileG,
        loadBufferG,
        storeBufferG,
        addSubRsG,
        mulDivRsG,
        writeBuffer,
        counter,
        dataMemory
      )
      let instructionQueueTemp = []
      let registerFileTemp = []
      let loadBufferTemp = []
      let storeBufferTemp = []
      let addSubRsTemp = []
      let mulDivRsTemp = []
      let writeBufferTemp = []
      let dataMemoryTemp = []
      instructionQueueG.forEach((inst) => {
        inst.endExecution && inst.endExecution <= cycle
          ? instructionQueueTemp.push({ ...inst })
          : instructionQueueTemp.push({ ...inst, endExecution: '' })
      })
      registerFileG.forEach((inst) => {
        registerFileTemp.push({ ...inst })
      })
      loadBufferG.forEach((inst) => {
        loadBufferTemp.push({ ...inst })
      })
      storeBufferG.forEach((inst) => {
        storeBufferTemp.push({ ...inst })
      })
      mulDivRsG.forEach((inst) => {
        mulDivRsTemp.push({ ...inst })
      })
      addSubRsG.forEach((inst) => {
        addSubRsTemp.push({ ...inst })
      })
      writeBuffer.forEach((inst) => {
        writeBufferTemp.push({ ...inst })
      })
      dataMemory.forEach((inst) => {
        dataMemoryTemp.push({ ...inst })
      })
      let cycleInfo = {
        instructionQueue: instructionQueueTemp,
        cycle: cycle,
        registerFile: registerFileTemp,
        loadBuffer: loadBufferTemp,
        storeBuffer: storeBufferTemp,
        addSubRs: addSubRsTemp,
        mulDivRs: mulDivRsTemp,
        writeBuffer: writeBufferTemp,
        counter: counter,
        dataMemory: dataMemoryTemp,
      }
      console.log('cycle info in app: ', cycleInfo)
      setAllCycles([...allCycles, cycleInfo])
    } else {
      setError('Cycles are done')
    }
  }
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
                      type="number"
                      min="2"
                      value={addCycles}
                      onChange={(e) => setAddCycles(e.target.value)}
                      style={{ width: '4vw' }}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    MUl Cycles{' '}
                    <input
                      type="number"
                      min="2"
                      value={mulCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setMulCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    Div Cycles{' '}
                    <input
                      type="number"
                      min="2"
                      value={divCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setDivCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    Load Cycles{' '}
                    <input
                      type="number"
                      min="2"
                      value={loadCycles}
                      style={{ width: '4vw' }}
                      onChange={(e) => setLoadCycles(e.target.value)}
                      readOnly={start}
                    />
                  </td>
                  <td>
                    Store Cycles{' '}
                    <input
                      type="number"
                      min="2"
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
        <tr>
          <td>
            <table>
              <tr>
                <td>
                  <p>Instructions List</p>
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    onClick={() => {
                      setAlutInst(true)
                      setInstAddJ('')
                      setInstAddK('')
                      setInstAddD('')
                      setInstAddType('')
                    }}
                  >
                    ALU Instruction
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setAlutInst(false)
                      setInstAddJ(0)
                      setInstAddK('')
                      setInstAddD('')
                      setInstAddType('')
                    }}
                  >
                    Memory Instruction
                  </Button>
                </td>
              </tr>
              <tr style={{ marginTop: '10px' }}>
                <td>Type</td>
                <td>D</td>
                <td>J</td>
                <td>K</td>
              </tr>
              {instructions.map((inst) => {
                return (
                  <tr style={{ marginTop: '5px' }}>
                    <td>{inst.type}</td>
                    <td>{inst.D}</td>
                    <td>{inst.J}</td>
                    <td>{inst.K}</td>
                  </tr>
                )
              })}

              <tr>
                <td>
                  <Form.Control
                    defaultValue=""
                    as="select"
                    onChange={(e) => {
                      setInstAddType(e.target.value)
                    }}
                  >
                    <option value=""></option>
                    {aluInst
                      ? aluTypes.map((inst) => (
                          <option value={inst}>{inst}</option>
                        ))
                      : memTypes.map((inst) => (
                          <option value={inst}>{inst}</option>
                        ))}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    defaultValue=""
                    as="select"
                    onChange={(e) => {
                      setInstAddD(e.target.value)
                    }}
                  >
                    <option value=""></option>
                    {regList.map((inst) => (
                      <option value={inst}>{inst}</option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  {aluInst ? (
                    <Form.Control
                      defaultValue=""
                      as={'select'}
                      onChange={(e) => {
                        setInstAddJ(e.target.value)
                      }}
                    >
                      <option value=""></option>
                      {regList.map((inst) => (
                        <option value={inst}>{inst}</option>
                      ))}
                    </Form.Control>
                  ) : (
                    <input
                      type="number"
                      min=""
                      value={instAddJ}
                      onChange={(e) => setInstAddJ(e.target.value)}
                      style={{ width: '4vw' }}
                      // readOnly={start}
                    />
                  )}
                </td>
                <td>
                  <Form.Control
                    defaultValue=""
                    as="select"
                    onChange={(e) => {
                      setInstAddK(e.target.value)
                    }}
                  >
                    <option value=""></option>
                    {aluInst
                      ? regList.map((inst) => (
                          <option value={inst}>{inst}</option>
                        ))
                      : regList1.map((inst) => (
                          <option value={inst}>{inst}</option>
                        ))}
                  </Form.Control>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      if (start) {
                        setError(
                          'Cannot add instructions after execution started'
                        )
                        return
                      }
                      if (
                        instAddType === '' ||
                        instAddD === '' ||
                        instAddJ === '' ||
                        instAddK === ''
                      ) {
                        setError('No entry can be empty')
                        return
                      }
                      let instObj = {
                        type: instAddType,
                        D: instAddD,
                        J: instAddJ,
                        K: instAddK,
                      }
                      let instructionsTemp = [...instructions, instObj]
                      setInstructions(instructionsTemp)
                      let instructionQueueTemp = [...instructionQueueG, instObj]
                      setInstructionQueue(instructionQueueTemp)
                    }}
                  >
                    Add Instruction
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setInstructions([])
                    }}
                  >
                    Reset Instructions
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <Button onClick={handleNextCycle}>Next Cycle</Button>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <p>{error}</p>
        {console.log('all cycles:', allCycles)}
        {allCycles.map((cyc) => (
          <Cycle cycle={cyc}></Cycle>
        ))}
      </tbody>
    </table>
  )
}
