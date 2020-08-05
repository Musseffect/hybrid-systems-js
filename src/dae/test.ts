import { 
    DAEVector, 
    HybridState,
    HybridStateLink,
    AdaptiveStepNewton,
    EventDetectorComplex,
    EventDetectorSimple } from "./solver";
import {IDAEHybridSystem} from "./idaeHybridSystem";
import {EDAEHybridSystem} from "./edaeHybridSystem";
import { EDAEHybridSolver } from "./EDAEHybridSolver";
import { IDAEHybridSolver } from "./IDAEHybridSolver";
import { EDAESolver } from "./EDAESolver";
import { IDAESolver } from "./IDAESolver";
import { EDAESystem } from "./EDAESystem";
import { IDAESystem } from "./IDAESystem";
import { vector } from "../math/vector";
import { matrix } from "../math/matrix";
import { 
    EDAE_EEuler, 
    EDAE_IEuler
} from "./solvers/edae/euler";
import { 
    IDAE_EEuler,
    IDAE_IEuler 
} from "./solvers/idae/euler";
import $ from "jquery";
import { EDAE_IMidpoint, EDAE_EMidpoint } from "./solvers/edae/midpoint";
import { EDAE_ETrapezoidal, EDAE_ITrapezoidal } from "./solvers/edae/trapezoidal";
import { 
    EDAE_RK4, 
    EDAE_RK4_2,
    EDAE_RK4_RALSTON,
    EDAE_DOPRI5, 
    EDAE_RADAUIA5, 
    EDAE_BS23, 
    EDAE_LOBATTOIIIA2, 
    EDAE_LOBATTOIIIA4, 
    EDAE_LOBATTOIIIB2, 
    EDAE_LOBATTOIIIB4, 
    EDAE_LOBATTOIIIC2, 
    EDAE_LOBATTOIIIC4, 
    EDAE_RADAUIIA3, 
    EDAE_RADAUIIA5, 
    EDAE_GAUSSLEGENDRE4, 
    EDAE_GAUSSLEGENDRE6,
    EDAE_HeunEuler, 
    EDAE_MidpointEuler, 
    EDAE_RK6, 
    EDAE_RK6_2, 
    EDAE_RK8 } from "./solvers/edae/rk";
import{
    IDAE_RK4,
    IDAE_RK4_2,
    IDAE_RK4_RALSTON,
    IDAE_DOPRI5, 
    IDAE_RADAUIA5, 
    IDAE_BS23, 
    IDAE_LOBATTOIIIA2, 
    IDAE_LOBATTOIIIA4, 
    IDAE_LOBATTOIIIB2, 
    IDAE_LOBATTOIIIB4, 
    IDAE_LOBATTOIIIC2, 
    IDAE_LOBATTOIIIC4, 
    IDAE_RADAUIIA3, 
    IDAE_RADAUIIA5, 
    IDAE_GAUSSLEGENDRE4, 
    IDAE_GAUSSLEGENDRE6,
    IDAE_HeunEuler, 
    IDAE_MidpointEuler, 
    IDAE_RK6, 
    IDAE_RK6_2, 
    IDAE_RK8
    } from "./solvers/idae/rk";
import { IDAE_EMidpoint, IDAE_IMidpoint } from "./solvers/idae/midpoint";
import { IDAE_ETrapezoidal, IDAE_ITrapezoidal } from "./solvers/idae/trapezoidal";
import { 
    EDAE_BDF2,
    EDAE_BDF3,
    EDAE_BDF4,
    EDAE_BDF5,
    EDAE_BDF6 } from "./solvers/edae/bdf";
import { 
    IDAE_BDF2,
    IDAE_BDF3,
    IDAE_BDF4,
    IDAE_BDF5,
    IDAE_BDF6 } from "./solvers/idae/bdf";
import {
    EDAE_AM2,
    EDAE_AM3,
    EDAE_AM4,
    EDAE_AM5,
    EDAE_AM6
} from "./solvers/edae/adams-moulton";
import {
    IDAE_AM2,
    IDAE_AM3,
    IDAE_AM4,
    IDAE_AM5,
    IDAE_AM6
} from "./solvers/idae/adams-moulton";
import {
    EDAE_AB2,
    EDAE_AB3,
    EDAE_AB4,
    EDAE_AB5,
    EDAE_AB6
} from "./solvers/edae/adams-bashforth";
import {
    IDAE_AB2,
    IDAE_AB3,
    IDAE_AB4,
    IDAE_AB5,
    IDAE_AB6
} from "./solvers/idae/adams-bashforth";
import { NewtonSolver } from "../nonlinear/newton";
import  {ui} from "../ui";



function solveExplicit(x0:vector,t0:number,t1:number,solver:EDAESolver,system:EDAESystem):DAEVector[]{
    let solution:DAEVector[] = [];
    let z0 = system.g(x0,t0);
    let point:DAEVector = new DAEVector(x0,z0,t0);
    solution.push(point);
    for(let t = t0;t<=t1;t=point.t){
        point = solver.makeStep(point.x,point.z,point.t,system);
        solution.push(point);
    }
    return solution;
}
function solveImplicit(x0:vector,t0:number,t1:number,solver:IDAESolver,system:IDAESystem):DAEVector[]{
    let solution:DAEVector[] = [];
    let z0 = solver.solve_z(x0,vector.empty(system.length_z()),t0,system);
    let point:DAEVector = new DAEVector(x0,z0,t0);
    solution.push(point);
    for(let t = t0;t<=t1;t=point.t){
        point = solver.makeStep(point.x,point.z,point.t,system);
        solution.push(point);
    }
    return solution;
}

