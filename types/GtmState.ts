export default interface GtmState {
  registered: boolean,
  source: string | null,
  last_source: string | null,
  unsubscribers: any[]
}
