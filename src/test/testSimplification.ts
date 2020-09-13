import { handleErrors, ui } from "../ui";
import { Test } from "./test";
import { ISimplificationAlgorithm } from "../curveSimplification/ISimplificationAlgorithm";
import { DouglasPeuckerSimplification } from "../curveSimplification/douglasPeuckerSimplification";
import { PerpendicularDistanceSimplification } from "../curveSimplification/perpendicularDistanceSimplification";
import { MaxPointsSimplification } from "../curveSimplification/maxPointsSimplification";
import { RadialDistanceSimplification } from "../curveSimplification/radialDistanceSimplification";
import { LangSimplification } from "../curveSimplification/langSimplification";
import { ReumannWitkamSimplification } from "../curveSimplification/reumannWitkamSimplification";
import { OpheimSimplification } from "../curveSimplification/opheimSimplification";
import { DouglasPeuckerNSimplification } from "../curveSimplification/douglasPeuckerNSimplification";
import { NthPointSimplification } from "../curveSimplification/nthPointSimplification";
import { DAEVector } from "../dae/daeVector";
import { vector } from "../math/vector";
import { Expression } from "../compiler/expression";
import { compileTextExpression } from "./testExpression";


export function testSimplification():void{
    ui.clearErrors();
    ui.clearLog();

    Test.initPlot();
    let parameters = ui.getParameters();
    let methods:{alg:ISimplificationAlgorithm,name:string}[] = [
        {alg:new DouglasPeuckerSimplification(parameters["simp-tol"]),name:"douglasPeucker"},
        {alg:new PerpendicularDistanceSimplification(parameters["simp-tol"]),name:"perpDist"},
        {alg:new MaxPointsSimplification(parameters["simp-max-points"]),name:"maxPoints"},
        {alg:new RadialDistanceSimplification(parameters["simp-tol"]),name:"radDist"},
        {alg:new LangSimplification(parameters["simp-tol"],parameters["simp-look-ahead"]),name:"lang"},
        {alg:new ReumannWitkamSimplification(parameters["simp-tol"]),name:"reumannWitkam"},
        {alg:new OpheimSimplification(parameters["simp-tol"],parameters["simp-max-tol"]),name:"opheim"},
        {alg:new DouglasPeuckerNSimplification(parameters["simp-max-points"]),name:"douglasPeuckerN"},
        {alg:new NthPointSimplification(parameters["simp-nth-point"]),name:"Nth point simplification"}
    ];
    try{
        let text:string = ui.getText();
        let expression:Expression = compileTextExpression(text);
        ui.addLogMessage(`Function expression: ${expression.print()}`);
    let data:DAEVector[] = [];
    for(let i=0;i<1000;i++){
        let t = i*0.01;
        let x = expression.execute([t]);
        //let x = Math.cos(t*6.0)*Math.exp(-2.*t);
        data.push(new DAEVector(new vector([x]),new vector([]),t));
    }
    Test.showOutput(data,["t"],[],"f(x) output");
    for(let i=0;i<methods.length;i++){
        let res = methods[i].alg.simplify(data);
        Test.showOutput(res,["t"],[],methods[i].name);
        ui.addLogMessage(`${methods[i].name}: ${res.length} points`);
    }
    ui.openTab("results");
    }catch(e){
        handleErrors(e);
        ui.openTab("main");
        ui.openTab("errors-tab");
    }
}