export class Test{
    static testEDAESolvers(t0:number,t1:number,x0:vector,solvers:{method:EDAESolver,label:string}[],system:EDAESystem,xNames:string[],zNames:string[],label:string):void{
        solvers.forEach(function(item){
            ui.addLogMessage(label+": "+item.label);
            console.log(label+": "+item.label);
            try{
                let values:DAEVector[] = solveExplicit(x0,t0,t1,item.method,system);
                Test.showOutput(values,xNames,zNames,label+" "+item.label);
            }catch(error){
                console.log("Error during "+label+": "+error);
                ui.addLogMessage("Error during "+label+": "+error);
            }
        });
    }
    static testIDAESolvers(t0:number,t1:number,x0:vector,solvers:{method:IDAESolver,label:string}[],system:IDAESystem,xNames:string[],zNames:string[],label:string):void{
        solvers.forEach(function(item){
            ui.addLogMessage(label+": "+item.label);
            console.log(label+": "+item.label);
            try{
                let values:DAEVector[] = solveImplicit(x0,t0,t1,item.method,system);
                Test.showOutput(values,xNames,zNames,label+" "+item.label);
            }catch(error){
                console.log("Error during "+label+": "+error);
                ui.addLogMessage("Error during "+label+": "+error);
            }
        });
    }
    static showOutput(values:DAEVector[],variableNamesDifferential:string[],variableNamesAlgebraic:string[],label:string):void{
        let data:any = [];
        variableNamesDifferential.forEach(function(item:string|null,index:number){
            if(item ==null)
                return; 
            let trace:any = {
                x: [],
                y: [],
                type:"scattergl",
                legendgroup:label,
                mode: 'markers+lines',
                name: label+": "+item
            };
            for(let i=0;i<values.length;i++)
            {
                let valueVector = values[i];
                trace.y.push(valueVector.x.get(index));
                trace.x.push(valueVector.t)
            }
            data.push(trace);
        });
        variableNamesAlgebraic.forEach(function(item:string|null,index:number){
            if(item == null)
                return; 
            let trace:any = {
                x: [],
                y: [],
                type:"scattergl",
                legendgroup:label,
                mode: 'markers+lines',
                name: label+": "+item
            };
            for(let i=0;i<values.length;i++)
            {
                let valueVector = values[i];
                trace.y.push(valueVector.z.get(index));
                trace.x.push(valueVector.t)
            }
            data.push(trace);
        });
        //@ts-ignore
        Plotly.addTraces('plot-area', data);
    }
    /*static serializeOutput(values:DAEVector[],states:number[],variableNamesX:string[],variableNamesZ:string[]):string{
        let result = "";
        variableNamesX.forEach(function(name, index){
            result.append(name);
            result.append(",");
        });
        variableNamesZ.forEach(function(name, index){
            result.append(name);
            result.append(",");
        });
        result.append("state");
        result.append(",");
        result.append("t");
        values.t.forEach(function(id){
                result.append("\n");
            variableNamesX.forEach(function(name,index){
                result.append(values.x[id].get(index));
                result.append(",");
            });
            variableNamesZ.forEach(function(name,index){
                result.append(values.z[id].get(index));
                result.append(",");
            });
            result.append(states[id]);
            result.append(",");
            result.append(values.t[id]);
        });
    }*/
    static initPlot():void{
        var layout = {
            title:'Result',
            type:"scattergl",
            width:$("#plot-area").width(),
            height:$("#plot-area").height(),
            paper_bgcolor: 'rgba(245,245,245,1)',
            plot_bgcolor: 'rgba(245,245,245,1)'
          };
          //@ts-ignore
          Plotly.newPlot('plot-area',[],layout,{responsive:true});
    }
    static runTests():void{
        $("log").val("");
        ui.addLogMessage("Run tests");
        //ui.clearLog();
        let EDAESolvers:{method:EDAESolver,label:string}[] = [
            /*{method:new EDAE_EEuler(1e-3),label:"EEuler"},
            {method:new EDAE_IEuler(1e-3,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"IEuler"},
            {method:new EDAE_EMidpoint(1e-2),label:"EMidpoint"},
            {method:new EDAE_IMidpoint(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"IMidpoint"},
            {method:new EDAE_ETrapezoidal(1e-2),label:"ETrapezoidal"},
            {method:new EDAE_ITrapezoidal(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ITrapezoidal"},*/
            {method:new EDAE_RK4(1e-2),label:"ERK4"},
            /*{method:new EDAE_RK4_2(1e-2),label:"ERK4_2"},
            {method:new EDAE_RK4_RALSTON(1e-2),label:"ERK4_Ralston"},
            {method:new EDAE_DOPRI5(1e-2,3e-2,1e-6),label:"EDOPRI5"},
            {method:new EDAE_BS23(1e-2,3e-2,1e-6),label:"EBS23"},
            {method:new EDAE_RK6(1e-2),label:"ERK6_1"},
            {method:new EDAE_RK6_2(1e-2),label:"ERK6_2"},
            {method:new EDAE_RK8(1e-2),label:"ERK8"},
            {method:new EDAE_RADAUIA5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"IRadau_IA5"},
            {method:new EDAE_RADAUIIA3(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"IRadau_IIA3"},
            {method:new EDAE_RADAUIIA5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"IRadau_IIA5"},
            {method:new EDAE_LOBATTOIIIA2(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ILLobatto_IIIA2"},
            {method:new EDAE_LOBATTOIIIA4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ILLobatto_IIIA4"},
            {method:new EDAE_LOBATTOIIIB2(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ILLobatto_IIIB2"},
            {method:new EDAE_LOBATTOIIIB4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ILLobatto_IIIB4"},
            {method:new EDAE_LOBATTOIIIC2(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ILLobatto_IIIC2"},
            {method:new EDAE_LOBATTOIIIC4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ILobatto_IIIC4"},
            {method:new EDAE_GAUSSLEGENDRE4(1e-2,3e-2,1e-3,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IGaussLegender4"},
            {method:new EDAE_GAUSSLEGENDRE6(1e-2,3e-2,1e-3,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IGaussLegender6"},
            {method:new EDAE_HeunEuler(1e-2,3e-2,1e-4),label:"IHeunEuler"},
            {method:new EDAE_MidpointEuler(1e-2,3e-2,1e-4),label:"IMidpointEuler"},
            {method:new EDAE_BDF2(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF2"},
            {method:new EDAE_BDF3(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF3"},
            {method:new EDAE_BDF4(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF4"},
            {method:new EDAE_BDF5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF5"},
            {method:new EDAE_BDF6(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF6"},
            {method:new EDAE_AM2(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6)),label:"IAM2"},
            {method:new EDAE_AM3(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6)),label:"IAM3"},
            {method:new EDAE_AM4(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6)),label:"IAM4"},
            {method:new EDAE_AM5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6)),label:"IAM5"},
            {method:new EDAE_AM6(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6)),label:"IAM6"},*/
            {method:new EDAE_AB2(1e-2),label:"EAB2"},
            {method:new EDAE_AB3(1e-2),label:"EAB3"},
            {method:new EDAE_AB4(1e-2),label:"EAB4"},
            {method:new EDAE_AB5(1e-2),label:"EAB5"},
            {method:new EDAE_AB6(1e-2),label:"EAB6"}
        ];
        let IDAESolvers:{method:IDAESolver,label:string}[] = [
            /*{method:new IDAE_EEuler(1e-3,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"EEuler"},
            {method:new IDAE_IEuler(1e-3, new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"IEuler"},
            {method:new IDAE_EMidpoint(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"EMidpoint"},
            {method:new IDAE_IMidpoint(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"IMidpoint"},
            {method:new IDAE_ETrapezoidal(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"ETrapezoidal"},
            {method:new IDAE_ITrapezoidal(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4), new NewtonSolver(20,1e-2,1e-3,0.95)),label:"ITrapezoidal"},*/
            {method:new IDAE_RK4(1e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"ERK4"},
            /*{method:new IDAE_RK4_2(1e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"ERK4_2"},
            {method:new IDAE_RK4_RALSTON(1e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"ERK4_Ralston"},
            {method:new IDAE_DOPRI5(1e-2,3e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4),1e-6),label:"EDOPRI5"},
            {method:new IDAE_BS23(1e-2,3e-2,1e-6,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"EBS23"},
            {method:new IDAE_RK6(1e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"ERK6_1"},
            {method:new IDAE_RK6_2(1e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"ERK6_2"},
            {method:new IDAE_RK8(1e-2,new NewtonSolver(20,1e-4,1e-5,0.95,4)),label:"ERK8"},
            {method:new IDAE_RADAUIA5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IRadau_IA5"},
            {method:new IDAE_RADAUIIA3(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IRadau_IIA3"},
            {method:new IDAE_RADAUIIA5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IRadau_IIA5"},
            {method:new IDAE_LOBATTOIIIA2(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"ILLobatto_IIIA2"},
            {method:new IDAE_LOBATTOIIIA4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"ILLobatto_IIIA4"},
            {method:new IDAE_LOBATTOIIIB2(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"ILLobatto_IIIB2"},
            {method:new IDAE_LOBATTOIIIB4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"ILLobatto_IIIB4"},
            {method:new IDAE_LOBATTOIIIC2(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"ILLobatto_IIIC2"},
            {method:new IDAE_LOBATTOIIIC4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"ILobatto_IIIC4"},
            {method:new IDAE_GAUSSLEGENDRE4(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IGaussLegender4"},
            {method:new IDAE_GAUSSLEGENDRE6(1e-2,3e-2,1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IGaussLegender6"},
            {method:new IDAE_HeunEuler(1e-2,3e-2,1e-4,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"E_HeunEuler"},
            {method:new IDAE_MidpointEuler(1e-2,3e-2,1e-4,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"E_MidpointEuler"},
            {method:new IDAE_BDF2(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF2"},
            {method:new IDAE_BDF3(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF3"},
            {method:new IDAE_BDF4(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF4"},
            {method:new IDAE_BDF5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF5"},
            {method:new IDAE_BDF6(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IBDF6"},
            {method:new IDAE_AM2(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6),new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IAM2"},
            {method:new IDAE_AM3(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6),new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IAM3"},
            {method:new IDAE_AM4(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6),new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IAM4"},
            {method:new IDAE_AM5(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6),new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IAM5"},
            {method:new IDAE_AM6(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95,6),new NewtonSolver(20,1e-3,1e-4,0.95,4)),label:"IAM6"},*/
            {method:new IDAE_AB2(1e-2,new NewtonSolver(25,1e-3,1e-4,0.95,4)),label:"EAB2"},
            {method:new IDAE_AB3(1e-2,new NewtonSolver(25,1e-3,1e-4,0.95,4)),label:"EAB3"},
            {method:new IDAE_AB4(1e-2,new NewtonSolver(25,1e-3,1e-4,0.95,4)),label:"EAB4"},
            {method:new IDAE_AB5(1e-2,new NewtonSolver(25,1e-3,1e-4,0.95,4)),label:"EAB5"},
            {method:new IDAE_AB6(1e-2,new NewtonSolver(25,1e-3,1e-4,0.95,4)),label:"EAB6"}
        ]
        try{
            this.initPlot();
            this.testDalquist(EDAESolvers,IDAESolvers);//
            //this.testVanDerPol(EDAESolvers,IDAESolvers);//
            //this.testLorenz(EDAESolvers,IDAESolvers);//
            //this.testIDAE(EDAESolvers,IDAESolvers);//

            //this.testJumpingBall();//passed
            //this.testIDAEJumpingBall();
            //this.testAlgebraic();//Passed
        }catch(error)
        {
            console.log(error);
            ui.addLogMessage(JSON.stringify(error));
            $("#log").val(JSON.stringify(error));
        }
    }
    static testDalquist(edaeSolvers:{method:EDAESolver,label:string}[],idaeSolvers:{method:IDAESolver,label:string}[]):void{
        function exponentAnalytical(x0:number,a:number,t0:number,t1:number,step:number):DAEVector[]
        {
            let result:DAEVector[] = [];
            let c = x0/Math.exp(a*t0);
            for(let t = t0;t<=t1*1.001;t+=step)
            {
                result.push(new DAEVector(new vector([Math.exp(a*t)*c]),new vector([]),t));
            }
            return result;
        }
        /**
        dx = ax
        */
        class DalquistProblem implements EDAESystem{
            protected a:number;
            constructor(a:number){
                this.a = a;
            }
            f(x:vector,z:vector,t:number):vector{
                return new vector([
                    this.a * x.get(0)
                ]);
            }
            g(z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,z:vector,t:number):matrix{
                return new matrix([this.a],1,1);
            }
            dfdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,1);
            }
            dgdx(x:vector,t:number):matrix{
                return new matrix([],1,0);
            }
            length_x():number{
                return 1;
            }
            length_z():number{
                return 0;
            }
        }
        let t0 = 0;
        let t1 = 1;
        let a = -2;
        let x0 = new vector([1]);
        let ESystem = new DalquistProblem(a);
        /*let EDAEESolver = new EDAE_EEuler(0.01);
        let EDAEISolver = new EDAE_IEuler(0.01,20,0.025,0.95);
        let EDAEESolution = solveExplicit(new vector([1]),t0,t1,EDAEESolver,ESystem);     
        let EDAEISolution = solveExplicit(new vector([1]),t0,t1,EDAEISolver,ESystem);
        Test.showOutput(EDAEESolution,["x"],[],"Exponent EDAEE");
        Test.showOutput(EDAEISolution,["x"],[],"Exponent EDAEI");*/
        /**
         * dx - ax = 0
         */
        class ImplicitDalquistProblem implements IDAESystem{
            protected a:number;
            constructor(a:number){
                this.a = a;
            }
            f(x:vector,dx:vector,z:vector,t:number):vector{
                return new vector([
                    dx.get(0)-this.a * x.get(0)
                ]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([-this.a],1,1);
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([1],1,1);
            }
            dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,1);
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                return new matrix([],1,0);
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            length_x(){
                return 1;
            }
            length_z(){
                return 0;
            }
        }
        let ISystem = new ImplicitDalquistProblem(a);
        /*let IDAEESolver = new IDAE_EEuler(0.01,20,0.025,0.95);
        let IDAEISolver = new IDAE_IEuler(0.01,20,0.025,0.95);
        let IDAEESolution = solveImplicit(new vector([1]),t0,t1,IDAEESolver,ISystem);
        let IDAEISolution = solveImplicit(new vector([1]),t0,t1,IDAEISolver,ISystem);
        Test.showOutput(IDAEESolution,["x"],[],"Exponent IDAEE");
        Test.showOutput(IDAEISolution,["x"],[],"Exponent IDAEI");*/

