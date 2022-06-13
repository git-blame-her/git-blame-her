type BaseProps = Record<string, any>
type Component = (props: BaseProps) => JSX.Element
type Node = string | JSX.Element

const jsx: {
  <TagName extends keyof HTMLElementTagNameMap>(
    tagName: TagName,
    props: BaseProps,
    ...children: Array<Node>
  ): JSX.Element
  (props: { children: Array<Node> }): Array<JSX.Element>
} = (...args: Array<any>) => {
  if ('children' in args[0]) {
    return args[0].children
  } else {
    const [ tagName, props, ...children ] = args
    const createdElement = document.createElement(tagName)

    for (const key in props) {
      if (key.startsWith('on')) {
        createdElement.addEventListener(key.slice(2).toLowerCase(), props[key])
      } else if (key === 'style') {
        Object.assign(createdElement.style, props.style)
      } else {
        createdElement.setAttribute(key, props[key])
      }
    }

    for (const child of children) {
      createdElement.append(child)
    }

    return createdElement
  }
}

declare global {
  namespace JSX {
    type ElementBase = { [k: string]: any } & Partial<{
      [K in keyof HTMLElement as K extends `on${infer EventName}` ? `on${Capitalize<EventName>}` : never]: HTMLElement[K]
    }> & Partial<{
      id: string
      class: string
    }>
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]:
        Pick<
          HTMLElementTagNameMap[K],
          Exclude<keyof HTMLElementTagNameMap[K], keyof HTMLElement>
        > extends infer Picked
         ? ElementBase & Partial<{
            [K in Exclude<keyof Picked, keyof HTMLElement>]: Picked[K]
          }>
         : never
    }
    interface ElementAttributesProperty {
      props: ElementBase
    }
    interface Element extends HTMLElement { }
  }
}

export default jsx