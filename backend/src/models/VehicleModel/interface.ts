import { Document } from 'mongoose'

export default interface VehicleInterface extends Document {
   chassisId: {
     series: string,
     number: string
   },
   type: string,
   passengers: number,
   color: string
}
