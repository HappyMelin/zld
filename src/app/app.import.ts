import { InOutPipe } from './../pipes/inOut-pipe';
import { EveryMonthPipe } from './../pipes/every-month-pipe';
import { SexPipe } from './../pipes/sex-pipe';
import { BadgePipe } from './../pipes/badge-pipe';
import { PositiveIntegerPipe } from './../pipes/positive-integer-pipe';
import { JoinPipe } from './../pipes/join-pipe';
import { PriceUnitPipe } from './../pipes/price-unit-pipe';



export const PIPES = [
    BadgePipe,
    EveryMonthPipe,
    InOutPipe,
    JoinPipe,
    PositiveIntegerPipe,
    PriceUnitPipe,
    SexPipe,
]