/// <reference types="react-scripts" />

declare module 'mcc' {
  type MCC = {
    combined_description: string
    edited_description: string
    id: number
    irs_description: string
    irs_reportable: string
    mcc: string
    usda_description: string
  }

  declare function get(mcc: string | number): MCC
  export { get }
}
