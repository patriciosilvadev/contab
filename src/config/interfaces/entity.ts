/**
 * Entity
 */

export interface EntityContextProps {
  type: string
  service: any
  list: any[]
  setList(entities: any[]): void
  editEntity?: any
  setEditEntity?(entity: any): void
  loading: boolean
  setLoading(loading: boolean): void
  search: string
  setSearch(search: string): void
  filters: any[]
  setFilters(filter: any[]): void
  order: string
  setOrder(orderBy: string): void
  orderAsc: boolean
  setOrderAsc(orderAsc: boolean): void
  page: number
  setPage(page: number): void
  itemsPerPage: number
  setItemsPerPage(itemsPerPage: number): void
  countAll: number
  countActive?: number
  setCountActive?(countActive: number): void
  numberOfSelected?: number
  setNumberOfSelected?(numberOfSelected: number): void
  onNewClose?(): void
  onEditOpen?(): void
  onEditClose?(): void
  updateList(): void
  updateListItem(entity: any): void
  removeListItem(entity: any): void
}

export interface EntityProviderProps {
  type: string
  service: any
  onNewClose?(): void
  onEditOpen?(): void
  onEditClose?(): void
}
