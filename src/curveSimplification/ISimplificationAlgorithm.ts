import { DAEVector } from "../dae/daeVector";

export interface ISimplificationAlgorithm
{
    simplify(points:DAEVector[]):DAEVector[];
}