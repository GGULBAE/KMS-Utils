import { WrapperProps } from "../types/component"

function Wrapper({ children }: WrapperProps) {
  return <div className="Wrapper">
    { children }
  </div>
}

export default Wrapper