/* eslint-disable react/prop-types */

const ButtonNav = (props) => {
  return (
    <button onClick={props.onClick} className="inline-flex justify-center w-full text-lg text-black outline-none whitespace-nowrap hover:underline cursor-pointer hover:text-slate-500"><li>{props.text}</li></button>
  )
}

export default ButtonNav
