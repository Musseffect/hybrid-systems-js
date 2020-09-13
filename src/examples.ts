import airyEquation from "./examples/dae/airyEquation";
import arenstorfOrbit from "./examples/dae/arenstorfOrbit";
import brusselator from "./examples/dae/brusselator";
import dalquistEquation from "./examples/dae/dalquistEquation";
import doublePendulum from "./examples/dae/doublePendulum";
import linearSystem from "./examples/dae/linearSystem";
import logisticEquation from "./examples/dae/logisticEquation";
import lorenzSystem from "./examples/dae/lorenzSystem";
import lotkaVolterra from "./examples/dae/lotkaVolterra";
import mathieuEquation from "./examples/dae/mathieuEquation";
import oregonator from "./examples/dae/oregonator";
import pendulum from "./examples/dae/pendulum";
import stiffEquation from "./examples/dae/stiffEquation";
import vanDerPolOscillator from "./examples/dae/vanDerPolOscillator";
import weissinger from "./examples/dae/weissinger";
import absEquation from "./examples/hybrid/absEquation";
import discreteHeater from "./examples/hybrid/discreteHeater";
import fallingBody from "./examples/hybrid/fallingBody";
import heater from "./examples/hybrid/heater";
import jumpingBall from "./examples/hybrid/jumpingBall";
import jumpingBallSpring from "./examples/hybrid/jumpingBallSpring";
import kneeProblem from "./examples/hybrid/kneeProblem";
import twoMasses from "./examples/hybrid/twoMasses";

class Example{
        name:string;
        model:string;
        parameters:Record<string,any>;
}

export const examples:{dae:Record<string,Example>,hybrid:Record<string,Example>} = {
        dae:{
                "weissinger":weissinger,
                "stiff-equation":stiffEquation,
                "lorenz-system":lorenzSystem,
                "dalquist-equation":dalquistEquation,
                "van-der-pol-oscillator":vanDerPolOscillator,
                "airy-equation":airyEquation,
                "lotka-volterra":lotkaVolterra,
                "logistic-equation":logisticEquation,
                "double-pendulum":doublePendulum,
                "mathieu":mathieuEquation,
                "linear-system":linearSystem,
                "pendulum":pendulum,
                "arenstorf-orbit":arenstorfOrbit,
                "oregonator":oregonator,
                "brusselator":brusselator
        },
        hybrid:{
                "jumping-ball":jumpingBall,
                "jumping-ball-spring":jumpingBallSpring,
                "two-masses":twoMasses,
                "abs-equation":absEquation,
                "knee-problem":kneeProblem,
                "falling-body":fallingBody,
                "heater":heater,
                "discreteHeater":discreteHeater
        }
};
