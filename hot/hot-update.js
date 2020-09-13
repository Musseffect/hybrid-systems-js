webpackHotUpdate("main",{

/***/ "./src/test/test.ts":
/*!**************************!*\
  !*** ./src/test/test.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = exports.plotExpression = void 0;
const adaptiveStep_1 = __webpack_require__(/*! ../dae/adaptiveStep */ "./src/dae/adaptiveStep.ts");
const eventDetection_1 = __webpack_require__(/*! ../dae/eventDetection */ "./src/dae/eventDetection.ts");
const daeVector_1 = __webpack_require__(/*! ../dae/daeVector */ "./src/dae/daeVector.ts");
const idaeHybridSystem_1 = __webpack_require__(/*! ../dae/idaeHybridSystem */ "./src/dae/idaeHybridSystem.ts");
const edaeHybridSystem_1 = __webpack_require__(/*! ../dae/edaeHybridSystem */ "./src/dae/edaeHybridSystem.ts");
const edaeHybridSolver_1 = __webpack_require__(/*! ../dae/edaeHybridSolver */ "./src/dae/edaeHybridSolver.ts");
const idaeHybridSolver_1 = __webpack_require__(/*! ../dae/idaeHybridSolver */ "./src/dae/idaeHybridSolver.ts");
const vector_1 = __webpack_require__(/*! ../math/vector */ "./src/math/vector.ts");
const matrix_1 = __webpack_require__(/*! ../math/matrix */ "./src/math/matrix.ts");
const euler_1 = __webpack_require__(/*! ../dae/solvers/idae/euler */ "./src/dae/solvers/idae/euler.ts");
const jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));
const rk_1 = __webpack_require__(/*! ../dae/solvers/edae/rk */ "./src/dae/solvers/edae/rk.ts");
const rk_2 = __webpack_require__(/*! ../dae/solvers/idae/rk */ "./src/dae/solvers/idae/rk.ts");
const adams_bashforth_1 = __webpack_require__(/*! ../dae/solvers/edae/adams-bashforth */ "./src/dae/solvers/edae/adams-bashforth.ts");
const adams_bashforth_2 = __webpack_require__(/*! ../dae/solvers/idae/adams-bashforth */ "./src/dae/solvers/idae/adams-bashforth.ts");
const newton_1 = __webpack_require__(/*! ../math/newton */ "./src/math/newton.ts");
const ui_1 = __webpack_require__(/*! ../ui */ "./src/ui.ts");
const compiler_1 = __webpack_require__(/*! ../compiler/compiler */ "./src/compiler/compiler.ts");
const hybridCompiler_1 = __webpack_require__(/*! ../compiler/hybridCompiler */ "./src/compiler/hybridCompiler.ts");
function solveExplicit(x0, t0, t1, solver, system) {
    let solution = [];
    let z0 = system.g(x0, t0);
    let point = new daeVector_1.DAEVector(x0, z0, t0);
    solution.push(point);
    for (let t = t0; t <= t1; t = point.t) {
        point = solver.makeStep(point.x, point.z, point.t, system);
        solution.push(point);
    }
    return solution;
}
function solveImplicit(x0, z0, t0, t1, solver, system) {
    let solution = [];
    z0 = solver.solve_z(x0, z0, t0, system);
    let point = new daeVector_1.DAEVector(x0, z0, t0);
    solution.push(point);
    for (let t = t0; t <= t1; t = point.t) {
        point = solver.makeStep(point.x, point.z, point.t, system);
        solution.push(point);
    }
    return solution;
}
function plotExpression(t0, t1, dt, expression, label) {
    let trace = {
        x: [],
        y: [],
        type: "scattergl",
        mode: 'markers+lines',
        name: label
    };
    for (let t = t0; t <= t1; t += dt) {
        trace.x.push(t);
        trace.y.push(expression.execute([t]));
    }
    //@ts-ignore
    Plotly.addTraces('plot-area', [trace]);
}
exports.plotExpression = plotExpression;
class Test {
    static testEDAESolvers(t0, t1, x0, solvers, system, xNames, zNames, label) {
        solvers.forEach(function (item) {
            ui_1.ui.addLogMessage(label + ": " + item.label);
            console.log(label + ": " + item.label);
            try {
                let values = solveExplicit(x0, t0, t1, item.method, system);
                Test.showOutput(values, xNames, zNames, label + " " + item.label);
            }
            catch (error) {
                console.log("Error during " + label + ": " + error);
                ui_1.ui.addLogMessage("Error during " + label + ": " + error);
            }
        });
    }
    static testIDAESolvers(t0, t1, x0, solvers, system, xNames, zNames, label) {
        solvers.forEach(function (item) {
            ui_1.ui.addLogMessage(label + ": " + item.label);
            console.log(label + ": " + item.label);
            try {
                let values = solveImplicit(x0, vector_1.vector.empty(system.length_z()), t0, t1, item.method, system);
                Test.showOutput(values, xNames, zNames, label + " " + item.label);
            }
            catch (error) {
                console.log("Error during " + label + ": " + error);
                ui_1.ui.addLogMessage("Error during " + label + ": " + error);
            }
        });
    }
    static showOutput(values, difVariables, algVariables, label) {
        let data = [];
        difVariables.forEach(function (item, index) {
            if (item == null)
                return;
            let trace = {
                x: [],
                y: [],
                type: "scattergl",
                mode: 'markers+lines',
                name: label + ": " + item
            };
            for (let i = 0; i < values.length; i++) {
                let valueVector = values[i];
                trace.y.push(valueVector.x.get(index));
                trace.x.push(valueVector.t);
            }
            data.push(trace);
        });
        algVariables.forEach(function (item, index) {
            if (item == null)
                return;
            let trace = {
                x: [],
                y: [],
                type: "scattergl",
                mode: 'markers+lines',
                name: label + ": " + item
            };
            for (let i = 0; i < values.length; i++) {
                let valueVector = values[i];
                trace.y.push(valueVector.z.get(index));
                trace.x.push(valueVector.t);
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
    static initPlot() {
        var layout = {
            title: 'Result',
            type: "scattergl",
            width: jquery_1.default("#plot-area").width(),
            height: jquery_1.default("#plot-area").height(),
            paper_bgcolor: 'rgba(245,245,245,1)',
            plot_bgcolor: 'rgba(245,245,245,1)',
            nticks: 30
        };
        //@ts-ignore
        Plotly.newPlot('plot-area', [], layout, { responsive: true });
    }
    static runTests() {
        jquery_1.default("log").val("");
        ui_1.ui.addLogMessage("Run tests");
        //ui.clearLog();
        let EDAESolvers = [
            /*{method:new EDAE_EEuler(1e-3),label:"EEuler"},
            {method:new EDAE_IEuler(1e-3,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"IEuler"},
            {method:new EDAE_EMidpoint(1e-2),label:"EMidpoint"},
            {method:new EDAE_IMidpoint(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"IMidpoint"},
            {method:new EDAE_ETrapezoidal(1e-2),label:"ETrapezoidal"},
            {method:new EDAE_ITrapezoidal(1e-2,new NewtonSolver(20,1e-3,1e-4,0.95)),label:"ITrapezoidal"},*/
            { method: new rk_1.EDAE_RK4(1e-2), label: "ERK4" },
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
            { method: new adams_bashforth_1.EDAE_AB2(1e-2), label: "EAB2" },
            { method: new adams_bashforth_1.EDAE_AB3(1e-2), label: "EAB3" },
            { method: new adams_bashforth_1.EDAE_AB4(1e-2), label: "EAB4" },
            { method: new adams_bashforth_1.EDAE_AB5(1e-2), label: "EAB5" },
            { method: new adams_bashforth_1.EDAE_AB6(1e-2), label: "EAB6" }
        ];
        let IDAESolvers = [
            /*{method:new IDAE_EEuler(1e-3,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"EEuler"},
            {method:new IDAE_IEuler(1e-3, new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"IEuler"},
            {method:new IDAE_EMidpoint(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"EMidpoint"},
            {method:new IDAE_IMidpoint(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"IMidpoint"},
            {method:new IDAE_ETrapezoidal(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4)),label:"ETrapezoidal"},
            {method:new IDAE_ITrapezoidal(1e-2,new NewtonSolver(20,1e-5,1e-5,0.95,4), new NewtonSolver(20,1e-2,1e-3,0.95)),label:"ITrapezoidal"},*/
            { method: new rk_2.IDAE_RK4(1e-2, new newton_1.NewtonSolver(20, 1e-4, 1e-5, 0.95, 4)), label: "ERK4" },
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
            { method: new adams_bashforth_2.IDAE_AB2(1e-2, new newton_1.NewtonSolver(25, 1e-3, 1e-4, 0.95, 4)), label: "EAB2" },
            { method: new adams_bashforth_2.IDAE_AB3(1e-2, new newton_1.NewtonSolver(25, 1e-3, 1e-4, 0.95, 4)), label: "EAB3" },
            { method: new adams_bashforth_2.IDAE_AB4(1e-2, new newton_1.NewtonSolver(25, 1e-3, 1e-4, 0.95, 4)), label: "EAB4" },
            { method: new adams_bashforth_2.IDAE_AB5(1e-2, new newton_1.NewtonSolver(25, 1e-3, 1e-4, 0.95, 4)), label: "EAB5" },
            { method: new adams_bashforth_2.IDAE_AB6(1e-2, new newton_1.NewtonSolver(25, 1e-3, 1e-4, 0.95, 4)), label: "EAB6" }
        ];
        try {
            this.initPlot();
            this.testWeissingerImplicit();
            //this.testEDAECompiler();
            //this.testDalquist(EDAESolvers,IDAESolvers);//
            //this.testVanDerPol(EDAESolvers,IDAESolvers);//
            //this.testLorenz(EDAESolvers,IDAESolvers);//
            //this.testIDAE(EDAESolvers,IDAESolvers);//
            //this.testJumpingBall();//passed
            //this.testIDAEJumpingBall();
            //this.testAlgebraic();//Passed
        }
        catch (error) {
            console.log(error);
            ui_1.ui.addLogMessage(JSON.stringify(error));
            jquery_1.default("#log").val(JSON.stringify(error));
        }
    }
    static testDalquist(edaeSolvers, idaeSolvers) {
        function exponentAnalytical(x0, a, t0, t1, step) {
            let result = [];
            let c = x0 / Math.exp(a * t0);
            for (let t = t0; t <= t1 * 1.001; t += step) {
                result.push(new daeVector_1.DAEVector(new vector_1.vector([Math.exp(a * t) * c]), new vector_1.vector([]), t));
            }
            return result;
        }
        /**
        dx = ax
        */
        class DalquistProblem {
            constructor(a) {
                this.a = a;
            }
            f(x, z, t) {
                return new vector_1.vector([
                    this.a * x.get(0)
                ]);
            }
            g(z, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, z, t) {
                return new matrix_1.matrix([this.a], 1, 1);
            }
            dfdz(x, z, t) {
                return new matrix_1.matrix([], 0, 1);
            }
            dgdx(x, t) {
                return new matrix_1.matrix([], 1, 0);
            }
            length_x() {
                return 1;
            }
            length_z() {
                return 0;
            }
        }
        let t0 = 0;
        let t1 = 1;
        let a = -2;
        let x0 = new vector_1.vector([1]);
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
        class ImplicitDalquistProblem {
            constructor(a) {
                this.a = a;
            }
            f(x, dx, z, t) {
                return new vector_1.vector([
                    dx.get(0) - this.a * x.get(0)
                ]);
            }
            g(x, z, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, dx, z, t) {
                return new matrix_1.matrix([-this.a], 1, 1);
            }
            dfddx(x, dx, z, t) {
                return new matrix_1.matrix([1], 1, 1);
            }
            dfdz(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 1);
            }
            dgdx(x, z, t) {
                return new matrix_1.matrix([], 1, 0);
            }
            dgdz(x, z, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            length_x() {
                return 1;
            }
            length_z() {
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
        this.testEDAESolvers(t0, t1, x0, edaeSolvers, ESystem, ["x"], [], "EDAE");
        this.testIDAESolvers(t0, t1, x0, idaeSolvers, ISystem, ["x"], [], "IDAE");
        Test.showOutput(exponentAnalytical(x0.get(0), a, t0, t1, 0.01), ["x"], [], "Exponent analytical");
    }
    static testVanDerPol(edaeSolvers, idaeSolvers) {
        /*
            dx = y;
            dy = mu(1-x^2)y - x;
        */
        class EVanDerPol {
            constructor(parameter) {
                this.parameter = parameter;
            }
            f(x, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                return new vector_1.vector([
                    _y,
                    this.parameter * (1 - _x * _x) * _y - _x
                ]);
            }
            g(z, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                let result;
                result = matrix_1.matrix.emptySquare(2);
                result.set(0, 0, 0);
                result.set(1, 0, 1);
                result.set(-2 * this.parameter * _y * _x - 1, 1, 0);
                result.set(this.parameter * (1 - _x * _x), 1, 1);
                return result;
            }
            dfdz(x, z, t) {
                return new matrix_1.matrix([], 0, 2);
            }
            dgdx(x, t) {
                return new matrix_1.matrix([], 2, 0);
            }
            dgdz(x, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            length_x() {
                return 2;
            }
            length_z() {
                return 0;
            }
        }
        /*
            dx - y = 0;
            dy - mu(1-x^2)y + x = 0;
        */
        class IVanDerPol {
            constructor(parameter) {
                this.parameter = parameter;
            }
            f(x, dx, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                let _dx = dx.get(0);
                let _dy = dx.get(1);
                return new vector_1.vector([
                    _dx - _y,
                    _dy - this.parameter * (1 - _x * _x) * _y + _x
                ]);
            }
            g(x, z, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, dx, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                return new matrix_1.matrix([
                    0, -1,
                    1 + 2 * this.parameter * _y * _x, -this.parameter * (1 - _x * _x)
                ], 2, 2);
            }
            dfddx(x, dx, z, t) {
                return new matrix_1.matrix([
                    1, 0,
                    0, 1
                ], 2, 2);
            }
            dfdz(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 2);
            }
            dgdx(x, z, t) {
                return new matrix_1.matrix([], 2, 0);
            }
            dgdz(x, z, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            length_x() {
                return 2;
            }
            length_z() {
                return 0;
            }
        }
        let t0 = 0;
        let t1 = 5;
        let x0 = new vector_1.vector([1, 1]);
        let ESystem = new EVanDerPol(20);
        this.testEDAESolvers(t0, t1, x0, edaeSolvers, ESystem, ["x", "x'"], [], "EDAE");
        let ISystem = new IVanDerPol(20);
        this.testIDAESolvers(t0, t1, x0, idaeSolvers, ISystem, ["x", "x'"], [], "IDAE");
        /*let EDAEESolver = new EDAE_EEuler(0.01);
        let EDAEISolver = new EDAE_IEuler(0.01,20,0.05,0.95);
        let EDAEESolution = solveExplicit(new vector([1,1]),t0,t1,EDAEESolver,ESystem);
        let EDAEISolution = solveExplicit(new vector([1,1]),t0,t1,EDAEISolver,ESystem);
        Test.showOutput(EDAEESolution,["x","x'"],[],"Van der pol EDAEE");
        Test.showOutput(EDAEISolution,["x","x'"],[],"Van der pol EDAEI");*/
    }
    static testLorenz(edaeSolvers, idaeSolvers) {
        /*
            dx = s(y-x)
            dy = x(p-z) - y
            dz = xy - bz
        */
        class ELorenz {
            constructor(sigma, rho, beta) {
                this.sigma = sigma;
                this.rho = rho;
                this.beta = beta;
            }
            f(x, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                return new vector_1.vector([
                    this.sigma * (_y - _x),
                    _x * (this.rho - _z) - _y,
                    _x * _y - this.beta * _z
                ]);
            }
            g(x, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                return new matrix_1.matrix([
                    -this.sigma, this.sigma, 0,
                    this.rho - _z, -1, -_x,
                    _y, _x, -this.beta
                ], 3, 3);
            }
            dfdz(x, z, t) {
                return new matrix_1.matrix([], 0, 3);
            }
            dgdx(x, t) {
                return new matrix_1.matrix([], 3, 0);
            }
            length_x() {
                return 3;
            }
            length_z() {
                return 0;
            }
        }
        class ILorenz {
            constructor(sigma, rho, beta) {
                this.sigma = sigma;
                this.rho = rho;
                this.beta = beta;
            }
            f(x, dx, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                let _dx = dx.get(0);
                let _dy = dx.get(1);
                let _dz = dx.get(2);
                return new vector_1.vector([
                    _dx - this.sigma * (_y - _x),
                    _dy - _x * (this.rho - _z) + _y,
                    _dz - _x * _y + this.beta * _z
                ]);
            }
            g(x, z, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, dx, z, t) {
                let _x = x.get(0);
                let _y = x.get(1);
                let _z = x.get(2);
                return new matrix_1.matrix([
                    this.sigma, -this.sigma, 0,
                    -this.rho + _z, 1, _x,
                    -_y, -_x, this.beta
                ], 3, 3);
            }
            dfddx(x, dx, z, t) {
                return new matrix_1.matrix([
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
                ], 3, 3);
            }
            dfdz(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 3);
            }
            dgdz(x, z, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            dgdx(x, z, t) {
                return new matrix_1.matrix([], 3, 0);
            }
            length_x() {
                return 3;
            }
            length_z() {
                return 0;
            }
        }
        let t0 = 0;
        let t1 = 5;
        let x0 = new vector_1.vector([1, 1, 1]);
        let ESystem = new ELorenz(10, 28, 8 / 3);
        let ISystem = new ILorenz(10, 28, 8 / 3);
        this.testEDAESolvers(t0, t1, x0, edaeSolvers, ESystem, ["x", "y", "z"], [], "EDAE");
        this.testIDAESolvers(t0, t1, x0, idaeSolvers, ISystem, ["x", "y", "z"], [], "IDAE");
        /*let EDAEESolver = new EDAE_EEuler(0.02);
        let EDAEISolver = new EDAE_IEuler(0.02,20,0.05,0.95);
        let EDAEESolution = solveExplicit(new vector([1,1,1]),t0,t1,EDAEESolver,ESystem);
        let EDAEISolution = solveExplicit(new vector([1,1,1]),t0,t1,EDAEISolver,ESystem);
        Test.showOutput(EDAEESolution,["x","y","z"],[],"Lorenz EDAEE");
        Test.showOutput(EDAEISolution,["x","y","z"],[],"Lorenz EDAEI");*/
    }
    static testIDAE(edaeSolvers, idaeSolvers) {
        /**
            dx = y + z + t
            dy = x
            z = x + y
            dx-y-z-t=0
            dy-x=0
            z-x-y=0
        */
        class EDAEProblem {
            f(x, z, t) {
                return new vector_1.vector([
                    x.get(1) + z.get(0) + t,
                    x.get(0)
                ]);
            }
            g(x, t) {
                return new vector_1.vector([x.get(0) + x.get(1)]);
            }
            dfdx(x, z, t) {
                return new matrix_1.matrix([0, 1, 1, 0], 2, 2);
            }
            dfdz(x, z, t) {
                return new matrix_1.matrix([1, 0], 1, 2);
            }
            dgdx(x, t) {
                return new matrix_1.matrix([1, 1], 2, 1);
            }
            length_x() {
                return 2;
            }
            length_z() {
                return 1;
            }
        }
        class IDAEProblem {
            f(x, dx, z, t) {
                return new vector_1.vector([
                    dx.get(0) - x.get(1) - z.get(0) - t,
                    dx.get(1) - x.get(0)
                ]);
            }
            g(x, z, t) {
                return new vector_1.vector([z.get(0) - x.get(0) - x.get(1)]);
            }
            dfdx(x, dx, z, t) {
                let result;
                result = matrix_1.matrix.emptySquare(2);
                result.set(0, 0, 0);
                result.set(-1, 0, 1);
                result.set(-1, 1, 0);
                result.set(0, 1, 1);
                return result;
            }
            dfdz(x, dx, z, t) {
                let result;
                result = matrix_1.matrix.empty(2, 1);
                result.set(-1, 0, 0);
                result.set(0, 1, 0);
                return result;
            }
            dfddx(x, dx, z, t) {
                let result;
                result = matrix_1.matrix.emptySquare(2);
                result.set(1, 0, 0);
                result.set(0, 0, 1);
                result.set(0, 1, 0);
                result.set(1, 1, 1);
                return result;
            }
            dgdx(x, z, t) {
                let result;
                result = matrix_1.matrix.empty(1, 2);
                result.set(-1, 0, 0);
                result.set(-1, 0, 1);
                return result;
            }
            dgdz(x, z, t) {
                let result;
                result = matrix_1.matrix.empty(1, 1);
                result.set(1, 0, 0);
                return result;
            }
            length_x() {
                return 2;
            }
            length_z() {
                return 1;
            }
        }
        let t0 = 0;
        let t1 = 1;
        let x0 = new vector_1.vector([0, 0]);
        let ISystem = new IDAEProblem();
        let ESystem = new EDAEProblem();
        /*let IDAEESolver = new IDAE_EEuler(0.005,20,0.05,0.95);
        let IDAEISolver = new IDAE_IEuler(0.010,20,0.01,0.95);
        let IDAEESolution = solveImplicit(new vector([0,0]),t0,t1,IDAEESolver,ISystem);
        let IDAEISolution = solveImplicit(new vector([0,0]),t0,t1,IDAEISolver,ISystem);*/
        this.testEDAESolvers(t0, t1, x0, edaeSolvers, ESystem, ["x", "y"], ["z"], "EDAE");
        this.testIDAESolvers(t0, t1, x0, idaeSolvers, ISystem, ["x", "y"], ["z"], "IDAE");
        /*Test.showOutput(IDAEESolution,["x","y"],["z"],"IDAEE problem");
        Test.showOutput(IDAEISolution,["x","y"],["z"],"IDAEI problem");*/
    }
    static testIDAEJumpingBall() {
        function getAnaltyticJumpingBall(x0, v0, t1, dt, k) {
            let result = [];
            let point = new daeVector_1.DAEVector(new vector_1.vector([x0, v0]), new vector_1.vector([]), 0);
            result.push();
            let _v0 = v0;
            let _x0 = x0;
            let g = 10;
            let t = 0;
            while (t < t1) {
                //find time of next intersection with x axis
                let eventStep = (_v0 + Math.sqrt(_v0 * _v0 + 2 * _x0 * g)) / g;
                let tNext = t + eventStep;
                let vNext = Math.abs(_v0 - g * eventStep);
                if (eventStep <= 0.001)
                    break;
                for (let _dt = 0; t < tNext; t += dt, _dt += dt) {
                    if (t >= t1)
                        return result;
                    point = new daeVector_1.DAEVector(new vector_1.vector([
                        _x0 + _v0 * _dt - g * _dt * _dt / 2,
                        _v0 - g * _dt
                    ]), new vector_1.vector([]), t);
                    result.push(point);
                }
                t = tNext;
                _x0 = 0;
                _v0 = vNext * k;
                result.push(new daeVector_1.DAEVector(new vector_1.vector([_x0, _v0]), new vector_1.vector([]), t));
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
        class JumpStateLink {
            constructor(stateNumber, k) {
                this.stateNumber = stateNumber;
                this.k = k;
            }
            getNewState() {
                return this.stateNumber;
            }
            pr(x, z, t) {
                return x.get(0) <= 0 && x.get(1) <= 0;
            }
            p(x, z, t) {
                return Math.min(-x.get(0), -x.get(1));
            }
            dpdt(x, z, t) {
                return 0;
            }
            dpdz(x, z, t) {
                return new vector_1.vector([]);
            }
            dpdx(x, z, t) {
                let _x = x.get(0);
                let _v = x.get(1);
                if (-_x < -_v) {
                    return new vector_1.vector([-1, 0]);
                }
                return new vector_1.vector([0, -1]);
            }
            setConditions(x, z, t) {
                return new vector_1.vector([x.get(0), -x.get(1) * this.k]);
            }
        }
        class IDAEJumpState extends idaeHybridSystem_1.IDAEHybridState {
            constructor(name, links, terminal, g) {
                super(name, links, terminal);
                this._g = g;
            }
            f(x, dx, z, t) {
                return new vector_1.vector([
                    dx.get(0) - x.get(1),
                    dx.get(1) + this._g
                ]);
            }
            g(x, z, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, dx, z, t) {
                return new matrix_1.matrix([0, -1, 0, 0], 2, 2);
            }
            dfddx(x, dx, z, t) {
                return new matrix_1.matrix([1, 0, 0, 1], 2, 2);
            }
            dfdz(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 2);
            }
            dgdx(x, z, t) {
                return new matrix_1.matrix([], 2, 0);
            }
            dgdz(x, z, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            dgdt(x, z, t) {
                return new vector_1.vector([]);
            }
            length_x() {
                return 2;
            }
            length_z() {
                return 0;
            }
        }
        class IDAEJumpingBall extends idaeHybridSystem_1.IDAEHybridSystem {
            constructor(g, k) {
                let link = new JumpStateLink(1, k);
                let init = new IDAEJumpState("init", [link], false, g);
                let jump = new IDAEJumpState("jump", [link], false, g);
                super([init, jump]);
                this.currentState = 0;
            }
        }
        let t1 = 23;
        let k = 0.8;
        let eventDetectorSimple = new eventDetection_1.EventDetectionSimple();
        let eventDetectorComplex = new eventDetection_1.EventDetectionComplex();
        let adaptiveStepStrategy = new adaptiveStep_1.AdaptiveStepNewton(0.95, 1e-5);
        let idaeHybridSolver = new idaeHybridSolver_1.IDAEHybridSolver(eventDetectorComplex, adaptiveStepStrategy);
        let idaeSystem = new IDAEJumpingBall(10, k);
        let initialState = new vector_1.vector([10, 15]);
        let idaeSolution;
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae complex with step");
        idaeHybridSolver = new idaeHybridSolver_1.IDAEHybridSolver(eventDetectorSimple, adaptiveStepStrategy);
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae simple with step");
        idaeHybridSolver = new idaeHybridSolver_1.IDAEHybridSolver(eventDetectorComplex, null);
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae complex");
        idaeHybridSolver = new idaeHybridSolver_1.IDAEHybridSolver(eventDetectorSimple, null);
        //idaeSolution = idaeHybridSolver.solve(initialState,0,1,idaeiEulerSolver,idaeSystem,[]);
        //Test.showOutput(idaeSolution.values,["x","v"],[],"Jumping ball idae simple");
        Test.showOutput(getAnaltyticJumpingBall(initialState.get(0), initialState.get(1), t1, 0.05, k), ["x"], [], "Jumping ball analytical");
    }
    static testJumpingBall() {
        function getAnaltyticJumpingBall(x0, v0, t1, dt, k) {
            let result = [];
            let point = new daeVector_1.DAEVector(new vector_1.vector([x0, v0]), new vector_1.vector([]), 0);
            result.push();
            let _v0 = v0;
            let _x0 = x0;
            let g = 10;
            let t = 0;
            while (t < t1) {
                //find time of next intersection with x axis
                let eventStep = (_v0 + Math.sqrt(_v0 * _v0 + 2 * _x0 * g)) / g;
                let tNext = t + eventStep;
                let vNext = Math.abs(_v0 - g * eventStep);
                if (eventStep <= 0.001)
                    break;
                for (let _dt = 0; t < tNext; t += dt, _dt += dt) {
                    if (t >= t1)
                        return result;
                    point = new daeVector_1.DAEVector(new vector_1.vector([
                        _x0 + _v0 * _dt - g * _dt * _dt / 2,
                        _v0 - g * _dt
                    ]), new vector_1.vector([]), t);
                    result.push(point);
                }
                t = tNext;
                _x0 = 0;
                _v0 = vNext * k;
                result.push(new daeVector_1.DAEVector(new vector_1.vector([_x0, _v0]), new vector_1.vector([]), t));
            }
            return result;
        }
        class JumpStateLink {
            constructor(stateNumber, k) {
                this.stateNumber = stateNumber;
                this.k = k;
            }
            getNewState() {
                return this.stateNumber;
            }
            pr(x, z, t) {
                return x.get(0) <= 0 && x.get(1) <= 0;
            }
            p(x, z, t) {
                return Math.min(-x.get(0), -x.get(1));
            }
            dpdt(x, z, t) {
                return 0;
            }
            dpdz(x, z, t) {
                return new vector_1.vector([]);
            }
            dpdx(x, z, t) {
                let _x = x.get(0);
                let _v = x.get(1);
                if (-_x < -_v) {
                    return new vector_1.vector([-1, 0]);
                }
                return new vector_1.vector([0, -1]);
            }
            setConditions(x, z, t) {
                return new vector_1.vector([x.get(0), -x.get(1) * this.k]);
            }
        }
        class EDAEJumpState extends edaeHybridSystem_1.EDAEHybridState {
            constructor(name, links, terminal, g) {
                super(name, links, terminal);
                this._g = g;
            }
            f(x, z, t) {
                let _x = x.get(0);
                let _v = x.get(1);
                return new vector_1.vector([_v, -this._g]);
            }
            g(x, t) {
                return new vector_1.vector([]);
            }
            dfdx(x, z, t) {
                return new matrix_1.matrix([
                    0, 1,
                    0, 0
                ], 2, 2);
            }
            dfdz(x, z, t) {
                return new matrix_1.matrix([], 0, 2);
            }
            dgdx(x, t) {
                return new matrix_1.matrix([], 2, 0);
            }
            dgdt(x, t) {
                return new vector_1.vector([]);
            }
            length_x() {
                return 2;
            }
            length_z() {
                return 0;
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
        class EDAEJumpingBall extends edaeHybridSystem_1.EDAEHybridSystem {
            constructor(g, k) {
                let link = new JumpStateLink(1, k);
                let init = new EDAEJumpState("init", [link], false, g);
                let jump = new EDAEJumpState("jump", [link], false, g);
                super([init, jump]);
                this.currentState = 0;
                //this.states = [];
                //this.states = [{name:"init",links:[link],terminal:false},{name:"jump",links:[link],terminal:false}];
            }
        }
        let t1 = 23;
        let k = 0.8;
        let adaptiveStepStrategy = new adaptiveStep_1.AdaptiveStepNewton(0.95, 1e-5);
        let eventDetectorComplex = new eventDetection_1.EventDetectionComplex();
        let eventDetectorSimple = new eventDetection_1.EventDetectionSimple();
        let initialState = new vector_1.vector([10, 15]);
        let edaeeRK4Solver = new rk_1.EDAE_RK4(1e-2);
        let edaeHybridSolver = new edaeHybridSolver_1.EDAEHybridSolver(eventDetectorComplex, adaptiveStepStrategy);
        let edaeSystem = new EDAEJumpingBall(10, k);
        let solution = edaeHybridSolver.solve(initialState, 0, t1, edaeeRK4Solver, edaeSystem);
        Test.showOutput(solution.values, ["x", null], [], "Jumping ball edae complex with step");
        edaeHybridSolver = new edaeHybridSolver_1.EDAEHybridSolver(eventDetectorSimple, adaptiveStepStrategy);
        solution = edaeHybridSolver.solve(initialState, 0, t1, edaeeRK4Solver, edaeSystem);
        Test.showOutput(solution.values, ["x", null], [], "Jumping ball edae simple with step");
        edaeHybridSolver = new edaeHybridSolver_1.EDAEHybridSolver(eventDetectorComplex, null);
        solution = edaeHybridSolver.solve(initialState, 0, t1, edaeeRK4Solver, edaeSystem);
        Test.showOutput(solution.values, ["x", null], [], "Jumping ball edae complex");
        edaeHybridSolver = new edaeHybridSolver_1.EDAEHybridSolver(eventDetectorSimple, null);
        solution = edaeHybridSolver.solve(initialState, 0, t1, edaeeRK4Solver, edaeSystem);
        Test.showOutput(solution.values, ["x", null], [], "Jumping ball edae simple");
        Test.showOutput(getAnaltyticJumpingBall(initialState.get(0), initialState.get(1), t1, 0.1, k), ["x"], [], "Jumping ball analytical");
    }
    static testAlgebraic() {
        class AlgebraicProblem {
            f(x, dx, z, t) {
                return new vector_1.vector([]);
            }
            g(x, z, t) {
                return new vector_1.vector([Math.sin(t + z.get(0)) - t * z.get(0)]);
            }
            dfddx(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            dfdx(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 0);
            }
            dfdz() {
                return new matrix_1.matrix([], 0, 1);
            }
            dgdx(x, z, t) {
                return new matrix_1.matrix([], 1, 0);
            }
            dgdz(x, z, t) {
                return new matrix_1.matrix([Math.cos(t + z.get(0)) - t], 1, 1);
            }
            length_x() {
                return 0;
            }
            length_z() {
                return 1;
            }
        }
        let t0 = 0.5;
        let t1 = 0.8;
        let idaeeEulerSolver = new euler_1.IDAE_EEuler(0.1, new newton_1.NewtonSolver(160, 0.05, 1e-4, 0.5));
        let idaeiEulerSolver = new euler_1.IDAE_IEuler(0.05, new newton_1.NewtonSolver(80, 0.05, 1e-4, 0.75));
        let system = new AlgebraicProblem();
        let IDAEESolution = solveImplicit(new vector_1.vector([]), vector_1.vector.empty(system.length_z()), t0, t1, idaeeEulerSolver, system);
        let IDAEISolution = solveImplicit(new vector_1.vector([]), vector_1.vector.empty(system.length_z()), t0, t1, idaeiEulerSolver, system);
        Test.showOutput(IDAEESolution, [], ["z"], "Algebraic problem IDAEE");
        Test.showOutput(IDAEISolution, [], ["z"], "Algebraic problem IDAEI");
    }
    static testEDAECompiler() {
        ui_1.ui.clearErrors();
        Test.initPlot();
        try {
            let parameters = ui_1.ui.getParameters();
            //let text:string = $("#text-input").val() as string;
            let text = ui_1.ui.getText();
            let compiler = new compiler_1.DAECompiler();
            let { system, x0, x, z } = compiler.compileExplicit(text);
            let solver = ui_1.ui.methods[parameters["dae-method"]].edaeInit(parameters);
            let t0 = parameters.t0;
            let t1 = parameters.t0 + parameters.time;
            let solution = solveExplicit(x0, t0, t1, solver, system);
            Test.showOutput(solution, x, z, "Test edae compiler");
            ui_1.ui.openTab("results");
        }
        catch (e) {
            ui_1.handleErrors(e);
            ui_1.ui.openTab("main");
            ui_1.ui.openTab("errors-tab");
        }
    }
    static testIDAECompiler() {
        ui_1.ui.clearErrors();
        Test.initPlot();
        try {
            let parameters = ui_1.ui.getParameters();
            //let text:string = $("#text-input").val() as string;
            let text = ui_1.ui.getText();
            let compiler = new compiler_1.DAECompiler();
            let { system, x0, x, z, z0 } = compiler.compileImplicit(text);
            let solver = ui_1.ui.methods[parameters["dae-method"]].idaeInit(parameters);
            let t0 = parameters.t0;
            let t1 = parameters.t0 + parameters.time;
            let solution = solveImplicit(x0, z0, t0, t1, solver, system);
            Test.showOutput(solution, x, z, "Test idae compiler");
            ui_1.ui.openTab("results");
        }
        catch (e) {
            ui_1.handleErrors(e);
            ui_1.ui.openTab("main");
            ui_1.ui.openTab("errors-tab");
        }
    }
    static testExplicitHybridCompiler() {
        ui_1.ui.clearErrors();
        Test.initPlot();
        try {
            //let text:string = $("#text-input").val() as string;
            let text = ui_1.ui.getText();
            let parameters = ui_1.ui.getParameters();
            let compiler = new hybridCompiler_1.HybridSystemCompiler(parameters["zc-border-tol"]);
            let sysDef = compiler.compileExplicit(text);
            let t0 = parameters.t0;
            let t1 = t0 + parameters.time;
            let method = ui_1.ui.methods[parameters["dae-method"]].edaeInit(parameters);
            let solver = ui_1.ui.getEdaeSolver(parameters);
            let solution = solver.solve(sysDef.x0, t0, t1, method, sysDef.system);
            Test.showOutput(solution.values, sysDef.x, sysDef.z, "Test explicit hybrid compiler");
            //ui.plotSolution(solution,sysDef.x,sysDef.z);
            ui_1.ui.openTab("results");
        }
        catch (e) {
            ui_1.handleErrors(e);
            ui_1.ui.openTab("main");
            ui_1.ui.openTab("errors-tab");
        }
    }
    static testImplicitHybridCompiler() {
        ui_1.ui.clearErrors();
        Test.initPlot();
        try {
            //let text:string = $("#text-input").val() as string;
            let text = ui_1.ui.getText();
            let parameters = ui_1.ui.getParameters();
            let compiler = new hybridCompiler_1.HybridSystemCompiler(parameters["zc-border-tol"]);
            let sysDef = compiler.compileImplicit(text);
            let t0 = parameters.t0;
            let t1 = t0 + parameters.time;
            let method = ui_1.ui.methods[parameters["dae-method"]].idaeInit(parameters);
            let solver = ui_1.ui.getIdaeSolver(parameters);
            let solution = solver.solve(sysDef.x0, sysDef.z0, t0, t1, method, sysDef.system);
            Test.showOutput(solution.values, sysDef.x, sysDef.z, "Test explicit hybrid compiler");
            ui_1.ui.openTab("results");
        }
        catch (e) {
            ui_1.handleErrors(e);
            ui_1.ui.openTab("main");
            ui_1.ui.openTab("errors-tab");
        }
    }
    static testWeissingerImplicit() {
        class IWeissinger {
            f(x, dx, z, t) {
                let _x = x.get(0);
                let _dx = dx.get(0);
                return new vector_1.vector([
                    t * Math.pow(_x, 2) * Math.pow(_dx, 3) -
                        Math.pow(_x, 3) * Math.pow(_dx, 2) +
                        t * (t * t + 1) * _dx - t * t * _x
                ]);
            }
            g(x, z, t) {
                let _z = z.get(0);
                return new vector_1.vector([_z - Math.sqrt(t * t + 0.5)]);
            }
            dfdx(x, dx, z, t) {
                let _x = x.get(0);
                let _dx = dx.get(0);
                return new matrix_1.matrix([
                    2 * t * _x * Math.pow(_dx, 3) - 3 * Math.pow(_x * _dx, 2) - t * t
                ], 1, 1);
            }
            dfddx(x, dx, z, t) {
                let _x = x.get(0);
                let _dx = dx.get(0);
                return new matrix_1.matrix([
                    3 * t * Math.pow(_x * _dx, 2) - 2 * Math.pow(_x, 3) * _dx + t * (t * t + 1)
                ], 1, 1);
            }
            dfdz(x, dx, z, t) {
                return new matrix_1.matrix([], 0, 1);
            }
            dgdz(x, z, t) {
                return new matrix_1.matrix([1], 1, 1);
            }
            dgdx(x, z, t) {
                return new matrix_1.matrix([], 1, 0);
            }
            length_x() {
                return 1;
            }
            length_z() {
                return 1;
            }
        }
        let t0 = 0;
        let t1 = 1;
        let system = new IWeissinger();
        let solver = new rk_2.IDAE_RK4(0.01, new newton_1.NewtonSolver(20, 1e-3, 1e-5, 0.95, 3));
        let solution = solveImplicit(new vector_1.vector([Math.sqrt(3 / 2)]), new vector_1.vector([0]), t0, t1, solver, system);
        Test.showOutput(solution, ["x"], ["z"], "Implicit weissinger");
    }
    static testArenstorfOrbit(solver) {
        class ArenstorfOrbit {
            constructor() {
                this.m1 = 0.012277471;
                this.m2 = 1.0 - this.m1;
            }
            f(x, z, t) {
                let x1 = x.get(0);
                let x2 = x.get(1);
                let y1 = x.get(2);
                let y2 = x.get(3);
                let d1 = z.get(0);
                let d2 = z.get(1);
                return new vector_1.vector([
                    x2,
                    x1 + 2 * y2 - this.m2 * (x1 + this.m1) / d1 - this.m1 * (x1 - this.m2) / d2,
                    y2,
                    y1 - 2 * x2 - this.m2 * y1 / d1 - this.m1 * y1 / d2
                ]);
            }
            g(x, t) {
                let x1 = x.get(0);
                let x2 = x.get(1);
                let y1 = x.get(2);
                let y2 = x.get(3);
                return new vector_1.vector([
                    Math.pow(Math.pow(x1 + this.m1, 2) + Math.pow(y1, 2), 1.5),
                    Math.pow(Math.pow(x1 - this.m2, 2) + Math.pow(y1, 2), 1.5)
                ]);
            }
            dfdx(x, z, t) {
                let x1 = x.get(0);
                let x2 = x.get(1);
                let y1 = x.get(2);
                let y2 = x.get(3);
                let d1 = z.get(0);
                let d2 = z.get(1);
                return new matrix_1.matrix([
                    0, 1, 0, 0,
                    1 - this.m2 / d1 - this.m1 / d2, 0, 0, 2,
                    0, 0, 0, 1,
                    0, 2, 1 - this.m2 / d1 - this.m1 / d2, 0
                ], 4, 4);
            }
            dfdz(x, z, t) {
                let x1 = x.get(0);
                let x2 = x.get(1);
                let y1 = x.get(2);
                let y2 = x.get(3);
                let d1 = z.get(0);
                let d2 = z.get(1);
                return new matrix_1.matrix([
                    0, 0,
                    this.m2 * (x1 + this.m1) / (d1 * d1), this.m1 * (x1 - this.m2) / (d2 * d2),
                    0, 0,
                    this.m2 * y1 / (d1 * d1), this.m1 * y1 / (d2 * d2)
                ], 2, 4);
            }
            dgdx(x, t) {
                let x1 = x.get(0);
                let x2 = x.get(1);
                let y1 = x.get(2);
                let y2 = x.get(3);
                return new matrix_1.matrix([
                    3 * Math.pow(Math.pow(x1 + this.m1, 2) + Math.pow(y1, 2), 0.5) * (x1 + this.m1), 0, 3 * Math.pow(Math.pow(x1 + this.m1, 2) + Math.pow(y1, 2), 0.5) * y1, 0,
                    3 * Math.pow(Math.pow(x1 - this.m1, 2) + Math.pow(y1, 2), 0.5) * (x1 - this.m1), 0, 3 * Math.pow(Math.pow(x1 - this.m1, 2) + Math.pow(y1, 2), 0.5) * y1, 0
                ], 4, 2);
            }
            length_x() {
                return 4;
            }
            length_z() {
                return 2;
            }
        }
        Test.initPlot();
        let t0 = 0;
        let t1 = 17.0652165601579625588917206249;
        let system = new ArenstorfOrbit();
        const x1 = 0.994;
        const x2 = 0;
        const y1 = 0;
        const y2 = -2.00158510637908252240537862224;
        let solution = solveExplicit(new vector_1.vector([x1, x2, y1, y2]), t0, t1, solver, system);
        Test.showOutput(solution, ["x1", "x2", "y1", "y2"], ["d1", "d2"], "Arentorf");
        ui_1.ui.plot(solution.map((item) => item.x.get(2)), solution.map((item) => item.x.get(0)), "Arentorf phase");
    }
}
exports.Test = Test;


/***/ }),

/***/ "./src/test/testExpression.ts":
/*!************************************!*\
  !*** ./src/test/testExpression.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSymbolicDerivative = exports.testExpression = exports.compileTextExpression = void 0;
const index_1 = __importDefault(__webpack_require__(/*! antlr4/index */ "./node_modules/antlr4/index.js"));
const odeGrammarLexer_js_1 = __importDefault(__webpack_require__(/*! ../grammar/antlrOutput/odeGrammarLexer.js */ "./src/grammar/antlrOutput/odeGrammarLexer.js"));
const odeGrammarParser_js_1 = __importDefault(__webpack_require__(/*! ../grammar/antlrOutput/odeGrammarParser.js */ "./src/grammar/antlrOutput/odeGrammarParser.js"));
const errorListener_1 = __importDefault(__webpack_require__(/*! ../compiler/errorListener */ "./src/compiler/errorListener.ts"));
const visitor_1 = __importDefault(__webpack_require__(/*! ../compiler/visitor */ "./src/compiler/visitor.ts"));
const compilerError_1 = __webpack_require__(/*! ../compiler/compilerError */ "./src/compiler/compilerError.ts");
const expressionCompiler_1 = __webpack_require__(/*! ../compiler/expressionCompiler */ "./src/compiler/expressionCompiler.ts");
const ui_1 = __webpack_require__(/*! ../ui */ "./src/ui.ts");
const test_1 = __webpack_require__(/*! ./test */ "./src/test/test.ts");
function compileTextExpression(text) {
    let errors = [];
    var chars = new index_1.default.InputStream(text);
    var lexer = new odeGrammarLexer_js_1.default.odeGrammarLexer(chars);
    lexer.removeErrorListeners();
    var listener = new errorListener_1.default(errors);
    lexer.addErrorListener(listener);
    //@ts-ignore
    lexer.strictMode = false;
    var tokens = new index_1.default.CommonTokenStream(lexer);
    var parser = new odeGrammarParser_js_1.default.odeGrammarParser(tokens);
    parser.removeErrorListeners();
    parser.addErrorListener(listener);
    var visitor = new visitor_1.default();
    parser.buildParseTrees = true;
    var tree = parser.expression(0);
    if (errors.length > 0) {
        throw new compilerError_1.CompilerError(errors);
    }
    let expDef = visitor.startExpression(tree, listener);
    if (errors.length > 0) {
        throw new compilerError_1.CompilerError(errors);
    }
    let context = new expressionCompiler_1.ExpCompilerContext();
    context.indicies = { "t": 0 };
    context.errors = errors;
    let expression = expressionCompiler_1.compileExpression(expDef, context).simplify();
    if (errors.length > 0) {
        throw new compilerError_1.CompilerError(errors);
    }
    return expression;
}
exports.compileTextExpression = compileTextExpression;
function testExpression() {
    ui_1.ui.clearErrors();
    ui_1.ui.clearLog();
    test_1.Test.initPlot();
    //let text:string = $("#text-input").val() as string;
    let text = ui_1.ui.getText();
    let parameters = ui_1.ui.getParameters();
    let t0 = parameters.t0;
    let t1 = t0 + parameters.time;
    let dt = parameters.step;
    try {
        let expression = compileTextExpression(text);
        ui_1.ui.addLogMessage(`Function expression: ${expression.print()}`);
        test_1.plotExpression(t0, t1, dt, expression, "expression");
        ui_1.ui.openTab("results");
    }
    catch (e) {
        ui_1.handleErrors(e);
        ui_1.ui.openTab("main");
        ui_1.ui.openTab("errors-tab");
    }
}
exports.testExpression = testExpression;
function testSymbolicDerivative() {
    ui_1.ui.clearErrors();
    ui_1.ui.clearLog();
    test_1.Test.initPlot();
    //let text:string = $("#text-input").val() as string;
    let text = ui_1.ui.getText();
    let parameters = ui_1.ui.getParameters();
    let t0 = parameters.t0;
    let t1 = t0 + parameters.time;
    let dt = parameters.step;
    try {
        let expression = compileTextExpression(text);
        let derivative = expression.differentiate("t", 0.001).simplify();
        ui_1.ui.addLogMessage(`Derivative expression: ${derivative.print()}`);
        test_1.plotExpression(t0, t1, dt, expression, "expression");
        test_1.plotExpression(t0, t1, dt, derivative, "derivative");
        ui_1.ui.openTab("results");
    }
    catch (e) {
        ui_1.handleErrors(e);
        ui_1.ui.openTab("main");
        ui_1.ui.openTab("errors-tab");
    }
}
exports.testSymbolicDerivative = testSymbolicDerivative;


/***/ }),

/***/ "./src/test/testSimplification.ts":
/*!****************************************!*\
  !*** ./src/test/testSimplification.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.testSimplification = void 0;
const ui_1 = __webpack_require__(/*! ../ui */ "./src/ui.ts");
const test_1 = __webpack_require__(/*! ./test */ "./src/test/test.ts");
const douglasPeuckerSimplification_1 = __webpack_require__(/*! ../curveSimplification/douglasPeuckerSimplification */ "./src/curveSimplification/douglasPeuckerSimplification.ts");
const perpendicularDistanceSimplification_1 = __webpack_require__(/*! ../curveSimplification/perpendicularDistanceSimplification */ "./src/curveSimplification/perpendicularDistanceSimplification.ts");
const maxPointsSimplification_1 = __webpack_require__(/*! ../curveSimplification/maxPointsSimplification */ "./src/curveSimplification/maxPointsSimplification.ts");
const radialDistanceSimplification_1 = __webpack_require__(/*! ../curveSimplification/radialDistanceSimplification */ "./src/curveSimplification/radialDistanceSimplification.ts");
const langSimplification_1 = __webpack_require__(/*! ../curveSimplification/langSimplification */ "./src/curveSimplification/langSimplification.ts");
const reumannWitkamSimplification_1 = __webpack_require__(/*! ../curveSimplification/reumannWitkamSimplification */ "./src/curveSimplification/reumannWitkamSimplification.ts");
const opheimSimplification_1 = __webpack_require__(/*! ../curveSimplification/opheimSimplification */ "./src/curveSimplification/opheimSimplification.ts");
const douglasPeuckerNSimplification_1 = __webpack_require__(/*! ../curveSimplification/douglasPeuckerNSimplification */ "./src/curveSimplification/douglasPeuckerNSimplification.ts");
const nthPointSimplification_1 = __webpack_require__(/*! ../curveSimplification/nthPointSimplification */ "./src/curveSimplification/nthPointSimplification.ts");
const daeVector_1 = __webpack_require__(/*! ../dae/daeVector */ "./src/dae/daeVector.ts");
const vector_1 = __webpack_require__(/*! ../math/vector */ "./src/math/vector.ts");
const testExpression_1 = __webpack_require__(/*! ./testExpression */ "./src/test/testExpression.ts");
function testSimplification() {
    ui_1.ui.clearErrors();
    ui_1.ui.clearLog();
    test_1.Test.initPlot();
    let parameters = ui_1.ui.getParameters();
    let methods = [
        { alg: new douglasPeuckerSimplification_1.DouglasPeuckerSimplification(parameters["simp-tol"]), name: "douglasPeucker" },
        { alg: new perpendicularDistanceSimplification_1.PerpendicularDistanceSimplification(parameters["simp-tol"]), name: "perpDist" },
        { alg: new maxPointsSimplification_1.MaxPointsSimplification(parameters["simp-max-points"]), name: "maxPoints" },
        { alg: new radialDistanceSimplification_1.RadialDistanceSimplification(parameters["simp-tol"]), name: "radDist" },
        { alg: new langSimplification_1.LangSimplification(parameters["simp-tol"], parameters["simp-look-ahead"]), name: "lang" },
        { alg: new reumannWitkamSimplification_1.ReumannWitkamSimplification(parameters["simp-tol"]), name: "reumannWitkam" },
        { alg: new opheimSimplification_1.OpheimSimplification(parameters["simp-tol"], parameters["simp-max-tol"]), name: "opheim" },
        { alg: new douglasPeuckerNSimplification_1.DouglasPeuckerNSimplification(parameters["simp-max-points"]), name: "douglasPeuckerN" },
        { alg: new nthPointSimplification_1.NthPointSimplification(parameters["simp-nth-point"]), name: "Nth point simplification" }
    ];
    try {
        let text = ui_1.ui.getText();
        let expression = testExpression_1.compileTextExpression(text);
        ui_1.ui.addLogMessage(`Function expression: ${expression.print()}`);
        let data = [];
        for (let i = 0; i < 1000; i++) {
            let t = i * 0.01;
            let x = expression.execute([t]);
            //let x = Math.cos(t*6.0)*Math.exp(-2.*t);
            data.push(new daeVector_1.DAEVector(new vector_1.vector([x]), new vector_1.vector([]), t));
        }
        test_1.Test.showOutput(data, ["t"], [], "f(x) output");
        for (let i = 0; i < methods.length; i++) {
            let res = methods[i].alg.simplify(data);
            test_1.Test.showOutput(res, ["t"], [], methods[i].name);
            ui_1.ui.addLogMessage(`${methods[i].name}: ${res.length} points`);
        }
        ui_1.ui.openTab("results");
    }
    catch (e) {
        ui_1.handleErrors(e);
        ui_1.ui.openTab("main");
        ui_1.ui.openTab("errors-tab");
    }
}
exports.testSimplification = testSimplification;


/***/ }),

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ui = exports.handleErrors = void 0;
const examples_1 = __webpack_require__(/*! ./examples */ "./src/examples.ts");
const jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"));
const edaeHybridSolver_1 = __webpack_require__(/*! ./dae/edaeHybridSolver */ "./src/dae/edaeHybridSolver.ts");
const idaeHybridSolver_1 = __webpack_require__(/*! ./dae/idaeHybridSolver */ "./src/dae/idaeHybridSolver.ts");
const hybridCompiler_1 = __webpack_require__(/*! ./compiler/hybridCompiler */ "./src/compiler/hybridCompiler.ts");
const compilerError_1 = __webpack_require__(/*! ./compiler/compilerError */ "./src/compiler/compilerError.ts");
const eventDetection_1 = __webpack_require__(/*! ./dae/eventDetection */ "./src/dae/eventDetection.ts");
const adaptiveStep_1 = __webpack_require__(/*! ./dae/adaptiveStep */ "./src/dae/adaptiveStep.ts");
const astNode_1 = __webpack_require__(/*! ./compiler/astNode */ "./src/compiler/astNode.ts");
const daeMethods_1 = __webpack_require__(/*! ./daeMethods */ "./src/daeMethods.ts");
const testSimplification_1 = __webpack_require__(/*! ./test/testSimplification */ "./src/test/testSimplification.ts");
const testExpression_1 = __webpack_require__(/*! ./test/testExpression */ "./src/test/testExpression.ts");
const testEquations_1 = __webpack_require__(/*! ./test/testEquations */ "./src/test/testEquations.ts");
const simplificationMethods_1 = __webpack_require__(/*! ./simplificationMethods */ "./src/simplificationMethods.ts");
const test_1 = __webpack_require__(/*! ./test/test */ "./src/test/test.ts");
var Ace = __webpack_require__(/*! ace-builds/src-noconflict/ace */ "./node_modules/ace-builds/src-noconflict/ace.js");
var Mode = __webpack_require__(/*! ./editor/mode */ "./src/editor/mode.ts").Mode;
var _Range = Ace.require("ace/range").Range;
__webpack_require__(/*! ace-builds/src-noconflict/ext-language_tools */ "./node_modules/ace-builds/src-noconflict/ext-language_tools.js");
var editor = Ace.edit("editor");
var theme = __webpack_require__(/*! ace-builds/src-noconflict/theme-monokai */ "./node_modules/ace-builds/src-noconflict/theme-monokai.js");
editor.setTheme(theme);
editor.session.setMode(new Mode());
editor.setOption("enableBasicAutocompletion", true);
function handleErrors(e) {
    if (e instanceof compilerError_1.CompilerError) {
        e.messages.forEach(function (item) {
            exports.ui.addLogMessage(item.print());
            exports.ui.addErrorMessage(item.message, item.textPos);
            console.log(item.print());
        });
    }
    else if (e instanceof Error) {
        exports.ui.addLogMessage(e.message);
        exports.ui.addErrorMessage(e.message, astNode_1.TextPosition.invalid());
        console.log(e.message);
    }
    else {
        exports.ui.addLogMessage("Exception: " + e);
        exports.ui.addErrorMessage("Exception: " + e, astNode_1.TextPosition.invalid());
    }
}
exports.handleErrors = handleErrors;
//tabs init
exports.ui = {
    isResultsTab: false,
    methods: daeMethods_1.methods,
    initPlot: function () {
        var layout = {
            title: 'Result',
            type: "scattergl",
            width: jquery_1.default("#plot-area").width(),
            height: jquery_1.default("#plot-area").height(),
            paper_bgcolor: 'rgba(245,245,245,1)',
            plot_bgcolor: 'rgba(245,245,245,1)',
            nticks: 30
        };
        //@ts-ignore
        Plotly.newPlot('plot-area', [], layout, { responsive: true });
    },
    showDebug: function () {
        jquery_1.default("#debug").css("display", "block");
    },
    hideDebug: function () {
        jquery_1.default("#debug").css("display", "none");
    },
    init: function () {
        editor.setValue(`//stiff equation
const x0 = 0;
const a = -21;
const c1 = x0 + 1/(a + 1);

x' = a*x+exp(-t);
z = c1 * exp(a*t) - exp(-t)/(a+1);//analytical solution
x(t0) = x0;`);
        editor.selection.setSelectionRange(new _Range(0, 0, 0, 0));
        //init debug
        jquery_1.default("#debug").append('<button class="button" id="debug-hide">Hide</button>');
        jquery_1.default("#debug-hide").on("click", exports.ui.hideDebug);
        jquery_1.default("#debug").append('<button class="button" id="simplification-test">Test simplification</button>');
        jquery_1.default("#debug").append('<button class="button" id="simplification-eq">Test equations</button>');
        jquery_1.default("#debug").append('<button class="button" id="simplification-exp">Test expression</button>');
        jquery_1.default("#debug").append('<button class="button" id="simplification-der">Test symbolic derivative</button>');
        jquery_1.default("#debug").append('<button class="button" id="edae-test">Test EDAE</button>');
        jquery_1.default("#debug").append('<button class="button" id="idae-test">Test IDAE</button>');
        jquery_1.default("#debug").append('<button class="button" id="e-hybrid-test">Test Explicit Hybrid</button>');
        jquery_1.default("#debug").append('<button class="button" id="i-hybrid-test">Test Implicit Hybrid</button>');
        jquery_1.default('#simplification-test').on("click", testSimplification_1.testSimplification);
        jquery_1.default('#simplification-eq').on("click", testEquations_1.testEquations);
        jquery_1.default('#simplification-exp').on("click", testExpression_1.testExpression);
        jquery_1.default('#simplification-der').on("click", testExpression_1.testSymbolicDerivative);
        jquery_1.default('#edae-test').on("click", test_1.Test.testEDAECompiler);
        jquery_1.default('#idae-test').on("click", test_1.Test.testIDAECompiler);
        jquery_1.default('#e-hybrid-test').on("click", test_1.Test.testExplicitHybridCompiler);
        jquery_1.default('#i-hybrid-test').on("click", test_1.Test.testImplicitHybridCompiler);
        jquery_1.default("#run-button").on("click", exports.ui.run);
        jquery_1.default("#export-button").on("click", exports.ui.run);
        jquery_1.default('*[data-role="tab"]').on("click", function (e) {
            exports.ui.openTab(jquery_1.default(e.target).data("tab"));
        });
        let examplesContainer = jquery_1.default('#examples-dae');
        Object.entries(examples_1.examples.dae).forEach(function ([key, value]) {
            examplesContainer.append(`<div><button data-key="${key}" class="example-button dae button">${value.name}</button>
            </div>`);
        });
        examplesContainer = jquery_1.default('#examples-hybrid');
        Object.entries(examples_1.examples.hybrid).forEach(function ([key, value]) {
            examplesContainer.append(`<div><button data-key="${key}" class="example-button hybrid button">${value.name}</button>
            </div>`);
        });
        jquery_1.default('.example-button.dae').on("click", function (e) {
            exports.ui.loadDaeExample(jquery_1.default(this).data("key"));
        });
        jquery_1.default('.example-button.hybrid').on("click", function (e) {
            exports.ui.loadHybridExample(jquery_1.default(this).data("key"));
        });
        let stepControl = jquery_1.default('#step-control');
        let stepSolver = jquery_1.default('#step-solver');
        let systemSolver = jquery_1.default('#system-solver');
        let adaptive = jquery_1.default('#adaptive-step-params');
        let zeroCrossing = jquery_1.default('#zero-crossing-params');
        let simplification = jquery_1.default('#simplification-params');
        let simplificationMethod = jquery_1.default('#simp-method');
        let maxPointsParam = jquery_1.default('#simp-max-points-param');
        let tolParam = jquery_1.default('#simp-tol-param');
        let lookaheadParam = jquery_1.default('#simp-look-ahead-param');
        let simpMaxTol = jquery_1.default('#simp-max-tol-param');
        let nthPointParam = jquery_1.default('#simp-nth-point');
        jquery_1.default('#dae-form').on("change", function () {
            if (jquery_1.default(this).val() == "explicit")
                systemSolver.attr("disabled", "disabled");
            else
                systemSolver.attr("disabled", null);
        });
        jquery_1.default('#dae-form').trigger("change");
        let explicitMethods = jquery_1.default("#explicitMethods");
        let implicitMethods = jquery_1.default("#implicitMethods");
        //init methods select element
        Object.entries(daeMethods_1.methods).forEach(function ([key, item]) {
            let el = `<option value="${key}">${item.name}</option>`;
            if (item.implicit) {
                implicitMethods.append(el);
            }
            else {
                explicitMethods.append(el);
            }
        });
        jquery_1.default('#dae-method').on("change", function () {
            if (daeMethods_1.methods[jquery_1.default(this).val()].autostep == true)
                stepControl.attr("disabled", null);
            else
                stepControl.attr("disabled", "disabled");
            if (daeMethods_1.methods[jquery_1.default(this).val()].implicit == true)
                stepSolver.attr("disabled", null);
            else
                stepSolver.attr("disabled", "disabled");
        });
        jquery_1.default("#dae-method").val(Object.keys(daeMethods_1.methods)[0]).trigger("change");
        jquery_1.default('#adaptive-step').on("change", function () {
            if (jquery_1.default(this).prop("checked")) {
                adaptive.attr("disabled", null);
            }
            else {
                adaptive.attr("disabled", "disabled");
            }
        });
        jquery_1.default('#adaptive-step').trigger("change");
        jquery_1.default('#zero-crossing').on("change", function () {
            if (jquery_1.default(this).prop("checked")) {
                zeroCrossing.attr("disabled", null);
            }
            else {
                zeroCrossing.attr("disabled", "disabled");
            }
        });
        jquery_1.default('#zero-crossing').trigger("change");
        jquery_1.default('#simplification').on("change", function () {
            if (jquery_1.default(this).prop("checked")) {
                simplification.attr("disabled", null);
            }
            else {
                simplification.attr("disabled", "disabled");
            }
        });
        jquery_1.default('#simplification').trigger("change");
        jquery_1.default('#simp-method').on("change", function () {
            lookaheadParam.attr("disabled", "disabled");
            maxPointsParam.attr("disabled", "disabled");
            simpMaxTol.attr("disabled", "disabled");
            nthPointParam.attr("disabled", "disabled");
            tolParam.attr("disabled", "disabled");
            switch (jquery_1.default(this).val()) {
                case "lang":
                    lookaheadParam.attr("disabled", null);
                    break;
                case "nth-point":
                    nthPointParam.attr("disabled", null);
                    break;
                case "opheim":
                    simpMaxTol.attr("disabled", null);
                case "reumann":
                case "douglas-peucker":
                case "radial-distance":
                case "perp-distance":
                    tolParam.attr("disabled", null);
                    break;
                case "douglas-peucker-n":
                    maxPointsParam.attr("disabled", null);
                case "max-points":
                    maxPointsParam.attr("disabled", null);
                    break;
            }
        });
        jquery_1.default('#simp-method').trigger("change");
    },
    getParameters: function () {
        return {
            "dae-form": jquery_1.default("#dae-form").val(),
            "dae-method": jquery_1.default("#dae-method").val(),
            "step": parseFloat(jquery_1.default("#step").val()) * 1e-3,
            "t0": parseFloat(jquery_1.default("#t0").val()),
            "time": parseFloat(jquery_1.default("#time").val()),
            "min-step": parseFloat(jquery_1.default("#min-step").val()) * 1e-3,
            "step-err-tol": parseFloat(jquery_1.default("#step-err-tol").val()) * 1e-3,
            "step-solver-iters": parseFloat(jquery_1.default("#step-solver-iters").val()),
            "step-solver-min-iters": parseFloat(jquery_1.default("#step-solver-min-iters").val()),
            "step-solver-abs-tol": parseFloat(jquery_1.default("#step-solver-abs-tol").val()) * 1e-3,
            "step-solver-rel-tol": parseFloat(jquery_1.default("#step-solver-rel-tol").val()) * 1e-3,
            "step-solver-alpha": parseFloat(jquery_1.default("#step-solver-alpha").val()),
            "sys-solver-iters": parseFloat(jquery_1.default("#sys-solver-iters").val()),
            "sys-solver-min-iters": parseFloat(jquery_1.default("#sys-solver-min-iters").val()),
            "sys-solver-abs-tol": parseFloat(jquery_1.default("#sys-solver-abs-tol").val()) * 1e-3,
            "sys-solver-rel-tol": parseFloat(jquery_1.default("#sys-solver-rel-tol").val()) * 1e-3,
            "sys-solver-alpha": parseFloat(jquery_1.default("#sys-solver-alpha").val()),
            "zc-border-tol": parseFloat(jquery_1.default("#zc-border-tol").val()) * 1e-3,
            "adaptive-step": jquery_1.default("#adaptive-step").prop("checked"),
            "adaptive-min-step": parseFloat(jquery_1.default("#adaptive-min-step").val()) * 1e-3,
            "adaptive-step-gamma": parseFloat(jquery_1.default("#adaptive-step-gamma").val()),
            "zero-crossing": jquery_1.default("#zero-crossing").prop("checked"),
            "zc-newton-iters": parseInt(jquery_1.default("#zc-newton-iters").val()),
            "zc-newton-alpha": parseFloat(jquery_1.default("#zc-newton-alpha").val()),
            "zc-abs-tol": parseFloat(jquery_1.default("#zc-abs-tol").val()) * 1e-3,
            "zc-rel-tol": parseFloat(jquery_1.default("#zc-rel-tol").val()) * 1e-3,
            "zc-bisect-iters": parseInt(jquery_1.default("#zc-bisect-iters").val()),
            "zc-time-abs-tol": parseFloat(jquery_1.default("#zc-time-abs-tol").val()) * 1e-3,
            "zc-time-rel-tol": parseFloat(jquery_1.default("#zc-time-rel-tol").val()) * 1e-3,
            "simplification": jquery_1.default("#simplification").prop("checked"),
            "simp-method": jquery_1.default("#simp-method").val(),
            "simp-max-points": parseInt(jquery_1.default("#simp-max-points").val()),
            "simp-tol": parseFloat(jquery_1.default("#simp-tol").val()) * 1e-3,
            "simp-look-ahead": parseFloat(jquery_1.default("#simp-look-ahead").val()) * 1e-3,
            "simp-nth-point": parseInt(jquery_1.default("#simp-nth-point").val()),
            "simp-max-tol": parseInt(jquery_1.default("#simp-max-tol").val()) * 1e-3
        };
    },
    openTab: function (tabId) {
        let target = jquery_1.default('[data-role="tab"][data-tab="' + tabId + '"]');
        let parentId = target.data("parent");
        let parent = jquery_1.default('#' + parentId);
        jquery_1.default('[data-role="tab-item"][data-parent="' + parentId + '"').removeClass("show");
        jquery_1.default('[data-role="tab"][data-parent="' + parentId + '"').removeClass("active");
        target.addClass("active");
        jquery_1.default('#' + tabId).addClass("show");
        if (tabId == "results") {
            exports.ui.isResultsTab = true;
            //@ts-ignore
            Plotly.relayout('plot-area', {
                width: jquery_1.default("#plot-area").width(),
                height: jquery_1.default("#plot-area").height()
            });
        }
        else {
            exports.ui.isResultsTab = false;
        }
    },
    setParameters(parameters) {
        Object.entries(parameters).forEach(function ([key, entry]) {
            if (typeof entry === "boolean") {
                jquery_1.default(`#${key}`).prop("checked", entry == true ? "checked" : null).trigger("change");
                //$(`#${key}`).val(entry==true?"on":"off").trigger("change");
            }
            else
                jquery_1.default(`#${key}`).val(entry).trigger("change");
        });
    },
    loadDaeExample: function (exampleId) {
        let example = examples_1.examples.dae[exampleId];
        editor.setValue(example.model);
        exports.ui.setParameters(example.parameters);
        editor.selection.setSelectionRange(new _Range(0, 0, 0, 0));
        //$('#text-input').val(examples.dae[exampleId].text);
    },
    loadHybridExample: function (exampleId) {
        let example = examples_1.examples.hybrid[exampleId];
        editor.setValue(example.model);
        exports.ui.setParameters(example.parameters);
        editor.selection.setSelectionRange(new _Range(0, 0, 0, 0));
        //$('#text-input').val(examples.hybrid[exampleId].text);
    },
    clearLog: function () {
        jquery_1.default('#log-area').empty();
    },
    clearErrors: function () {
        jquery_1.default('#error-list').empty();
    },
    addErrorMessage: function (message, textPos) {
        jquery_1.default('#error-list').append(`<div class="errors-row${textPos.line == -1 ? "" : " clickable"}" data-line="${textPos.line}" data-column="${textPos.column}" data-start="${textPos.start}" data-stop="${textPos.stop}">
        <div class="errors-cell">${textPos.line == -1 ? "" : textPos.line}</div>
        <div class="errors-cell">${textPos.line == -1 ? "" : textPos.column}</div>
        <div class="errors-cell">${message}</div>
        </div>`);
        if (textPos.line != -1)
            jquery_1.default('#error-list').children().last().on("click", exports.ui.onClickErrorMessage);
    },
    setCursor(line, position) {
        let elem = jquery_1.default("#text-input")[0];
        let row = 1;
        let pos = 0;
        while (row < line) {
            let lineEnd = elem.value.indexOf("\n", pos);
            if (lineEnd == -1) {
                return;
            }
            row++;
            pos = lineEnd + 1;
        }
        let lineEnd = elem.value.indexOf("\n", pos);
        lineEnd = (lineEnd == -1 ? elem.value.length : lineEnd);
        pos = Math.min(lineEnd, pos + position);
        elem.focus();
        elem.setSelectionRange(pos, pos + 1);
    },
    onClickErrorMessage: function () {
        let line = parseInt(jquery_1.default(this).data("line")) - 1;
        let column = parseInt(jquery_1.default(this).data("column"));
        let start = parseInt(jquery_1.default(this).data("start"));
        let stop = parseInt(jquery_1.default(this).data("stop"));
        editor.selection.setSelectionRange(new _Range(line, column, line, column + (stop - start)));
        /*if(start == -1){
            ui.setCursor(line,column);
        }else{
            let elem = $("#text-input")[0] as HTMLTextAreaElement;
            elem.focus();
            elem.setSelectionRange(start,stop);
        }*/
    },
    addLogMessage: function (message) {
        let logArea = jquery_1.default('#log-area');
        let childs = logArea.children();
        let i = 0;
        while (childs.length > 15 + i) {
            childs[i].remove();
            i++;
        }
        let date = new Date();
        const ss = String(date.getSeconds() + 1).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        logArea.append(`<div class="log-message">[${hh}:${mm}:${ss}]: ${message}</div>`);
        var mydiv = jquery_1.default("#scroll");
        logArea.scrollTop(logArea.prop("scrollHeight"));
    },
    registerMethods: function (methods) {
        let explicit = jquery_1.default("#dae-method").append('<optgroup label="Explicit methods"></optgroup>');
        methods.explicit.forEach(function (item) {
            explicit.append(`<option value="${item.id}">${item.name}</option>`);
        });
        let implicit = jquery_1.default("#dae-method").append('<optgroup label="Implicit methods"></optgroup>');
        methods.implicit.forEach(function (item) {
            implicit.append(`<option value="${item.id}">${item.name}</option>`);
        });
    },
    plotSolution: function (solution, x, z) {
        let data = [];
        let t = [];
        let xTraces = [];
        let zTraces = [];
        data.push({ x: solution.stateSwitches, y: solution.states, type: "scattergl", mode: 'markers+lines', name: "State",
            line: { shape: 'hv' }, });
        x.forEach(function (item) {
            xTraces.push({ x: t, y: [], type: "scattergl", mode: 'markers+lines', name: item });
        });
        z.forEach(function (item) {
            zTraces.push({ x: t, y: [], type: "scattergl", mode: 'markers+lines', name: item });
        });
        solution.values.forEach(function (value, index) {
            t.push(value.t);
            xTraces.forEach(function (item, id) {
                item.y.push(value.x.get(id));
            });
            zTraces.forEach(function (item, id) {
                item.y.push(value.z.get(id));
            });
        });
        xTraces.forEach(function (item) {
            data.push(item);
        });
        zTraces.forEach(function (item) {
            data.push(item);
        });
        //@ts-ignore
        Plotly.addTraces('plot-area', data);
    },
    plot: function (x, t, label) {
        let data = [];
        let trace = {
            x: t,
            y: x,
            type: "scattergl",
            mode: 'markers+lines',
            name: label
        };
        data.push(trace);
        //@ts-ignore
        Plotly.addTraces('plot-area', data);
    },
    export: function () {
        throw new Error("Not implemented");
    },
    getText: function () {
        return editor.getValue();
    },
    getEdaeSolver: function (parameters) {
        let eventDetection;
        if (parameters["zero-crossing"]) {
            eventDetection = new eventDetection_1.EventDetectionComplex(parameters["zc-newton-iters"], parameters["zc-rel-tol"], parameters["zc-abs-tol"], parameters["zc-newton-alpha"], parameters["zc-bisect-iters"], parameters["zc-time-abs-tol"], parameters["zc-time-rel-tol"]);
        }
        else {
            eventDetection = new eventDetection_1.EventDetectionSimple();
        }
        let adaptiveStepStrategy;
        if (parameters["adaptive-step"]) {
            adaptiveStepStrategy = new adaptiveStep_1.AdaptiveStepNewton(parameters["adaptive-step-gamma"], parameters["adaptive-min-step"]);
        }
        else {
            adaptiveStepStrategy = null;
        }
        return new edaeHybridSolver_1.EDAEHybridSolver(eventDetection, adaptiveStepStrategy);
    },
    getIdaeSolver: function (parameters) {
        let eventDetection;
        if (parameters["zero-crossing"]) {
            eventDetection = new eventDetection_1.EventDetectionComplex(parameters["zc-newton-iters"], parameters["zc-rel-tol"], parameters["zc-abs-tol"], parameters["zc-newton-alpha"], parameters["zc-bisect-iters"], parameters["zc-time-abs-tol"], parameters["zc-time-rel-tol"]);
        }
        else {
            eventDetection = new eventDetection_1.EventDetectionSimple();
        }
        let adaptiveStepStrategy;
        if (parameters["adaptive-step"]) {
            adaptiveStepStrategy = new adaptiveStep_1.AdaptiveStepNewton(parameters["adaptive-step-gamma"], parameters["adaptive-min-step"]);
        }
        else {
            adaptiveStepStrategy = null;
        }
        return new idaeHybridSolver_1.IDAEHybridSolver(eventDetection, adaptiveStepStrategy);
    },
    run: function () {
        let parameters = exports.ui.getParameters();
        //let daeSolver:EDAESolver = methods[parameters["dae-method"]].edaeInit(parameters);
        //Test.testWeissingerImplicit();
        //Test.testArenstorfOrbit(daeSolver);
        //Test.testSimplification();
        //Test.runTests();
        //return;
        //throw new Error("Not implemented");
        exports.ui.clearErrors();
        exports.ui.initPlot();
        let text = exports.ui.getText();
        try {
            let compiler = new hybridCompiler_1.HybridSystemCompiler(parameters["zc-border-tol"]);
            let solution;
            let x;
            let z;
            if (parameters["dae-form"] == "explicit") {
                let sysDef = compiler.compileExplicit(text);
                let daeSolver = daeMethods_1.methods[parameters["dae-method"]].edaeInit(parameters);
                let solver = exports.ui.getEdaeSolver(parameters);
                solution = solver.solve(sysDef.x0, parameters.t0, parameters.t0 + parameters.time, daeSolver, sysDef.system);
                x = sysDef.x;
                z = sysDef.z;
            }
            else {
                let sysDef = compiler.compileImplicit(text);
                let daeSolver = daeMethods_1.methods[parameters["dae-method"]].idaeInit(parameters);
                let solver = exports.ui.getIdaeSolver(parameters);
                solution = solver.solve(sysDef.x0, sysDef.z0, parameters.t0, parameters.t0 + parameters.time, daeSolver, sysDef.system);
                x = sysDef.x;
                z = sysDef.z;
            }
            if (parameters.simplification) {
                let simplification = simplificationMethods_1.simpMethods[parameters["simp-method"]](parameters);
                solution.values = simplification.simplify(solution.values);
            }
            exports.ui.addLogMessage(`Steps: ${solution.statistics.steps}`);
            exports.ui.addLogMessage(`Min step: ${solution.statistics.minStep}`);
            exports.ui.addLogMessage(`Max step: ${solution.statistics.maxStep}`);
            exports.ui.addLogMessage(`State changes: ${solution.statistics.statesSwitched}`);
            exports.ui.plotSolution(solution, x, z);
            exports.ui.openTab("results");
        }
        catch (e) {
            handleErrors(e);
            exports.ui.openTab("main");
            exports.ui.openTab("errors-tab");
        }
    }
};


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdC90ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy90ZXN0L3Rlc3RFeHByZXNzaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy90ZXN0L3Rlc3RTaW1wbGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1HQUE2RTtBQUM3RSx5R0FBa0c7QUFDbEcsMEZBQTJDO0FBQzNDLCtHQUEwRTtBQUMxRSwrR0FBMEU7QUFDMUUsK0dBQTJEO0FBQzNELCtHQUEyRDtBQUszRCxtRkFBd0M7QUFDeEMsbUZBQXdDO0FBS3hDLHdHQUdtQztBQUNuQyw0R0FBdUI7QUFHdkIsK0ZBcUI2QztBQUM3QywrRkFzQm9DO0FBNkJwQyxzSUFNNkM7QUFDN0Msc0lBTTZDO0FBQzdDLG1GQUE4QztBQUM5Qyw2REFBd0M7QUFDeEMsaUdBQW1EO0FBRW5ELG1IQUFrRTtBQU1sRSxTQUFTLGFBQWEsQ0FBQyxFQUFTLEVBQUMsRUFBUyxFQUFDLEVBQVMsRUFBQyxNQUFpQixFQUFDLE1BQWlCO0lBQ3BGLElBQUksUUFBUSxHQUFlLEVBQUUsQ0FBQztJQUM5QixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUN6QixJQUFJLEtBQUssR0FBYSxJQUFJLHFCQUFTLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsSUFBRSxFQUFFLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUM7UUFDM0IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEtB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bEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxJQUFJLGVBQU0sQ0FBQztvQkFDZCxFQUFFO29CQUNGLEVBQUUsR0FBRyxDQUFDLEdBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUMsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFO29CQUMzRCxFQUFFO29CQUNGLEVBQUUsR0FBRyxDQUFDLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFO2lCQUMxQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsQ0FBQyxDQUFDLENBQVEsRUFBQyxDQUFRO2dCQUNmLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxlQUFNLENBQUM7b0JBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQztpQkFDdEQsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFRLEVBQUMsQ0FBUSxFQUFDLENBQVE7Z0JBQzNCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxlQUFNLENBQ2I7b0JBQ0ksQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztvQkFDUCxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29CQUM3QixDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO29CQUNQLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxFQUFFLEdBQUMsRUFBRSxFQUFDLENBQUM7aUJBQ2hDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFRLEVBQUMsQ0FBUSxFQUFDLENBQVE7Z0JBQzNCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxlQUFNLENBQUM7b0JBQ2QsQ0FBQyxFQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO29CQUN6RCxDQUFDLEVBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7aUJBQ3hDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFRLEVBQUMsQ0FBUTtnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxJQUFJLGVBQU0sQ0FBQztvQkFDZCxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQztvQkFDL0gsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBQyxH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eWJyaWRTdGF0ZUxpbmsgfSBmcm9tIFwiLi4vZGFlL2h5YnJpZFN0YXRlTGlua1wiO1xyXG5pbXBvcnQge0FkYXB0aXZlU3RlcE5ld3RvbiwgQWRhcHRpdmVTdGVwU3RyYXRlZ3l9IGZyb20gXCIuLi9kYWUvYWRhcHRpdmVTdGVwXCI7XHJcbmltcG9ydCB7RXZlbnREZXRlY3Rpb25Db21wbGV4LCBFdmVudERldGVjdGlvblNpbXBsZSwgRXZlbnREZXRlY3Rpb259IGZyb20gXCIuLi9kYWUvZXZlbnREZXRlY3Rpb25cIjtcclxuaW1wb3J0IHtEQUVWZWN0b3J9IGZyb20gXCIuLi9kYWUvZGFlVmVjdG9yXCI7XHJcbmltcG9ydCB7SURBRUh5YnJpZFN5c3RlbSwgSURBRUh5YnJpZFN0YXRlfSBmcm9tIFwiLi4vZGFlL2lkYWVIeWJyaWRTeXN0ZW1cIjtcclxuaW1wb3J0IHtFREFFSHlicmlkU3lzdGVtLCBFREFFSHlicmlkU3RhdGV9IGZyb20gXCIuLi9kYWUvZWRhZUh5YnJpZFN5c3RlbVwiO1xyXG5pbXBvcnQgeyBFREFFSHlicmlkU29sdmVyIH0gZnJvbSBcIi4uL2RhZS9lZGFlSHlicmlkU29sdmVyXCI7XHJcbmltcG9ydCB7IElEQUVIeWJyaWRTb2x2ZXIgfSBmcm9tIFwiLi4vZGFlL2lkYWVIeWJyaWRTb2x2ZXJcIjtcclxuaW1wb3J0IHsgRURBRVNvbHZlciB9IGZyb20gXCIuLi9kYWUvZWRhZVNvbHZlclwiO1xyXG5pbXBvcnQgeyBJREFFU29sdmVyIH0gZnJvbSBcIi4uL2RhZS9pZGFlU29sdmVyXCI7XHJcbmltcG9ydCB7IEVEQUVTeXN0ZW0gfSBmcm9tIFwiLi4vZGFlL2VkYWVTeXN0ZW1cIjtcclxuaW1wb3J0IHsgSURBRVN5c3RlbSB9IGZyb20gXCIuLi9kYWUvaWRhZVN5c3RlbVwiO1xyXG5pbXBvcnQgeyB2ZWN0b3IgfSBmcm9tIFwiLi4vbWF0aC92ZWN0b3JcIjtcclxuaW1wb3J0IHsgbWF0cml4IH0gZnJvbSBcIi4uL21hdGgvbWF0cml4XCI7XHJcbmltcG9ydCB7IFxyXG4gICAgRURBRV9FRXVsZXIsIFxyXG4gICAgRURBRV9JRXVsZXJcclxufSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvZWRhZS9ldWxlclwiO1xyXG5pbXBvcnQgeyBcclxuICAgIElEQUVfRUV1bGVyLFxyXG4gICAgSURBRV9JRXVsZXIgXHJcbn0gZnJvbSBcIi4uL2RhZS9zb2x2ZXJzL2lkYWUvZXVsZXJcIjtcclxuaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xyXG5pbXBvcnQgeyBFREFFX0lNaWRwb2ludCwgRURBRV9FTWlkcG9pbnQgfSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvZWRhZS9taWRwb2ludFwiO1xyXG5pbXBvcnQgeyBFREFFX0VUcmFwZXpvaWRhbCwgRURBRV9JVHJhcGV6b2lkYWwgfSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvZWRhZS90cmFwZXpvaWRhbFwiO1xyXG5pbXBvcnQgeyBcclxuICAgIEVEQUVfUks0LCBcclxuICAgIEVEQUVfUks0XzIsXHJcbiAgICBFREFFX1JLNF9SQUxTVE9OLFxyXG4gICAgRURBRV9ET1BSSTUsIFxyXG4gICAgRURBRV9SQURBVUlBNSwgXHJcbiAgICBFREFFX0JTMjMsIFxyXG4gICAgRURBRV9MT0JBVFRPSUlJQTIsIFxyXG4gICAgRURBRV9MT0JBVFRPSUlJQTQsIFxyXG4gICAgRURBRV9MT0JBVFRPSUlJQjIsIFxyXG4gICAgRURBRV9MT0JBVFRPSUlJQjQsIFxyXG4gICAgRURBRV9MT0JBVFRPSUlJQzIsIFxyXG4gICAgRURBRV9MT0JBVFRPSUlJQzQsIFxyXG4gICAgRURBRV9SQURBVUlJQTMsIFxyXG4gICAgRURBRV9SQURBVUlJQTUsIFxyXG4gICAgRURBRV9HQVVTU0xFR0VORFJFNCwgXHJcbiAgICBFREFFX0dBVVNTTEVHRU5EUkU2LFxyXG4gICAgRURBRV9IZXVuRXVsZXIsIFxyXG4gICAgRURBRV9NaWRwb2ludEV1bGVyLCBcclxuICAgIEVEQUVfUks2LCBcclxuICAgIEVEQUVfUks2XzIsIFxyXG4gICAgRURBRV9SSzggfSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvZWRhZS9ya1wiO1xyXG5pbXBvcnR7XHJcbiAgICBJREFFX1JLNCxcclxuICAgIElEQUVfUks0XzIsXHJcbiAgICBJREFFX1JLNF9SQUxTVE9OLFxyXG4gICAgSURBRV9ET1BSSTUsIFxyXG4gICAgSURBRV9SQURBVUlBNSwgXHJcbiAgICBJREFFX0JTMjMsIFxyXG4gICAgSURBRV9MT0JBVFRPSUlJQTIsIFxyXG4gICAgSURBRV9MT0JBVFRPSUlJQTQsIFxyXG4gICAgSURBRV9MT0JBVFRPSUlJQjIsIFxyXG4gICAgSURBRV9MT0JBVFRPSUlJQjQsIFxyXG4gICAgSURBRV9MT0JBVFRPSUlJQzIsIFxyXG4gICAgSURBRV9MT0JBVFRPSUlJQzQsIFxyXG4gICAgSURBRV9SQURBVUlJQTMsIFxyXG4gICAgSURBRV9SQURBVUlJQTUsIFxyXG4gICAgSURBRV9HQVVTU0xFR0VORFJFNCwgXHJcbiAgICBJREFFX0dBVVNTTEVHRU5EUkU2LFxyXG4gICAgSURBRV9IZXVuRXVsZXIsIFxyXG4gICAgSURBRV9NaWRwb2ludEV1bGVyLCBcclxuICAgIElEQUVfUks2LCBcclxuICAgIElEQUVfUks2XzIsIFxyXG4gICAgSURBRV9SSzhcclxuICAgIH0gZnJvbSBcIi4uL2RhZS9zb2x2ZXJzL2lkYWUvcmtcIjtcclxuaW1wb3J0IHsgSURBRV9FTWlkcG9pbnQsIElEQUVfSU1pZHBvaW50IH0gZnJvbSBcIi4uL2RhZS9zb2x2ZXJzL2lkYWUvbWlkcG9pbnRcIjtcclxuaW1wb3J0IHsgSURBRV9FVHJhcGV6b2lkYWwsIElEQUVfSVRyYXBlem9pZGFsIH0gZnJvbSBcIi4uL2RhZS9zb2x2ZXJzL2lkYWUvdHJhcGV6b2lkYWxcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBFREFFX0JERjIsXHJcbiAgICBFREFFX0JERjMsXHJcbiAgICBFREFFX0JERjQsXHJcbiAgICBFREFFX0JERjUsXHJcbiAgICBFREFFX0JERjYgfSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvZWRhZS9iZGZcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBJREFFX0JERjIsXHJcbiAgICBJREFFX0JERjMsXHJcbiAgICBJREFFX0JERjQsXHJcbiAgICBJREFFX0JERjUsXHJcbiAgICBJREFFX0JERjYgfSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvaWRhZS9iZGZcIjtcclxuaW1wb3J0IHtcclxuICAgIEVEQUVfQU0yLFxyXG4gICAgRURBRV9BTTMsXHJcbiAgICBFREFFX0FNNCxcclxuICAgIEVEQUVfQU01LFxyXG4gICAgRURBRV9BTTZcclxufSBmcm9tIFwiLi4vZGFlL3NvbHZlcnMvZWRhZS9hZGFtcy1tb3VsdG9uXCI7XHJcbmltcG9ydCB7XHJcbiAgICBJREFFX0FNMixcclxuICAgIElEQUVfQU0zLFxyXG4gICAgSURBRV9BTTQsXHJcbiAgICBJREFFX0FNNSxcclxuICAgIElEQUVfQU02XHJcbn0gZnJvbSBcIi4uL2RhZS9zb2x2ZXJzL2lkYWUvYWRhbXMtbW91bHRvblwiO1xyXG5pbXBvcnQge1xyXG4gICAgRURBRV9BQjIsXHJcbiAgICBFREFFX0FCMyxcclxuICAgIEVEQUVfQUI0LFxyXG4gICAgRURBRV9BQjUsXHJcbiAgICBFREFFX0FCNlxyXG59IGZyb20gXCIuLi9kYWUvc29sdmVycy9lZGFlL2FkYW1zLWJhc2hmb3J0aFwiO1xyXG5pbXBvcnQge1xyXG4gICAgSURBRV9BQjIsXHJcbiAgICBJREFFX0FCMyxcclxuICAgIElEQUVfQUI0LFxyXG4gICAgSURBRV9BQjUsXHJcbiAgICBJREFFX0FCNlxyXG59IGZyb20gXCIuLi9kYWUvc29sdmVycy9pZGFlL2FkYW1zLWJhc2hmb3J0aFwiO1xyXG5pbXBvcnQgeyBOZXd0b25Tb2x2ZXIgfSBmcm9tIFwiLi4vbWF0aC9uZXd0b25cIjtcclxuaW1wb3J0ICB7aGFuZGxlRXJyb3JzLCB1aX0gZnJvbSBcIi4uL3VpXCI7XHJcbmltcG9ydCB7IERBRUNvbXBpbGVyIH0gZnJvbSBcIi4uL2NvbXBpbGVyL2NvbXBpbGVyXCI7XHJcbmltcG9ydCB7IENvbXBpbGVyRXJyb3IgfSBmcm9tIFwiLi4vY29tcGlsZXIvY29tcGlsZXJFcnJvclwiO1xyXG5pbXBvcnQgeyBIeWJyaWRTeXN0ZW1Db21waWxlciB9IGZyb20gXCIuLi9jb21waWxlci9oeWJyaWRDb21waWxlclwiO1xyXG5pbXBvcnQgeyBUZXh0UG9zaXRpb24gfSBmcm9tIFwiLi4vY29tcGlsZXIvYXN0Tm9kZVwiO1xyXG5pbXBvcnQgeyBFeHByZXNzaW9uIH0gZnJvbSBcIi4uL2NvbXBpbGVyL2V4cHJlc3Npb25cIjtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc29sdmVFeHBsaWNpdCh4MDp2ZWN0b3IsdDA6bnVtYmVyLHQxOm51bWJlcixzb2x2ZXI6RURBRVNvbHZlcixzeXN0ZW06RURBRVN5c3RlbSk6REFFVmVjdG9yW117XHJcbiAgICBsZXQgc29sdXRpb246REFFVmVjdG9yW10gPSBbXTtcclxuICAgIGxldCB6MCA9IHN5c3RlbS5nKHgwLHQwKTtcclxuICAgIGxldCBwb2ludDpEQUVWZWN0b3IgPSBuZXcgREFFVmVjdG9yKHgwLHowLHQwKTtcclxuICAgIHNvbHV0aW9uLnB1c2gocG9pbnQpO1xyXG4gICAgZm9yKGxldCB0ID0gdDA7dDw9dDE7dD1wb2ludC50KXtcclxuICAgICAgICBwb2ludCA9IHNvbHZlci5tYWtlU3RlcChwb2ludC54LHBvaW50LnoscG9pbnQudCxzeXN0ZW0pO1xyXG4gICAgICAgIHNvbHV0aW9uLnB1c2gocG9pbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNvbHV0aW9uO1xyXG59XHJcbmZ1bmN0aW9uIHNvbHZlSW1wbGljaXQoeDA6dmVjdG9yLHowOnZlY3Rvcix0MDpudW1iZXIsdDE6bnVtYmVyLHNvbHZlcjpJREFFU29sdmVyLHN5c3RlbTpJREFFU3lzdGVtKTpEQUVWZWN0b3JbXXtcclxuICAgIGxldCBzb2x1dGlvbjpEQUVWZWN0b3JbXSA9IFtdO1xyXG4gICAgejAgPSBzb2x2ZXIuc29sdmVfeih4MCx6MCx0MCxzeXN0ZW0pO1xyXG4gICAgbGV0IHBvaW50OkRBRVZlY3RvciA9IG5ldyBEQUVWZWN0b3IoeDAsejAsdDApO1xyXG4gICAgc29sdXRpb24ucHVzaChwb2ludCk7XHJcbiAgICBmb3IobGV0IHQgPSB0MDt0PD10MTt0PXBvaW50LnQpe1xyXG4gICAgICAgIHBvaW50ID0gc29sdmVyLm1ha2VTdGVwKHBvaW50LngscG9pbnQueixwb2ludC50LHN5c3RlbSk7XHJcbiAgICAgICAgc29sdXRpb24ucHVzaChwb2ludCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc29sdXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwbG90RXhwcmVzc2lvbih0MDpudW1iZXIsdDE6bnVtYmVyLGR0Om51bWJlcixleHByZXNzaW9uOkV4cHJlc3Npb24sbGFiZWw6c3RyaW5nKXtcclxuICAgIGxldCB0cmFjZTphbnkgPSB7XHJcbiAgICAgICAgeDogW10sXHJcbiAgICAgICAgeTogW10sXHJcbiAgICAgICAgdHlwZTpcInNjYXR0ZXJnbFwiLFxyXG4gICAgICAgIG1vZGU6ICdtYXJrZXJzK2xpbmVzJyxcclxuICAgICAgICBuYW1lOiBsYWJlbFxyXG4gICAgfTtcclxuICAgIGZvcihsZXQgdCA9IHQwOyB0IDw9dDE7dCs9ZHQpe1xyXG4gICAgICAgIHRyYWNlLngucHVzaCh0KTtcclxuICAgICAgICB0cmFjZS55LnB1c2goZXhwcmVzc2lvbi5leGVjdXRlKFt0XSkpO1xyXG4gICAgfVxyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBQbG90bHkuYWRkVHJhY2VzKCdwbG90LWFyZWEnLCBbdHJhY2VdKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGVzdHtcclxuICAgIHN0YXRpYyB0ZXN0RURBRVNvbHZlcnModDA6bnVtYmVyLHQxOm51bWJlcix4MDp2ZWN0b3Isc29sdmVyczp7bWV0aG9kOkVEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdLHN5c3RlbTpFREFFU3lzdGVtLHhOYW1lczpzdHJpbmdbXSx6TmFtZXM6c3RyaW5nW10sbGFiZWw6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHNvbHZlcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgdWkuYWRkTG9nTWVzc2FnZShsYWJlbCtcIjogXCIraXRlbS5sYWJlbCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhYmVsK1wiOiBcIitpdGVtLmxhYmVsKTtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlczpEQUVWZWN0b3JbXSA9IHNvbHZlRXhwbGljaXQoeDAsdDAsdDEsaXRlbS5tZXRob2Qsc3lzdGVtKTtcclxuICAgICAgICAgICAgICAgIFRlc3Quc2hvd091dHB1dCh2YWx1ZXMseE5hbWVzLHpOYW1lcyxsYWJlbCtcIiBcIitpdGVtLmxhYmVsKTtcclxuICAgICAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIFwiK2xhYmVsK1wiOiBcIitlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB1aS5hZGRMb2dNZXNzYWdlKFwiRXJyb3IgZHVyaW5nIFwiK2xhYmVsK1wiOiBcIitlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyB0ZXN0SURBRVNvbHZlcnModDA6bnVtYmVyLHQxOm51bWJlcix4MDp2ZWN0b3Isc29sdmVyczp7bWV0aG9kOklEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdLHN5c3RlbTpJREFFU3lzdGVtLHhOYW1lczpzdHJpbmdbXSx6TmFtZXM6c3RyaW5nW10sbGFiZWw6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIHNvbHZlcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgdWkuYWRkTG9nTWVzc2FnZShsYWJlbCtcIjogXCIraXRlbS5sYWJlbCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxhYmVsK1wiOiBcIitpdGVtLmxhYmVsKTtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlczpEQUVWZWN0b3JbXSA9IHNvbHZlSW1wbGljaXQoeDAsdmVjdG9yLmVtcHR5KHN5c3RlbS5sZW5ndGhfeigpKSx0MCx0MSxpdGVtLm1ldGhvZCxzeXN0ZW0pO1xyXG4gICAgICAgICAgICAgICAgVGVzdC5zaG93T3V0cHV0KHZhbHVlcyx4TmFtZXMsek5hbWVzLGxhYmVsK1wiIFwiK2l0ZW0ubGFiZWwpO1xyXG4gICAgICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgXCIrbGFiZWwrXCI6IFwiK2Vycm9yKTtcclxuICAgICAgICAgICAgICAgIHVpLmFkZExvZ01lc3NhZ2UoXCJFcnJvciBkdXJpbmcgXCIrbGFiZWwrXCI6IFwiK2Vycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHNob3dPdXRwdXQodmFsdWVzOkRBRVZlY3RvcltdLGRpZlZhcmlhYmxlczpzdHJpbmdbXSxhbGdWYXJpYWJsZXM6c3RyaW5nW10sbGFiZWw6c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIGxldCBkYXRhOmFueSA9IFtdO1xyXG4gICAgICAgIGRpZlZhcmlhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW06c3RyaW5nfG51bGwsaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICAgICAgaWYoaXRlbSA9PW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgICAgICBsZXQgdHJhY2U6YW55ID0ge1xyXG4gICAgICAgICAgICAgICAgeDogW10sXHJcbiAgICAgICAgICAgICAgICB5OiBbXSxcclxuICAgICAgICAgICAgICAgIHR5cGU6XCJzY2F0dGVyZ2xcIixcclxuICAgICAgICAgICAgICAgIG1vZGU6ICdtYXJrZXJzK2xpbmVzJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGxhYmVsK1wiOiBcIitpdGVtXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dmFsdWVzLmxlbmd0aDtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVZlY3RvciA9IHZhbHVlc1tpXTtcclxuICAgICAgICAgICAgICAgIHRyYWNlLnkucHVzaCh2YWx1ZVZlY3Rvci54LmdldChpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgdHJhY2UueC5wdXNoKHZhbHVlVmVjdG9yLnQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5wdXNoKHRyYWNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGdWYXJpYWJsZXMuZm9yRWFjaChmdW5jdGlvbihpdGVtOnN0cmluZ3xudWxsLGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgICAgIGxldCB0cmFjZTphbnkgPSB7XHJcbiAgICAgICAgICAgICAgICB4OiBbXSxcclxuICAgICAgICAgICAgICAgIHk6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHlwZTpcInNjYXR0ZXJnbFwiLFxyXG4gICAgICAgICAgICAgICAgbW9kZTogJ21hcmtlcnMrbGluZXMnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbGFiZWwrXCI6IFwiK2l0ZW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx2YWx1ZXMubGVuZ3RoO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlVmVjdG9yID0gdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgdHJhY2UueS5wdXNoKHZhbHVlVmVjdG9yLnouZ2V0KGluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICB0cmFjZS54LnB1c2godmFsdWVWZWN0b3IudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnB1c2godHJhY2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIFBsb3RseS5hZGRUcmFjZXMoJ3Bsb3QtYXJlYScsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgLypzdGF0aWMgc2VyaWFsaXplT3V0cHV0KHZhbHVlczpEQUVWZWN0b3JbXSxzdGF0ZXM6bnVtYmVyW10sdmFyaWFibGVOYW1lc1g6c3RyaW5nW10sdmFyaWFibGVOYW1lc1o6c3RyaW5nW10pOnN0cmluZ3tcclxuICAgICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICB2YXJpYWJsZU5hbWVzWC5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUsIGluZGV4KXtcclxuICAgICAgICAgICAgcmVzdWx0LmFwcGVuZChuYW1lKTtcclxuICAgICAgICAgICAgcmVzdWx0LmFwcGVuZChcIixcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyaWFibGVOYW1lc1ouZm9yRWFjaChmdW5jdGlvbihuYW1lLCBpbmRleCl7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQobmFtZSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQoXCIsXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc3VsdC5hcHBlbmQoXCJzdGF0ZVwiKTtcclxuICAgICAgICByZXN1bHQuYXBwZW5kKFwiLFwiKTtcclxuICAgICAgICByZXN1bHQuYXBwZW5kKFwidFwiKTtcclxuICAgICAgICB2YWx1ZXMudC5mb3JFYWNoKGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQoXCJcXG5cIik7XHJcbiAgICAgICAgICAgIHZhcmlhYmxlTmFtZXNYLmZvckVhY2goZnVuY3Rpb24obmFtZSxpbmRleCl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuYXBwZW5kKHZhbHVlcy54W2lkXS5nZXQoaW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQoXCIsXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyaWFibGVOYW1lc1ouZm9yRWFjaChmdW5jdGlvbihuYW1lLGluZGV4KXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hcHBlbmQodmFsdWVzLnpbaWRdLmdldChpbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmFwcGVuZChcIixcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXN1bHQuYXBwZW5kKHN0YXRlc1tpZF0pO1xyXG4gICAgICAgICAgICByZXN1bHQuYXBwZW5kKFwiLFwiKTtcclxuICAgICAgICAgICAgcmVzdWx0LmFwcGVuZCh2YWx1ZXMudFtpZF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSovXHJcbiAgICBzdGF0aWMgaW5pdFBsb3QoKTp2b2lke1xyXG4gICAgICAgIHZhciBsYXlvdXQgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOidSZXN1bHQnLFxyXG4gICAgICAgICAgICB0eXBlOlwic2NhdHRlcmdsXCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiQoXCIjcGxvdC1hcmVhXCIpLndpZHRoKCksXHJcbiAgICAgICAgICAgIGhlaWdodDokKFwiI3Bsb3QtYXJlYVwiKS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgcGFwZXJfYmdjb2xvcjogJ3JnYmEoMjQ1LDI0NSwyNDUsMSknLFxyXG4gICAgICAgICAgICBwbG90X2JnY29sb3I6ICdyZ2JhKDI0NSwyNDUsMjQ1LDEpJyxcclxuICAgICAgICAgICAgbnRpY2tzOjMwXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICBQbG90bHkubmV3UGxvdCgncGxvdC1hcmVhJyxbXSxsYXlvdXQse3Jlc3BvbnNpdmU6dHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJ1blRlc3RzKCk6dm9pZHtcclxuICAgICAgICAkKFwibG9nXCIpLnZhbChcIlwiKTtcclxuICAgICAgICB1aS5hZGRMb2dNZXNzYWdlKFwiUnVuIHRlc3RzXCIpO1xyXG4gICAgICAgIC8vdWkuY2xlYXJMb2coKTtcclxuICAgICAgICBsZXQgRURBRVNvbHZlcnM6e21ldGhvZDpFREFFU29sdmVyLGxhYmVsOnN0cmluZ31bXSA9IFtcclxuICAgICAgICAgICAgLyp7bWV0aG9kOm5ldyBFREFFX0VFdWxlcigxZS0zKSxsYWJlbDpcIkVFdWxlclwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9JRXVsZXIoMWUtMyxuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTUsMWUtNSwwLjk1LDQpKSxsYWJlbDpcIklFdWxlclwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9FTWlkcG9pbnQoMWUtMiksbGFiZWw6XCJFTWlkcG9pbnRcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfSU1pZHBvaW50KDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSkpLGxhYmVsOlwiSU1pZHBvaW50XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0VUcmFwZXpvaWRhbCgxZS0yKSxsYWJlbDpcIkVUcmFwZXpvaWRhbFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9JVHJhcGV6b2lkYWwoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1KSksbGFiZWw6XCJJVHJhcGV6b2lkYWxcIn0sKi9cclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9SSzQoMWUtMiksbGFiZWw6XCJFUks0XCJ9LFxyXG4gICAgICAgICAgICAvKnttZXRob2Q6bmV3IEVEQUVfUks0XzIoMWUtMiksbGFiZWw6XCJFUks0XzJcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfUks0X1JBTFNUT04oMWUtMiksbGFiZWw6XCJFUks0X1JhbHN0b25cIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfRE9QUkk1KDFlLTIsM2UtMiwxZS02KSxsYWJlbDpcIkVET1BSSTVcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfQlMyMygxZS0yLDNlLTIsMWUtNiksbGFiZWw6XCJFQlMyM1wifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9SSzYoMWUtMiksbGFiZWw6XCJFUks2XzFcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfUks2XzIoMWUtMiksbGFiZWw6XCJFUks2XzJcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfUks4KDFlLTIpLGxhYmVsOlwiRVJLOFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9SQURBVUlBNSgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUpKSxsYWJlbDpcIklSYWRhdV9JQTVcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfUkFEQVVJSUEzKDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSkpLGxhYmVsOlwiSVJhZGF1X0lJQTNcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfUkFEQVVJSUE1KDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSkpLGxhYmVsOlwiSVJhZGF1X0lJQTVcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfTE9CQVRUT0lJSUEyKDFlLTIsM2UtMiwxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUpKSxsYWJlbDpcIklMTG9iYXR0b19JSUlBMlwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9MT0JBVFRPSUlJQTQoMWUtMiwzZS0yLDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSkpLGxhYmVsOlwiSUxMb2JhdHRvX0lJSUE0XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0xPQkFUVE9JSUlCMigxZS0yLDNlLTIsMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1KSksbGFiZWw6XCJJTExvYmF0dG9fSUlJQjJcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfTE9CQVRUT0lJSUI0KDFlLTIsM2UtMiwxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUpKSxsYWJlbDpcIklMTG9iYXR0b19JSUlCNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9MT0JBVFRPSUlJQzIoMWUtMiwzZS0yLDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSkpLGxhYmVsOlwiSUxMb2JhdHRvX0lJSUMyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0xPQkFUVE9JSUlDNCgxZS0yLDNlLTIsMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1KSksbGFiZWw6XCJJTG9iYXR0b19JSUlDNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9HQVVTU0xFR0VORFJFNCgxZS0yLDNlLTIsMWUtMyxuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklHYXVzc0xlZ2VuZGVyNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9HQVVTU0xFR0VORFJFNigxZS0yLDNlLTIsMWUtMyxuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklHYXVzc0xlZ2VuZGVyNlwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9IZXVuRXVsZXIoMWUtMiwzZS0yLDFlLTQpLGxhYmVsOlwiSUhldW5FdWxlclwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9NaWRwb2ludEV1bGVyKDFlLTIsM2UtMiwxZS00KSxsYWJlbDpcIklNaWRwb2ludEV1bGVyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0JERjIoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREYyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0JERjMoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREYzXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0JERjQoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREY0XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0JERjUoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREY1XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0JERjYoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREY2XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0FNMigxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNikpLGxhYmVsOlwiSUFNMlwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9BTTMoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDYpKSxsYWJlbDpcIklBTTNcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfQU00KDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw2KSksbGFiZWw6XCJJQU00XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0FNNSgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNikpLGxhYmVsOlwiSUFNNVwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9BTTYoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDYpKSxsYWJlbDpcIklBTTZcIn0sKi9cclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9BQjIoMWUtMiksbGFiZWw6XCJFQUIyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0FCMygxZS0yKSxsYWJlbDpcIkVBQjNcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IEVEQUVfQUI0KDFlLTIpLGxhYmVsOlwiRUFCNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgRURBRV9BQjUoMWUtMiksbGFiZWw6XCJFQUI1XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBFREFFX0FCNigxZS0yKSxsYWJlbDpcIkVBQjZcIn1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCBJREFFU29sdmVyczp7bWV0aG9kOklEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdID0gW1xyXG4gICAgICAgICAgICAvKnttZXRob2Q6bmV3IElEQUVfRUV1bGVyKDFlLTMsbmV3IE5ld3RvblNvbHZlcigyMCwxZS01LDFlLTUsMC45NSw0KSksbGFiZWw6XCJFRXVsZXJcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IElEQUVfSUV1bGVyKDFlLTMsIG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNSwxZS01LDAuOTUsNCkpLGxhYmVsOlwiSUV1bGVyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0VNaWRwb2ludCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNSwxZS01LDAuOTUsNCkpLGxhYmVsOlwiRU1pZHBvaW50XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0lNaWRwb2ludCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNSwxZS01LDAuOTUsNCkpLGxhYmVsOlwiSU1pZHBvaW50XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0VUcmFwZXpvaWRhbCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNSwxZS01LDAuOTUsNCkpLGxhYmVsOlwiRVRyYXBlem9pZGFsXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0lUcmFwZXpvaWRhbCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNSwxZS01LDAuOTUsNCksIG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMiwxZS0zLDAuOTUpKSxsYWJlbDpcIklUcmFwZXpvaWRhbFwifSwqL1xyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX1JLNCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNCwxZS01LDAuOTUsNCkpLGxhYmVsOlwiRVJLNFwifSxcclxuICAgICAgICAgICAgLyp7bWV0aG9kOm5ldyBJREFFX1JLNF8yKDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS00LDFlLTUsMC45NSw0KSksbGFiZWw6XCJFUks0XzJcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IElEQUVfUks0X1JBTFNUT04oMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTQsMWUtNSwwLjk1LDQpKSxsYWJlbDpcIkVSSzRfUmFsc3RvblwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9ET1BSSTUoMWUtMiwzZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNCwxZS01LDAuOTUsNCksMWUtNiksbGFiZWw6XCJFRE9QUkk1XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0JTMjMoMWUtMiwzZS0yLDFlLTYsbmV3IE5ld3RvblNvbHZlcigyMCwxZS00LDFlLTUsMC45NSw0KSksbGFiZWw6XCJFQlMyM1wifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9SSzYoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTQsMWUtNSwwLjk1LDQpKSxsYWJlbDpcIkVSSzZfMVwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9SSzZfMigxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNCwxZS01LDAuOTUsNCkpLGxhYmVsOlwiRVJLNl8yXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX1JLOCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNCwxZS01LDAuOTUsNCkpLGxhYmVsOlwiRVJLOFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9SQURBVUlBNSgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNCkpLGxhYmVsOlwiSVJhZGF1X0lBNVwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9SQURBVUlJQTMoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklSYWRhdV9JSUEzXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX1JBREFVSUlBNSgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNCkpLGxhYmVsOlwiSVJhZGF1X0lJQTVcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IElEQUVfTE9CQVRUT0lJSUEyKDFlLTIsM2UtMiwxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNCkpLGxhYmVsOlwiSUxMb2JhdHRvX0lJSUEyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0xPQkFUVE9JSUlBNCgxZS0yLDNlLTIsMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklMTG9iYXR0b19JSUlBNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9MT0JBVFRPSUlJQjIoMWUtMiwzZS0yLDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJTExvYmF0dG9fSUlJQjJcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IElEQUVfTE9CQVRUT0lJSUI0KDFlLTIsM2UtMiwxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNCkpLGxhYmVsOlwiSUxMb2JhdHRvX0lJSUI0XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0xPQkFUVE9JSUlDMigxZS0yLDNlLTIsMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklMTG9iYXR0b19JSUlDMlwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9MT0JBVFRPSUlJQzQoMWUtMiwzZS0yLDFlLTIsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJTG9iYXR0b19JSUlDNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9HQVVTU0xFR0VORFJFNCgxZS0yLDNlLTIsMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklHYXVzc0xlZ2VuZGVyNFwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9HQVVTU0xFR0VORFJFNigxZS0yLDNlLTIsMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklHYXVzc0xlZ2VuZGVyNlwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9IZXVuRXVsZXIoMWUtMiwzZS0yLDFlLTQsbmV3IE5ld3RvblNvbHZlcigyMCwxZS01LDFlLTUsMC45NSw0KSksbGFiZWw6XCJFX0hldW5FdWxlclwifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9NaWRwb2ludEV1bGVyKDFlLTIsM2UtMiwxZS00LG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtNSwxZS01LDAuOTUsNCkpLGxhYmVsOlwiRV9NaWRwb2ludEV1bGVyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0JERjIoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREYyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0JERjMoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREYzXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0JERjQoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREY0XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0JERjUoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREY1XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0JERjYoMWUtMixuZXcgTmV3dG9uU29sdmVyKDIwLDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIklCREY2XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FNMigxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNiksbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJQU0yXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FNMygxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNiksbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJQU0zXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FNNCgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNiksbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJQU00XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FNNSgxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNiksbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJQU01XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FNNigxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjAsMWUtMywxZS00LDAuOTUsNiksbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJJQU02XCJ9LCovXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IElEQUVfQUIyKDFlLTIsbmV3IE5ld3RvblNvbHZlcigyNSwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJFQUIyXCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FCMygxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjUsMWUtMywxZS00LDAuOTUsNCkpLGxhYmVsOlwiRUFCM1wifSxcclxuICAgICAgICAgICAge21ldGhvZDpuZXcgSURBRV9BQjQoMWUtMixuZXcgTmV3dG9uU29sdmVyKDI1LDFlLTMsMWUtNCwwLjk1LDQpKSxsYWJlbDpcIkVBQjRcIn0sXHJcbiAgICAgICAgICAgIHttZXRob2Q6bmV3IElEQUVfQUI1KDFlLTIsbmV3IE5ld3RvblNvbHZlcigyNSwxZS0zLDFlLTQsMC45NSw0KSksbGFiZWw6XCJFQUI1XCJ9LFxyXG4gICAgICAgICAgICB7bWV0aG9kOm5ldyBJREFFX0FCNigxZS0yLG5ldyBOZXd0b25Tb2x2ZXIoMjUsMWUtMywxZS00LDAuOTUsNCkpLGxhYmVsOlwiRUFCNlwifVxyXG4gICAgICAgIF1cclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFBsb3QoKTtcclxuICAgICAgICAgICAgdGhpcy50ZXN0V2Vpc3NpbmdlckltcGxpY2l0KCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy50ZXN0RURBRUNvbXBpbGVyKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy50ZXN0RGFscXVpc3QoRURBRVNvbHZlcnMsSURBRVNvbHZlcnMpOy8vXHJcbiAgICAgICAgICAgIC8vdGhpcy50ZXN0VmFuRGVyUG9sKEVEQUVTb2x2ZXJzLElEQUVTb2x2ZXJzKTsvL1xyXG4gICAgICAgICAgICAvL3RoaXMudGVzdExvcmVueihFREFFU29sdmVycyxJREFFU29sdmVycyk7Ly9cclxuICAgICAgICAgICAgLy90aGlzLnRlc3RJREFFKEVEQUVTb2x2ZXJzLElEQUVTb2x2ZXJzKTsvL1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnRlc3RKdW1waW5nQmFsbCgpOy8vcGFzc2VkXHJcbiAgICAgICAgICAgIC8vdGhpcy50ZXN0SURBRUp1bXBpbmdCYWxsKCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy50ZXN0QWxnZWJyYWljKCk7Ly9QYXNzZWRcclxuICAgICAgICB9Y2F0Y2goZXJyb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgIHVpLmFkZExvZ01lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgJChcIiNsb2dcIikudmFsKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3REYWxxdWlzdChlZGFlU29sdmVyczp7bWV0aG9kOkVEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdLGlkYWVTb2x2ZXJzOnttZXRob2Q6SURBRVNvbHZlcixsYWJlbDpzdHJpbmd9W10pOnZvaWR7XHJcbiAgICAgICAgZnVuY3Rpb24gZXhwb25lbnRBbmFseXRpY2FsKHgwOm51bWJlcixhOm51bWJlcix0MDpudW1iZXIsdDE6bnVtYmVyLHN0ZXA6bnVtYmVyKTpEQUVWZWN0b3JbXVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDpEQUVWZWN0b3JbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgYyA9IHgwL01hdGguZXhwKGEqdDApO1xyXG4gICAgICAgICAgICBmb3IobGV0IHQgPSB0MDt0PD10MSoxLjAwMTt0Kz1zdGVwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgREFFVmVjdG9yKG5ldyB2ZWN0b3IoW01hdGguZXhwKGEqdCkqY10pLG5ldyB2ZWN0b3IoW10pLHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICBkeCA9IGF4XHJcbiAgICAgICAgKi9cclxuICAgICAgICBjbGFzcyBEYWxxdWlzdFByb2JsZW0gaW1wbGVtZW50cyBFREFFU3lzdGVte1xyXG4gICAgICAgICAgICBwcm90ZWN0ZWQgYTpudW1iZXI7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGE6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYSAqIHguZ2V0KDApXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW3RoaXMuYV0sMSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR6KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwwLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHgoeDp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDEsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3goKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeigpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MCA9IDA7XHJcbiAgICAgICAgbGV0IHQxID0gMTtcclxuICAgICAgICBsZXQgYSA9IC0yO1xyXG4gICAgICAgIGxldCB4MCA9IG5ldyB2ZWN0b3IoWzFdKTtcclxuICAgICAgICBsZXQgRVN5c3RlbSA9IG5ldyBEYWxxdWlzdFByb2JsZW0oYSk7XHJcbiAgICAgICAgLypsZXQgRURBRUVTb2x2ZXIgPSBuZXcgRURBRV9FRXVsZXIoMC4wMSk7XHJcbiAgICAgICAgbGV0IEVEQUVJU29sdmVyID0gbmV3IEVEQUVfSUV1bGVyKDAuMDEsMjAsMC4wMjUsMC45NSk7XHJcbiAgICAgICAgbGV0IEVEQUVFU29sdXRpb24gPSBzb2x2ZUV4cGxpY2l0KG5ldyB2ZWN0b3IoWzFdKSx0MCx0MSxFREFFRVNvbHZlcixFU3lzdGVtKTsgICAgIFxyXG4gICAgICAgIGxldCBFREFFSVNvbHV0aW9uID0gc29sdmVFeHBsaWNpdChuZXcgdmVjdG9yKFsxXSksdDAsdDEsRURBRUlTb2x2ZXIsRVN5c3RlbSk7XHJcbiAgICAgICAgVGVzdC5zaG93T3V0cHV0KEVEQUVFU29sdXRpb24sW1wieFwiXSxbXSxcIkV4cG9uZW50IEVEQUVFXCIpO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChFREFFSVNvbHV0aW9uLFtcInhcIl0sW10sXCJFeHBvbmVudCBFREFFSVwiKTsqL1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGR4IC0gYXggPSAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xhc3MgSW1wbGljaXREYWxxdWlzdFByb2JsZW0gaW1wbGVtZW50cyBJREFFU3lzdGVte1xyXG4gICAgICAgICAgICBwcm90ZWN0ZWQgYTpudW1iZXI7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGE6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYSA9IGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZih4OnZlY3RvcixkeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtcclxuICAgICAgICAgICAgICAgICAgICBkeC5nZXQoMCktdGhpcy5hICogeC5nZXQoMClcclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGcoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR4KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoWy10aGlzLmFdLDEsMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkZHgoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbMV0sMSwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR6KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZ2R4KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwxLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHooeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDAsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3goKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF96KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgSVN5c3RlbSA9IG5ldyBJbXBsaWNpdERhbHF1aXN0UHJvYmxlbShhKTtcclxuICAgICAgICAvKmxldCBJREFFRVNvbHZlciA9IG5ldyBJREFFX0VFdWxlcigwLjAxLDIwLDAuMDI1LDAuOTUpO1xyXG4gICAgICAgIGxldCBJREFFSVNvbHZlciA9IG5ldyBJREFFX0lFdWxlcigwLjAxLDIwLDAuMDI1LDAuOTUpO1xyXG4gICAgICAgIGxldCBJREFFRVNvbHV0aW9uID0gc29sdmVJbXBsaWNpdChuZXcgdmVjdG9yKFsxXSksdDAsdDEsSURBRUVTb2x2ZXIsSVN5c3RlbSk7XHJcbiAgICAgICAgbGV0IElEQUVJU29sdXRpb24gPSBzb2x2ZUltcGxpY2l0KG5ldyB2ZWN0b3IoWzFdKSx0MCx0MSxJREFFSVNvbHZlcixJU3lzdGVtKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoSURBRUVTb2x1dGlvbixbXCJ4XCJdLFtdLFwiRXhwb25lbnQgSURBRUVcIik7XHJcbiAgICAgICAgVGVzdC5zaG93T3V0cHV0KElEQUVJU29sdXRpb24sW1wieFwiXSxbXSxcIkV4cG9uZW50IElEQUVJXCIpOyovXHJcblxyXG4gICAgICAgIHRoaXMudGVzdEVEQUVTb2x2ZXJzKHQwLHQxLHgwLGVkYWVTb2x2ZXJzLEVTeXN0ZW0sW1wieFwiXSxbXSxcIkVEQUVcIik7XHJcbiAgICAgICAgdGhpcy50ZXN0SURBRVNvbHZlcnModDAsdDEseDAsaWRhZVNvbHZlcnMsSVN5c3RlbSxbXCJ4XCJdLFtdLFwiSURBRVwiKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoZXhwb25lbnRBbmFseXRpY2FsKHgwLmdldCgwKSxhLHQwLHQxLDAuMDEpLFtcInhcIl0sW10sXCJFeHBvbmVudCBhbmFseXRpY2FsXCIpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RWYW5EZXJQb2woZWRhZVNvbHZlcnM6e21ldGhvZDpFREFFU29sdmVyLGxhYmVsOnN0cmluZ31bXSxpZGFlU29sdmVyczp7bWV0aG9kOklEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdKTp2b2lke1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIGR4ID0geTtcclxuICAgICAgICAgICAgZHkgPSBtdSgxLXheMil5IC0geDtcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzIEVWYW5EZXJQb2wgaW1wbGVtZW50cyBFREFFU3lzdGVte1xyXG4gICAgICAgICAgICBwcm90ZWN0ZWQgcGFyYW1ldGVyOm51bWJlcjtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IocGFyYW1ldGVyOm51bWJlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlciA9IHBhcmFtZXRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ggPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfeSA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgICAgIF95LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyKigxLV94Kl94KSpfeSAtIF94XHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3kgPSB4LmdldCgxKTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6bWF0cml4O1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbWF0cml4LmVtcHR5U3F1YXJlKDIpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgwLDAsMCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KDEsMCwxKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoLTIqdGhpcy5wYXJhbWV0ZXIqX3kqX3gtMSwxLDApO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCh0aGlzLnBhcmFtZXRlciooMS1feCpfeCksMSwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZ2R4KHg6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwyLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHooeDp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDAsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3goKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeigpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIGR4IC0geSA9IDA7XHJcbiAgICAgICAgICAgIGR5IC0gbXUoMS14XjIpeSArIHggPSAwO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgY2xhc3MgSVZhbkRlclBvbCBpbXBsZW1lbnRzIElEQUVTeXN0ZW17XHJcbiAgICAgICAgICAgIHByb3RlY3RlZCBwYXJhbWV0ZXI6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihwYXJhbWV0ZXI6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVyID0gcGFyYW1ldGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGYoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ggPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfeSA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9keCA9IGR4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfZHkgPSBkeC5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXHJcbiAgICAgICAgICAgICAgICAgICAgX2R4IC0gX3ksXHJcbiAgICAgICAgICAgICAgICAgICAgX2R5IC0gdGhpcy5wYXJhbWV0ZXIqKDEtX3gqX3gpKl95ICsgX3hcclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGcoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR4KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3kgPSB4LmdldCgxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtcclxuICAgICAgICAgICAgICAgICAgICAwLC0xLFxyXG4gICAgICAgICAgICAgICAgICAgIDEgKyAyKnRoaXMucGFyYW1ldGVyKl95Kl94LCAtdGhpcy5wYXJhbWV0ZXIqKDEtX3gqX3gpXHJcbiAgICAgICAgICAgICAgICBdLDIsMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkZHgoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXHJcbiAgICAgICAgICAgICAgICAgICAgMSwwLFxyXG4gICAgICAgICAgICAgICAgICAgIDAsMVxyXG4gICAgICAgICAgICAgICAgXSwyLDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHooeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwwLDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHgoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDIsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeCgpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF96KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHQwID0gMDtcclxuICAgICAgICBsZXQgdDEgPSA1O1xyXG4gICAgICAgIGxldCB4MCA9IG5ldyB2ZWN0b3IoWzEsMV0pO1xyXG4gICAgICAgIGxldCBFU3lzdGVtID0gbmV3IEVWYW5EZXJQb2woMjApO1xyXG4gICAgICAgIHRoaXMudGVzdEVEQUVTb2x2ZXJzKHQwLHQxLHgwLGVkYWVTb2x2ZXJzLEVTeXN0ZW0sW1wieFwiLFwieCdcIl0sW10sXCJFREFFXCIpO1xyXG4gICAgICAgIGxldCBJU3lzdGVtID0gbmV3IElWYW5EZXJQb2woMjApO1xyXG4gICAgICAgIHRoaXMudGVzdElEQUVTb2x2ZXJzKHQwLHQxLHgwLGlkYWVTb2x2ZXJzLElTeXN0ZW0sW1wieFwiLFwieCdcIl0sW10sXCJJREFFXCIpO1xyXG4gICAgICAgIC8qbGV0IEVEQUVFU29sdmVyID0gbmV3IEVEQUVfRUV1bGVyKDAuMDEpO1xyXG4gICAgICAgIGxldCBFREFFSVNvbHZlciA9IG5ldyBFREFFX0lFdWxlcigwLjAxLDIwLDAuMDUsMC45NSk7XHJcbiAgICAgICAgbGV0IEVEQUVFU29sdXRpb24gPSBzb2x2ZUV4cGxpY2l0KG5ldyB2ZWN0b3IoWzEsMV0pLHQwLHQxLEVEQUVFU29sdmVyLEVTeXN0ZW0pOyAgICAgXHJcbiAgICAgICAgbGV0IEVEQUVJU29sdXRpb24gPSBzb2x2ZUV4cGxpY2l0KG5ldyB2ZWN0b3IoWzEsMV0pLHQwLHQxLEVEQUVJU29sdmVyLEVTeXN0ZW0pO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChFREFFRVNvbHV0aW9uLFtcInhcIixcIngnXCJdLFtdLFwiVmFuIGRlciBwb2wgRURBRUVcIik7XHJcbiAgICAgICAgVGVzdC5zaG93T3V0cHV0KEVEQUVJU29sdXRpb24sW1wieFwiLFwieCdcIl0sW10sXCJWYW4gZGVyIHBvbCBFREFFSVwiKTsqL1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RMb3JlbnooZWRhZVNvbHZlcnM6e21ldGhvZDpFREFFU29sdmVyLGxhYmVsOnN0cmluZ31bXSxpZGFlU29sdmVyczp7bWV0aG9kOklEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdKTp2b2lke1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICAgIGR4ID0gcyh5LXgpXHJcbiAgICAgICAgICAgIGR5ID0geChwLXopIC0geVxyXG4gICAgICAgICAgICBkeiA9IHh5IC0gYnpcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzIEVMb3JlbnogaW1wbGVtZW50cyBFREFFU3lzdGVte1xyXG4gICAgICAgICAgICBzaWdtYTpudW1iZXI7XHJcbiAgICAgICAgICAgIHJobzpudW1iZXI7XHJcbiAgICAgICAgICAgIGJldGE6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihzaWdtYTpudW1iZXIscmhvOm51bWJlcixiZXRhOm51bWJlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ21hID0gc2lnbWE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJobyA9IHJobztcclxuICAgICAgICAgICAgICAgIHRoaXMuYmV0YSA9IGJldGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3kgPSB4LmdldCgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBfeiA9IHguZ2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbWEqKF95LV94KSxcclxuICAgICAgICAgICAgICAgICAgICBfeCoodGhpcy5yaG8tX3opLV95LFxyXG4gICAgICAgICAgICAgICAgICAgIF94Kl95IC0gdGhpcy5iZXRhKl96XHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHg6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3kgPSB4LmdldCgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBfeiA9IHguZ2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoXHJcbiAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAtdGhpcy5zaWdtYSx0aGlzLnNpZ21hLDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmhvIC0gX3osLTEsLV94LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfeSxfeCwtdGhpcy5iZXRhXHJcbiAgICAgICAgICAgICAgICAgICAgXSwzLDMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHooeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDAsMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeCh4OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMywwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeCgpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF96KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3MgSUxvcmVueiBpbXBsZW1lbnRzIElEQUVTeXN0ZW17XHJcbiAgICAgICAgICAgIHNpZ21hOm51bWJlcjtcclxuICAgICAgICAgICAgcmhvOm51bWJlcjtcclxuICAgICAgICAgICAgYmV0YTpudW1iZXI7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHNpZ21hOm51bWJlcixyaG86bnVtYmVyLGJldGE6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbWEgPSBzaWdtYTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmhvID0gcmhvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXRhID0gYmV0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmKHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3kgPSB4LmdldCgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBfeiA9IHguZ2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF9keCA9IGR4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfZHkgPSBkeC5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX2R6ID0gZHguZ2V0KDIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgICAgIF9keC10aGlzLnNpZ21hKihfeS1feCksXHJcbiAgICAgICAgICAgICAgICAgICAgX2R5IC0gX3gqKHRoaXMucmhvLV96KStfeSxcclxuICAgICAgICAgICAgICAgICAgICBfZHogLSBfeCpfeSArIHRoaXMuYmV0YSpfelxyXG4gICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZyh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHgoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ggPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfeSA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IF96ID0geC5nZXQoMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbWEsLXRoaXMuc2lnbWEsMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLXRoaXMucmhvICsgX3osMSxfeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLV95LC1feCx0aGlzLmJldGFcclxuICAgICAgICAgICAgICAgICAgICBdLDMsMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkZHgoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXHJcbiAgICAgICAgICAgICAgICAgICAgMSwwLDAsXHJcbiAgICAgICAgICAgICAgICAgICAgMCwxLDAsXHJcbiAgICAgICAgICAgICAgICAgICAgMCwwLDFcclxuICAgICAgICAgICAgICAgIF0sMywzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR6KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZ2R6KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwwLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHgoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDMsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3goKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeigpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MCA9IDA7XHJcbiAgICAgICAgbGV0IHQxID0gNTtcclxuICAgICAgICBsZXQgeDAgPSBuZXcgdmVjdG9yKFsxLDEsMV0pO1xyXG4gICAgICAgIGxldCBFU3lzdGVtID0gbmV3IEVMb3JlbnooMTAsMjgsOC8zKTtcclxuICAgICAgICBsZXQgSVN5c3RlbSA9IG5ldyBJTG9yZW56KDEwLDI4LDgvMyk7XHJcbiAgICAgICAgdGhpcy50ZXN0RURBRVNvbHZlcnModDAsdDEseDAsZWRhZVNvbHZlcnMsRVN5c3RlbSxbXCJ4XCIsXCJ5XCIsXCJ6XCJdLFtdLFwiRURBRVwiKTtcclxuICAgICAgICB0aGlzLnRlc3RJREFFU29sdmVycyh0MCx0MSx4MCxpZGFlU29sdmVycyxJU3lzdGVtLFtcInhcIixcInlcIixcInpcIl0sW10sXCJJREFFXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qbGV0IEVEQUVFU29sdmVyID0gbmV3IEVEQUVfRUV1bGVyKDAuMDIpO1xyXG4gICAgICAgIGxldCBFREFFSVNvbHZlciA9IG5ldyBFREFFX0lFdWxlcigwLjAyLDIwLDAuMDUsMC45NSk7XHJcbiAgICAgICAgbGV0IEVEQUVFU29sdXRpb24gPSBzb2x2ZUV4cGxpY2l0KG5ldyB2ZWN0b3IoWzEsMSwxXSksdDAsdDEsRURBRUVTb2x2ZXIsRVN5c3RlbSk7ICAgICBcclxuICAgICAgICBsZXQgRURBRUlTb2x1dGlvbiA9IHNvbHZlRXhwbGljaXQobmV3IHZlY3RvcihbMSwxLDFdKSx0MCx0MSxFREFFSVNvbHZlcixFU3lzdGVtKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoRURBRUVTb2x1dGlvbixbXCJ4XCIsXCJ5XCIsXCJ6XCJdLFtdLFwiTG9yZW56IEVEQUVFXCIpO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChFREFFSVNvbHV0aW9uLFtcInhcIixcInlcIixcInpcIl0sW10sXCJMb3JlbnogRURBRUlcIik7Ki9cclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdGVzdElEQUUoZWRhZVNvbHZlcnM6e21ldGhvZDpFREFFU29sdmVyLGxhYmVsOnN0cmluZ31bXSxpZGFlU29sdmVyczp7bWV0aG9kOklEQUVTb2x2ZXIsbGFiZWw6c3RyaW5nfVtdKTp2b2lke1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICBkeCA9IHkgKyB6ICsgdFxyXG4gICAgICAgICAgICBkeSA9IHhcclxuICAgICAgICAgICAgeiA9IHggKyB5XHJcbiAgICAgICAgICAgIGR4LXktei10PTBcclxuICAgICAgICAgICAgZHkteD0wXHJcbiAgICAgICAgICAgIHoteC15PTBcclxuICAgICAgICAqL1xyXG4gICAgICAgIGNsYXNzIEVEQUVQcm9ibGVtIGltcGxlbWVudHMgRURBRVN5c3RlbXtcclxuICAgICAgICBmKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIHguZ2V0KDEpK3ouZ2V0KDApK3QsXHJcbiAgICAgICAgICAgICAgICAgICAgeC5nZXQoMClcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGcoeDp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW3guZ2V0KDApK3guZ2V0KDEpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRmZHgoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoWzAsMSwxLDBdLDIsMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRmZHooeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoWzEsMF0sMSwyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGdkeCh4OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbMSwxXSwyLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZW5ndGhfeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxlbmd0aF96KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzIElEQUVQcm9ibGVtIGltcGxlbWVudHMgSURBRVN5c3RlbXtcclxuICAgICAgICAgICAgZih4OnZlY3RvcixkeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFxyXG4gICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHguZ2V0KDApLXguZ2V0KDEpLXouZ2V0KDApLXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4LmdldCgxKS14LmdldCgwKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGcoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFt6LmdldCgwKS14LmdldCgwKS14LmdldCgxKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHgoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0Om1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdHJpeC5lbXB0eVNxdWFyZSgyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoMCwwLDApO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgtMSwwLDEpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgtMSwxLDApO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgwLDEsMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHooeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0Om1hdHJpeDtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdHJpeC5lbXB0eSgyLDEpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgtMSwwLDApO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgwLDEsMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZGR4KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDptYXRyaXg7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRyaXguZW1wdHlTcXVhcmUoMik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KDEsMCwwKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoMCwwLDEpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldCgwLDEsMCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KDEsMSwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDptYXRyaXg7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRyaXguZW1wdHkoMSwyKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoLTEsMCwwKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoLTEsMCwxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDptYXRyaXg7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRyaXguZW1wdHkoMSwxKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoMSwwLDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeCgpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF96KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHQwID0gMDtcclxuICAgICAgICBsZXQgdDEgPSAxO1xyXG4gICAgICAgIGxldCB4MCA9IG5ldyB2ZWN0b3IoWzAsMF0pO1xyXG4gICAgICAgIGxldCBJU3lzdGVtID0gbmV3IElEQUVQcm9ibGVtKCk7XHJcbiAgICAgICAgbGV0IEVTeXN0ZW0gPSBuZXcgRURBRVByb2JsZW0oKTtcclxuICAgICAgICAvKmxldCBJREFFRVNvbHZlciA9IG5ldyBJREFFX0VFdWxlcigwLjAwNSwyMCwwLjA1LDAuOTUpO1xyXG4gICAgICAgIGxldCBJREFFSVNvbHZlciA9IG5ldyBJREFFX0lFdWxlcigwLjAxMCwyMCwwLjAxLDAuOTUpO1xyXG4gICAgICAgIGxldCBJREFFRVNvbHV0aW9uID0gc29sdmVJbXBsaWNpdChuZXcgdmVjdG9yKFswLDBdKSx0MCx0MSxJREFFRVNvbHZlcixJU3lzdGVtKTsgICAgIFxyXG4gICAgICAgIGxldCBJREFFSVNvbHV0aW9uID0gc29sdmVJbXBsaWNpdChuZXcgdmVjdG9yKFswLDBdKSx0MCx0MSxJREFFSVNvbHZlcixJU3lzdGVtKTsqL1xyXG4gICAgICAgIHRoaXMudGVzdEVEQUVTb2x2ZXJzKHQwLHQxLHgwLGVkYWVTb2x2ZXJzLEVTeXN0ZW0sW1wieFwiLFwieVwiXSxbXCJ6XCJdLFwiRURBRVwiKTtcclxuICAgICAgICB0aGlzLnRlc3RJREFFU29sdmVycyh0MCx0MSx4MCxpZGFlU29sdmVycyxJU3lzdGVtLFtcInhcIixcInlcIl0sW1wielwiXSxcIklEQUVcIik7XHJcbiAgICAgICAgLypUZXN0LnNob3dPdXRwdXQoSURBRUVTb2x1dGlvbixbXCJ4XCIsXCJ5XCJdLFtcInpcIl0sXCJJREFFRSBwcm9ibGVtXCIpO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChJREFFSVNvbHV0aW9uLFtcInhcIixcInlcIl0sW1wielwiXSxcIklEQUVJIHByb2JsZW1cIik7Ki9cclxuICAgIH1cclxuICAgIHN0YXRpYyB0ZXN0SURBRUp1bXBpbmdCYWxsKCk6dm9pZHtcclxuICAgICAgICBmdW5jdGlvbiBnZXRBbmFsdHl0aWNKdW1waW5nQmFsbCh4MDpudW1iZXIsdjA6bnVtYmVyLHQxOm51bWJlcixkdDpudW1iZXIsazpudW1iZXIpOkRBRVZlY3Rvcltde1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OkRBRVZlY3RvcltdID0gW107XHJcbiAgICAgICAgICAgIGxldCBwb2ludCA9IG5ldyBEQUVWZWN0b3IobmV3IHZlY3RvcihbeDAsdjBdKSxuZXcgdmVjdG9yKFtdKSwwKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goKTtcclxuICAgICAgICAgICAgbGV0IF92MCA9IHYwO1xyXG4gICAgICAgICAgICBsZXQgX3gwID0geDA7XHJcbiAgICAgICAgICAgIGxldCBnID0gMTA7XHJcbiAgICAgICAgICAgIGxldCB0ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodDx0MSl7XHJcbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGltZSBvZiBuZXh0IGludGVyc2VjdGlvbiB3aXRoIHggYXhpc1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50U3RlcCA9IChfdjAgKyBNYXRoLnNxcnQoX3YwKl92MCsyKl94MCpnKSkvZztcclxuICAgICAgICAgICAgICAgIGxldCB0TmV4dCA9IHQgKyBldmVudFN0ZXA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdk5leHQgPSBNYXRoLmFicyhfdjAgLSBnKmV2ZW50U3RlcCk7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudFN0ZXA8PTAuMDAxKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBfZHQgPSAwO3Q8dE5leHQ7dCs9ZHQsX2R0Kz1kdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodD49dDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnQgPSBuZXcgREFFVmVjdG9yKG5ldyB2ZWN0b3IoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfeDAgKyBfdjAqX2R0IC0gZypfZHQqX2R0LzIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF92MCAtIGcqX2R0XHJcbiAgICAgICAgICAgICAgICAgICAgXSksbmV3IHZlY3RvcihbXSksdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdCA9IHROZXh0O1xyXG4gICAgICAgICAgICAgICAgX3gwID0gMDtcclxuICAgICAgICAgICAgICAgIF92MCA9IHZOZXh0Kms7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXcgREFFVmVjdG9yKG5ldyB2ZWN0b3IoW194MCxfdjBdKSxuZXcgdmVjdG9yKFtdKSx0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICAgICAgY29uc3RhbnQgbSA9IDE7XHJcbiAgICAgICAgICAgIHYodDApID0gMDtcclxuICAgICAgICAgICAgeCh0MCkgPSAxO1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogeCcgLSB2ID0gMDtcclxuICAgICAgICAgICAgdmVsb2NpdHk6IHYnICsgbWcgPSAwO1xyXG4gICAgICAgICAgICBzdGF0ZSBqdW1wIG9uICh2PD0wJiZ4PD0wKXtcclxuICAgICAgICAgICAgICAgIHNldCB2ID0gLXY7XHJcbiAgICAgICAgICAgIH0gZnJvbSBpbml0LCBqdW1wO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgY2xhc3MgSnVtcFN0YXRlTGluayBpbXBsZW1lbnRzIEh5YnJpZFN0YXRlTGlua3tcclxuICAgICAgICAgICAgcHJvdGVjdGVkIHN0YXRlTnVtYmVyOm51bWJlcjtcclxuICAgICAgICAgICAgcHJvdGVjdGVkIGs6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihzdGF0ZU51bWJlcjpudW1iZXIsazpudW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZU51bWJlciA9IHN0YXRlTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rID0gaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXROZXdTdGF0ZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVOdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHIoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHguZ2V0KDApPD0wICYmIHguZ2V0KDEpPD0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHAoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKC14LmdldCgwKSwteC5nZXQoMSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRwZHQoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRwZHooeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcGR4KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ggPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfdiA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgaWYoLV94PC1fdil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoWy0xLDBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFswLC0xXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0Q29uZGl0aW9ucyh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW3guZ2V0KDApLC14LmdldCgxKSp0aGlzLmtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzcyBJREFFSnVtcFN0YXRlIGV4dGVuZHMgSURBRUh5YnJpZFN0YXRle1xyXG4gICAgICAgICAgICBwcm90ZWN0ZWQgX2c6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxsaW5rczpIeWJyaWRTdGF0ZUxpbmtbXSx0ZXJtaW5hbDpmYWxzZSxnOm51bWJlcil7XHJcbiAgICAgICAgICAgICAgICBzdXBlcihuYW1lLGxpbmtzLHRlcm1pbmFsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGYoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXHJcbiAgICAgICAgICAgICAgICAgICAgZHguZ2V0KDApLXguZ2V0KDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR4LmdldCgxKSt0aGlzLl9nXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeCh4OnZlY3RvcixkeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFswLC0xLDAsMF0sMiwyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmRkeCh4OnZlY3RvcixkeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFsxLDAsMCwxXSwyLDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHooeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwwLDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHgoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDIsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZ2R0KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3goKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeigpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzIElEQUVKdW1waW5nQmFsbCBleHRlbmRzIElEQUVIeWJyaWRTeXN0ZW17XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGc6bnVtYmVyLGs6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIGxldCBsaW5rID0gbmV3IEp1bXBTdGF0ZUxpbmsoMSxrKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0ID0gbmV3IElEQUVKdW1wU3RhdGUoXCJpbml0XCIsW2xpbmtdLGZhbHNlLGcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGp1bXAgPSBuZXcgSURBRUp1bXBTdGF0ZShcImp1bXBcIixbbGlua10sZmFsc2UsZyk7XHJcbiAgICAgICAgICAgICAgICBzdXBlcihbaW5pdCxqdW1wXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHQxID0gMjM7XHJcbiAgICAgICAgbGV0IGsgPSAwLjg7XHJcbiAgICAgICAgbGV0IGV2ZW50RGV0ZWN0b3JTaW1wbGUgPSBuZXcgRXZlbnREZXRlY3Rpb25TaW1wbGUoKTtcclxuICAgICAgICBsZXQgZXZlbnREZXRlY3RvckNvbXBsZXggPSBuZXcgRXZlbnREZXRlY3Rpb25Db21wbGV4KCk7XHJcbiAgICAgICAgbGV0IGFkYXB0aXZlU3RlcFN0cmF0ZWd5ID0gbmV3IEFkYXB0aXZlU3RlcE5ld3RvbigwLjk1LDFlLTUpO1xyXG4gICAgICAgIGxldCBpZGFlSHlicmlkU29sdmVyID0gbmV3IElEQUVIeWJyaWRTb2x2ZXIoZXZlbnREZXRlY3RvckNvbXBsZXgsYWRhcHRpdmVTdGVwU3RyYXRlZ3kpO1xyXG4gICAgICAgIGxldCBpZGFlU3lzdGVtID0gbmV3IElEQUVKdW1waW5nQmFsbCgxMCxrKTtcclxuICAgICAgICBsZXQgaW5pdGlhbFN0YXRlID0gbmV3IHZlY3RvcihbMTAsIDE1XSk7XHJcbiAgICAgICAgbGV0IGlkYWVTb2x1dGlvbjtcclxuICAgICAgICAvL2lkYWVTb2x1dGlvbiA9IGlkYWVIeWJyaWRTb2x2ZXIuc29sdmUoaW5pdGlhbFN0YXRlLDAsMSxpZGFlaUV1bGVyU29sdmVyLGlkYWVTeXN0ZW0sW10pO1xyXG4gICAgICAgIC8vVGVzdC5zaG93T3V0cHV0KGlkYWVTb2x1dGlvbi52YWx1ZXMsW1wieFwiLFwidlwiXSxbXSxcIkp1bXBpbmcgYmFsbCBpZGFlIGNvbXBsZXggd2l0aCBzdGVwXCIpO1xyXG4gICAgICAgIGlkYWVIeWJyaWRTb2x2ZXIgPSBuZXcgSURBRUh5YnJpZFNvbHZlcihldmVudERldGVjdG9yU2ltcGxlLGFkYXB0aXZlU3RlcFN0cmF0ZWd5KTtcclxuICAgICAgICAvL2lkYWVTb2x1dGlvbiA9IGlkYWVIeWJyaWRTb2x2ZXIuc29sdmUoaW5pdGlhbFN0YXRlLDAsMSxpZGFlaUV1bGVyU29sdmVyLGlkYWVTeXN0ZW0sW10pO1xyXG4gICAgICAgIC8vVGVzdC5zaG93T3V0cHV0KGlkYWVTb2x1dGlvbi52YWx1ZXMsW1wieFwiLFwidlwiXSxbXSxcIkp1bXBpbmcgYmFsbCBpZGFlIHNpbXBsZSB3aXRoIHN0ZXBcIik7XHJcbiAgICAgICAgaWRhZUh5YnJpZFNvbHZlciA9IG5ldyBJREFFSHlicmlkU29sdmVyKGV2ZW50RGV0ZWN0b3JDb21wbGV4LG51bGwpO1xyXG4gICAgICAgIC8vaWRhZVNvbHV0aW9uID0gaWRhZUh5YnJpZFNvbHZlci5zb2x2ZShpbml0aWFsU3RhdGUsMCwxLGlkYWVpRXVsZXJTb2x2ZXIsaWRhZVN5c3RlbSxbXSk7XHJcbiAgICAgICAgLy9UZXN0LnNob3dPdXRwdXQoaWRhZVNvbHV0aW9uLnZhbHVlcyxbXCJ4XCIsXCJ2XCJdLFtdLFwiSnVtcGluZyBiYWxsIGlkYWUgY29tcGxleFwiKTtcclxuICAgICAgICBpZGFlSHlicmlkU29sdmVyID0gbmV3IElEQUVIeWJyaWRTb2x2ZXIoZXZlbnREZXRlY3RvclNpbXBsZSxudWxsKTtcclxuICAgICAgICAvL2lkYWVTb2x1dGlvbiA9IGlkYWVIeWJyaWRTb2x2ZXIuc29sdmUoaW5pdGlhbFN0YXRlLDAsMSxpZGFlaUV1bGVyU29sdmVyLGlkYWVTeXN0ZW0sW10pO1xyXG4gICAgICAgIC8vVGVzdC5zaG93T3V0cHV0KGlkYWVTb2x1dGlvbi52YWx1ZXMsW1wieFwiLFwidlwiXSxbXSxcIkp1bXBpbmcgYmFsbCBpZGFlIHNpbXBsZVwiKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoZ2V0QW5hbHR5dGljSnVtcGluZ0JhbGwoaW5pdGlhbFN0YXRlLmdldCgwKSxpbml0aWFsU3RhdGUuZ2V0KDEpLHQxLDAuMDUsayksW1wieFwiXSxbXSxcIkp1bXBpbmcgYmFsbCBhbmFseXRpY2FsXCIpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RKdW1waW5nQmFsbCgpOnZvaWR7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QW5hbHR5dGljSnVtcGluZ0JhbGwoeDA6bnVtYmVyLHYwOm51bWJlcix0MTpudW1iZXIsZHQ6bnVtYmVyLGs6bnVtYmVyKTpEQUVWZWN0b3JbXXtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDpEQUVWZWN0b3JbXSA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSBuZXcgREFFVmVjdG9yKG5ldyB2ZWN0b3IoW3gwLHYwXSksbmV3IHZlY3RvcihbXSksMCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKCk7XHJcbiAgICAgICAgICAgIGxldCBfdjAgPSB2MDtcclxuICAgICAgICAgICAgbGV0IF94MCA9IHgwO1xyXG4gICAgICAgICAgICBsZXQgZyA9IDEwO1xyXG4gICAgICAgICAgICBsZXQgdCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHQ8dDEpe1xyXG4gICAgICAgICAgICAgICAgLy9maW5kIHRpbWUgb2YgbmV4dCBpbnRlcnNlY3Rpb24gd2l0aCB4IGF4aXNcclxuICAgICAgICAgICAgICAgIGxldCBldmVudFN0ZXAgPSAoX3YwICsgTWF0aC5zcXJ0KF92MCpfdjArMipfeDAqZykpL2c7XHJcbiAgICAgICAgICAgICAgICBsZXQgdE5leHQgPSB0ICsgZXZlbnRTdGVwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZOZXh0ID0gTWF0aC5hYnMoX3YwIC0gZypldmVudFN0ZXApO1xyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnRTdGVwPD0wLjAwMSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgX2R0ID0gMDt0PHROZXh0O3QrPWR0LF9kdCs9ZHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHQ+PXQxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ID0gbmV3IERBRVZlY3RvcihuZXcgdmVjdG9yKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3gwICsgX3YwKl9kdCAtIGcqX2R0Kl9kdC8yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdjAgLSBnKl9kdFxyXG4gICAgICAgICAgICAgICAgICAgIF0pLG5ldyB2ZWN0b3IoW10pLHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHQgPSB0TmV4dDtcclxuICAgICAgICAgICAgICAgIF94MCA9IDA7XHJcbiAgICAgICAgICAgICAgICBfdjAgPSB2TmV4dCprO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3IERBRVZlY3RvcihuZXcgdmVjdG9yKFtfeDAsX3YwXSksbmV3IHZlY3RvcihbXSksdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzIEp1bXBTdGF0ZUxpbmsgaW1wbGVtZW50cyBIeWJyaWRTdGF0ZUxpbmt7XHJcbiAgICAgICAgICAgIHByb3RlY3RlZCBzdGF0ZU51bWJlcjpudW1iZXI7XHJcbiAgICAgICAgICAgIHByb3RlY3RlZCBrOm51bWJlcjtcclxuICAgICAgICAgICAgY29uc3RydWN0b3Ioc3RhdGVOdW1iZXI6bnVtYmVyLGs6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVOdW1iZXIgPSBzdGF0ZU51bWJlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuayA9IGs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0TmV3U3RhdGUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB4LmdldCgwKTw9MCAmJiB4LmdldCgxKTw9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbigteC5nZXQoMCksLXguZ2V0KDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcGR0KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcGR6KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHBkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3YgPSB4LmdldCgxKTtcclxuICAgICAgICAgICAgICAgIGlmKC1feDwtX3Ype1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFstMSwwXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbMCwtMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldENvbmRpdGlvbnMoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFt4LmdldCgwKSwteC5nZXQoMSkqdGhpcy5rXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3MgRURBRUp1bXBTdGF0ZSBleHRlbmRzIEVEQUVIeWJyaWRTdGF0ZXtcclxuICAgICAgICAgICAgX2c6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxsaW5rczpIeWJyaWRTdGF0ZUxpbmtbXSx0ZXJtaW5hbDpmYWxzZSxnOm51bWJlcil7XHJcbiAgICAgICAgICAgICAgICBzdXBlcihuYW1lLGxpbmtzLHRlcm1pbmFsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2cgPSBnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGYoeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIGxldCBfeCA9IHguZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IF92ID0geC5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbX3YsLXRoaXMuX2ddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHg6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW1xyXG4gICAgICAgICAgICAgICAgICAgIDAsMSxcclxuICAgICAgICAgICAgICAgICAgICAwLDBcclxuICAgICAgICAgICAgICAgIF0sMiwyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR6KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwwLDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHgoeDp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDIsMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkdCh4OnZlY3Rvcix0Om51bWJlcik6dmVjdG9ye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB2ZWN0b3IoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF94KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3ooKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgICAgICBjb25zdGFudCBtID0gMTtcclxuICAgICAgICAgICAgdih0MCkgPSAwO1xyXG4gICAgICAgICAgICB4KHQwKSA9IDE7XHJcbiAgICAgICAgICAgIHgnID0gdjtcclxuICAgICAgICAgICAgdic9IC0gbWc7XHJcbiAgICAgICAgICAgIHN0YXRlIGp1bXAgb24gKHY8PTAmJng8PTApe1xyXG4gICAgICAgICAgICAgICAgc2V0IHYgPSAtdjtcclxuICAgICAgICAgICAgfSBmcm9tIGluaXQsIGp1bXA7XHJcbiAgICAgICAgKi9cclxuICAgICAgICBjbGFzcyBFREFFSnVtcGluZ0JhbGwgZXh0ZW5kcyBFREFFSHlicmlkU3lzdGVte1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihnOm51bWJlcixrOm51bWJlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluayA9IG5ldyBKdW1wU3RhdGVMaW5rKDEsayk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdCA9IG5ldyBFREFFSnVtcFN0YXRlKFwiaW5pdFwiLFtsaW5rXSxmYWxzZSxnKTtcclxuICAgICAgICAgICAgICAgIGxldCBqdW1wID0gbmV3IEVEQUVKdW1wU3RhdGUoXCJqdW1wXCIsW2xpbmtdLGZhbHNlLGcpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIoW2luaXQsanVtcF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnN0YXRlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnN0YXRlcyA9IFt7bmFtZTpcImluaXRcIixsaW5rczpbbGlua10sdGVybWluYWw6ZmFsc2V9LHtuYW1lOlwianVtcFwiLGxpbmtzOltsaW5rXSx0ZXJtaW5hbDpmYWxzZX1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0MSA9IDIzO1xyXG4gICAgICAgIGxldCBrID0gMC44O1xyXG4gICAgICAgIGxldCBhZGFwdGl2ZVN0ZXBTdHJhdGVneSA9IG5ldyBBZGFwdGl2ZVN0ZXBOZXd0b24oMC45NSwxZS01KTtcclxuICAgICAgICBsZXQgZXZlbnREZXRlY3RvckNvbXBsZXggPSBuZXcgRXZlbnREZXRlY3Rpb25Db21wbGV4KCk7XHJcbiAgICAgICAgbGV0IGV2ZW50RGV0ZWN0b3JTaW1wbGUgPSBuZXcgRXZlbnREZXRlY3Rpb25TaW1wbGUoKTtcclxuICAgICAgICBsZXQgaW5pdGlhbFN0YXRlID0gbmV3IHZlY3RvcihbMTAsIDE1XSk7XHJcbiAgICAgICAgbGV0IGVkYWVlUks0U29sdmVyID0gbmV3IEVEQUVfUks0KDFlLTIpO1xyXG4gICAgICAgIGxldCBlZGFlSHlicmlkU29sdmVyID0gbmV3IEVEQUVIeWJyaWRTb2x2ZXIoZXZlbnREZXRlY3RvckNvbXBsZXgsYWRhcHRpdmVTdGVwU3RyYXRlZ3kpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBlZGFlU3lzdGVtID0gbmV3IEVEQUVKdW1waW5nQmFsbCgxMCxrKTtcclxuICAgICAgICBsZXQgc29sdXRpb24gPSBlZGFlSHlicmlkU29sdmVyLnNvbHZlKGluaXRpYWxTdGF0ZSwwLHQxLGVkYWVlUks0U29sdmVyLGVkYWVTeXN0ZW0pO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChzb2x1dGlvbi52YWx1ZXMsW1wieFwiLG51bGxdLFtdLFwiSnVtcGluZyBiYWxsIGVkYWUgY29tcGxleCB3aXRoIHN0ZXBcIik7XHJcbiAgICAgICAgZWRhZUh5YnJpZFNvbHZlciA9IG5ldyBFREFFSHlicmlkU29sdmVyKGV2ZW50RGV0ZWN0b3JTaW1wbGUsYWRhcHRpdmVTdGVwU3RyYXRlZ3kpO1xyXG4gICAgICAgIHNvbHV0aW9uID0gZWRhZUh5YnJpZFNvbHZlci5zb2x2ZShpbml0aWFsU3RhdGUsMCx0MSxlZGFlZVJLNFNvbHZlcixlZGFlU3lzdGVtKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoc29sdXRpb24udmFsdWVzLFtcInhcIixudWxsXSxbXSxcIkp1bXBpbmcgYmFsbCBlZGFlIHNpbXBsZSB3aXRoIHN0ZXBcIik7XHJcbiAgICAgICAgZWRhZUh5YnJpZFNvbHZlciA9IG5ldyBFREFFSHlicmlkU29sdmVyKGV2ZW50RGV0ZWN0b3JDb21wbGV4LG51bGwpO1xyXG4gICAgICAgIHNvbHV0aW9uID0gZWRhZUh5YnJpZFNvbHZlci5zb2x2ZShpbml0aWFsU3RhdGUsMCx0MSxlZGFlZVJLNFNvbHZlcixlZGFlU3lzdGVtKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoc29sdXRpb24udmFsdWVzLFtcInhcIixudWxsXSxbXSxcIkp1bXBpbmcgYmFsbCBlZGFlIGNvbXBsZXhcIik7XHJcbiAgICAgICAgZWRhZUh5YnJpZFNvbHZlciA9IG5ldyBFREFFSHlicmlkU29sdmVyKGV2ZW50RGV0ZWN0b3JTaW1wbGUsbnVsbCk7XHJcbiAgICAgICAgc29sdXRpb24gPSBlZGFlSHlicmlkU29sdmVyLnNvbHZlKGluaXRpYWxTdGF0ZSwwLHQxLGVkYWVlUks0U29sdmVyLGVkYWVTeXN0ZW0pO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChzb2x1dGlvbi52YWx1ZXMsW1wieFwiLG51bGxdLFtdLFwiSnVtcGluZyBiYWxsIGVkYWUgc2ltcGxlXCIpO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChnZXRBbmFsdHl0aWNKdW1waW5nQmFsbChpbml0aWFsU3RhdGUuZ2V0KDApLGluaXRpYWxTdGF0ZS5nZXQoMSksdDEsMC4xLGspLFtcInhcIl0sW10sXCJKdW1waW5nIGJhbGwgYW5hbHl0aWNhbFwiKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyB0ZXN0QWxnZWJyYWljKCk6dm9pZHtcclxuICAgICAgICBjbGFzcyBBbGdlYnJhaWNQcm9ibGVtIGltcGxlbWVudHMgSURBRVN5c3RlbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZih4OnZlY3RvcixkeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOnZlY3RvcntcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbTWF0aC5zaW4odCt6LmdldCgwKSktdCp6LmdldCgwKV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZGR4KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR4KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR6KCk6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMCwxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZ2R4KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXSwxLDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHooeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtNYXRoLmNvcyh0K3ouZ2V0KDApKS10XSwxLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF94KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuZ3RoX3ooKTpudW1iZXJ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdDAgPSAwLjU7XHJcbiAgICAgICAgbGV0IHQxID0gMC44O1xyXG4gICAgICAgIGxldCBpZGFlZUV1bGVyU29sdmVyID0gbmV3IElEQUVfRUV1bGVyKDAuMSxuZXcgTmV3dG9uU29sdmVyKDE2MCwwLjA1LDFlLTQsMC41KSk7XHJcbiAgICAgICAgbGV0IGlkYWVpRXVsZXJTb2x2ZXIgPSBuZXcgSURBRV9JRXVsZXIoMC4wNSxuZXcgTmV3dG9uU29sdmVyKDgwLDAuMDUsMWUtNCwwLjc1KSk7XHJcbiAgICAgICAgbGV0IHN5c3RlbSA9IG5ldyBBbGdlYnJhaWNQcm9ibGVtKCk7XHJcbiAgICAgICAgbGV0IElEQUVFU29sdXRpb24gPSBzb2x2ZUltcGxpY2l0KG5ldyB2ZWN0b3IoW10pLHZlY3Rvci5lbXB0eShzeXN0ZW0ubGVuZ3RoX3ooKSksdDAsdDEsaWRhZWVFdWxlclNvbHZlcixzeXN0ZW0pOyAgICAgXHJcbiAgICAgICAgbGV0IElEQUVJU29sdXRpb24gPSBzb2x2ZUltcGxpY2l0KG5ldyB2ZWN0b3IoW10pLHZlY3Rvci5lbXB0eShzeXN0ZW0ubGVuZ3RoX3ooKSksdDAsdDEsaWRhZWlFdWxlclNvbHZlcixzeXN0ZW0pO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChJREFFRVNvbHV0aW9uLFtdLFtcInpcIl0sXCJBbGdlYnJhaWMgcHJvYmxlbSBJREFFRVwiKTtcclxuICAgICAgICBUZXN0LnNob3dPdXRwdXQoSURBRUlTb2x1dGlvbixbXSxbXCJ6XCJdLFwiQWxnZWJyYWljIHByb2JsZW0gSURBRUlcIik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdGVzdEVEQUVDb21waWxlcigpOnZvaWR7XHJcbiAgICAgICAgdWkuY2xlYXJFcnJvcnMoKTtcclxuICAgICAgICBUZXN0LmluaXRQbG90KCk7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHVpLmdldFBhcmFtZXRlcnMoKTtcclxuICAgICAgICAgICAgLy9sZXQgdGV4dDpzdHJpbmcgPSAkKFwiI3RleHQtaW5wdXRcIikudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICBsZXQgdGV4dDpzdHJpbmcgPSB1aS5nZXRUZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBjb21waWxlciA9IG5ldyBEQUVDb21waWxlcigpO1xyXG4gICAgICAgICAgICBsZXQge3N5c3RlbSx4MCx4LHp9ID0gY29tcGlsZXIuY29tcGlsZUV4cGxpY2l0KHRleHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBzb2x2ZXIgPSB1aS5tZXRob2RzW3BhcmFtZXRlcnNbXCJkYWUtbWV0aG9kXCJdXS5lZGFlSW5pdChwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgbGV0IHQwID0gcGFyYW1ldGVycy50MDtcclxuICAgICAgICAgICAgbGV0IHQxID0gcGFyYW1ldGVycy50MCArIHBhcmFtZXRlcnMudGltZTtcclxuICAgICAgICAgICAgbGV0IHNvbHV0aW9uID0gc29sdmVFeHBsaWNpdCh4MCx0MCx0MSxzb2x2ZXIsc3lzdGVtKTtcclxuICAgICAgICAgICAgVGVzdC5zaG93T3V0cHV0KHNvbHV0aW9uLHgseixcIlRlc3QgZWRhZSBjb21waWxlclwiKTtcclxuICAgICAgICAgICAgdWkub3BlblRhYihcInJlc3VsdHNcIik7XHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBoYW5kbGVFcnJvcnMoZSk7XHJcbiAgICAgICAgICAgIHVpLm9wZW5UYWIoXCJtYWluXCIpO1xyXG4gICAgICAgICAgICB1aS5vcGVuVGFiKFwiZXJyb3JzLXRhYlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdGVzdElEQUVDb21waWxlcigpOnZvaWR7XHJcbiAgICAgICAgdWkuY2xlYXJFcnJvcnMoKTtcclxuICAgICAgICBUZXN0LmluaXRQbG90KCk7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHVpLmdldFBhcmFtZXRlcnMoKTtcclxuICAgICAgICAgICAgLy9sZXQgdGV4dDpzdHJpbmcgPSAkKFwiI3RleHQtaW5wdXRcIikudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICBsZXQgdGV4dDpzdHJpbmcgPSB1aS5nZXRUZXh0KCk7XHJcbiAgICAgICAgICAgIGxldCBjb21waWxlciA9IG5ldyBEQUVDb21waWxlcigpO1xyXG4gICAgICAgICAgICBsZXQge3N5c3RlbSx4MCx4LHosejB9ID0gY29tcGlsZXIuY29tcGlsZUltcGxpY2l0KHRleHQpO1xyXG4gICAgICAgICAgICBsZXQgc29sdmVyID0gdWkubWV0aG9kc1twYXJhbWV0ZXJzW1wiZGFlLW1ldGhvZFwiXV0uaWRhZUluaXQocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIGxldCB0MCA9IHBhcmFtZXRlcnMudDA7XHJcbiAgICAgICAgICAgIGxldCB0MSA9IHBhcmFtZXRlcnMudDAgKyBwYXJhbWV0ZXJzLnRpbWU7XHJcbiAgICAgICAgICAgIGxldCBzb2x1dGlvbiA9IHNvbHZlSW1wbGljaXQoeDAsejAsdDAsdDEsc29sdmVyLHN5c3RlbSk7XHJcbiAgICAgICAgICAgIFRlc3Quc2hvd091dHB1dChzb2x1dGlvbix4LHosXCJUZXN0IGlkYWUgY29tcGlsZXJcIik7XHJcbiAgICAgICAgICAgIHVpLm9wZW5UYWIoXCJyZXN1bHRzXCIpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaGFuZGxlRXJyb3JzKGUpO1xyXG4gICAgICAgICAgICB1aS5vcGVuVGFiKFwibWFpblwiKTtcclxuICAgICAgICAgICAgdWkub3BlblRhYihcImVycm9ycy10YWJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RFeHBsaWNpdEh5YnJpZENvbXBpbGVyKCk6dm9pZHtcclxuICAgICAgICB1aS5jbGVhckVycm9ycygpO1xyXG4gICAgICAgIFRlc3QuaW5pdFBsb3QoKTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vbGV0IHRleHQ6c3RyaW5nID0gJChcIiN0ZXh0LWlucHV0XCIpLnZhbCgpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgbGV0IHRleHQ6c3RyaW5nID0gdWkuZ2V0VGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHVpLmdldFBhcmFtZXRlcnMoKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBpbGVyID0gbmV3IEh5YnJpZFN5c3RlbUNvbXBpbGVyKHBhcmFtZXRlcnNbXCJ6Yy1ib3JkZXItdG9sXCJdKTtcclxuICAgICAgICAgICAgbGV0IHN5c0RlZiA9IGNvbXBpbGVyLmNvbXBpbGVFeHBsaWNpdCh0ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0MCA9IHBhcmFtZXRlcnMudDA7XHJcbiAgICAgICAgICAgIGxldCB0MSA9IHQwICsgcGFyYW1ldGVycy50aW1lO1xyXG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gdWkubWV0aG9kc1twYXJhbWV0ZXJzW1wiZGFlLW1ldGhvZFwiXV0uZWRhZUluaXQocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIGxldCBzb2x2ZXIgPSB1aS5nZXRFZGFlU29sdmVyKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICBsZXQgc29sdXRpb24gPSBzb2x2ZXIuc29sdmUoc3lzRGVmLngwLHQwLHQxLG1ldGhvZCxzeXNEZWYuc3lzdGVtKTtcclxuICAgICAgICAgICAgVGVzdC5zaG93T3V0cHV0KHNvbHV0aW9uLnZhbHVlcyxzeXNEZWYueCxzeXNEZWYueixcIlRlc3QgZXhwbGljaXQgaHlicmlkIGNvbXBpbGVyXCIpO1xyXG4gICAgICAgICAgICAvL3VpLnBsb3RTb2x1dGlvbihzb2x1dGlvbixzeXNEZWYueCxzeXNEZWYueik7XHJcbiAgICAgICAgICAgIHVpLm9wZW5UYWIoXCJyZXN1bHRzXCIpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaGFuZGxlRXJyb3JzKGUpO1xyXG4gICAgICAgICAgICB1aS5vcGVuVGFiKFwibWFpblwiKTtcclxuICAgICAgICAgICAgdWkub3BlblRhYihcImVycm9ycy10YWJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RJbXBsaWNpdEh5YnJpZENvbXBpbGVyKCk6dm9pZHtcclxuICAgICAgICB1aS5jbGVhckVycm9ycygpO1xyXG4gICAgICAgIFRlc3QuaW5pdFBsb3QoKTtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIC8vbGV0IHRleHQ6c3RyaW5nID0gJChcIiN0ZXh0LWlucHV0XCIpLnZhbCgpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgbGV0IHRleHQ6c3RyaW5nID0gdWkuZ2V0VGV4dCgpO1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1ldGVycyA9IHVpLmdldFBhcmFtZXRlcnMoKTtcclxuICAgICAgICAgICAgbGV0IGNvbXBpbGVyID0gbmV3IEh5YnJpZFN5c3RlbUNvbXBpbGVyKHBhcmFtZXRlcnNbXCJ6Yy1ib3JkZXItdG9sXCJdKTtcclxuICAgICAgICAgICAgbGV0IHN5c0RlZiA9IGNvbXBpbGVyLmNvbXBpbGVJbXBsaWNpdCh0ZXh0KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgdDAgPSBwYXJhbWV0ZXJzLnQwO1xyXG4gICAgICAgICAgICBsZXQgdDEgPSB0MCArIHBhcmFtZXRlcnMudGltZTtcclxuICAgICAgICAgICAgbGV0IG1ldGhvZCA9IHVpLm1ldGhvZHNbcGFyYW1ldGVyc1tcImRhZS1tZXRob2RcIl1dLmlkYWVJbml0KHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICBsZXQgc29sdmVyID0gdWkuZ2V0SWRhZVNvbHZlcihwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgbGV0IHNvbHV0aW9uID0gc29sdmVyLnNvbHZlKHN5c0RlZi54MCxzeXNEZWYuejAsdDAsdDEsbWV0aG9kLHN5c0RlZi5zeXN0ZW0pO1xyXG4gICAgICAgICAgICBUZXN0LnNob3dPdXRwdXQoc29sdXRpb24udmFsdWVzLHN5c0RlZi54LHN5c0RlZi56LFwiVGVzdCBleHBsaWNpdCBoeWJyaWQgY29tcGlsZXJcIik7XHJcbiAgICAgICAgICAgIHVpLm9wZW5UYWIoXCJyZXN1bHRzXCIpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaGFuZGxlRXJyb3JzKGUpO1xyXG4gICAgICAgICAgICB1aS5vcGVuVGFiKFwibWFpblwiKTtcclxuICAgICAgICAgICAgdWkub3BlblRhYihcImVycm9ycy10YWJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RXZWlzc2luZ2VySW1wbGljaXQoKXtcclxuICAgICAgICBjbGFzcyBJV2Vpc3NpbmdlciBpbXBsZW1lbnRzIElEQUVTeXN0ZW17XHJcbiAgICAgICAgICAgIGYoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ggPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfZHggPSBkeC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXHJcbiAgICAgICAgICAgICAgICAgICAgdCpNYXRoLnBvdyhfeCwyKSpNYXRoLnBvdyhfZHgsMyktXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coX3gsMykqTWF0aC5wb3coX2R4LDIpK1xyXG4gICAgICAgICAgICAgICAgICAgIHQqKHQqdCsxKSpfZHgtdCp0Kl94XHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ogPSB6LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtfeiAtIE1hdGguc3FydCh0KnQrMC41KV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZHgoeDp2ZWN0b3IsZHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3ggPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCBfZHggPSBkeC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgMip0Kl94Kk1hdGgucG93KF9keCwzKS0zKk1hdGgucG93KF94Kl9keCwyKS10KnQgXHJcbiAgICAgICAgICAgICAgICAgICAgXSwxLDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRmZGR4KHg6dmVjdG9yLGR4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgbGV0IF94ID0geC5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgX2R4ID0gZHguZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW1xyXG4gICAgICAgICAgICAgICAgICAgIDMqdCpNYXRoLnBvdyhfeCpfZHgsMiktMipNYXRoLnBvdyhfeCwzKSpfZHgrdCoodCp0KzEpXHJcbiAgICAgICAgICAgICAgICBdLDEsMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGZkeih4OnZlY3RvcixkeDp2ZWN0b3Isejp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgbWF0cml4KFtdLDAsMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeih4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoWzFdLDEsMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGdkeCh4OnZlY3Rvcix6OnZlY3Rvcix0Om51bWJlcik6bWF0cml4e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW10sMSwwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeCgpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF96KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHQwID0gMDtcclxuICAgICAgICBsZXQgdDEgPSAxO1xyXG4gICAgICAgIGxldCBzeXN0ZW0gPSBuZXcgSVdlaXNzaW5nZXIoKTtcclxuICAgICAgICBsZXQgc29sdmVyID0gbmV3IElEQUVfUks0KDAuMDEsbmV3IE5ld3RvblNvbHZlcigyMCwxZS0zLDFlLTUsMC45NSwzKSk7XHJcbiAgICAgICAgbGV0IHNvbHV0aW9uID0gc29sdmVJbXBsaWNpdChuZXcgdmVjdG9yKFtNYXRoLnNxcnQoMy8yKV0pLG5ldyB2ZWN0b3IoWzBdKSx0MCx0MSxzb2x2ZXIsc3lzdGVtKTsgIFxyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChzb2x1dGlvbixbXCJ4XCJdLFtcInpcIl0sXCJJbXBsaWNpdCB3ZWlzc2luZ2VyXCIpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRlc3RBcmVuc3RvcmZPcmJpdChzb2x2ZXI6RURBRVNvbHZlcil7XHJcbiAgICAgICAgY2xhc3MgQXJlbnN0b3JmT3JiaXQgaW1wbGVtZW50cyBFREFFU3lzdGVte1xyXG4gICAgICAgICAgICByZWFkb25seSBtMTpudW1iZXI7XHJcbiAgICAgICAgICAgIHJlYWRvbmx5IG0yOm51bWJlcjtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubTEgPSAwLjAxMjI3NzQ3MTtcclxuICAgICAgICAgICAgICAgIHRoaXMubTIgPSAxLjAtdGhpcy5tMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmKHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgeDEgPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCB4MiA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkxID0geC5nZXQoMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgeTIgPSB4LmdldCgzKTtcclxuICAgICAgICAgICAgICAgIGxldCBkMSA9IHouZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGQyID0gei5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHZlY3RvcihbXHJcbiAgICAgICAgICAgICAgICAgICAgeDIsXHJcbiAgICAgICAgICAgICAgICAgICAgeDEgKyAyKnkyIC0gdGhpcy5tMiooeDErdGhpcy5tMSkvZDEtdGhpcy5tMSooeDEtdGhpcy5tMikvZDIsXHJcbiAgICAgICAgICAgICAgICAgICAgeTIsXHJcbiAgICAgICAgICAgICAgICAgICAgeTEgLSAyKngyLXRoaXMubTIqeTEvZDEgLSB0aGlzLm0xKnkxL2QyXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnKHg6dmVjdG9yLHQ6bnVtYmVyKTp2ZWN0b3J7XHJcbiAgICAgICAgICAgICAgICBsZXQgeDEgPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCB4MiA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkxID0geC5nZXQoMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgeTIgPSB4LmdldCgzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdmVjdG9yKFtcclxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhNYXRoLnBvdyh4MSt0aGlzLm0xLDIpK01hdGgucG93KHkxLDIpLDEuNSksXHJcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coTWF0aC5wb3coeDEtdGhpcy5tMiwyKStNYXRoLnBvdyh5MSwyKSwxLjUpXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR4KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICBsZXQgeDEgPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCB4MiA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkxID0geC5nZXQoMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgeTIgPSB4LmdldCgzKTtcclxuICAgICAgICAgICAgICAgIGxldCBkMSA9IHouZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGQyID0gei5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChcclxuICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsMSwwLDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEtdGhpcy5tMi9kMS10aGlzLm0xL2QyLDAsMCwyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLDAsMCwxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLDIsMS10aGlzLm0yL2QxLXRoaXMubTEvZDIsMFxyXG4gICAgICAgICAgICAgICAgICAgIF0sNCw0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZmR6KHg6dmVjdG9yLHo6dmVjdG9yLHQ6bnVtYmVyKTptYXRyaXh7XHJcbiAgICAgICAgICAgICAgICBsZXQgeDEgPSB4LmdldCgwKTtcclxuICAgICAgICAgICAgICAgIGxldCB4MiA9IHguZ2V0KDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHkxID0geC5nZXQoMik7XHJcbiAgICAgICAgICAgICAgICBsZXQgeTIgPSB4LmdldCgzKTtcclxuICAgICAgICAgICAgICAgIGxldCBkMSA9IHouZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGQyID0gei5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IG1hdHJpeChbXHJcbiAgICAgICAgICAgICAgICAgICAgMCwwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubTIqKHgxK3RoaXMubTEpLyhkMSpkMSksdGhpcy5tMSooeDEtdGhpcy5tMikvKGQyKmQyKSxcclxuICAgICAgICAgICAgICAgICAgICAwLDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tMip5MS8oZDEqZDEpLHRoaXMubTEqeTEvKGQyKmQyKVxyXG4gICAgICAgICAgICAgICAgXSwyLDQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRnZHgoeDp2ZWN0b3IsdDpudW1iZXIpOm1hdHJpeHtcclxuICAgICAgICAgICAgICAgIGxldCB4MSA9IHguZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgbGV0IHgyID0geC5nZXQoMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgeTEgPSB4LmdldCgyKTtcclxuICAgICAgICAgICAgICAgIGxldCB5MiA9IHguZ2V0KDMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBtYXRyaXgoW1xyXG4gICAgICAgICAgICAgICAgICAgIDMqTWF0aC5wb3coTWF0aC5wb3coeDErdGhpcy5tMSwyKStNYXRoLnBvdyh5MSwyKSwwLjUpKih4MSt0aGlzLm0xKSwwLDMqTWF0aC5wb3coTWF0aC5wb3coeDErdGhpcy5tMSwyKStNYXRoLnBvdyh5MSwyKSwwLjUpKnkxLDAsXHJcbiAgICAgICAgICAgICAgICAgICAgMypNYXRoLnBvdyhNYXRoLnBvdyh4MS10aGlzLm0xLDIpK01hdGgucG93KHkxLDIpLDAuNSkqKHgxLXRoaXMubTEpLDAsMypNYXRoLnBvdyhNYXRoLnBvdyh4MS10aGlzLm0xLDIpK01hdGgucG93KHkxLDIpLDAuNSkqeTEsMFxyXG5cclxuICAgICAgICAgICAgICAgIF0sNCwyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW5ndGhfeCgpOm51bWJlcntcclxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbmd0aF96KCk6bnVtYmVye1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgVGVzdC5pbml0UGxvdCgpO1xyXG4gICAgICAgIGxldCB0MCA9IDA7XHJcbiAgICAgICAgbGV0IHQxID0gMTcuMDY1MjE2NTYwMTU3OTYyNTU4ODkxNzIwNjI0OTtcclxuICAgICAgICBsZXQgc3lzdGVtID0gbmV3IEFyZW5zdG9yZk9yYml0KCk7XHJcbiAgICAgICAgY29uc3QgeDEgPSAwLjk5NDtcclxuICAgICAgICBjb25zdCB4MiA9IDA7XHJcbiAgICAgICAgY29uc3QgeTEgPSAwO1xyXG4gICAgICAgIGNvbnN0IHkyID0gLTIuMDAxNTg1MTA2Mzc5MDgyNTIyNDA1Mzc4NjIyMjQ7XHJcbiAgICAgICAgbGV0IHNvbHV0aW9uID0gc29sdmVFeHBsaWNpdChuZXcgdmVjdG9yKFt4MSx4Mix5MSx5Ml0pLHQwLHQxLHNvbHZlcixzeXN0ZW0pOyAgXHJcbiAgICAgICAgVGVzdC5zaG93T3V0cHV0KHNvbHV0aW9uLFtcIngxXCIsXCJ4MlwiLFwieTFcIixcInkyXCJdLFtcImQxXCIsXCJkMlwiXSxcIkFyZW50b3JmXCIpO1xyXG4gICAgICAgIHVpLnBsb3Qoc29sdXRpb24ubWFwKChpdGVtKT0+aXRlbS54LmdldCgyKSksc29sdXRpb24ubWFwKChpdGVtKT0+aXRlbS54LmdldCgwKSksXCJBcmVudG9yZiBwaGFzZVwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCBhbnRscjQsIHsgTGV4ZXIsIFBhcnNlciB9IGZyb20gXCJhbnRscjQvaW5kZXhcIjtcclxuaW1wb3J0IG9kZUdyYW1tYXJMZXhlciBmcm9tIFwiLi4vZ3JhbW1hci9hbnRsck91dHB1dC9vZGVHcmFtbWFyTGV4ZXIuanNcIjtcclxuaW1wb3J0IG9kZUdyYW1tYXJQYXJzZXIgZnJvbSBcIi4uL2dyYW1tYXIvYW50bHJPdXRwdXQvb2RlR3JhbW1hclBhcnNlci5qc1wiO1xyXG5pbXBvcnQgRXJyb3JMaXN0ZW5lciBmcm9tIFwiLi4vY29tcGlsZXIvZXJyb3JMaXN0ZW5lclwiO1xyXG5pbXBvcnQgVmlzaXRvciBmcm9tIFwiLi4vY29tcGlsZXIvdmlzaXRvclwiO1xyXG5pbXBvcnQgRXJyb3JNZXNzYWdlIGZyb20gXCIuLi9jb21waWxlci9lcnJvclwiO1xyXG5pbXBvcnQgeyBDb21waWxlckVycm9yIH0gZnJvbSBcIi4uL2NvbXBpbGVyL2NvbXBpbGVyRXJyb3JcIjtcclxuaW1wb3J0IHsgY29tcGlsZUV4cHJlc3Npb24sIEV4cENvbXBpbGVyQ29udGV4dCB9IGZyb20gXCIuLi9jb21waWxlci9leHByZXNzaW9uQ29tcGlsZXJcIjtcclxuaW1wb3J0IHsgRXhwcmVzc2lvbiB9IGZyb20gXCIuLi9jb21waWxlci9leHByZXNzaW9uXCI7XHJcbmltcG9ydCB7IGhhbmRsZUVycm9ycywgdWkgfSBmcm9tIFwiLi4vdWlcIjtcclxuaW1wb3J0IHsgIHBsb3RFeHByZXNzaW9uLCBUZXN0IH0gZnJvbSBcIi4vdGVzdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVUZXh0RXhwcmVzc2lvbih0ZXh0OnN0cmluZyk6RXhwcmVzc2lvbntcclxuICAgIGxldCBlcnJvcnM6RXJyb3JNZXNzYWdlW10gPSBbXTtcclxuXHJcbiAgICB2YXIgY2hhcnMgPSBuZXcgYW50bHI0LklucHV0U3RyZWFtKHRleHQpO1xyXG4gICAgdmFyIGxleGVyID0gbmV3IG9kZUdyYW1tYXJMZXhlci5vZGVHcmFtbWFyTGV4ZXIoY2hhcnMpO1xyXG4gICAgKGxleGVyIGFzIHVua25vd24gYXMgTGV4ZXIpLnJlbW92ZUVycm9yTGlzdGVuZXJzKCk7XHJcbiAgICB2YXIgbGlzdGVuZXIgPSBuZXcgRXJyb3JMaXN0ZW5lcihlcnJvcnMpO1xyXG4gICAgKGxleGVyIGFzIHVua25vd24gYXMgTGV4ZXIpLmFkZEVycm9yTGlzdGVuZXIobGlzdGVuZXIpO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBsZXhlci5zdHJpY3RNb2RlID0gZmFsc2U7XHJcbiAgICB2YXIgdG9rZW5zID0gbmV3IGFudGxyNC5Db21tb25Ub2tlblN0cmVhbShsZXhlciBhcyB1bmtub3duIGFzIExleGVyKTtcclxuICAgIHZhciBwYXJzZXIgPSBuZXcgb2RlR3JhbW1hclBhcnNlci5vZGVHcmFtbWFyUGFyc2VyKHRva2Vucyk7XHJcbiAgICBcclxuICAgIChwYXJzZXIgYXMgdW5rbm93biBhcyBQYXJzZXIpLnJlbW92ZUVycm9yTGlzdGVuZXJzKCk7XHJcbiAgICAocGFyc2VyIGFzIHVua25vd24gYXMgUGFyc2VyKS5hZGRFcnJvckxpc3RlbmVyKGxpc3RlbmVyKTtcclxuICAgIHZhciB2aXNpdG9yID0gbmV3IFZpc2l0b3IoKTtcclxuICAgIChwYXJzZXIgYXMgdW5rbm93biBhcyBQYXJzZXIpLmJ1aWxkUGFyc2VUcmVlcyA9IHRydWU7XHJcbiAgICB2YXIgdHJlZSA9IHBhcnNlci5leHByZXNzaW9uKDApO1xyXG4gICAgaWYoZXJyb3JzLmxlbmd0aD4wKXtcclxuICAgICAgICB0aHJvdyBuZXcgQ29tcGlsZXJFcnJvcihlcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgbGV0IGV4cERlZiA9IHZpc2l0b3Iuc3RhcnRFeHByZXNzaW9uKHRyZWUsIGxpc3RlbmVyKTtcclxuICAgIGlmKGVycm9ycy5sZW5ndGg+MCl7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBpbGVyRXJyb3IoZXJyb3JzKTtcclxuICAgIH1cclxuICAgIGxldCBjb250ZXh0ID0gbmV3IEV4cENvbXBpbGVyQ29udGV4dCgpO1xyXG4gICAgY29udGV4dC5pbmRpY2llcyA9IHtcInRcIjowfTtcclxuICAgIGNvbnRleHQuZXJyb3JzID0gZXJyb3JzO1xyXG4gICAgbGV0IGV4cHJlc3Npb24gPSBjb21waWxlRXhwcmVzc2lvbihleHBEZWYsY29udGV4dCkuc2ltcGxpZnkoKTtcclxuICAgIGlmKGVycm9ycy5sZW5ndGg+MCl7XHJcbiAgICAgICAgdGhyb3cgbmV3IENvbXBpbGVyRXJyb3IoZXJyb3JzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBleHByZXNzaW9uO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdEV4cHJlc3Npb24oKXtcclxuICAgIHVpLmNsZWFyRXJyb3JzKCk7XHJcbiAgICB1aS5jbGVhckxvZygpO1xyXG4gICAgVGVzdC5pbml0UGxvdCgpO1xyXG4gICAgLy9sZXQgdGV4dDpzdHJpbmcgPSAkKFwiI3RleHQtaW5wdXRcIikudmFsKCkgYXMgc3RyaW5nO1xyXG4gICAgbGV0IHRleHQ6c3RyaW5nID0gdWkuZ2V0VGV4dCgpO1xyXG4gICAgbGV0IHBhcmFtZXRlcnMgPSB1aS5nZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICBsZXQgdDAgPSBwYXJhbWV0ZXJzLnQwO1xyXG4gICAgbGV0IHQxID0gdDAgKyBwYXJhbWV0ZXJzLnRpbWU7XHJcbiAgICBsZXQgZHQgPSBwYXJhbWV0ZXJzLnN0ZXA7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb246RXhwcmVzc2lvbiA9IGNvbXBpbGVUZXh0RXhwcmVzc2lvbih0ZXh0KTtcclxuICAgICAgICB1aS5hZGRMb2dNZXNzYWdlKGBGdW5jdGlvbiBleHByZXNzaW9uOiAke2V4cHJlc3Npb24ucHJpbnQoKX1gKTtcclxuICAgICAgICBwbG90RXhwcmVzc2lvbih0MCx0MSxkdCxleHByZXNzaW9uLFwiZXhwcmVzc2lvblwiKTtcclxuICAgICAgICB1aS5vcGVuVGFiKFwicmVzdWx0c1wiKTtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICBoYW5kbGVFcnJvcnMoZSk7XHJcbiAgICAgICAgdWkub3BlblRhYihcIm1haW5cIik7XHJcbiAgICAgICAgdWkub3BlblRhYihcImVycm9ycy10YWJcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGVzdFN5bWJvbGljRGVyaXZhdGl2ZSgpe1xyXG4gICAgdWkuY2xlYXJFcnJvcnMoKTtcclxuICAgIHVpLmNsZWFyTG9nKCk7XHJcbiAgICBUZXN0LmluaXRQbG90KCk7XHJcbiAgICAvL2xldCB0ZXh0OnN0cmluZyA9ICQoXCIjdGV4dC1pbnB1dFwiKS52YWwoKSBhcyBzdHJpbmc7XHJcbiAgICBsZXQgdGV4dDpzdHJpbmcgPSB1aS5nZXRUZXh0KCk7XHJcbiAgICBsZXQgcGFyYW1ldGVycyA9IHVpLmdldFBhcmFtZXRlcnMoKTtcclxuICAgIGxldCB0MCA9IHBhcmFtZXRlcnMudDA7XHJcbiAgICBsZXQgdDEgPSB0MCArIHBhcmFtZXRlcnMudGltZTtcclxuICAgIGxldCBkdCA9IHBhcmFtZXRlcnMuc3RlcDtcclxuICAgIHRyeXtcclxuICAgICAgICBsZXQgZXhwcmVzc2lvbjpFeHByZXNzaW9uID0gY29tcGlsZVRleHRFeHByZXNzaW9uKHRleHQpO1xyXG4gICAgICAgIGxldCBkZXJpdmF0aXZlOkV4cHJlc3Npb24gPSBleHByZXNzaW9uLmRpZmZlcmVudGlhdGUoXCJ0XCIsMC4wMDEpLnNpbXBsaWZ5KCk7XHJcbiAgICAgICAgdWkuYWRkTG9nTWVzc2FnZShgRGVyaXZhdGl2ZSBleHByZXNzaW9uOiAke2Rlcml2YXRpdmUucHJpbnQoKX1gKTtcclxuICAgICAgICBwbG90RXhwcmVzc2lvbih0MCx0MSxkdCxleHByZXNzaW9uLFwiZXhwcmVzc2lvblwiKTtcclxuICAgICAgICBwbG90RXhwcmVzc2lvbih0MCx0MSxkdCxkZXJpdmF0aXZlLFwiZGVyaXZhdGl2ZVwiKTtcclxuICAgICAgICB1aS5vcGVuVGFiKFwicmVzdWx0c1wiKTtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICBoYW5kbGVFcnJvcnMoZSk7XHJcbiAgICAgICAgdWkub3BlblRhYihcIm1haW5cIik7XHJcbiAgICAgICAgdWkub3BlblRhYihcImVycm9ycy10YWJcIik7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBoYW5kbGVFcnJvcnMsIHVpIH0gZnJvbSBcIi4uL3VpXCI7XHJcbmltcG9ydCB7IFRlc3QgfSBmcm9tIFwiLi90ZXN0XCI7XHJcbmltcG9ydCB7IElTaW1wbGlmaWNhdGlvbkFsZ29yaXRobSB9IGZyb20gXCIuLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL0lTaW1wbGlmaWNhdGlvbkFsZ29yaXRobVwiO1xyXG5pbXBvcnQgeyBEb3VnbGFzUGV1Y2tlclNpbXBsaWZpY2F0aW9uIH0gZnJvbSBcIi4uL2N1cnZlU2ltcGxpZmljYXRpb24vZG91Z2xhc1BldWNrZXJTaW1wbGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBQZXJwZW5kaWN1bGFyRGlzdGFuY2VTaW1wbGlmaWNhdGlvbiB9IGZyb20gXCIuLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL3BlcnBlbmRpY3VsYXJEaXN0YW5jZVNpbXBsaWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IE1heFBvaW50c1NpbXBsaWZpY2F0aW9uIH0gZnJvbSBcIi4uL2N1cnZlU2ltcGxpZmljYXRpb24vbWF4UG9pbnRzU2ltcGxpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgUmFkaWFsRGlzdGFuY2VTaW1wbGlmaWNhdGlvbiB9IGZyb20gXCIuLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL3JhZGlhbERpc3RhbmNlU2ltcGxpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgTGFuZ1NpbXBsaWZpY2F0aW9uIH0gZnJvbSBcIi4uL2N1cnZlU2ltcGxpZmljYXRpb24vbGFuZ1NpbXBsaWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFJldW1hbm5XaXRrYW1TaW1wbGlmaWNhdGlvbiB9IGZyb20gXCIuLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL3JldW1hbm5XaXRrYW1TaW1wbGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBPcGhlaW1TaW1wbGlmaWNhdGlvbiB9IGZyb20gXCIuLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL29waGVpbVNpbXBsaWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IERvdWdsYXNQZXVja2VyTlNpbXBsaWZpY2F0aW9uIH0gZnJvbSBcIi4uL2N1cnZlU2ltcGxpZmljYXRpb24vZG91Z2xhc1BldWNrZXJOU2ltcGxpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgTnRoUG9pbnRTaW1wbGlmaWNhdGlvbiB9IGZyb20gXCIuLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL250aFBvaW50U2ltcGxpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgREFFVmVjdG9yIH0gZnJvbSBcIi4uL2RhZS9kYWVWZWN0b3JcIjtcclxuaW1wb3J0IHsgdmVjdG9yIH0gZnJvbSBcIi4uL21hdGgvdmVjdG9yXCI7XHJcbmltcG9ydCB7IEV4cHJlc3Npb24gfSBmcm9tIFwiLi4vY29tcGlsZXIvZXhwcmVzc2lvblwiO1xyXG5pbXBvcnQgeyBjb21waWxlVGV4dEV4cHJlc3Npb24gfSBmcm9tIFwiLi90ZXN0RXhwcmVzc2lvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXN0U2ltcGxpZmljYXRpb24oKTp2b2lke1xyXG4gICAgdWkuY2xlYXJFcnJvcnMoKTtcclxuICAgIHVpLmNsZWFyTG9nKCk7XHJcblxyXG4gICAgVGVzdC5pbml0UGxvdCgpO1xyXG4gICAgbGV0IHBhcmFtZXRlcnMgPSB1aS5nZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICBsZXQgbWV0aG9kczp7YWxnOklTaW1wbGlmaWNhdGlvbkFsZ29yaXRobSxuYW1lOnN0cmluZ31bXSA9IFtcclxuICAgICAgICB7YWxnOm5ldyBEb3VnbGFzUGV1Y2tlclNpbXBsaWZpY2F0aW9uKHBhcmFtZXRlcnNbXCJzaW1wLXRvbFwiXSksbmFtZTpcImRvdWdsYXNQZXVja2VyXCJ9LFxyXG4gICAgICAgIHthbGc6bmV3IFBlcnBlbmRpY3VsYXJEaXN0YW5jZVNpbXBsaWZpY2F0aW9uKHBhcmFtZXRlcnNbXCJzaW1wLXRvbFwiXSksbmFtZTpcInBlcnBEaXN0XCJ9LFxyXG4gICAgICAgIHthbGc6bmV3IE1heFBvaW50c1NpbXBsaWZpY2F0aW9uKHBhcmFtZXRlcnNbXCJzaW1wLW1heC1wb2ludHNcIl0pLG5hbWU6XCJtYXhQb2ludHNcIn0sXHJcbiAgICAgICAge2FsZzpuZXcgUmFkaWFsRGlzdGFuY2VTaW1wbGlmaWNhdGlvbihwYXJhbWV0ZXJzW1wic2ltcC10b2xcIl0pLG5hbWU6XCJyYWREaXN0XCJ9LFxyXG4gICAgICAgIHthbGc6bmV3IExhbmdTaW1wbGlmaWNhdGlvbihwYXJhbWV0ZXJzW1wic2ltcC10b2xcIl0scGFyYW1ldGVyc1tcInNpbXAtbG9vay1haGVhZFwiXSksbmFtZTpcImxhbmdcIn0sXHJcbiAgICAgICAge2FsZzpuZXcgUmV1bWFubldpdGthbVNpbXBsaWZpY2F0aW9uKHBhcmFtZXRlcnNbXCJzaW1wLXRvbFwiXSksbmFtZTpcInJldW1hbm5XaXRrYW1cIn0sXHJcbiAgICAgICAge2FsZzpuZXcgT3BoZWltU2ltcGxpZmljYXRpb24ocGFyYW1ldGVyc1tcInNpbXAtdG9sXCJdLHBhcmFtZXRlcnNbXCJzaW1wLW1heC10b2xcIl0pLG5hbWU6XCJvcGhlaW1cIn0sXHJcbiAgICAgICAge2FsZzpuZXcgRG91Z2xhc1BldWNrZXJOU2ltcGxpZmljYXRpb24ocGFyYW1ldGVyc1tcInNpbXAtbWF4LXBvaW50c1wiXSksbmFtZTpcImRvdWdsYXNQZXVja2VyTlwifSxcclxuICAgICAgICB7YWxnOm5ldyBOdGhQb2ludFNpbXBsaWZpY2F0aW9uKHBhcmFtZXRlcnNbXCJzaW1wLW50aC1wb2ludFwiXSksbmFtZTpcIk50aCBwb2ludCBzaW1wbGlmaWNhdGlvblwifVxyXG4gICAgXTtcclxuICAgIHRyeXtcclxuICAgICAgICBsZXQgdGV4dDpzdHJpbmcgPSB1aS5nZXRUZXh0KCk7XHJcbiAgICAgICAgbGV0IGV4cHJlc3Npb246RXhwcmVzc2lvbiA9IGNvbXBpbGVUZXh0RXhwcmVzc2lvbih0ZXh0KTtcclxuICAgICAgICB1aS5hZGRMb2dNZXNzYWdlKGBGdW5jdGlvbiBleHByZXNzaW9uOiAke2V4cHJlc3Npb24ucHJpbnQoKX1gKTtcclxuICAgIGxldCBkYXRhOkRBRVZlY3RvcltdID0gW107XHJcbiAgICBmb3IobGV0IGk9MDtpPDEwMDA7aSsrKXtcclxuICAgICAgICBsZXQgdCA9IGkqMC4wMTtcclxuICAgICAgICBsZXQgeCA9IGV4cHJlc3Npb24uZXhlY3V0ZShbdF0pO1xyXG4gICAgICAgIC8vbGV0IHggPSBNYXRoLmNvcyh0KjYuMCkqTWF0aC5leHAoLTIuKnQpO1xyXG4gICAgICAgIGRhdGEucHVzaChuZXcgREFFVmVjdG9yKG5ldyB2ZWN0b3IoW3hdKSxuZXcgdmVjdG9yKFtdKSx0KSk7XHJcbiAgICB9XHJcbiAgICBUZXN0LnNob3dPdXRwdXQoZGF0YSxbXCJ0XCJdLFtdLFwiZih4KSBvdXRwdXRcIik7XHJcbiAgICBmb3IobGV0IGk9MDtpPG1ldGhvZHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgbGV0IHJlcyA9IG1ldGhvZHNbaV0uYWxnLnNpbXBsaWZ5KGRhdGEpO1xyXG4gICAgICAgIFRlc3Quc2hvd091dHB1dChyZXMsW1widFwiXSxbXSxtZXRob2RzW2ldLm5hbWUpO1xyXG4gICAgICAgIHVpLmFkZExvZ01lc3NhZ2UoYCR7bWV0aG9kc1tpXS5uYW1lfTogJHtyZXMubGVuZ3RofSBwb2ludHNgKTtcclxuICAgIH1cclxuICAgIHVpLm9wZW5UYWIoXCJyZXN1bHRzXCIpO1xyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICAgIGhhbmRsZUVycm9ycyhlKTtcclxuICAgICAgICB1aS5vcGVuVGFiKFwibWFpblwiKTtcclxuICAgICAgICB1aS5vcGVuVGFiKFwiZXJyb3JzLXRhYlwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7ZXhhbXBsZXN9IGZyb20gXCIuL2V4YW1wbGVzXCI7XHJcbmltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcclxuaW1wb3J0IHsgREFFVmVjdG9yIH0gZnJvbSBcIi4vZGFlL2RhZVZlY3RvclwiO1xyXG5pbXBvcnQgRXJyb3JNZXNzYWdlIGZyb20gXCIuL2NvbXBpbGVyL2Vycm9yXCI7XHJcbmltcG9ydCB7IEVEQUVIeWJyaWRTb2x2ZXJ9IGZyb20gXCIuL2RhZS9lZGFlSHlicmlkU29sdmVyXCI7XHJcbmltcG9ydCB7IElEQUVIeWJyaWRTb2x2ZXIgfSBmcm9tIFwiLi9kYWUvaWRhZUh5YnJpZFNvbHZlclwiO1xyXG5pbXBvcnQgeyBIeWJyaWRTeXN0ZW1Db21waWxlciB9IGZyb20gXCIuL2NvbXBpbGVyL2h5YnJpZENvbXBpbGVyXCI7XHJcbmltcG9ydCB7IENvbXBpbGVyRXJyb3IgfSBmcm9tIFwiLi9jb21waWxlci9jb21waWxlckVycm9yXCI7XHJcbmltcG9ydCB7IEV2ZW50RGV0ZWN0aW9uU2ltcGxlLEV2ZW50RGV0ZWN0aW9uQ29tcGxleCwgRXZlbnREZXRlY3Rpb24gfSBmcm9tIFwiLi9kYWUvZXZlbnREZXRlY3Rpb25cIjtcclxuaW1wb3J0IHsgQWRhcHRpdmVTdGVwTmV3dG9uLCBBZGFwdGl2ZVN0ZXBTdHJhdGVneSB9IGZyb20gXCIuL2RhZS9hZGFwdGl2ZVN0ZXBcIjtcclxuaW1wb3J0IHsgRURBRVNvbHZlciB9IGZyb20gXCIuL2RhZS9lZGFlU29sdmVyXCI7XHJcbmltcG9ydCB7IElEQUVTb2x2ZXIgfSBmcm9tIFwiLi9kYWUvaWRhZVNvbHZlclwiO1xyXG5pbXBvcnQgeyBIeWJyaWRTb2x1dGlvbiB9IGZyb20gXCIuL2RhZS9oeWJyaWRTb2x1dGlvblwiO1xyXG5pbXBvcnQgeyBUZXh0UG9zaXRpb24gfSBmcm9tIFwiLi9jb21waWxlci9hc3ROb2RlXCI7XHJcbmltcG9ydCB7IG1ldGhvZHMgfSBmcm9tIFwiLi9kYWVNZXRob2RzXCI7XHJcbmltcG9ydCB7IFVJUGFyYW1ldGVycyB9IGZyb20gXCIuL1VJUGFyYW1ldGVyc1wiO1xyXG5pbXBvcnQgeyB0ZXN0U2ltcGxpZmljYXRpb24gfSBmcm9tIFwiLi90ZXN0L3Rlc3RTaW1wbGlmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyB0ZXN0RXhwcmVzc2lvbiwgdGVzdFN5bWJvbGljRGVyaXZhdGl2ZSB9IGZyb20gXCIuL3Rlc3QvdGVzdEV4cHJlc3Npb25cIjtcclxuaW1wb3J0IHsgdGVzdEVxdWF0aW9ucyB9IGZyb20gXCIuL3Rlc3QvdGVzdEVxdWF0aW9uc1wiO1xyXG5pbXBvcnQgeyBzaW1wTWV0aG9kcyB9IGZyb20gXCIuL3NpbXBsaWZpY2F0aW9uTWV0aG9kc1wiO1xyXG5pbXBvcnQgeyBJU2ltcGxpZmljYXRpb25BbGdvcml0aG0gfSBmcm9tIFwiLi9jdXJ2ZVNpbXBsaWZpY2F0aW9uL0lTaW1wbGlmaWNhdGlvbkFsZ29yaXRobVwiO1xyXG5pbXBvcnQgeyBUZXN0IH0gZnJvbSBcIi4vdGVzdC90ZXN0XCI7XHJcblxyXG52YXIgQWNlID0gcmVxdWlyZSgnYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UnKTtcclxudmFyIE1vZGUgID0gcmVxdWlyZSgnLi9lZGl0b3IvbW9kZScpLk1vZGU7XHJcbnZhciBfUmFuZ2UgPSBBY2UucmVxdWlyZShcImFjZS9yYW5nZVwiKS5SYW5nZTtcclxucmVxdWlyZShcImFjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvZXh0LWxhbmd1YWdlX3Rvb2xzXCIpO1xyXG52YXIgZWRpdG9yID0gQWNlLmVkaXQoXCJlZGl0b3JcIik7XHJcblxyXG52YXIgdGhlbWUgPSByZXF1aXJlKCdhY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L3RoZW1lLW1vbm9rYWknKTtcclxuZWRpdG9yLnNldFRoZW1lKHRoZW1lKTtcclxuZWRpdG9yLnNlc3Npb24uc2V0TW9kZShuZXcgTW9kZSgpKTtcclxuZWRpdG9yLnNldE9wdGlvbihcImVuYWJsZUJhc2ljQXV0b2NvbXBsZXRpb25cIiwgdHJ1ZSk7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9ycyhlOmFueSl7XHJcbiAgICBpZihlIGluc3RhbmNlb2YgQ29tcGlsZXJFcnJvcil7XHJcbiAgICAgICAgZS5tZXNzYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICB1aS5hZGRMb2dNZXNzYWdlKGl0ZW0ucHJpbnQoKSk7XHJcbiAgICAgICAgICAgIHVpLmFkZEVycm9yTWVzc2FnZShpdGVtLm1lc3NhZ2UsaXRlbS50ZXh0UG9zKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbS5wcmludCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1lbHNlIGlmKGUgaW5zdGFuY2VvZiBFcnJvcil7XHJcbiAgICAgICAgdWkuYWRkTG9nTWVzc2FnZShlLm1lc3NhZ2UpO1xyXG4gICAgICAgIHVpLmFkZEVycm9yTWVzc2FnZShlLm1lc3NhZ2UsVGV4dFBvc2l0aW9uLmludmFsaWQoKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHVpLmFkZExvZ01lc3NhZ2UoXCJFeGNlcHRpb246IFwiK2UpO1xyXG4gICAgICAgIHVpLmFkZEVycm9yTWVzc2FnZShcIkV4Y2VwdGlvbjogXCIrZSxUZXh0UG9zaXRpb24uaW52YWxpZCgpKTtcclxuICAgIH1cclxufVxyXG5cclxuLy90YWJzIGluaXRcclxuZXhwb3J0IGNvbnN0IHVpID0ge1xyXG4gICAgaXNSZXN1bHRzVGFiOmZhbHNlLFxyXG4gICAgbWV0aG9kczptZXRob2RzLFxyXG4gICAgaW5pdFBsb3Q6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGF5b3V0ID0ge1xyXG4gICAgICAgICAgICB0aXRsZTonUmVzdWx0JyxcclxuICAgICAgICAgICAgdHlwZTpcInNjYXR0ZXJnbFwiLFxyXG4gICAgICAgICAgICB3aWR0aDokKFwiI3Bsb3QtYXJlYVwiKS53aWR0aCgpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6JChcIiNwbG90LWFyZWFcIikuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgIHBhcGVyX2JnY29sb3I6ICdyZ2JhKDI0NSwyNDUsMjQ1LDEpJyxcclxuICAgICAgICAgICAgcGxvdF9iZ2NvbG9yOiAncmdiYSgyNDUsMjQ1LDI0NSwxKScsXHJcbiAgICAgICAgICAgIG50aWNrczozMFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgUGxvdGx5Lm5ld1Bsb3QoJ3Bsb3QtYXJlYScsW10sbGF5b3V0LHtyZXNwb25zaXZlOnRydWV9KTtcclxuICAgIH0sXHJcbiAgICBzaG93RGVidWc6ZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiI2RlYnVnXCIpLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpO1xyXG4gICAgfSxcclxuICAgIGhpZGVEZWJ1ZzpmdW5jdGlvbigpe1xyXG4gICAgICAgICQoXCIjZGVidWdcIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcclxuICAgIH0sXHJcbiAgICBpbml0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZWRpdG9yLnNldFZhbHVlKFxyXG5gLy9zdGlmZiBlcXVhdGlvblxyXG5jb25zdCB4MCA9IDA7XHJcbmNvbnN0IGEgPSAtMjE7XHJcbmNvbnN0IGMxID0geDAgKyAxLyhhICsgMSk7XHJcblxyXG54JyA9IGEqeCtleHAoLXQpO1xyXG56ID0gYzEgKiBleHAoYSp0KSAtIGV4cCgtdCkvKGErMSk7Ly9hbmFseXRpY2FsIHNvbHV0aW9uXHJcbngodDApID0geDA7YCk7XHJcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZXRTZWxlY3Rpb25SYW5nZShuZXcgX1JhbmdlKDAsMCwwLDApKTtcclxuICAgICAgICAvL2luaXQgZGVidWdcclxuICAgICAgICAkKFwiI2RlYnVnXCIpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGlkPVwiZGVidWctaGlkZVwiPkhpZGU8L2J1dHRvbj4nKTtcclxuICAgICAgICAkKFwiI2RlYnVnLWhpZGVcIikub24oXCJjbGlja1wiLHVpLmhpZGVEZWJ1Zyk7XHJcbiAgICAgICAgJChcIiNkZWJ1Z1wiKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBpZD1cInNpbXBsaWZpY2F0aW9uLXRlc3RcIj5UZXN0IHNpbXBsaWZpY2F0aW9uPC9idXR0b24+Jyk7XHJcbiAgICAgICAgJChcIiNkZWJ1Z1wiKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBpZD1cInNpbXBsaWZpY2F0aW9uLWVxXCI+VGVzdCBlcXVhdGlvbnM8L2J1dHRvbj4nKTtcclxuICAgICAgICAkKFwiI2RlYnVnXCIpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGlkPVwic2ltcGxpZmljYXRpb24tZXhwXCI+VGVzdCBleHByZXNzaW9uPC9idXR0b24+Jyk7XHJcbiAgICAgICAgJChcIiNkZWJ1Z1wiKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBpZD1cInNpbXBsaWZpY2F0aW9uLWRlclwiPlRlc3Qgc3ltYm9saWMgZGVyaXZhdGl2ZTwvYnV0dG9uPicpO1xyXG4gICAgICAgICQoXCIjZGVidWdcIikuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgaWQ9XCJlZGFlLXRlc3RcIj5UZXN0IEVEQUU8L2J1dHRvbj4nKTtcclxuICAgICAgICAkKFwiI2RlYnVnXCIpLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiIGlkPVwiaWRhZS10ZXN0XCI+VGVzdCBJREFFPC9idXR0b24+Jyk7XHJcbiAgICAgICAgJChcIiNkZWJ1Z1wiKS5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCJidXR0b25cIiBpZD1cImUtaHlicmlkLXRlc3RcIj5UZXN0IEV4cGxpY2l0IEh5YnJpZDwvYnV0dG9uPicpO1xyXG4gICAgICAgICQoXCIjZGVidWdcIikuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgaWQ9XCJpLWh5YnJpZC10ZXN0XCI+VGVzdCBJbXBsaWNpdCBIeWJyaWQ8L2J1dHRvbj4nKTtcclxuICAgICAgICBcclxuICAgICAgICAkKCcjc2ltcGxpZmljYXRpb24tdGVzdCcpLm9uKFwiY2xpY2tcIix0ZXN0U2ltcGxpZmljYXRpb24pO1xyXG4gICAgICAgICQoJyNzaW1wbGlmaWNhdGlvbi1lcScpLm9uKFwiY2xpY2tcIix0ZXN0RXF1YXRpb25zKTtcclxuICAgICAgICAkKCcjc2ltcGxpZmljYXRpb24tZXhwJykub24oXCJjbGlja1wiLHRlc3RFeHByZXNzaW9uKTtcclxuICAgICAgICAkKCcjc2ltcGxpZmljYXRpb24tZGVyJykub24oXCJjbGlja1wiLHRlc3RTeW1ib2xpY0Rlcml2YXRpdmUpO1xyXG4gICAgICAgICQoJyNlZGFlLXRlc3QnKS5vbihcImNsaWNrXCIsVGVzdC50ZXN0RURBRUNvbXBpbGVyKTtcclxuICAgICAgICAkKCcjaWRhZS10ZXN0Jykub24oXCJjbGlja1wiLFRlc3QudGVzdElEQUVDb21waWxlcik7XHJcbiAgICAgICAgJCgnI2UtaHlicmlkLXRlc3QnKS5vbihcImNsaWNrXCIsVGVzdC50ZXN0RXhwbGljaXRIeWJyaWRDb21waWxlcik7XHJcbiAgICAgICAgJCgnI2ktaHlicmlkLXRlc3QnKS5vbihcImNsaWNrXCIsVGVzdC50ZXN0SW1wbGljaXRIeWJyaWRDb21waWxlcik7XHJcblxyXG4gICAgICAgICQoXCIjcnVuLWJ1dHRvblwiKS5vbihcImNsaWNrXCIsdWkucnVuKTtcclxuICAgICAgICAkKFwiI2V4cG9ydC1idXR0b25cIikub24oXCJjbGlja1wiLHVpLnJ1bik7XHJcbiAgICAgICAgJCgnKltkYXRhLXJvbGU9XCJ0YWJcIl0nKS5vbihcImNsaWNrXCIsXHJcbiAgICAgICAgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHVpLm9wZW5UYWIoJChlLnRhcmdldCkuZGF0YShcInRhYlwiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGV4YW1wbGVzQ29udGFpbmVyID0gJCgnI2V4YW1wbGVzLWRhZScpO1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGV4YW1wbGVzLmRhZSkuZm9yRWFjaChmdW5jdGlvbihba2V5LHZhbHVlXSl7XHJcbiAgICAgICAgICAgIGV4YW1wbGVzQ29udGFpbmVyLmFwcGVuZChgPGRpdj48YnV0dG9uIGRhdGEta2V5PVwiJHtrZXl9XCIgY2xhc3M9XCJleGFtcGxlLWJ1dHRvbiBkYWUgYnV0dG9uXCI+JHt2YWx1ZS5uYW1lfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5gKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZXhhbXBsZXNDb250YWluZXIgPSAkKCcjZXhhbXBsZXMtaHlicmlkJyk7XHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZXhhbXBsZXMuaHlicmlkKS5mb3JFYWNoKGZ1bmN0aW9uKFtrZXksdmFsdWVdKXtcclxuICAgICAgICAgICAgZXhhbXBsZXNDb250YWluZXIuYXBwZW5kKGA8ZGl2PjxidXR0b24gZGF0YS1rZXk9XCIke2tleX1cIiBjbGFzcz1cImV4YW1wbGUtYnV0dG9uIGh5YnJpZCBidXR0b25cIj4ke3ZhbHVlLm5hbWV9PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PmApXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKCcuZXhhbXBsZS1idXR0b24uZGFlJykub24oXCJjbGlja1wiLGZ1bmN0aW9uKHRoaXMsZSl7XHJcbiAgICAgICAgICAgIHVpLmxvYWREYWVFeGFtcGxlKCQodGhpcykuZGF0YShcImtleVwiKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnLmV4YW1wbGUtYnV0dG9uLmh5YnJpZCcpLm9uKFwiY2xpY2tcIixmdW5jdGlvbih0aGlzLGUpe1xyXG4gICAgICAgICAgICB1aS5sb2FkSHlicmlkRXhhbXBsZSgkKHRoaXMpLmRhdGEoXCJrZXlcIikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzdGVwQ29udHJvbCA9ICQoJyNzdGVwLWNvbnRyb2wnKTtcclxuICAgICAgICBsZXQgc3RlcFNvbHZlciA9ICQoJyNzdGVwLXNvbHZlcicpO1xyXG4gICAgICAgIGxldCBzeXN0ZW1Tb2x2ZXIgPSAkKCcjc3lzdGVtLXNvbHZlcicpO1xyXG4gICAgICAgIGxldCBhZGFwdGl2ZSA9ICQoJyNhZGFwdGl2ZS1zdGVwLXBhcmFtcycpO1xyXG4gICAgICAgIGxldCB6ZXJvQ3Jvc3NpbmcgPSAkKCcjemVyby1jcm9zc2luZy1wYXJhbXMnKTtcclxuICAgICAgICBsZXQgc2ltcGxpZmljYXRpb24gPSAkKCcjc2ltcGxpZmljYXRpb24tcGFyYW1zJyk7XHJcbiAgICAgICAgbGV0IHNpbXBsaWZpY2F0aW9uTWV0aG9kID0gJCgnI3NpbXAtbWV0aG9kJyk7XHJcbiAgICAgICAgbGV0IG1heFBvaW50c1BhcmFtID0gJCgnI3NpbXAtbWF4LXBvaW50cy1wYXJhbScpO1xyXG4gICAgICAgIGxldCB0b2xQYXJhbSA9ICQoJyNzaW1wLXRvbC1wYXJhbScpO1xyXG4gICAgICAgIGxldCBsb29rYWhlYWRQYXJhbSA9ICQoJyNzaW1wLWxvb2stYWhlYWQtcGFyYW0nKTtcclxuICAgICAgICBsZXQgc2ltcE1heFRvbCA9ICQoJyNzaW1wLW1heC10b2wtcGFyYW0nKTtcclxuICAgICAgICBsZXQgbnRoUG9pbnRQYXJhbSA9ICQoJyNzaW1wLW50aC1wb2ludCcpO1xyXG4gICAgICAgICQoJyNkYWUtZm9ybScpLm9uKFwiY2hhbmdlXCIsZnVuY3Rpb24odGhpcyl7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCk9PVwiZXhwbGljaXRcIilcclxuICAgICAgICAgICAgICAgIHN5c3RlbVNvbHZlci5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzeXN0ZW1Tb2x2ZXIuYXR0cihcImRpc2FibGVkXCIsbnVsbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnI2RhZS1mb3JtJykudHJpZ2dlcihcImNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgZXhwbGljaXRNZXRob2RzID0gJChcIiNleHBsaWNpdE1ldGhvZHNcIik7XHJcbiAgICAgICAgbGV0IGltcGxpY2l0TWV0aG9kcyA9ICQoXCIjaW1wbGljaXRNZXRob2RzXCIpO1xyXG4gICAgICAgIC8vaW5pdCBtZXRob2RzIHNlbGVjdCBlbGVtZW50XHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMobWV0aG9kcykuZm9yRWFjaChmdW5jdGlvbihba2V5LGl0ZW1dKXtcclxuICAgICAgICAgICAgbGV0IGVsID0gYDxvcHRpb24gdmFsdWU9XCIke2tleX1cIj4ke2l0ZW0ubmFtZX08L29wdGlvbj5gO1xyXG4gICAgICAgICAgICBpZihpdGVtLmltcGxpY2l0KXtcclxuICAgICAgICAgICAgICAgIGltcGxpY2l0TWV0aG9kcy5hcHBlbmQoZWwpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGV4cGxpY2l0TWV0aG9kcy5hcHBlbmQoZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCgnI2RhZS1tZXRob2QnKS5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKHRoaXMpe1xyXG4gICAgICAgICAgICBpZihtZXRob2RzWyQodGhpcykudmFsKCkgYXMgc3RyaW5nXS5hdXRvc3RlcD09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHN0ZXBDb250cm9sLmF0dHIoXCJkaXNhYmxlZFwiLG51bGwpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdGVwQ29udHJvbC5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICBpZihtZXRob2RzWyQodGhpcykudmFsKCkgYXMgc3RyaW5nXS5pbXBsaWNpdD09dHJ1ZSlcclxuICAgICAgICAgICAgICAgIHN0ZXBTb2x2ZXIuYXR0cihcImRpc2FibGVkXCIsbnVsbCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0ZXBTb2x2ZXIuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiI2RhZS1tZXRob2RcIikudmFsKE9iamVjdC5rZXlzKG1ldGhvZHMpWzBdKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgICQoJyNhZGFwdGl2ZS1zdGVwJykub24oXCJjaGFuZ2VcIixmdW5jdGlvbih0aGlzKXtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKSl7XHJcbiAgICAgICAgICAgICAgICBhZGFwdGl2ZS5hdHRyKFwiZGlzYWJsZWRcIixudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYWRhcHRpdmUuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcjYWRhcHRpdmUtc3RlcCcpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgJCgnI3plcm8tY3Jvc3NpbmcnKS5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKHRoaXMpe1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpKXtcclxuICAgICAgICAgICAgICAgIHplcm9Dcm9zc2luZy5hdHRyKFwiZGlzYWJsZWRcIixudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgemVyb0Nyb3NzaW5nLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcjemVyby1jcm9zc2luZycpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgJCgnI3NpbXBsaWZpY2F0aW9uJykub24oXCJjaGFuZ2VcIixmdW5jdGlvbih0aGlzKXtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKSl7XHJcbiAgICAgICAgICAgICAgICBzaW1wbGlmaWNhdGlvbi5hdHRyKFwiZGlzYWJsZWRcIixudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc2ltcGxpZmljYXRpb24uYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoJyNzaW1wbGlmaWNhdGlvbicpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgJCgnI3NpbXAtbWV0aG9kJykub24oXCJjaGFuZ2VcIixmdW5jdGlvbih0aGlzKXtcclxuICAgICAgICAgICAgbG9va2FoZWFkUGFyYW0uYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgbWF4UG9pbnRzUGFyYW0uYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgc2ltcE1heFRvbC5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICBudGhQb2ludFBhcmFtLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHRvbFBhcmFtLmF0dHIoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHN3aXRjaCgkKHRoaXMpLnZhbCgpKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsYW5nXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgbG9va2FoZWFkUGFyYW0uYXR0cihcImRpc2FibGVkXCIsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibnRoLXBvaW50XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgbnRoUG9pbnRQYXJhbS5hdHRyKFwiZGlzYWJsZWRcIixudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvcGhlaW1cIjpcclxuICAgICAgICAgICAgICAgICAgICBzaW1wTWF4VG9sLmF0dHIoXCJkaXNhYmxlZFwiLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJldW1hbm5cIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkb3VnbGFzLXBldWNrZXJcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyYWRpYWwtZGlzdGFuY2VcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJwZXJwLWRpc3RhbmNlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9sUGFyYW0uYXR0cihcImRpc2FibGVkXCIsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZG91Z2xhcy1wZXVja2VyLW5cIjpcclxuICAgICAgICAgICAgICAgICAgICBtYXhQb2ludHNQYXJhbS5hdHRyKFwiZGlzYWJsZWRcIixudWxsKTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtYXgtcG9pbnRzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4UG9pbnRzUGFyYW0uYXR0cihcImRpc2FibGVkXCIsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCcjc2ltcC1tZXRob2QnKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgfSxcclxuICAgIGdldFBhcmFtZXRlcnM6ZnVuY3Rpb24oKTpVSVBhcmFtZXRlcnN7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgXCJkYWUtZm9ybVwiOiQoXCIjZGFlLWZvcm1cIikudmFsKCkgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICBcImRhZS1tZXRob2RcIjokKFwiI2RhZS1tZXRob2RcIikudmFsKCkgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICBcInN0ZXBcIjpwYXJzZUZsb2F0KCQoXCIjc3RlcFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwidDBcIjpwYXJzZUZsb2F0KCQoXCIjdDBcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJ0aW1lXCI6cGFyc2VGbG9hdCgkKFwiI3RpbWVcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJtaW4tc3RlcFwiOnBhcnNlRmxvYXQoJChcIiNtaW4tc3RlcFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwic3RlcC1lcnItdG9sXCI6cGFyc2VGbG9hdCgkKFwiI3N0ZXAtZXJyLXRvbFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwic3RlcC1zb2x2ZXItaXRlcnNcIjpwYXJzZUZsb2F0KCQoXCIjc3RlcC1zb2x2ZXItaXRlcnNcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJzdGVwLXNvbHZlci1taW4taXRlcnNcIjpwYXJzZUZsb2F0KCQoXCIjc3RlcC1zb2x2ZXItbWluLWl0ZXJzXCIpLnZhbCgpIGFzIHN0cmluZyksXHJcbiAgICAgICAgICAgIFwic3RlcC1zb2x2ZXItYWJzLXRvbFwiOnBhcnNlRmxvYXQoJChcIiNzdGVwLXNvbHZlci1hYnMtdG9sXCIpLnZhbCgpIGFzIHN0cmluZykqMWUtMyxcclxuICAgICAgICAgICAgXCJzdGVwLXNvbHZlci1yZWwtdG9sXCI6cGFyc2VGbG9hdCgkKFwiI3N0ZXAtc29sdmVyLXJlbC10b2xcIikudmFsKCkgYXMgc3RyaW5nKSoxZS0zLFxyXG4gICAgICAgICAgICBcInN0ZXAtc29sdmVyLWFscGhhXCI6cGFyc2VGbG9hdCgkKFwiI3N0ZXAtc29sdmVyLWFscGhhXCIpLnZhbCgpIGFzIHN0cmluZyksXHJcbiAgICAgICAgICAgIFwic3lzLXNvbHZlci1pdGVyc1wiOnBhcnNlRmxvYXQoJChcIiNzeXMtc29sdmVyLWl0ZXJzXCIpLnZhbCgpIGFzIHN0cmluZyksXHJcbiAgICAgICAgICAgIFwic3lzLXNvbHZlci1taW4taXRlcnNcIjpwYXJzZUZsb2F0KCQoXCIjc3lzLXNvbHZlci1taW4taXRlcnNcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJzeXMtc29sdmVyLWFicy10b2xcIjpwYXJzZUZsb2F0KCQoXCIjc3lzLXNvbHZlci1hYnMtdG9sXCIpLnZhbCgpIGFzIHN0cmluZykqMWUtMyxcclxuICAgICAgICAgICAgXCJzeXMtc29sdmVyLXJlbC10b2xcIjpwYXJzZUZsb2F0KCQoXCIjc3lzLXNvbHZlci1yZWwtdG9sXCIpLnZhbCgpIGFzIHN0cmluZykqMWUtMyxcclxuICAgICAgICAgICAgXCJzeXMtc29sdmVyLWFscGhhXCI6cGFyc2VGbG9hdCgkKFwiI3N5cy1zb2x2ZXItYWxwaGFcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJ6Yy1ib3JkZXItdG9sXCI6cGFyc2VGbG9hdCgkKFwiI3pjLWJvcmRlci10b2xcIikudmFsKCkgYXMgc3RyaW5nKSoxZS0zLFxyXG4gICAgICAgICAgICBcImFkYXB0aXZlLXN0ZXBcIjokKFwiI2FkYXB0aXZlLXN0ZXBcIikucHJvcChcImNoZWNrZWRcIiksXHJcbiAgICAgICAgICAgIFwiYWRhcHRpdmUtbWluLXN0ZXBcIjpwYXJzZUZsb2F0KCQoXCIjYWRhcHRpdmUtbWluLXN0ZXBcIikudmFsKCkgYXMgc3RyaW5nKSoxZS0zLFxyXG4gICAgICAgICAgICBcImFkYXB0aXZlLXN0ZXAtZ2FtbWFcIjpwYXJzZUZsb2F0KCQoXCIjYWRhcHRpdmUtc3RlcC1nYW1tYVwiKS52YWwoKSBhcyBzdHJpbmcpLFxyXG4gICAgICAgICAgICBcInplcm8tY3Jvc3NpbmdcIjokKFwiI3plcm8tY3Jvc3NpbmdcIikucHJvcChcImNoZWNrZWRcIiksXHJcbiAgICAgICAgICAgIFwiemMtbmV3dG9uLWl0ZXJzXCI6cGFyc2VJbnQoJChcIiN6Yy1uZXd0b24taXRlcnNcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJ6Yy1uZXd0b24tYWxwaGFcIjpwYXJzZUZsb2F0KCQoXCIjemMtbmV3dG9uLWFscGhhXCIpLnZhbCgpIGFzIHN0cmluZyksXHJcbiAgICAgICAgICAgIFwiemMtYWJzLXRvbFwiOnBhcnNlRmxvYXQoJChcIiN6Yy1hYnMtdG9sXCIpLnZhbCgpIGFzIHN0cmluZykqMWUtMyxcclxuICAgICAgICAgICAgXCJ6Yy1yZWwtdG9sXCI6cGFyc2VGbG9hdCgkKFwiI3pjLXJlbC10b2xcIikudmFsKCkgYXMgc3RyaW5nKSoxZS0zLFxyXG4gICAgICAgICAgICBcInpjLWJpc2VjdC1pdGVyc1wiOnBhcnNlSW50KCQoXCIjemMtYmlzZWN0LWl0ZXJzXCIpLnZhbCgpIGFzIHN0cmluZyksXHJcbiAgICAgICAgICAgIFwiemMtdGltZS1hYnMtdG9sXCI6cGFyc2VGbG9hdCgkKFwiI3pjLXRpbWUtYWJzLXRvbFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwiemMtdGltZS1yZWwtdG9sXCI6cGFyc2VGbG9hdCgkKFwiI3pjLXRpbWUtcmVsLXRvbFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwic2ltcGxpZmljYXRpb25cIjokKFwiI3NpbXBsaWZpY2F0aW9uXCIpLnByb3AoXCJjaGVja2VkXCIpLFxyXG4gICAgICAgICAgICBcInNpbXAtbWV0aG9kXCI6JChcIiNzaW1wLW1ldGhvZFwiKS52YWwoKSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgIFwic2ltcC1tYXgtcG9pbnRzXCI6cGFyc2VJbnQoJChcIiNzaW1wLW1heC1wb2ludHNcIikudmFsKCkgYXMgc3RyaW5nKSxcclxuICAgICAgICAgICAgXCJzaW1wLXRvbFwiOnBhcnNlRmxvYXQoJChcIiNzaW1wLXRvbFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwic2ltcC1sb29rLWFoZWFkXCI6cGFyc2VGbG9hdCgkKFwiI3NpbXAtbG9vay1haGVhZFwiKS52YWwoKSBhcyBzdHJpbmcpKjFlLTMsXHJcbiAgICAgICAgICAgIFwic2ltcC1udGgtcG9pbnRcIjpwYXJzZUludCgkKFwiI3NpbXAtbnRoLXBvaW50XCIpLnZhbCgpIGFzIHN0cmluZyksXHJcbiAgICAgICAgICAgIFwic2ltcC1tYXgtdG9sXCI6cGFyc2VJbnQoJChcIiNzaW1wLW1heC10b2xcIikudmFsKCkgYXMgc3RyaW5nKSoxZS0zXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBvcGVuVGFiOmZ1bmN0aW9uKHRhYklkOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9ICQoJ1tkYXRhLXJvbGU9XCJ0YWJcIl1bZGF0YS10YWI9XCInK3RhYklkKydcIl0nKTtcclxuICAgICAgICBsZXQgcGFyZW50SWQgPSB0YXJnZXQuZGF0YShcInBhcmVudFwiKTtcclxuICAgICAgICBsZXQgcGFyZW50PSQoJyMnK3BhcmVudElkKTtcclxuICAgICAgICAkKCdbZGF0YS1yb2xlPVwidGFiLWl0ZW1cIl1bZGF0YS1wYXJlbnQ9XCInK3BhcmVudElkKydcIicpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuICAgICAgICAkKCdbZGF0YS1yb2xlPVwidGFiXCJdW2RhdGEtcGFyZW50PVwiJytwYXJlbnRJZCsnXCInKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgJCgnIycrdGFiSWQpLmFkZENsYXNzKFwic2hvd1wiKTtcclxuICAgICAgICBpZih0YWJJZD09XCJyZXN1bHRzXCIpe1xyXG4gICAgICAgICAgICB1aS5pc1Jlc3VsdHNUYWIgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgIFBsb3RseS5yZWxheW91dCgncGxvdC1hcmVhJyx7XHJcbiAgICAgICAgICAgIHdpZHRoOiQoXCIjcGxvdC1hcmVhXCIpLndpZHRoKCksXHJcbiAgICAgICAgICAgIGhlaWdodDokKFwiI3Bsb3QtYXJlYVwiKS5oZWlnaHQoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdWkuaXNSZXN1bHRzVGFiID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldFBhcmFtZXRlcnMocGFyYW1ldGVyczpSZWNvcmQ8c3RyaW5nLGFueT4pe1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24oW2tleSxlbnRyeV0pe1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgZW50cnkgPT09IFwiYm9vbGVhblwiKXtcclxuICAgICAgICAgICAgICAgICQoYCMke2tleX1gKS5wcm9wKFwiY2hlY2tlZFwiLGVudHJ5PT10cnVlP1wiY2hlY2tlZFwiOm51bGwpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgICAgICAgICAvLyQoYCMke2tleX1gKS52YWwoZW50cnk9PXRydWU/XCJvblwiOlwib2ZmXCIpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAkKGAjJHtrZXl9YCkudmFsKGVudHJ5KS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGxvYWREYWVFeGFtcGxlOmZ1bmN0aW9uKGV4YW1wbGVJZDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBleGFtcGxlID0gZXhhbXBsZXMuZGFlW2V4YW1wbGVJZF07XHJcbiAgICAgICAgZWRpdG9yLnNldFZhbHVlKGV4YW1wbGUubW9kZWwpO1xyXG4gICAgICAgIHVpLnNldFBhcmFtZXRlcnMoZXhhbXBsZS5wYXJhbWV0ZXJzKTtcclxuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNldFNlbGVjdGlvblJhbmdlKG5ldyBfUmFuZ2UoMCwwLDAsMCkpO1xyXG4gICAgICAgIC8vJCgnI3RleHQtaW5wdXQnKS52YWwoZXhhbXBsZXMuZGFlW2V4YW1wbGVJZF0udGV4dCk7XHJcbiAgICB9LFxyXG4gICAgbG9hZEh5YnJpZEV4YW1wbGU6ZnVuY3Rpb24oZXhhbXBsZUlkOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGV4YW1wbGUgPSBleGFtcGxlcy5oeWJyaWRbZXhhbXBsZUlkXTtcclxuICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoZXhhbXBsZS5tb2RlbCk7XHJcbiAgICAgICAgdWkuc2V0UGFyYW1ldGVycyhleGFtcGxlLnBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0U2VsZWN0aW9uUmFuZ2UobmV3IF9SYW5nZSgwLDAsMCwwKSk7XHJcbiAgICAgICAgLy8kKCcjdGV4dC1pbnB1dCcpLnZhbChleGFtcGxlcy5oeWJyaWRbZXhhbXBsZUlkXS50ZXh0KTtcclxuICAgIH0sXHJcbiAgICBjbGVhckxvZzpmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJyNsb2ctYXJlYScpLmVtcHR5KCk7XHJcbiAgICB9LFxyXG4gICAgY2xlYXJFcnJvcnM6ZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcjZXJyb3ItbGlzdCcpLmVtcHR5KCk7XHJcbiAgICB9LFxyXG4gICAgYWRkRXJyb3JNZXNzYWdlOmZ1bmN0aW9uKG1lc3NhZ2U6c3RyaW5nLHRleHRQb3M6VGV4dFBvc2l0aW9uKXtcclxuICAgICAgICAkKCcjZXJyb3ItbGlzdCcpLmFwcGVuZChgPGRpdiBjbGFzcz1cImVycm9ycy1yb3cke3RleHRQb3MubGluZT09LTE/XCJcIjpcIiBjbGlja2FibGVcIn1cIiBkYXRhLWxpbmU9XCIke3RleHRQb3MubGluZX1cIiBkYXRhLWNvbHVtbj1cIiR7dGV4dFBvcy5jb2x1bW59XCIgZGF0YS1zdGFydD1cIiR7dGV4dFBvcy5zdGFydH1cIiBkYXRhLXN0b3A9XCIke3RleHRQb3Muc3RvcH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3JzLWNlbGxcIj4ke3RleHRQb3MubGluZT09LTE/XCJcIjp0ZXh0UG9zLmxpbmV9PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9ycy1jZWxsXCI+JHt0ZXh0UG9zLmxpbmU9PS0xP1wiXCI6dGV4dFBvcy5jb2x1bW59PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImVycm9ycy1jZWxsXCI+JHttZXNzYWdlfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmApO1xyXG4gICAgICAgIGlmKHRleHRQb3MubGluZSE9LTEpXHJcbiAgICAgICAgICAgICQoJyNlcnJvci1saXN0JykuY2hpbGRyZW4oKS5sYXN0KCkub24oXCJjbGlja1wiLHVpLm9uQ2xpY2tFcnJvck1lc3NhZ2UpO1xyXG4gICAgfSxcclxuICAgIHNldEN1cnNvcihsaW5lOm51bWJlcixwb3NpdGlvbjpudW1iZXIpe1xyXG4gICAgICAgIGxldCBlbGVtID0gJChcIiN0ZXh0LWlucHV0XCIpWzBdIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IHJvdyA9IDE7XHJcbiAgICAgICAgbGV0IHBvcyA9IDA7XHJcbiAgICAgICAgd2hpbGUocm93PGxpbmUpe1xyXG4gICAgICAgICAgICBsZXQgbGluZUVuZCA9IGVsZW0udmFsdWUuaW5kZXhPZihcIlxcblwiLHBvcyk7XHJcbiAgICAgICAgICAgIGlmKGxpbmVFbmQgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvdysrO1xyXG4gICAgICAgICAgICBwb3MgPSBsaW5lRW5kKzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaW5lRW5kID0gZWxlbS52YWx1ZS5pbmRleE9mKFwiXFxuXCIscG9zKTtcclxuICAgICAgICBsaW5lRW5kPShsaW5lRW5kPT0tMT9lbGVtLnZhbHVlLmxlbmd0aDpsaW5lRW5kKTtcclxuICAgICAgICBwb3MgPSBNYXRoLm1pbihsaW5lRW5kLHBvcyArIHBvc2l0aW9uKTtcclxuICAgICAgICBlbGVtLmZvY3VzKCk7XHJcbiAgICAgICAgZWxlbS5zZXRTZWxlY3Rpb25SYW5nZShwb3MscG9zKzEpO1xyXG4gICAgfSxcclxuICAgIG9uQ2xpY2tFcnJvck1lc3NhZ2U6ZnVuY3Rpb24odGhpczpIVE1MRWxlbWVudCl7XHJcbiAgICAgICAgbGV0IGxpbmUgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoXCJsaW5lXCIpKS0xO1xyXG4gICAgICAgIGxldCBjb2x1bW4gPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoXCJjb2x1bW5cIikpO1xyXG4gICAgICAgIGxldCBzdGFydCA9IHBhcnNlSW50KCQodGhpcykuZGF0YShcInN0YXJ0XCIpKTtcclxuICAgICAgICBsZXQgc3RvcCA9IHBhcnNlSW50KCQodGhpcykuZGF0YShcInN0b3BcIikpO1xyXG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2V0U2VsZWN0aW9uUmFuZ2UobmV3IF9SYW5nZShsaW5lLGNvbHVtbixsaW5lLGNvbHVtbisoc3RvcC1zdGFydCkpKTtcclxuICAgICAgICAvKmlmKHN0YXJ0ID09IC0xKXtcclxuICAgICAgICAgICAgdWkuc2V0Q3Vyc29yKGxpbmUsY29sdW1uKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGVsZW0gPSAkKFwiI3RleHQtaW5wdXRcIilbMF0gYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgICAgICAgICAgZWxlbS5mb2N1cygpO1xyXG4gICAgICAgICAgICBlbGVtLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LHN0b3ApO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfSxcclxuICAgIGFkZExvZ01lc3NhZ2U6ZnVuY3Rpb24obWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBsb2dBcmVhID0gICQoJyNsb2ctYXJlYScpO1xyXG4gICAgICAgIGxldCBjaGlsZHMgPSBsb2dBcmVhLmNoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IGk9MDtcclxuICAgICAgICB3aGlsZShjaGlsZHMubGVuZ3RoPjE1K2kpe1xyXG4gICAgICAgICAgICBjaGlsZHNbaV0ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHNzID0gU3RyaW5nKGRhdGUuZ2V0U2Vjb25kcygpKzEpLnBhZFN0YXJ0KDIsJzAnKTtcclxuICAgICAgICBjb25zdCBoaCA9IFN0cmluZyhkYXRlLmdldEhvdXJzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgbG9nQXJlYS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJsb2ctbWVzc2FnZVwiPlske2hofToke21tfToke3NzfV06ICR7bWVzc2FnZX08L2Rpdj5gKTtcclxuICAgICAgICB2YXIgbXlkaXYgPSAkKFwiI3Njcm9sbFwiKTtcclxuICAgICAgICBsb2dBcmVhLnNjcm9sbFRvcChsb2dBcmVhLnByb3AoXCJzY3JvbGxIZWlnaHRcIikpO1xyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyTWV0aG9kczpmdW5jdGlvbihtZXRob2RzOntleHBsaWNpdDp7aWQ6c3RyaW5nLG5hbWU6c3RyaW5nfVtdLGltcGxpY2l0OntpZDpzdHJpbmcsbmFtZTpzdHJpbmd9W119KXtcclxuXHJcbiAgICAgICAgbGV0IGV4cGxpY2l0ID0gJChcIiNkYWUtbWV0aG9kXCIpLmFwcGVuZCgnPG9wdGdyb3VwIGxhYmVsPVwiRXhwbGljaXQgbWV0aG9kc1wiPjwvb3B0Z3JvdXA+Jyk7XHJcbiAgICAgICAgbWV0aG9kcy5leHBsaWNpdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBleHBsaWNpdC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLm5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGltcGxpY2l0ID0gJChcIiNkYWUtbWV0aG9kXCIpLmFwcGVuZCgnPG9wdGdyb3VwIGxhYmVsPVwiSW1wbGljaXQgbWV0aG9kc1wiPjwvb3B0Z3JvdXA+Jyk7XHJcbiAgICAgICAgbWV0aG9kcy5pbXBsaWNpdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpbXBsaWNpdC5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke2l0ZW0uaWR9XCI+JHtpdGVtLm5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcGxvdFNvbHV0aW9uOmZ1bmN0aW9uKHNvbHV0aW9uOkh5YnJpZFNvbHV0aW9uLHg6c3RyaW5nW10sejpzdHJpbmdbXSk6dm9pZHtcclxuICAgICAgICBsZXQgZGF0YTphbnkgPSBbXTtcclxuICAgICAgICBsZXQgdDpudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGxldCB4VHJhY2VzOmFueVtdID0gW107XHJcbiAgICAgICAgbGV0IHpUcmFjZXM6YW55W10gPSBbXTtcclxuICAgICAgICBkYXRhLnB1c2goe3g6c29sdXRpb24uc3RhdGVTd2l0Y2hlcyx5OnNvbHV0aW9uLnN0YXRlcyx0eXBlOlwic2NhdHRlcmdsXCIsbW9kZTonbWFya2VycytsaW5lcycsbmFtZTpcIlN0YXRlXCIsXHJcbiAgICAgICAgbGluZToge3NoYXBlOiAnaHYnfSx9KTtcclxuICAgICAgICB4LmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIHhUcmFjZXMucHVzaCh7eDp0LHk6W10sdHlwZTpcInNjYXR0ZXJnbFwiLG1vZGU6J21hcmtlcnMrbGluZXMnLG5hbWU6aXRlbX0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHouZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgelRyYWNlcy5wdXNoKHt4OnQseTpbXSx0eXBlOlwic2NhdHRlcmdsXCIsbW9kZTonbWFya2VycytsaW5lcycsbmFtZTppdGVtfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzb2x1dGlvbi52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSxpbmRleCl7XHJcbiAgICAgICAgICAgIHQucHVzaCh2YWx1ZS50KTtcclxuICAgICAgICAgICAgeFRyYWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0saWQ6bnVtYmVyKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueS5wdXNoKHZhbHVlLnguZ2V0KGlkKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB6VHJhY2VzLmZvckVhY2goZnVuY3Rpb24oaXRlbSxpZCl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnkucHVzaCh2YWx1ZS56LmdldChpZCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB4VHJhY2VzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB6VHJhY2VzLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChpdGVtKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIFBsb3RseS5hZGRUcmFjZXMoJ3Bsb3QtYXJlYScsIGRhdGEpO1xyXG4gICAgfSxcclxuICAgIHBsb3Q6ZnVuY3Rpb24oeDpudW1iZXJbXSx0Om51bWJlcltdLGxhYmVsOnN0cmluZyk6dm9pZHtcclxuICAgICAgICBsZXQgZGF0YTphbnkgPSBbXTtcclxuICAgICAgICBsZXQgdHJhY2U6YW55ID0ge1xyXG4gICAgICAgICAgICB4OiB0LFxyXG4gICAgICAgICAgICB5OiB4LFxyXG4gICAgICAgICAgICB0eXBlOlwic2NhdHRlcmdsXCIsXHJcbiAgICAgICAgICAgIG1vZGU6ICdtYXJrZXJzK2xpbmVzJyxcclxuICAgICAgICAgICAgbmFtZTogbGFiZWxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRhdGEucHVzaCh0cmFjZSk7XHJcbiAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgUGxvdGx5LmFkZFRyYWNlcygncGxvdC1hcmVhJywgZGF0YSk7XHJcbiAgICB9LFxyXG4gICAgZXhwb3J0OmZ1bmN0aW9uKCk6dm9pZHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VGV4dDpmdW5jdGlvbigpOnN0cmluZ3tcclxuICAgICAgICByZXR1cm4gZWRpdG9yLmdldFZhbHVlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0RWRhZVNvbHZlcjpmdW5jdGlvbihwYXJhbWV0ZXJzOlVJUGFyYW1ldGVycyl7XHJcbiAgICAgICAgbGV0IGV2ZW50RGV0ZWN0aW9uOkV2ZW50RGV0ZWN0aW9uO1xyXG4gICAgICAgIGlmKHBhcmFtZXRlcnNbXCJ6ZXJvLWNyb3NzaW5nXCJdKXtcclxuICAgICAgICAgICAgZXZlbnREZXRlY3Rpb24gPSBuZXcgRXZlbnREZXRlY3Rpb25Db21wbGV4KFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyc1tcInpjLW5ld3Rvbi1pdGVyc1wiXSxcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNbXCJ6Yy1yZWwtdG9sXCJdLHBhcmFtZXRlcnNbXCJ6Yy1hYnMtdG9sXCJdLHBhcmFtZXRlcnNbXCJ6Yy1uZXd0b24tYWxwaGFcIl0sXHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzW1wiemMtYmlzZWN0LWl0ZXJzXCJdLHBhcmFtZXRlcnNbXCJ6Yy10aW1lLWFicy10b2xcIl0scGFyYW1ldGVyc1tcInpjLXRpbWUtcmVsLXRvbFwiXSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGV2ZW50RGV0ZWN0aW9uID0gbmV3IEV2ZW50RGV0ZWN0aW9uU2ltcGxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhZGFwdGl2ZVN0ZXBTdHJhdGVneTpBZGFwdGl2ZVN0ZXBTdHJhdGVneTtcclxuICAgICAgICBpZihwYXJhbWV0ZXJzW1wiYWRhcHRpdmUtc3RlcFwiXSl7XHJcbiAgICAgICAgICAgIGFkYXB0aXZlU3RlcFN0cmF0ZWd5ID0gbmV3IEFkYXB0aXZlU3RlcE5ld3RvbihwYXJhbWV0ZXJzW1wiYWRhcHRpdmUtc3RlcC1nYW1tYVwiXSxwYXJhbWV0ZXJzW1wiYWRhcHRpdmUtbWluLXN0ZXBcIl0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhZGFwdGl2ZVN0ZXBTdHJhdGVneSA9IG51bGw7XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gbmV3IEVEQUVIeWJyaWRTb2x2ZXIoZXZlbnREZXRlY3Rpb24sYWRhcHRpdmVTdGVwU3RyYXRlZ3kpOyAgXHJcbiAgICB9LFxyXG4gICAgZ2V0SWRhZVNvbHZlcjpmdW5jdGlvbihwYXJhbWV0ZXJzOlVJUGFyYW1ldGVycyk6SURBRUh5YnJpZFNvbHZlcntcclxuICAgICAgICBsZXQgZXZlbnREZXRlY3Rpb246RXZlbnREZXRlY3Rpb247XHJcbiAgICAgICAgaWYocGFyYW1ldGVyc1tcInplcm8tY3Jvc3NpbmdcIl0pe1xyXG4gICAgICAgICAgICBldmVudERldGVjdGlvbiA9IG5ldyBFdmVudERldGVjdGlvbkNvbXBsZXgoXHJcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzW1wiemMtbmV3dG9uLWl0ZXJzXCJdLFxyXG4gICAgICAgICAgICAgICAgcGFyYW1ldGVyc1tcInpjLXJlbC10b2xcIl0scGFyYW1ldGVyc1tcInpjLWFicy10b2xcIl0scGFyYW1ldGVyc1tcInpjLW5ld3Rvbi1hbHBoYVwiXSxcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNbXCJ6Yy1iaXNlY3QtaXRlcnNcIl0scGFyYW1ldGVyc1tcInpjLXRpbWUtYWJzLXRvbFwiXSxwYXJhbWV0ZXJzW1wiemMtdGltZS1yZWwtdG9sXCJdKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZXZlbnREZXRlY3Rpb24gPSBuZXcgRXZlbnREZXRlY3Rpb25TaW1wbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFkYXB0aXZlU3RlcFN0cmF0ZWd5OkFkYXB0aXZlU3RlcFN0cmF0ZWd5O1xyXG4gICAgICAgIGlmKHBhcmFtZXRlcnNbXCJhZGFwdGl2ZS1zdGVwXCJdKXtcclxuICAgICAgICAgICAgYWRhcHRpdmVTdGVwU3RyYXRlZ3kgPSBuZXcgQWRhcHRpdmVTdGVwTmV3dG9uKHBhcmFtZXRlcnNbXCJhZGFwdGl2ZS1zdGVwLWdhbW1hXCJdLHBhcmFtZXRlcnNbXCJhZGFwdGl2ZS1taW4tc3RlcFwiXSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFkYXB0aXZlU3RlcFN0cmF0ZWd5ID0gbnVsbDtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBuZXcgSURBRUh5YnJpZFNvbHZlcihldmVudERldGVjdGlvbixhZGFwdGl2ZVN0ZXBTdHJhdGVneSk7ICAgICAgIFxyXG4gICAgfSxcclxuICAgIHJ1bjpmdW5jdGlvbigpOnZvaWR7XHJcbiAgICAgICAgbGV0IHBhcmFtZXRlcnMgPSB1aS5nZXRQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgLy9sZXQgZGFlU29sdmVyOkVEQUVTb2x2ZXIgPSBtZXRob2RzW3BhcmFtZXRlcnNbXCJkYWUtbWV0aG9kXCJdXS5lZGFlSW5pdChwYXJhbWV0ZXJzKTtcclxuICAgICAgICAvL1Rlc3QudGVzdFdlaXNzaW5nZXJJbXBsaWNpdCgpO1xyXG4gICAgICAgIC8vVGVzdC50ZXN0QXJlbnN0b3JmT3JiaXQoZGFlU29sdmVyKTtcclxuICAgICAgICAvL1Rlc3QudGVzdFNpbXBsaWZpY2F0aW9uKCk7XHJcbiAgICAgICAgLy9UZXN0LnJ1blRlc3RzKCk7XHJcbiAgICAgICAgLy9yZXR1cm47XHJcbiAgICAgICAgLy90aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XHJcbiAgICAgICAgdWkuY2xlYXJFcnJvcnMoKTtcclxuICAgICAgICB1aS5pbml0UGxvdCgpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gdWkuZ2V0VGV4dCgpO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgbGV0IGNvbXBpbGVyID0gbmV3IEh5YnJpZFN5c3RlbUNvbXBpbGVyKHBhcmFtZXRlcnNbXCJ6Yy1ib3JkZXItdG9sXCJdKTtcclxuICAgICAgICAgICAgbGV0IHNvbHV0aW9uO1xyXG4gICAgICAgICAgICBsZXQgeDtcclxuICAgICAgICAgICAgbGV0IHo7XHJcbiAgICAgICAgICAgIGlmKHBhcmFtZXRlcnNbXCJkYWUtZm9ybVwiXSA9PSBcImV4cGxpY2l0XCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHN5c0RlZiA9IGNvbXBpbGVyLmNvbXBpbGVFeHBsaWNpdCh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIGxldCBkYWVTb2x2ZXI6RURBRVNvbHZlciA9IG1ldGhvZHNbcGFyYW1ldGVyc1tcImRhZS1tZXRob2RcIl1dLmVkYWVJbml0KHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvbHZlciA9IHVpLmdldEVkYWVTb2x2ZXIocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICBzb2x1dGlvbiA9IHNvbHZlci5zb2x2ZShzeXNEZWYueDAscGFyYW1ldGVycy50MCxwYXJhbWV0ZXJzLnQwK3BhcmFtZXRlcnMudGltZSxcclxuICAgICAgICAgICAgICAgICAgICBkYWVTb2x2ZXIsc3lzRGVmLnN5c3RlbSk7XHJcbiAgICAgICAgICAgICAgICB4ID0gc3lzRGVmLng7XHJcbiAgICAgICAgICAgICAgICB6ID0gc3lzRGVmLno7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHN5c0RlZiA9IGNvbXBpbGVyLmNvbXBpbGVJbXBsaWNpdCh0ZXh0KTtcclxuICAgICAgICAgICAgICAgIGxldCBkYWVTb2x2ZXI6SURBRVNvbHZlciA9IG1ldGhvZHNbcGFyYW1ldGVyc1tcImRhZS1tZXRob2RcIl1dLmlkYWVJbml0KHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvbHZlciA9IHVpLmdldElkYWVTb2x2ZXIocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgICAgICBzb2x1dGlvbiA9IHNvbHZlci5zb2x2ZShzeXNEZWYueDAsc3lzRGVmLnowLHBhcmFtZXRlcnMudDAscGFyYW1ldGVycy50MCArIHBhcmFtZXRlcnMudGltZSxcclxuICAgICAgICAgICAgICAgICAgICBkYWVTb2x2ZXIsc3lzRGVmLnN5c3RlbSk7XHJcbiAgICAgICAgICAgICAgICB4ID0gc3lzRGVmLng7XHJcbiAgICAgICAgICAgICAgICB6ID0gc3lzRGVmLno7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocGFyYW1ldGVycy5zaW1wbGlmaWNhdGlvbil7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2ltcGxpZmljYXRpb246SVNpbXBsaWZpY2F0aW9uQWxnb3JpdGhtID0gc2ltcE1ldGhvZHNbcGFyYW1ldGVyc1tcInNpbXAtbWV0aG9kXCJdXShwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgICAgIHNvbHV0aW9uLnZhbHVlcyA9IHNpbXBsaWZpY2F0aW9uLnNpbXBsaWZ5KHNvbHV0aW9uLnZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdWkuYWRkTG9nTWVzc2FnZShgU3RlcHM6ICR7c29sdXRpb24uc3RhdGlzdGljcy5zdGVwc31gKTtcclxuICAgICAgICAgICAgdWkuYWRkTG9nTWVzc2FnZShgTWluIHN0ZXA6ICR7c29sdXRpb24uc3RhdGlzdGljcy5taW5TdGVwfWApO1xyXG4gICAgICAgICAgICB1aS5hZGRMb2dNZXNzYWdlKGBNYXggc3RlcDogJHtzb2x1dGlvbi5zdGF0aXN0aWNzLm1heFN0ZXB9YCk7XHJcbiAgICAgICAgICAgIHVpLmFkZExvZ01lc3NhZ2UoYFN0YXRlIGNoYW5nZXM6ICR7c29sdXRpb24uc3RhdGlzdGljcy5zdGF0ZXNTd2l0Y2hlZH1gKTtcclxuICAgICAgICAgICAgdWkucGxvdFNvbHV0aW9uKHNvbHV0aW9uLHgseik7XHJcbiAgICAgICAgICAgIHVpLm9wZW5UYWIoXCJyZXN1bHRzXCIpO1xyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgaGFuZGxlRXJyb3JzKGUpO1xyXG4gICAgICAgICAgICB1aS5vcGVuVGFiKFwibWFpblwiKTtcclxuICAgICAgICAgICAgdWkub3BlblRhYihcImVycm9ycy10YWJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==