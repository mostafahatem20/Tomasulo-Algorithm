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
    <table>
      <tr>
        <td>
          <table>
            <tr>
              <td>Cycle: {props.cycle.cycle}</td>
            </tr>
            <tr>
              <td>
                <p>Instrution Queue</p>
              </td>
            </tr>
            <tr>
              <td>Type</td>
              <td>D</td>
              <td>J</td>
              <td>K</td>
              <td>Issue</td>
              <td>Exec Start</td>
              <td>Exec End</td>
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
          <table>
            <tr>
              <td>
                <p>Register File</p>
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
          <table>
            <tr>
              <td>
                <p>Add/Sub Reservation Station</p>
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
          <table>
            <tr>
              <td>
                <p>Mul/Duv Reservation Station</p>
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
          <p>Load Buffer</p>
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
        </tr>
      ))}
      {/* Load buffer */}
      <tr>
        <td>
          <table>
            <tr>
              <td>
                <p>Store Buffer</p>
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
            <tr>
              <td colSpan={8}>
                <div
                  style={{
                    width: '50vw',
                    height: '5px',
                    backgroundColor: 'black',
                  }}
                ></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  )
}
export default Cycle
