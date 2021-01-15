import React from 'react'

const Cycle = (props) => {
  const {
    instructionQueue,
    registerFile,
    addSubRs,
    mulDivRs,
    loadBuffer,
    storeBuffer,
  } = props.cycle
  return (
    <table style={{ marginRight: 'auto', marginLeft: 'auto' }}>
      <tr>
        <td>
          <table
            style={{
              width: '50vw',
              fontSize: '1.2vw',
            }}
            className='cycle'
          >
            <tr>
              <td colSpan='8' style={{ fontWeight: 'bold' }}>
                Cycle: {props.cycle.cycle}
              </td>
            </tr>
            <tr>
              <td colSpan='8' style={{ fontWeight: 'bold' }}>
                Instrution Queue
              </td>
            </tr>
            <tr>
              <td>Type</td>
              <td>D</td>
              <td>J</td>
              <td>K</td>
              <td>Issue</td>
              <td>Start</td>
              <td> End</td>
              <td>Write</td>
            </tr>

            {instructionQueue.map((instruction) => (
              <tr>
                <td>{instruction.type}</td>
                <td>{instruction.D}</td>
                <td>{instruction.J}</td>
                <td>{instruction.K}</td>
                <td>{instruction.issue}</td>
                <td>{instruction.startExecution}</td>
                <td>{instruction.endExecution}</td>
                <td>{instruction.write}</td>
              </tr>
            ))}
          </table>
        </td>
      </tr>

      {/* instruction queue */}
      <tr>
        <td>
          <table
            style={{
              width: '50vw',
              fontSize: '1.2vw',
            }}
            className='cycle'
          >
            <tr>
              <td colSpan='2' style={{ fontWeight: 'bold' }}>
                Register File
              </td>
            </tr>
            <tr>
              <td>Register</td>
              <td>Qi</td>
            </tr>
            {registerFile.map((register) => (
              <tr>
                <td>{register.reg}</td>
                <td>{register.Q}</td>
              </tr>
            ))}
          </table>
        </td>
      </tr>
      {/* Register File */}
      <tr>
        <td>
          <table
            style={{
              width: '50vw',
              fontSize: '1.2vw',
            }}
            className='cycle'
          >
            <tr>
              <td colSpan='7' style={{ fontWeight: 'bold' }}>
                Add/Sub Reservation Station
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Op</td>
              <td>Vj</td>
              <td>VK</td>
              <td>Qj</td>
              <td>Qk</td>
              <td>Busy</td>
            </tr>
            {addSubRs.map((instruction) => (
              <tr>
                <td>{instruction.name}</td>
                <td>{instruction.op}</td>
                <td>{instruction.Vj}</td>
                <td>{instruction.Vk}</td>
                <td>{instruction.Qj}</td>
                <td>{instruction.Qk}</td>
                <td>{instruction.busy}</td>
              </tr>
            ))}
          </table>
        </td>
      </tr>
      {/* add/ sub rs */}
      <tr>
        <td>
          <table
            style={{
              width: '50vw',
              fontSize: '1.2vw',
            }}
            className='cycle'
          >
            <tr>
              <td colSpan='7' style={{ fontWeight: 'bold' }}>
                Mul/Duv Reservation Station
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Op</td>
              <td>Vj</td>
              <td>Vk</td>
              <td>Qj</td>
              <td>Qk</td>
              <td>Busy</td>
            </tr>

            {mulDivRs.map((instruction) => (
              <tr>
                <td>{instruction.name}</td>
                <td>{instruction.op}</td>
                <td>{instruction.Vj}</td>
                <td>{instruction.Vk}</td>
                <td>{instruction.Qj}</td>
                <td>{instruction.Qk}</td>
                <td>{instruction.busy}</td>
              </tr>
            ))}
          </table>
        </td>
      </tr>
      {/* mul/div rs */}
      <tr>
        <td>
          <table
            style={{
              width: '50vw',
              fontSize: '1.2vw',
            }}
            className='cycle'
          >
            <tbody>
              <tr>
                <td colSpan='3' style={{ fontWeight: 'bold' }}>
                  Load Buffer
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>Busy</td>
                <td>Address</td>
              </tr>
              {loadBuffer.map((instruction) => (
                <tr>
                  <td>{instruction.name}</td>
                  <td>{instruction.busy}</td>
                  <td>{instruction.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
      {/* Load buffer */}
      <tr>
        <td>
          <table
            style={{
              width: '50vw',
              fontSize: '1.2vw',
              marginBottom: '1vw',
            }}
            className='cycle'
          >
            <tr>
              <td colSpan='5' style={{ fontWeight: 'bold' }}>
                Store Buffer
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Busy</td>
              <td>Address</td>
              <td>V</td>
              <td>Q</td>
            </tr>
            {storeBuffer.map((instruction) => (
              <tr>
                <td>{instruction.name}</td>
                <td>{instruction.busy}</td>
                <td>{instruction.address}</td>
                <td>{instruction.V}</td>
                <td>{instruction.Q}</td>
              </tr>
            ))}
            {/* Store buffer */}
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <div
            style={{
              width: '70vw',
              borderTop: '5px dotted black',
            }}
          ></div>
        </td>
      </tr>
    </table>
  )
}
export default Cycle
