import { XMarkMini } from "@medusajs/icons"
import { FormEvent } from "react"
import SearchBoxWrapper, { ControlledSearchBoxProps } from "../search-box-wrapper"

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onSubmit?.(event)
    inputRef.current?.blur()
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onReset?.(event)
    inputRef.current?.focus()
  }

  return (
    <div {...props} className="w-full relative">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="w-full h-9 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
          />

          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Reset search"
            >
              <XMarkMini className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      {(props) => <ControlledSearchBox {...props} />}
    </SearchBoxWrapper>
  )
}

export default SearchBox
