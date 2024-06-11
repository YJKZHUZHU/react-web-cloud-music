/** @format */

import classNames from "classnames"
import {Image, PlayVideoIcon} from "@/components"
import {Props as ImageProp} from "@/components/Image"
import {useHover} from "@/hooks"

interface Props {
  className?: string
  imageProps?: ImageProp
  showPlayIcon?: boolean
  animation?: boolean
  renderTop?: React.ReactNode | (() => React.ReactNode)
  renderBottom?: React.ReactNode | (() => React.ReactNode)
  
}

const ImageCard = (props: Props) => {
  const {className, imageProps, animation, renderTop, renderBottom, showPlayIcon} = props
  const [hoverRef, isHovering] = useHover()
  return (
    <div ref={hoverRef} className={classNames("relative", className)}>
      <Image {...imageProps} />
      {typeof renderTop === "function" ? renderTop() : renderTop}

      {typeof renderBottom === "function" ? renderBottom() : renderBottom}

      {showPlayIcon && (
        <PlayVideoIcon
          className={classNames({
            "opacity-0": animation && !isHovering,
            "opacity-1": animation && isHovering
          })}
        />
      )}
    </div>
  )
}

export default ImageCard
