export interface FindAllProps {
  skip?: number
  limit?: number
  search?: string
  order?: string
  orderAsc?: boolean
  filters?: { field: string; value: string }[]
}

export interface HeadersProps {
  field?: string
  type?: string
  fieldObject?: string[]
  displayName?: string
}

export interface ActionListProps {
  label: string
  handle(list: any[]): void
  disabled?: boolean
}

export interface ListHeader {
  first?: boolean
  last?: boolean
  order?: string
  orderAsc?: boolean
  selected?: boolean
  onChangeOrder?(order: string): void
}

export interface ListItemOptionsProps {
  value: string
  handle(item: any): void
}

export interface ListItemProps {
  item: any
  context(): any
  headers: HeadersProps[]
  hasCheck: boolean
  options: ListItemOptionsProps[]
}

export interface ListProps {
  context(): any
  hasCheck?: boolean
  entityName: string
  headers?: HeadersProps[]
  actions?: ActionListProps[]
  itemOptions?: ListItemOptionsProps[]
}
