import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex gap-x-2 items-center group hover:gap-x-3 transition-all"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-gray-900 hover:text-gray-700 font-semibold transition-colors">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150 text-gray-700"
        color="currentColor"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
