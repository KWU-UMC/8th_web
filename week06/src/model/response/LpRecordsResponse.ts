import {LpRecord} from "../LpRecord.ts";
import {Response} from "./Response.ts";

export type LpRecordData = {
    data: LpRecord[]
}

export type LpRecordsResponse = Response<LpRecordData>
