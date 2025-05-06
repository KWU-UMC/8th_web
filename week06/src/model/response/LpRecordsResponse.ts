import {LpRecord} from "../LpRecord.ts";
import {Response} from "./Response.ts";

export type LpRecordData = {
    data: LpRecord[],
    nextCursor: boolean,
    hasNext: boolean
}

export type LpRecordsResponse = Response<LpRecordData>
