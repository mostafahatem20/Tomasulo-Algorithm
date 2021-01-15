import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import nextCycle from './Helpers'
import Cycle from './Cycle'
import Alert from './Alert'
import './App.css'
export default function App() {
  const [counter, setCounter] = useState(0)
  const [cycle, setCycle] = useState(1)
  const [msg, setMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [severity, setSeverity] = useState('')
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
    { name: 'L1', busy: 0, address: '', index: -1 },
    { name: 'L2', busy: 0, address: '', index: -1 },
  ])
  const [storeBufferG, setStoreBuffer] = useState([
    { name: 'S1', busy: 0, address: '', V: '', Q: '', index: -1 },
    { name: 'S2', busy: 0, address: '', V: '', Q: '', index: -1 },
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
  //remember that you are making the assumption that R1 and R2 have constant values
  //add reset button
  const aluTypes = ['ADD.D', 'SUB.D', 'MUL.D', 'DIV.D']
  const memTypes = ['L.D', 'S.D']
  const regList = [
    'F0',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
  ]
  const regList1 = ['R1', 'R2']
  const handleReset = () => {
    setMsg('')
    setShowAlert(false)
    setAlutInst(true)
    setInstAddJ('')
    setInstAddK('')
    setInstAddD('')
    setInstAddType('')
    setStart(false)
    setDone(false)
    setWriteBuffer([])
    setCycle(1)
    setCounter(0)
    setAllCycles([])
    setInstructions([])
    setInstructionQueue([])
    setAddSubRs([
      {
        name: 'A1',
        op: '',
        Vj: '',
        Vk: '',
        Qj: '',
        Qk: '',
        busy: 0,
        index: -1,
      },
      {
        name: 'A2',
        op: '',
        Vj: '',
        Vk: '',
        Qj: '',
        Qk: '',
        busy: 0,
        index: -1,
      },
      {
        name: 'A3',
        op: '',
        Vj: '',
        Vk: '',
        Qj: '',
        Qk: '',
        busy: 0,
        index: -1,
      },
    ])
    setMulDivRs([
      {
        name: 'M1',
        op: '',
        Vj: '',
        Vk: '',
        Qj: '',
        Qk: '',
        busy: 0,
        index: -1,
      },
      {
        name: 'M2',
        op: '',
        Vj: '',
        Vk: '',
        Qj: '',
        Qk: '',
        busy: 0,
        index: -1,
      },
    ])
    setLoadBuffer([
      { name: 'L1', busy: 0, address: '', index: -1 },
      { name: 'L2', busy: 0, address: '', index: -1 },
    ])
    setStoreBuffer([
      { name: 'S1', busy: 0, address: '', V: '', Q: '', index: -1 },
      { name: 'S2', busy: 0, address: '', V: '', Q: '', index: -1 },
    ])
    setDataMemory([
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
    setRegisterFile([
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
  }
  const handleNextCycle = () => {
    setMsg('')
    setShowAlert(false)
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
        dataMemory,
        addCycles,
        mulCycles,
        divCycles,
        loadCycles,
        storeCycles
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
      setAllCycles([...allCycles, cycleInfo])
    } else {
      setMsg('Cycles are done')
      setSeverity('success')
      setShowAlert(true)
    }
  }
  return (
    <>
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
          <tr>
            <td>
              <table
                style={{
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginTop: '2vw',
                }}
              >
                <tr>
                  <td
                    style={{
                      fontSize: '1.3vw',
                      paddingRight: '2vw',
                      paddingBottom: '1vw',
                    }}
                  >
                    <p>Instructions List</p>
                  </td>
                  <td style={{ paddingRight: '1vw', paddingBottom: '1vw' }}>
                    <Button
                      onClick={() => {
                        setShowAlert(false)
                        setMsg('')
                        setAlutInst(true)
                        setInstAddJ('')
                        setInstAddK('')
                        setInstAddD('')
                        setInstAddType('')
                      }}
                      disabled={start}
                      style={{
                        width: '10vw',
                        fontSize: '1vw',
                        padding: '0.3vw',
                      }}
                    >
                      ALU Instruction
                    </Button>
                  </td>
                  <td style={{ paddingBottom: '1vw' }}>
                    <Button
                      onClick={() => {
                        setShowAlert(false)
                        setMsg('')
                        setAlutInst(false)
                        setInstAddJ(0)
                        setInstAddK('')
                        setInstAddD('')
                        setInstAddType('')
                      }}
                      style={{
                        width: '12vw',
                        fontSize: '1vw',
                        padding: '0.3vw',
                      }}
                      disabled={start}
                    >
                      Memory Instruction
                    </Button>
                  </td>
                </tr>
                <tr style={{ fontSize: '1.1vw', textAlign: 'center' }}>
                  <td>Type</td>
                  <td>D</td>
                  <td>J</td>
                  <td>K</td>
                </tr>
                {instructions.map((inst) => {
                  return (
                    <tr
                      style={{
                        fontSize: '1.1vw',
                        paddingBottom: '1vw',
                        textAlign: 'center',
                      }}
                    >
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
                      defaultValue=''
                      as='select'
                      disabled={start}
                      onChange={(e) => {
                        setInstAddType(e.target.value)
                      }}
                      style={{
                        fontSize: '1.2vw',
                        width: '10vw',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '0.5vw',
                      }}
                      value={instAddType}
                    >
                      <option value=''></option>
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
                      defaultValue=''
                      as='select'
                      disabled={start}
                      onChange={(e) => {
                        setInstAddD(e.target.value)
                      }}
                      style={{
                        fontSize: '1.2vw',
                        width: '10vw',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '0.5vw',
                      }}
                      value={instAddD}
                    >
                      <option value=''></option>
                      {regList.map((inst) => (
                        <option value={inst}>{inst}</option>
                      ))}
                    </Form.Control>
                  </td>
                  <td
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {aluInst ? (
                      <Form.Control
                        defaultValue=''
                        as={'select'}
                        onChange={(e) => {
                          setInstAddJ(e.target.value)
                        }}
                        style={{
                          fontSize: '1.2vw',
                          width: '10vw',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          padding: '0.5vw',
                        }}
                        disabled={start}
                        value={instAddJ}
                      >
                        <option value=''></option>
                        {regList.map((inst) => (
                          <option value={inst}>{inst}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      <input
                        type='number'
                        min='0'
                        step='4'
                        max='112'
                        value={instAddJ}
                        onChange={(e) => {
                          if (
                            e.target.value > 112 ||
                            e.target.value < 0 ||
                            e.target.value % 4 !== 0
                          ) {
                          } else {
                            setInstAddJ(e.target.value)
                          }
                        }}
                        style={{
                          fontSize: '1.2vw',
                          width: '10vw',
                          padding: '0.5vw',
                        }}
                        readOnly={start}
                        defaultValue='0'
                      />
                    )}
                  </td>
                  <td>
                    <Form.Control
                      defaultValue=''
                      as='select'
                      onChange={(e) => {
                        setInstAddK(e.target.value)
                      }}
                      style={{
                        fontSize: '1.2vw',
                        width: '10vw',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '0.5vw',
                      }}
                      disabled={start}
                      value={instAddK}
                    >
                      <option value=''></option>
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
                        setShowAlert(false)
                        setMsg('')
                        if (start) {
                          setMsg(
                            'Cannot add instructions after execution started'
                          )
                          setSeverity('error')
                          setShowAlert(true)
                          return
                        }
                        if (
                          instAddType === '' ||
                          instAddD === '' ||
                          instAddJ === '' ||
                          instAddK === ''
                        ) {
                          setMsg('No entry can be empty')
                          setSeverity('error')
                          setShowAlert(true)
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
                        let instructionQueueTemp = [
                          ...instructionQueueG,
                          instObj,
                        ]
                        setInstructionQueue(instructionQueueTemp)
                        setMsg('')
                        setShowAlert(false)
                        setAlutInst(true)
                        setInstAddJ('')
                        setInstAddK('')
                        setInstAddD('')
                        setInstAddType('')
                      }}
                      disabled={start}
                      style={{
                        width: '10vw',
                        fontSize: '1vw',
                        marginLeft: '0.5vw',
                        marginRight: '0.5vw',
                        padding: '0.3vw',
                      }}
                    >
                      Add Instruction
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setMsg('')
                        setShowAlert(false)
                        setInstructions([])
                        setInstructionQueue([])
                      }}
                      disabled={start}
                      style={{
                        width: '10vw',
                        fontSize: '1vw',
                        padding: '0.3vw',
                      }}
                    >
                      Reset Instructions
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      onClick={handleNextCycle}
                      style={{
                        width: '8vw',
                        fontSize: '1vw',
                        padding: '0.3vw',
                        marginLeft: '1vw',
                        marginTop: '1vw',
                      }}
                    >
                      Next Cycle
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        handleReset()
                      }}
                      style={{
                        width: '8vw',
                        fontSize: '1vw',
                        padding: '0.3vw',
                        marginLeft: '1vw',
                        marginTop: '1vw',
                      }}
                    >
                      Reset
                    </Button>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {allCycles.map((cyc) => (
            <Cycle cycle={cyc}></Cycle>
          ))}
        </tbody>
      </table>
      <Alert
        msg={msg}
        severity={severity}
        showAlert={showAlert}
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
