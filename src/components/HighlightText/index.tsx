import { CSSProperties, useEffect, useRef } from 'react';

export type HighlightTextProps = {
  content: string;
  pattern: RegExp;
  className?:string
  defaultStyle?: CSSProperties;
  style?: CSSProperties;
  onTargetClick?: (args: { target: string; index: number }) => void;
};

const HighlightText = (props: HighlightTextProps) => {
  const {className, content, pattern, defaultStyle = {}, style = {}, onTargetClick } = props;
  const ref = useRef<HTMLSpanElement>(null);

  const emergedStyle = {
    ...defaultStyle,
    cursor: onTargetClick ? 'pointer' : 'default',
    ...style
  };

  useEffect(() => {
    let target: ChildNode | null | undefined = ref.current?.firstChild;
    if (!target) return;

    let match = pattern.exec(target.textContent!);
    let index = 0;
    while (target && match != null) {
      const start = match.index;
      const end = pattern.lastIndex;

      const range = new Range();
      range.setStart(target, start!);
      range.setEnd(target, end);

      const span = document.createElement('span');
      Object.entries(emergedStyle).forEach(([key, value]) => {
        Reflect.set(span.style, key, value);
      });
      if (onTargetClick) {
        const content = match![0];
        const _index = index;
        span.onclick = () => {
          onTargetClick({
            target: content,
            index: _index
          });
        };
      }

      range.surroundContents(span);
      
      index++;
      pattern.lastIndex = 0;
      target = target.nextSibling?.nextSibling;
      match = pattern.exec(target?.textContent!);
    }

  }, [content]);

  return <span className={className} ref={ref}>{content}</span>;
};

HighlightText.defaultProps = {
  defaultStyle: {
    color: '#00A799',
    fontWeight: 'bold',
    display: 'inline-block',
    margin: '0 2px'
  } as const
};

export default HighlightText;