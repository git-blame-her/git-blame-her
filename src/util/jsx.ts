type Node = string | JSX.Element

const jsx = <TagName extends keyof HTMLElementTagNameMap>(
  tagName: TagName,
  props: Record<string, any>,
  ...children: Array<Node>
): JSX.Element => {
  const createdElement = document.createElement(tagName)

  for (const key in props) {
    if (key.startsWith('on')) {
      createdElement.addEventListener(key.slice(2).toLowerCase(), props[key])
    } else if (key === 'style') {
      for (const _styleName in props[key]) {
        const styleName = _styleName as Exclude<keyof CSSStyleDeclaration, 'parent' | 'parentRule' | 'length'>
        createdElement.style[styleName] = props[key][styleName]
      }
    } else {
      createdElement.setAttribute(key, props[key])
    }
  }

  for (const child of children) {
    createdElement.append(child)
  }

  return createdElement
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
      [K in keyof HTMLElementTagNameMap]: Pick<
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