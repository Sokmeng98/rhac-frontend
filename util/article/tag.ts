const delimiter = ','

export const serializeTag = (tags: string[]) => (tags.length ? tags.join(delimiter) : '')
export const deserializeTag = (tag: string) => (tag ? tag.split(delimiter) : [])
