var instructionQueue = []
var finish = false
var writeQueue = []
var loadBuffer = [
  { name: 'L1', busy: 0, address: 0, index: -1 },
  { name: 'L2', busy: 0, address: 0, index: -1 },
]
var storeBuffer = [
  { name: 'S1', busy: 0, address: 0, V: '', Q: '', index: -1 },
  { name: 'S2', busy: 0, address: 0, V: '', Q: '', index: -1 },
]
var addSubRS = [
  { name: 'A1', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
  { name: 'A2', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
  { name: 'A3', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
]
var mulDivRS = [
  { name: 'M1', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
  { name: 'M2', op: '', Vj: '', Vk: '', Qj: '', Qk: '', busy: 0, index: -1 },
]
var intRegFile = [
  { name: 'R1', val: 0 },
  { name: 'R2', val: 4 },
]
var regFile = [
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
]
var dataMemory = [
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
]
var counter = 0
var cycle = 1
let addCycles = 4
let subCycles = 4
let mulCycles = 6
let divCycles = 10
let loadCycles = 2
let storeCycles = 2

// const addCycles = 2;
// const mulCycles = 10;
// const divCycles = 40;
// const loadCycles = 2;

const addToQueue = (instruction) => {
  instructionQueue.push(instruction)
}
const issueLoad = () => {
  if (loadBuffer[0].busy === 0 || loadBuffer[1].busy === 0) {
    let found = false
    for (let i = 0; i < storeBuffer.length; i++) {
      if (
        storeBuffer[i].address ===
        instructionQueue[counter].J / 4 +
          intRegFile.find((one) => one.name === instructionQueue[counter].K).val
      ) {
        found = true
        break
      }
    }
    if (!found) {
      const index = loadBuffer[0].busy === 0 ? 0 : 1
      loadBuffer[index].busy = 1
      loadBuffer[index].address =
        instructionQueue[counter].J / 4 +
        intRegFile.find((one) => one.name === instructionQueue[counter].K).val
      loadBuffer[index].index = counter
      regFile.find((one) => one.reg === instructionQueue[counter].D).Q =
        loadBuffer[index].name
      instructionQueue[counter].issue = cycle
      counter++
    }
  }
}
const issueStore = () => {
  if (storeBuffer[0].busy === 0 || storeBuffer[1].busy === 0) {
    let found = false
    for (let i = 0; i < storeBuffer.length; i++) {
      if (
        storeBuffer[i].address ===
          instructionQueue[counter].J / 4 +
            intRegFile.find((one) => one.name === instructionQueue[counter].K)
              .val ||
        loadBuffer[i].address ===
          instructionQueue[counter].J / 4 +
            intRegFile.find((one) => one.name === instructionQueue[counter].K)
              .val
      ) {
        found = true
        break
      }
    }
    if (!found) {
      const index = storeBuffer[0].busy === 0 ? 0 : 1
      storeBuffer[index].busy = 1
      storeBuffer[index].address =
        instructionQueue[counter].J / 4 +
        intRegFile.find((one) => one.name === instructionQueue[counter].K).val
      instructionQueue[counter].issue = cycle
      storeBuffer[index].index = counter
      const reg = regFile.find((one) => one.reg === instructionQueue[counter].D)
      typeof reg.Q === 'number'
        ? (storeBuffer[index].v = reg.Q)
        : (storeBuffer[index].Q = reg.Q)
      counter++
    }
  }
}
const issueAdd = () => {
  if (
    addSubRS[0].busy === 0 ||
    addSubRS[1].busy === 0 ||
    addSubRS[2].busy === 0
  ) {
    const index = addSubRS[0].busy === 0 ? 0 : addSubRS[1].busy === 0 ? 1 : 2
    addSubRS[index].busy = 1
    addSubRS[index].op = 'ADD'
    const regJ = regFile.find((one) => one.reg === instructionQueue[counter].J)
    const regK = regFile.find((one) => one.reg === instructionQueue[counter].K)
    typeof regJ.Q === 'number'
      ? (addSubRS[index].Vj = regJ.Q)
      : (addSubRS[index].Qj = regJ.Q)
    typeof regK.Q === 'number'
      ? (addSubRS[index].Vk = regK.Q)
      : (addSubRS[index].Qk = regK.Q)
    regFile.find((one) => one.reg === instructionQueue[counter].D).Q =
      addSubRS[index].name
    addSubRS[index].index = counter
    instructionQueue[counter].issue = cycle
    counter++
  }
}
const issueSub = () => {
  console.log('instruction queue', instructionQueue[counter])
  console.log('reg file:', regFile)
  if (
    addSubRS[0].busy === 0 ||
    addSubRS[1].busy === 0 ||
    addSubRS[2].busy === 0
  ) {
    const index = addSubRS[0].busy === 0 ? 0 : addSubRS[1].busy === 0 ? 1 : 2
    addSubRS[index].busy = 1
    addSubRS[index].op = 'SUB'
    const regJ = regFile.find((one) => one.reg === instructionQueue[counter].J)
    const regK = regFile.find((one) => one.reg === instructionQueue[counter].K)
    console.log('counter:', counter)
    typeof regJ.Q === 'number'
      ? (addSubRS[index].Vj = regJ.Q)
      : (addSubRS[index].Qj = regJ.Q)
    typeof regK.Q === 'number'
      ? (addSubRS[index].Vk = regK.Q)
      : (addSubRS[index].Qk = regK.Q)
    regFile.find((one) => one.reg === instructionQueue[counter].D).Q =
      addSubRS[index].name
    addSubRS[index].index = counter
    instructionQueue[counter].issue = cycle
    counter++
  }
}
const issueMul = () => {
  if (mulDivRS[0].busy === 0 || mulDivRS[1].busy === 0) {
    const index = mulDivRS[0].busy === 0 ? 0 : 1
    mulDivRS[index].busy = 1
    mulDivRS[index].op = 'MUL'
    const regJ = regFile.find((one) => one.reg === instructionQueue[counter].J)
    const regK = regFile.find((one) => one.reg === instructionQueue[counter].K)
    typeof regJ.Q === 'number'
      ? (mulDivRS[index].Vj = regJ.Q)
      : (mulDivRS[index].Qj = regJ.Q)
    typeof regK.Q === 'number'
      ? (mulDivRS[index].Vk = regK.Q)
      : (mulDivRS[index].Qk = regK.Q)
    regFile.find((one) => one.reg === instructionQueue[counter].D).Q =
      mulDivRS[index].name
    mulDivRS[index].index = counter
    instructionQueue[counter].issue = cycle
    counter++
  }
}
const issueDiv = () => {
  if (mulDivRS[0].busy === 0 || mulDivRS[1].busy === 0) {
    const index = mulDivRS[0].busy === 0 ? 0 : 1
    mulDivRS[index].busy = 1
    mulDivRS[index].op = 'DIV'
    const regJ = regFile.find((one) => one.reg === instructionQueue[counter].J)
    const regK = regFile.find((one) => one.reg === instructionQueue[counter].K)
    typeof regJ.Q === 'number'
      ? (mulDivRS[index].Vj = regJ.Q)
      : (mulDivRS[index].Qj = regJ.Q)
    typeof regK.Q === 'number'
      ? (mulDivRS[index].Vk = regK.Q)
      : (mulDivRS[index].Qk = regK.Q)
    regFile.find((one) => one.reg === instructionQueue[counter].D).Q =
      mulDivRS[index].name
    mulDivRS[index].index = counter
    instructionQueue[counter].issue = cycle
    counter++
  }
}
const distribute = (pass) => {
  for (let i = 0; i < addSubRS.length; i++) {
    if (addSubRS[i].Qj === pass.name) {
      addSubRS[i].Qj = ''
      addSubRS[i].Vj = pass.value
    }
    if (addSubRS[i].Qk === pass.name) {
      addSubRS[i].Qk = ''
      addSubRS[i].Vk = pass.value
    }
  }
  for (let i = 0; i < mulDivRS.length; i++) {
    if (mulDivRS[i].Qj === pass.name) {
      mulDivRS[i].Qj = ''
      mulDivRS[i].Vj = pass.value
    }
    if (mulDivRS[i].Qk === pass.name) {
      mulDivRS[i].Qk = ''
      mulDivRS[i].Vk = pass.value
    }
  }
  for (let i = 0; i < storeBuffer.length; i++) {
    if (storeBuffer[i].Q === pass.name) {
      storeBuffer[i].Q = ''
      storeBuffer[i].V = pass.value
    }
  }
}
const operation = (i) => {
  let ret = { name: '', value: '' }
  if (
    instructionQueue[i].type === 'ADD.D' ||
    instructionQueue[i].type === 'SUB.D'
  ) {
    const operation = addSubRS.find((one) => one.index === i)
    ret.name = operation.name
    if (operation.op === 'ADD') {
      const add = operation.Vj + operation.Vk
      const reg = regFile.find((one) => one.Q === operation.name)
      ret.value = add
      if (reg) reg.Q = add
    } else {
      const sub = operation.Vj - operation.Vk
      const reg = regFile.find((one) => one.Q === operation.name)
      ret.value = sub
      if (reg) reg.Q = sub
    }
    addSubRS[addSubRS.indexOf(operation)] = {
      name: operation.name,
      op: '',
      Vj: '',
      Vk: '',
      Qj: '',
      Qk: '',
      busy: 0,
      index: -1,
    }
  }
  if (
    instructionQueue[i].type === 'MUL.D' ||
    instructionQueue[i].type === 'DIV.D'
  ) {
    const operation = mulDivRS.find((one) => one.index === i)
    ret.name = operation.name

    if (operation.op === 'MUL') {
      const mul = operation.Vj * operation.Vk
      const reg = regFile.find((one) => one.Q === operation.name)
      ret.value = mul
      if (reg) reg.Q = mul
    } else {
      const div = operation.Vj / operation.Vk
      const reg = regFile.find((one) => one.Q === operation.name)
      ret.value = div
      if (reg) reg.Q = div
    }
    mulDivRS[mulDivRS.indexOf(operation)] = {
      name: operation.name,
      op: '',
      Vj: '',
      Vk: '',
      Qj: '',
      Qk: '',
      busy: 0,
      index: -1,
    }
  }
  if (instructionQueue[i].type === 'L.D') {
    const operation = loadBuffer.find((one) => one.index === i)
    ret.name = operation.name

    const load = dataMemory[operation.address]
    const reg = regFile.find((one) => one.Q === operation.name)
    ret.value = load
    if (reg) reg.Q = load
    loadBuffer[loadBuffer.indexOf(operation)] = {
      name: operation.name,
      busy: 0,
      address: 0,
      index: -1,
    }
  }
  if (instructionQueue[i].type === 'S.D') {
    const operation = storeBuffer.find((one) => one.index === i)
    dataMemory[operation.address] = operation.V
    storeBuffer[storeBuffer.indexOf(operation)] = {
      name: operation.name,
      busy: 0,
      address: 0,
      V: '',
      Q: '',
      index: -1,
    }
  }
  return ret
}
const nextCycle = (
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
  instructionQueue1,
  cycle1,
  registerFile,
  loadBuffer1,
  storeBuffer1,
  addSubRs1,
  mulDivRs1,
  writeBuffer,
  counter1,
  dataMemory1
) => {
  instructionQueue = instructionQueue1
  cycle = cycle1
  regFile = registerFile
  loadBuffer = loadBuffer1
  storeBuffer = storeBuffer1
  addSubRS = addSubRs1
  mulDivRS = mulDivRs1
  writeQueue = writeBuffer
  counter = counter1
  dataMemory = dataMemory1
  // done excution
  let passed
  if (writeQueue.length > 0) {
    const i = writeQueue[0]
    writeQueue.shift()
    instructionQueue[i].write = cycle
    passed = operation(i)
  }
  // check start excution
  for (let i = 0; i < addSubRS.length; i++) {
    if (
      addSubRS[i].busy === 1 &&
      (addSubRS[i].Vj || addSubRS[i].Vj === 0) &&
      (addSubRS[i].Vk || addSubRS[i].Vk === 0) &&
      !instructionQueue[addSubRS[i].index].startExecution
    ) {
      instructionQueue[addSubRS[i].index].startExecution = cycle
      instructionQueue[addSubRS[i].index].endExecution = cycle + addCycles - 1
      break
    }
  }
  for (let i = 0; i < mulDivRS.length; i++) {
    if (
      mulDivRS[i].busy === 1 &&
      (mulDivRS[i].Vj || mulDivRS[i].Vj === 0) &&
      (mulDivRS[i].Vk || mulDivRS[i].Vk === 0) &&
      !instructionQueue[mulDivRS[i].index].startExecution
    ) {
      instructionQueue[mulDivRS[i].index].startExecution = cycle
      if (mulDivRS[i].op === 'MUL') {
        instructionQueue[mulDivRS[i].index].endExecution = cycle + mulCycles - 1
      } else {
        instructionQueue[mulDivRS[i].index].endExecution = cycle + divCycles - 1
      }
      break
    }
  }
  for (let i = 0; i < loadBuffer.length; i++) {
    if (
      loadBuffer[i].busy === 1 &&
      !instructionQueue[loadBuffer[i].index].startExecution
    ) {
      instructionQueue[loadBuffer[i].index].startExecution = cycle
      instructionQueue[loadBuffer[i].index].endExecution =
        cycle + loadCycles - 1
      break
    }
  }

  for (let i = 0; i < storeBuffer.length; i++) {
    if (
      storeBuffer[i].busy === 1 &&
      !instructionQueue[storeBuffer[i].index].startExecution &&
      (storeBuffer[i].V || storeBuffer[i].V === 0)
    ) {
      instructionQueue[storeBuffer[i].index].startExecution = cycle
      instructionQueue[storeBuffer[i].index].endExecution =
        cycle + storeCycles - 1
      break
    }
  }
  if (instructionQueue[counter]) {
    switch (instructionQueue[counter].type) {
      case 'L.D':
        issueLoad()
        break
      case 'S.D':
        issueStore()
        break
      case 'ADD.D':
        issueAdd()
        break
      case 'SUB.D':
        issueSub()
        break
      case 'MUL.D':
        issueMul()
        break
      case 'DIV.D':
        issueDiv()
        break
      default:
        console.log('Instruction not included in tomasulo')
        break
    }
  } else {
    console.log('Instruction queue is empty')
  }
  // waza3 yabaaaa
  if (passed) distribute(passed)
  for (let i = 0; i < instructionQueue.length; i++) {
    if (
      instructionQueue[i].endExecution &&
      instructionQueue[i].endExecution === cycle
    ) {
      writeQueue.push(i)
    }
  }
  // console.log(cycle)
  // console.log('IQ', instructionQueue)
  // console.log('Reg', regFile)
  // console.log('AddSub', addSubRS)
  // console.log('MulDiv', mulDivRS)
  // console.log('load', loadBuffer)
  // console.log('store', storeBuffer)
  // console.log('******************')
  cycle++
  for (let i = 0; i < instructionQueue.length; i++) {
    finish = true
    if (!instructionQueue[i].write) {
      finish = false
      break
    }
  }
  setInstructionQueue(instructionQueue)
  setLoadBuffer(loadBuffer)
  setStoreBuffer(storeBuffer)
  setCycle(cycle)
  setMulDivRs(mulDivRS)
  setAddSubRs(addSubRS)
  setDone(finish)
  setRegisterFile(regFile)
  setCounter(counter)
  setWriteBuffer(writeQueue)
  setDataMemory(dataMemory)
}

export default nextCycle