        this.testEDAESolvers(t0,t1,x0,edaeSolvers,ESystem,["x"],[],"EDAE");
        this.testIDAESolvers(t0,t1,x0,idaeSolvers,ISystem,["x"],[],"IDAE");
        Test.showOutput(exponentAnalytical(x0.get(0),a,t0,t1,0.01),["x"],[],"Exponent analytical");
    }
    static testVanDerPol(edaeSolvers:{method:EDAESolver,label:string}[],idaeSolvers:{method:IDAESolver,label:string}[]):void{
        /*
            dx = y;
            dy = mu(1-x^2)y - x;
        */
        class EVanDerPol implements EDAESystem{
            protected parameter:number;
            constructor(parameter:number){
                this.parameter = parameter;
            }
            f(x:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _y = x.get(1);
                return new vector([
                    _y,
                    this.parameter*(1-_x*_x)*_y - _x
                ]);
            }
            g(z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,z:vector,t:number):matrix{
                let _x = x.get(0);
                let _y = x.get(1);
                let result:matrix;
                result = matrix.emptySquare(2);
                result.set(0,0,0);
                result.set(1,0,1);
                result.set(-2*this.parameter*_y*_x-1,1,0);
                result.set(this.parameter*(1-_x*_x),1,1);
                return result;
            }
            dfdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,2);
            }
            dgdx(x:vector,t:number):matrix{
                return new matrix([],2,0);
            }
            dgdz(x:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            length_x():number{
                return 2;
            }
            length_z():number{
                return 0;
            }
        }
        /*
            dx - y = 0;
            dy - mu(1-x^2)y + x = 0;
        */
        class IVanDerPol implements IDAESystem{
            protected parameter:number;
            constructor(parameter:number){
                this.parameter = parameter;
            }
            f(x:vector,dx:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _y = x.get(1);
                let _dx = dx.get(0);
                let _dy = dx.get(1);
                return new vector([
                    _dx - _y,
                    _dy - this.parameter*(1-_x*_x)*_y + _x
                ]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                let _x = x.get(0);
                let _y = x.get(1);
                return new matrix([
                    0,-1,
                    1 + 2*this.parameter*_y*_x, -this.parameter*(1-_x*_x)
                ],2,2);
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([
                    1,0,
                    0,1
                ],2,2);
            }
            dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,2);
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                return new matrix([],2,0);
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            length_x():number{
                return 2;
            }
            length_z():number{
                return 0;
            }
        }
        let t0 = 0;
        let t1 = 5;
        let x0 = new vector([1,1]);
        let ESystem = new EVanDerPol(20);
        this.testEDAESolvers(t0,t1,x0,edaeSolvers,ESystem,["x","x'"],[],"EDAE");
        let ISystem = new IVanDerPol(20);
        this.testIDAESolvers(t0,t1,x0,idaeSolvers,ISystem,["x","x'"],[],"IDAE");
        /*let EDAEESolver = new EDAE_EEuler(0.01);
        let EDAEISolver = new EDAE_IEuler(0.01,20,0.05,0.95);
        let EDAEESolution = solveExplicit(new vector([1,1]),t0,t1,EDAEESolver,ESystem);     
        let EDAEISolution = solveExplicit(new vector([1,1]),t0,t1,EDAEISolver,ESystem);
        Test.showOutput(EDAEESolution,["x","x'"],[],"Van der pol EDAEE");
        Test.showOutput(EDAEISolution,["x","x'"],[],"Van der pol EDAEI");*/
    }
    static testWeissinger():void{
        class IWeissinger implements IDAESystem{
            f(x:vector,dx:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _dx = dx.get(0);
                return new vector([
                    t*Math.pow(_x*_dx,2)*_dx-Math.pow(_x*_dx,2)*_x+t*(t*t+1)*_dx-t*t*_x
                ]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                let _x = x.get(0);
                let _dx = dx.get(0);
                return new matrix([
                    2*t*_x*Math.pow(_dx,3) - 3*Math.pow(_x*_dx,2) -t*t
                ],1,1);
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                let _x = x.get(0);
                let _dx = dx.get(0);
                return new matrix([
                    3*t*Math.pow(_x*_dx,2) - 2*_dx*Math.pow(_x,3) - t*(t*t+1)
                ],1,1)
            }
            dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,1);
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                return new matrix([],1,0);
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            length_x():number{
                return 1;
            }
            length_z():number{
                return 0;
            }
        }
    }
    static testLorenz(edaeSolvers:{method:EDAESolver,label:string}[],idaeSolvers:{method:IDAESolver,label:string}[]):void{
        /*
            dx = s(y-x)
            dy = x(p-z) - y
            dz = xy - bz
        */
        class ELorenz implements EDAESystem{
            sigma:number;
            rho:number;
            beta:number;
            constructor(sigma:number,rho:number,beta:number){
                this.sigma = sigma;
                this.rho = rho;
                this.beta = beta;
            }
            f(x:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                return new vector([
                    this.sigma*(_y-_x),
                    _x*(this.rho-_z)-_y,
                    _x*_y - this.beta*_z
                ]);
            }
            g(x:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,z:vector,t:number):matrix{
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                return new matrix(
                    [
                        -this.sigma,this.sigma,0,
                        this.rho - _z,-1,-_x,
                        _y,_x,-this.beta
                    ],3,3);
            }
            dfdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,3);
            }
            dgdx(x:vector,t:number):matrix{
                return new matrix([],3,0);
            }
            length_x():number{
                return 3;
            }
            length_z():number{
                return 0;
            }
        }
        class ILorenz implements IDAESystem{
            sigma:number;
            rho:number;
            beta:number;
            constructor(sigma:number,rho:number,beta:number){
                this.sigma = sigma;
                this.rho = rho;
                this.beta = beta;
            }
            f(x:vector,dx:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                let _dx = dx.get(0);
                let _dy = dx.get(1);
                let _dz = dx.get(2);
                return new vector([
                    _dx-this.sigma*(_y-_x),
                    _dy - _x*(this.rho-_z)+_y,
                    _dz - _x*_y + this.beta*_z
                ]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                return new matrix(
                    [
                        this.sigma,-this.sigma,0,
                        -this.rho + _z,1,_x,
                        -_y,-_x,this.beta
                    ],3,3);
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([
                    1,0,0,
                    0,1,0,
                    0,0,1
                ],3,3);
            }
            dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,3);
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                return new matrix([],3,0);
            }
            length_x():number{
                return 3;
            }
            length_z():number{
                return 0;
            }
        }
        let t0 = 0;
        let t1 = 5;
        let x0 = new vector([1,1,1]);
        let ESystem = new ELorenz(10,28,8/3);
        let ISystem = new ILorenz(10,28,8/3);
        this.testEDAESolvers(t0,t1,x0,edaeSolvers,ESystem,["x","y","z"],[],"EDAE");
        this.testIDAESolvers(t0,t1,x0,idaeSolvers,ISystem,["x","y","z"],[],"IDAE");
        
        /*let EDAEESolver = new EDAE_EEuler(0.02);
        let EDAEISolver = new EDAE_IEuler(0.02,20,0.05,0.95);
        let EDAEESolution = solveExplicit(new vector([1,1,1]),t0,t1,EDAEESolver,ESystem);     
        let EDAEISolution = solveExplicit(new vector([1,1,1]),t0,t1,EDAEISolver,ESystem);
        Test.showOutput(EDAEESolution,["x","y","z"],[],"Lorenz EDAEE");
        Test.showOutput(EDAEISolution,["x","y","z"],[],"Lorenz EDAEI");*/

    }
    static testIDAE(edaeSolvers:{method:EDAESolver,label:string}[],idaeSolvers:{method:IDAESolver,label:string}[]):void{
        /**
            dx = y + z + t
            dy = x
            z = x + y
            dx-y-z-t=0
            dy-x=0
            z-x-y=0
        */
        class EDAEProblem implements EDAESystem{
        f(x:vector,z:vector,t:number):vector{
            return new vector(
                [
                    x.get(1)+z.get(0)+t,
                    x.get(0)
                ])
        }
        g(x:vector,t:number):vector{
            return new vector([x.get(0)+x.get(1)]);
        }
        dfdx(x:vector,z:vector,t:number):matrix{
            return new matrix([0,1,1,0],2,2);
        }
        dfdz(x:vector,z:vector,t:number):matrix{
            return new matrix([1,0],1,2);
        }
        dgdx(x:vector,t:number):matrix{
            return new matrix([1,1],2,1);
        }
        length_x():number
        {
            return 2;
        }
        length_z():number
        {
            return 1;
        }
        }
        class IDAEProblem implements IDAESystem{
            f(x:vector,dx:vector,z:vector,t:number):vector{
                return new vector(
                    [
                        dx.get(0)-x.get(1)-z.get(0)-t,
                        dx.get(1)-x.get(0)
                    ]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([z.get(0)-x.get(0)-x.get(1)]);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                let result:matrix;
                result = matrix.emptySquare(2);
                result.set(0,0,0);
                result.set(-1,0,1);
                result.set(-1,1,0);
                result.set(0,1,1);
                return result;
            }
            dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
                let result:matrix;
                result = matrix.empty(2,1);
                result.set(-1,0,0);
                result.set(0,1,0);
                return result;
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                let result:matrix;
                result = matrix.emptySquare(2);
                result.set(1,0,0);
                result.set(0,0,1);
                result.set(0,1,0);
                result.set(1,1,1);
                return result;
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                let result:matrix;
                result = matrix.empty(1,2);
                result.set(-1,0,0);
                result.set(-1,0,1);
                return result;
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                let result:matrix;
                result = matrix.empty(1,1);
                result.set(1,0,0);
                return result;
            }
            length_x():number{
                return 2;
            }
            length_z():number{
                return 1;
            }
        }
        let t0 = 0;
        let t1 = 1;
        let x0 = new vector([0,0]);
        let ISystem = new IDAEProblem();
        let ESystem = new EDAEProblem();
        /*let IDAEESolver = new IDAE_EEuler(0.005,20,0.05,0.95);
        let IDAEISolver = new IDAE_IEuler(0.010,20,0.01,0.95);
        let IDAEESolution = solveImplicit(new vector([0,0]),t0,t1,IDAEESolver,ISystem);     
        let IDAEISolution = solveImplicit(new vector([0,0]),t0,t1,IDAEISolver,ISystem);*/
        this.testEDAESolvers(t0,t1,x0,edaeSolvers,ESystem,["x","y"],["z"],"EDAE");
        this.testIDAESolvers(t0,t1,x0,idaeSolvers,ISystem,["x","y"],["z"],"IDAE");
        /*Test.showOutput(IDAEESolution,["x","y"],["z"],"IDAEE problem");
        Test.showOutput(IDAEISolution,["x","y"],["z"],"IDAEI problem");*/
    }
    static testIDAEJumpingBall():void{
        function getAnaltyticJumpingBall(x0:number,v0:number,t1:number,dt:number,k:number):DAEVector[]{
            let result:DAEVector[] = [];
            let point = new DAEVector(new vector([x0,v0]),new vector([]),0);
            result.push();
            let _v0 = v0;
            let _x0 = x0;
            let g = 10;
            let t = 0;
            while(t<t1){
                //find time of next intersection with x axis
                let eventStep = (_v0 + Math.sqrt(_v0*_v0+2*_x0*g))/g;
                let tNext = t + eventStep;
                let vNext = Math.abs(_v0 - g*eventStep);
                if(eventStep<=0.001)
                    break;
                for(let _dt = 0;t<tNext;t+=dt,_dt+=dt){
                    if(t>=t1)
                        return result;
                    point = new DAEVector(new vector([
                        _x0 + _v0*_dt - g*_dt*_dt/2,
                        _v0 - g*_dt
                    ]),new vector([]),t);
                    result.push(point);
                }
                t = tNext;
                _x0 = 0;
                _v0 = vNext*k;
                result.push(new DAEVector(new vector([_x0,_v0]),new vector([]),t));
            }
            return result;
        }
        /*
            constant m = 1;
            v(t0) = 0;
            x(t0) = 1;
            position: x' - v = 0;
            velocity: v' + mg = 0;
            state jump on (v<=0&&x<=0){
                set v = -v;
            } from init, jump;
        */
        class JumpStateLink implements HybridStateLink{
            protected stateNumber:number;
            protected k:number;
            constructor(stateNumber:number,k:number){
                this.stateNumber = stateNumber;
                this.k = k;
            }
            getNewState(){
                return this.stateNumber;
            }
            pr(x:vector,z:vector,t:number){
                return x.get(0)<=0 && x.get(1)<=0;
            }
            p(x:vector,z:vector,t:number){
                return Math.min(-x.get(0),-x.get(1));
            }
            dpdt(x:vector,z:vector,t:number):number{
                return 0;
            }
            dpdz(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dpdx(x:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _v = x.get(1);
                if(-_x<-_v){
                    return new vector([-1,0]);
                }
                return new vector([0,-1]);
            }
            setConditions(x:vector,z:vector,t:number):vector{
                return new vector([x.get(0),-x.get(1)*this.k]);
            }
        }
        class IDAEJumpingBall extends IDAEHybridSystem{
            protected _g:number;
            constructor(_g:number,k:number){
                super();
                this._g = _g;
                this.currentState = 0;
                let link = new JumpStateLink(1,k);
                this.states = [{name:"init",links:[link],terminal:false},{name:"jump",links:[link],terminal:false}];
            }
            f(x:vector,dx:vector,z:vector,t:number):vector{
                return new vector([
                    dx.get(0)-x.get(1),
                    dx.get(1)+this._g
                ]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([0,-1,0,0],2,2);
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([1,0,0,1],2,2);
            }
            dfdz(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,2);
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                return new matrix([],2,0);
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            dgdt(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            length_x():number{
                return 2;
            }
            length_z():number{
                return 0;
            }
        }
        let t1 = 23;
        let k = 0.8;
        let eventDetectorSimple = new EventDetectorSimple();
        let eventDetectorComplex = new EventDetectorComplex();
        let adaptiveStepStrategy = new AdaptiveStepNewton(0.95,1e-5);
        let idaeHybridSolver = new IDAEHybridSolver(eventDetectorComplex,adaptiveStepStrategy);
        let idaeSystem = new IDAEJumpingBall(10,k);
        let initialState = new vector([10, 15]);
        let idaeSolution;
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae complex with step");
        idaeHybridSolver = new IDAEHybridSolver(eventDetectorSimple,adaptiveStepStrategy);
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae simple with step");
        idaeHybridSolver = new IDAEHybridSolver(eventDetectorComplex,null);
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae complex");
        idaeHybridSolver = new IDAEHybridSolver(eventDetectorSimple,null);
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae simple");
        Test.showOutput(getAnaltyticJumpingBall(initialState.get(0),initialState.get(1),t1,0.05,k),["x"],[],"Jumping ball analytical");
    }
    static testJumpingBall():void{
        function getAnaltyticJumpingBall(x0:number,v0:number,t1:number,dt:number,k:number):DAEVector[]{
            let result:DAEVector[] = [];
            let point = new DAEVector(new vector([x0,v0]),new vector([]),0);
            result.push();
            let _v0 = v0;
            let _x0 = x0;
            let g = 10;
            let t = 0;
            while(t<t1){
                //find time of next intersection with x axis
                let eventStep = (_v0 + Math.sqrt(_v0*_v0+2*_x0*g))/g;
                let tNext = t + eventStep;
                let vNext = Math.abs(_v0 - g*eventStep);
                if(eventStep<=0.001)
                    break;
                for(let _dt = 0;t<tNext;t+=dt,_dt+=dt){
                    if(t>=t1)
                        return result;
                    point = new DAEVector(new vector([
                        _x0 + _v0*_dt - g*_dt*_dt/2,
                        _v0 - g*_dt
                    ]),new vector([]),t);
                    result.push(point);
                }
                t = tNext;
                _x0 = 0;
                _v0 = vNext*k;
                result.push(new DAEVector(new vector([_x0,_v0]),new vector([]),t));
            }
            return result;
        }
        class JumpStateLink implements HybridStateLink{
            protected stateNumber:number;
            protected k:number;
            constructor(stateNumber:number,k:number){
                this.stateNumber = stateNumber;
                this.k = k;
            }
            getNewState(){
                return this.stateNumber;
            }
            pr(x:vector,z:vector,t:number){
                return x.get(0)<=0 && x.get(1)<=0;
            }
            p(x:vector,z:vector,t:number){
                return Math.min(-x.get(0),-x.get(1));
            }
            dpdt(x:vector,z:vector,t:number):number{
                return 0;
            }
            dpdz(x:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            dpdx(x:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _v = x.get(1);
                if(-_x<-_v){
                    return new vector([-1,0]);
                }
                return new vector([0,-1]);
            }
            setConditions(x:vector,z:vector,t:number):vector{
                return new vector([x.get(0),-x.get(1)*this.k]);
            }
        }
        /*
            constant m = 1;
            v(t0) = 0;
            x(t0) = 1;
            x' = v;
            v'= - mg;
            state jump on (v<=0&&x<=0){
                set v = -v;
            } from init, jump;
        */
        class EDAEJumpingBall extends EDAEHybridSystem{
            protected _g:number;
            constructor(_g:number,k:number){
                super();
                this._g = _g;
                this.currentState = 0;
                this.states = [];
                let link = new JumpStateLink(1,k);
                this.states = [{name:"init",links:[link],terminal:false},{name:"jump",links:[link],terminal:false}];
            }
            f(x:vector,z:vector,t:number):vector{
                let _x = x.get(0);
                let _v = x.get(1);
                return new vector([_v,-this._g]);
            }
            g(x:vector,t:number):vector{
                return new vector([]);
            }
            dfdx(x:vector,z:vector,t:number):matrix{
                return new matrix([
                    0,1,
                    0,0
                ],2,2);
            }
            dfdz(x:vector,z:vector,t:number):matrix{
                return new matrix([],0,2);
            }
            dgdx(x:vector,t:number):matrix{
                return new matrix([],2,0);
            }
            dgdt(x:vector,t:number):vector{
                return new vector([]);
            }
            length_x():number{
                return 2;
            }
            length_z():number{
                return 0;
            }
        
        }
        let t1 = 20;
        let k = 0.8;
        let adaptiveStepStrategy = new AdaptiveStepNewton(0.95,1e-5);
        let eventDetectorComplex = new EventDetectorComplex();
        let eventDetectorSimple = new EventDetectorSimple();
        let initialState = new vector([10, 15]);
        let edaeeRK4Solver = new EDAE_RK4(1e-2);
        let edaeHybridSolver = new EDAEHybridSolver(eventDetectorComplex,adaptiveStepStrategy);
        
        let edaeSystem = new EDAEJumpingBall(10,k);
        let edaeSolution;
        edaeSolution = edaeHybridSolver.solve(initialState,0,t1,edaeeRK4Solver,edaeSystem);
        Test.showOutput(edaeSolution.values,["x",null],[],"Jumping ball edae complex with step");
        edaeHybridSolver = new EDAEHybridSolver(eventDetectorSimple,adaptiveStepStrategy);
        edaeSolution = edaeHybridSolver.solve(initialState,0,t1,edaeeRK4Solver,edaeSystem);
        Test.showOutput(edaeSolution.values,["x",null],[],"Jumping ball edae simple with step");
        edaeHybridSolver = new EDAEHybridSolver(eventDetectorComplex,null);
        edaeSolution = edaeHybridSolver.solve(initialState,0,t1,edaeeRK4Solver,edaeSystem);
        Test.showOutput(edaeSolution.values,["x",null],[],"Jumping ball edae complex");
        edaeHybridSolver = new EDAEHybridSolver(eventDetectorSimple,null);
        edaeSolution = edaeHybridSolver.solve(initialState,0,t1,edaeeRK4Solver,edaeSystem);
        Test.showOutput(edaeSolution.values,["x",null],[],"Jumping ball edae simple");
        Test.showOutput(getAnaltyticJumpingBall(initialState.get(0),initialState.get(1),t1,0.1,k),["x"],[],"Jumping ball analytical");
    }
    static testAlgebraic():void{
        class AlgebraicProblem implements IDAESystem
        {
            f(x:vector,dx:vector,z:vector,t:number):vector{
                return new vector([]);
            }
            g(x:vector,z:vector,t:number):vector{
                return new vector([Math.sin(t+z.get(0))-t*z.get(0)]);
            }
            dfddx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            dfdx(x:vector,dx:vector,z:vector,t:number):matrix{
                return new matrix([],0,0);
            }
            dfdz():matrix{
                return new matrix([],0,1);
            }
            dgdx(x:vector,z:vector,t:number):matrix{
                return new matrix([],1,0);
            }
            dgdz(x:vector,z:vector,t:number):matrix{
                return new matrix([Math.cos(t+z.get(0))-t],1,1);
            }
            length_x():number{
                return 0;
            }
            length_z():number{
                return 1;
            }
        }
        let t0 = 0.5;
        let t1 = 0.8;
        let idaeeEulerSolver = new IDAE_EEuler(0.1,new NewtonSolver(160,0.05,1e-4,0.5));
        let idaeiEulerSolver = new IDAE_IEuler(0.05,new NewtonSolver(80,0.05,1e-4,0.75));
        let system = new AlgebraicProblem();
        let IDAEESolution = solveImplicit(new vector([]),t0,t1,idaeeEulerSolver,system);     
        let IDAEISolution = solveImplicit(new vector([]),t0,t1,idaeiEulerSolver,system);
        Test.showOutput(IDAEESolution,[],["z"],"Algebraic problem IDAEE");
        Test.showOutput(IDAEISolution,[],["z"],"Algebraic problem IDAEI");
    }
}