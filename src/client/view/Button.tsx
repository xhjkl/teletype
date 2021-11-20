/** @jsx createElement */
import { ButtonHTMLAttributes, DetailedHTMLProps, createElement } from 'react'

export default (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => <button {...props} />
